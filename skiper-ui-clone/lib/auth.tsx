"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'sonner'

// Define types
interface User {
  Id: number
  Username: string
  DisplayName: string
  Role: number
  Status: number
  Group: string
}

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  systemStatus: any
  login: (email: string, password: string, turnstileToken?: string) => Promise<void>
  register: (email: string, password: string, name: string, username?: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  handleOAuthCallback: (provider: 'github' | 'oidc' | 'linuxdo', code: string, state?: string) => Promise<void>
  handlePasskeyLogin: () => Promise<void>
  handleWeChatLogin: (code: string) => Promise<void>
  isPasskeySupported: () => boolean
}

// API helper functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    console.error(`API Error: ${response.status} ${response.statusText}`, {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
    });

    try {
      const errorData = await response.json();
      console.error('Error response data (JSON):', errorData);
      
      if (errorData && Object.keys(errorData).length > 0) {
        const errorMessage = errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      } else {
        const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        console.error('Error fallback message:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (jsonError) {
      try {
        const errorText = await response.text();
        if (errorText) {
          console.error('Error response data (text):', errorText);
          throw new Error(errorText);
        } else {
          const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          console.error('Error fallback message:', errorMessage);
          throw new Error(errorMessage);
        }
      } catch (textError) {
        const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        console.error('Error fallback message:', errorMessage);
        throw new Error(errorMessage);
      }
    }
  }
  return response.json();
}

async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken')
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    })
    
    return await handleResponse<T>(response)
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network request failed')
  }
}

const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),
  
  post: <T>(endpoint: string, data?: any) => 
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    }),
  
  put: <T>(endpoint: string, data?: any) => 
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    }),
  
  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),
}

// Auth functions
const auth = {
  login: (identifier: string, password: string, turnstileToken?: string) => {
    let endpoint = '/api/user/login';
    if (turnstileToken !== undefined && turnstileToken !== '') {
      endpoint = `/api/user/login?turnstile=${encodeURIComponent(turnstileToken)}`;
    }
    return api.post<ApiResponse<{ token: string; user: User }>>(endpoint, { username: identifier, password });
  },
  
  verify2FA: (code: string, turnstileToken?: string) => {
    let endpoint = '/api/user/2fa';
    if (turnstileToken !== undefined && turnstileToken !== '') {
      endpoint = `/api/user/2fa?turnstile=${encodeURIComponent(turnstileToken)}`;
    }
    return api.post<ApiResponse<{ token: string; user: User }>>(endpoint, { code });
  },
  
  register: (userData: { email: string; password: string; name: string; username: string }) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/api/user/register', userData),
  
  logout: () => api.post('/api/user/logout'),
  
  getProfile: () => api.get<ApiResponse<User>>('/api/user/self'),
  
  wechatLogin: (code: string) => api.get<ApiResponse<{ token: string; user: User }>>(`/api/oauth/wechat?code=${code}`),
  
  getSystemStatus: () => api.get<ApiResponse<any>>('/api/status'),
  
  passkeyLoginBegin: () => api.post<ApiResponse<{ options: any }>>('/api/user/passkey/login/begin'),
  passkeyLoginFinish: (assertion: any) => api.post<ApiResponse<{ token: string; user: User }>>('/api/user/passkey/login/finish', assertion),
}

// Passkey utilities
const passkeyUtils = {
  isSupported: (): boolean => {
    return typeof window !== 'undefined' && 'PublicKeyCredential' in window;
  },

  prepareCredentialRequestOptions: (options: any) => {
    return {
      ...options,
      challenge: Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0)),
      allowCredentials: options.allowCredentials?.map((cred: any) => ({
        ...cred,
        id: Uint8Array.from(atob(cred.id), c => c.charCodeAt(0)),
      })) || [],
    };
  },

  buildAssertionResult: (assertion: any) => {
    const authData = new Uint8Array(assertion.response.authenticatorData);
    const clientDataJSON = new Uint8Array(assertion.response.clientDataJSON);
    const signature = new Uint8Array(assertion.response.signature);
    const userHandle = assertion.response.userHandle
      ? new Uint8Array(assertion.response.userHandle)
      : null;

    return {
      id: assertion.id,
      rawId: btoa(String.fromCharCode(...new Uint8Array(assertion.rawId))),
      type: assertion.type,
      response: {
        authenticatorData: btoa(String.fromCharCode(...authData)),
        clientDataJSON: btoa(String.fromCharCode(...clientDataJSON)),
        signature: btoa(String.fromCharCode(...signature)),
        userHandle: userHandle ? btoa(String.fromCharCode(...userHandle)) : null,
      },
      authenticatorAttachment: assertion.authenticatorAttachment,
    };
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [systemStatus, setSystemStatus] = useState<any>({})
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Load system status
    auth.getSystemStatus()
      .then(response => {
        if (response.success) {
          setSystemStatus(response.data || {})
        }
      })
      .catch((error) => {
        console.error('Failed to load system status:', error)
      })

    // Check for existing token on mount
    const savedToken = localStorage.getItem('authToken')
    if (savedToken) {
      setToken(savedToken)
      // Verify token and get user info
      auth.getProfile()
        .then(response => {
          if (response.success) {
            setUser(response.data!)
          }
        })
        .catch((error) => {
          console.error('Token verification failed:', error)
          // Token is invalid, clear it
          localStorage.removeItem('authToken')
          setToken(null)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string, turnstileToken?: string) => {
    try {
      setLoading(true)
      const response = await auth.login(email, password, turnstileToken)
      if (!response.success) {
        // Check if 2FA is required
        if (response.message === '2FA required') {
          // Re-throw with specific message for 2FA requirement
          throw new Error('2FA required')
        }
        throw new Error(response.message || 'Login failed')
      }
      const { token: newToken, user: userData } = response.data!
      
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('authToken', newToken)
    } catch (error: any) {
      console.error('Login error:', error)
      // Re-throw the error so the login page can handle it
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string, username?: string) => {
    try {
      setLoading(true)
      const response = await auth.register({ email, password, name, username: username || '' })
      if (!response.success) {
        throw new Error(response.message || 'Registration failed')
      }
      const { token: newToken, user: userData } = response.data!
      
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('authToken', newToken)
    } catch (error: any) {
      console.error('Registration error:', error)
      // Re-throw the error so the signup page can handle it
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
    auth.logout().catch(() => {
      // Ignore logout errors
    })
    // Redirect to login page
    router.push('/login')
  }

  const handleOAuthCallback = async (provider: 'github' | 'oidc' | 'linuxdo', code: string, state?: string) => {
    try {
      setLoading(true)
      let response;
      
      switch (provider) {
        case 'github':
          response = await api.get<ApiResponse<{ token: string; user: User }>>(`/api/oauth/github?code=${code}&state=${state}`)
          break
        case 'oidc':
          response = await api.get<ApiResponse<{ token: string; user: User }>>(`/api/oauth/oidc?code=${code}&state=${state}`)
          break
        case 'linuxdo':
          response = await api.get<ApiResponse<{ token: string; user: User }>>(`/api/oauth/linuxdo?code=${code}&state=${state}`)
          break
        default:
          throw new Error(`Unsupported OAuth provider: ${provider}`)
      }
      
      if (!response.success) {
        throw new Error(response.message || 'OAuth login failed')
      }
      const { token: newToken, user: userData } = response.data!
      
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('authToken', newToken)
      
      // Show success message
      toast.success('Successfully signed in with ' + provider.charAt(0).toUpperCase() + provider.slice(1))
      
      // Redirect to dashboard or home page after successful OAuth
      router.push('/dashboard')
    } catch (error: any) {
      console.error('OAuth callback error:', error)
      toast.error(error?.message || `Failed to sign in with ${provider}`)
      // Redirect to login page on error
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handlePasskeyLogin = async () => {
    try {
      if (!passkeyUtils.isSupported()) {
        throw new Error('Passkey is not supported in this environment')
      }

      // Start passkey authentication
      const beginResponse = await auth.passkeyLoginBegin()
      if (!beginResponse.success) {
        throw new Error(beginResponse.message || 'Failed to initiate passkey login')
      }

      const publicKeyOptions = passkeyUtils.prepareCredentialRequestOptions(
        beginResponse.data?.options || beginResponse.data?.publicKey || beginResponse.data
      )

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyOptions,
      })

      if (!assertion) {
        throw new Error('Passkey authentication was cancelled')
      }

      const payload = passkeyUtils.buildAssertionResult(assertion)

      // Complete passkey authentication
      const finishResponse = await auth.passkeyLoginFinish(payload)
      if (!finishResponse.success) {
        throw new Error(finishResponse.message || 'Passkey authentication failed')
      }

      const { token: newToken, user: userData } = finishResponse.data!
      
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('authToken', newToken)
      
      toast.success('Successfully signed in with Passkey')
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Passkey login error:', error)
      if (error.name === 'AbortError') {
        toast.info('Passkey authentication was cancelled')
      } else {
        toast.error(error.message || 'Passkey login failed')
      }
      throw error
    }
  }

  const handleWeChatLogin = async (code: string) => {
    try {
      const response = await auth.wechatLogin(code)
      if (!response.success) {
        throw new Error(response.message || 'WeChat login failed')
      }
      
      const { token: newToken, user: userData } = response.data!
      
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('authToken', newToken)
      
      toast.success('Successfully signed in with WeChat')
      router.push('/dashboard')
    } catch (error: any) {
      console.error('WeChat login error:', error)
      toast.error(error.message || 'WeChat login failed')
      throw error
    }
  }

  const isPasskeySupported = (): boolean => {
    return passkeyUtils.isSupported()
  }

  const value = {
    user,
    token,
    loading,
    systemStatus,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
    handleOAuthCallback,
    handlePasskeyLogin,
    handleWeChatLogin,
    isPasskeySupported
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}