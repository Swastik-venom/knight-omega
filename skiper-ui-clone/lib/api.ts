// API configuration for Knight-Omega frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

// Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Updated User interface to match backend response
export interface User {
  Id: number
  Username: string
  DisplayName: string
  Role: number
  Status: number
  Group: string
}


export interface Model {
  id: string
  name: string
  provider: string
  description: string
  maxTokens: number
  pricing: {
    input: number
    output: number
  }
  capabilities: string[]
}

export interface ApiKey {
  id: string
  name: string
  key: string
  status: 'active' | 'inactive'
  createdAt: string
  lastUsed?: string
  usage: {
    requests: number
    tokens: number
  }
}

export interface UsageStats {
  requests: number
  tokens: number
  cost: number
  period: string
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    // Log detailed error information for debugging
    console.error(`API Error: ${response.status} ${response.statusText}`, {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
    });

    try {
      // Try to parse the error response as JSON first
      const errorData = await response.json();
      // Log the full error data for debugging
      console.error('Error response data (JSON):', errorData);
      
      // Check if errorData is actually empty or just an empty object
      if (errorData && Object.keys(errorData).length > 0) {
        // If we successfully parsed JSON and it's not empty, use the error or message field
        const errorMessage = errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      } else {
        // If JSON is empty or just an empty object, fall back to status text
        const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        console.error('Error fallback message:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (jsonError) {
      // If JSON parsing fails, try to get text content
      try {
        const errorText = await response.text();
        if (errorText) {
          // Log the error text for debugging
          console.error('Error response data (text):', errorText);
          throw new Error(errorText);
        } else {
          // If text is also empty, fall back to status text
          const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          console.error('Error fallback message:', errorMessage);
          throw new Error(errorMessage);
        }
      } catch (textError) {
        // If text parsing also fails, use the status text
        const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        console.error('Error fallback message:', errorMessage);
        throw new Error(errorMessage);
      }
    }
  }
  return response.json();
}

// Generic fetch wrapper
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  // Get auth token from localStorage
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

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/api/user/login',
  REGISTER: '/api/user/register',
  LOGOUT: '/api/user/logout',
  PROFILE: '/api/user/self',
  
  // Models
  MODELS: '/api/models',
  MODEL_DETAIL: (modelId: string) => `/api/models/${modelId}`,
  
  // API Keys
  API_KEYS: '/api/token',
  CREATE_API_KEY: '/api/token',
  UPDATE_API_KEY: (id: string) => `/api/token/${id}`,
  DELETE_API_KEY: (id: string) => `/api/token/${id}`,
  
  // Usage & Analytics
  USAGE: '/api/log/self',
  USAGE_STATS: '/api/log/self/stat',
  
  // Channels
  CHANNELS: '/api/channel',
  CHANNEL_DETAIL: (id: string) => `/api/channel/${id}`,
  
  // Tokens
  TOKENS: '/api/token',
  TOKEN_DETAIL: (id: string) => `/api/token/${id}`,
  
  // User Management
  USERS: '/api/user',
  USER_DETAIL: (id: string) => `/api/user/${id}`,
  
  // Dashboard
  DASHBOARD: '/api/dashboard',
  DASHBOARD_STATS: '/api/dashboard/stats',
  
  // OAuth
  OAUTH_GITHUB: '/api/oauth/github',
  OAUTH_OIDC: '/api/oauth/oidc',
  OAUTH_LINUXDO: '/api/oauth/linuxdo',
  OAUTH_WECHAT: '/api/oauth/wechat',
  OAUTH_TELEGRAM: '/api/oauth/telegram',
  
  // Passkey
  PASSKEY_LOGIN_BEGIN: '/api/user/passkey/login/begin',
  PASSKEY_LOGIN_FINISH: '/api/user/passkey/login/finish',
}

// API methods
export const api = {
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
  
  patch: <T>(endpoint: string, data?: any) => 
    apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    }),
  
  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),
}

// Authentication methods
export const auth = {
  login: (identifier: string, password: string, turnstileToken?: string) => {
    // Only include turnstile token as query parameter if it exists
    let endpoint = '/api/user/login';
    if (turnstileToken !== undefined && turnstileToken !== '') {
      endpoint = `/api/user/login?turnstile=${encodeURIComponent(turnstileToken)}`;
    }
    return api.post<ApiResponse<{ token: string; user: User }>>(endpoint, { username: identifier, password });
  },
  
  // 2FA verification with turnstile token
  verify2FA: (code: string, turnstileToken?: string) => {
    let endpoint = '/api/user/2fa';
    if (turnstileToken !== undefined && turnstileToken !== '') {
      endpoint = `/api/user/2fa?turnstile=${encodeURIComponent(turnstileToken)}`;
    }
    return api.post<ApiResponse<{ token: string; user: User }>>(endpoint, { code });
  },
  
  register: (userData: { email: string; password: string; name: string; username: string }) =>
    api.post<ApiResponse<{ token: string; user: User }>>(API_ENDPOINTS.REGISTER, userData),
  
  logout: () => api.post(API_ENDPOINTS.LOGOUT),
  
  getProfile: () => api.get<ApiResponse<User>>(API_ENDPOINTS.PROFILE),
  
  // OAuth methods
  initiateOAuth: (provider: 'github' | 'oidc' | 'linuxdo') => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    const redirectUri = `${currentUrl}/oauth/${provider}`
    
    // Redirect to OAuth provider
    if (typeof window !== 'undefined') {
      const endpointMap = {
        github: API_ENDPOINTS.OAUTH_GITHUB,
        oidc: API_ENDPOINTS.OAUTH_OIDC,
        linuxdo: API_ENDPOINTS.OAUTH_LINUXDO
      }
      const authUrl = new URL(`${API_BASE_URL}${endpointMap[provider]}`)
      authUrl.searchParams.set('redirect_uri', redirectUri)
      authUrl.searchParams.set('state', crypto.randomUUID())
      window.location.href = authUrl.toString()
    }
  },
  
  exchangeOAuthCode: (provider: 'github' | 'oidc' | 'linuxdo', code: string, state?: string) => {
    const endpointMap = {
      github: API_ENDPOINTS.OAUTH_GITHUB,
      oidc: API_ENDPOINTS.OAUTH_OIDC,
      linuxdo: API_ENDPOINTS.OAUTH_LINUXDO
    }
    return api.get<ApiResponse<{ token: string; user: User }>>(`${endpointMap[provider]}?code=${code}&state=${state}`)
  },
  
  // Convenience methods for each OAuth provider
  initiateGitHubOAuth: () => auth.initiateOAuth('github'),
  initiateOIDCOAuth: () => auth.initiateOAuth('oidc'),
  initiateLinuxDoOAuth: () => auth.initiateOAuth('linuxdo'),
  
  exchangeGitHubOAuthCode: (code: string, state?: string) => auth.exchangeOAuthCode('github', code, state),
  exchangeOIDCOAuthCode: (code: string, state?: string) => auth.exchangeOAuthCode('oidc', code, state),
  exchangeLinuxDoOAuthCode: (code: string, state?: string) => auth.exchangeOAuthCode('linuxdo', code, state),
  
  // Passkey authentication
  passkeyLoginBegin: () => api.post<ApiResponse<{ options: any }>>(API_ENDPOINTS.PASSKEY_LOGIN_BEGIN),
  passkeyLoginFinish: (assertion: any) => api.post<ApiResponse<{ token: string; user: User }>>(API_ENDPOINTS.PASSKEY_LOGIN_FINISH, assertion),
  
  // WeChat login
  wechatLogin: (code: string) => api.get<ApiResponse<{ token: string; user: User }>>(`${API_ENDPOINTS.OAUTH_WECHAT}?code=${code}`),
  
  // System status
  getSystemStatus: () => api.get<ApiResponse<any>>('/api/status'),
}

// Passkey helper functions
export const passkeyUtils = {
  // Check if Passkey is supported
  isSupported: (): boolean => {
    return typeof window !== 'undefined' && 'PublicKeyCredential' in window;
  },

  // Prepare credential request options
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

  // Build assertion result
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

// Model methods
export const models = {
  getAll: () => api.get<ApiResponse<Model[]>>(API_ENDPOINTS.MODELS),
  getById: (id: string) => api.get<ApiResponse<Model>>(API_ENDPOINTS.MODEL_DETAIL(id)),
}

// API Key methods
export const apiKeys = {
  getAll: () => api.get<ApiResponse<ApiKey[]>>(API_ENDPOINTS.API_KEYS),
  create: (name: string) => api.post<ApiResponse<ApiKey>>(API_ENDPOINTS.CREATE_API_KEY, { name }),
  update: (id: string, data: Partial<ApiKey>) => api.put<ApiResponse<ApiKey>>(API_ENDPOINTS.UPDATE_API_KEY(id), data),
  delete: (id: string) => api.delete<ApiResponse<any>>(API_ENDPOINTS.DELETE_API_KEY(id)),
}

// Usage methods
export const usage = {
  getStats: () => api.get<ApiResponse<UsageStats>>(API_ENDPOINTS.USAGE_STATS),
  getHistory: () => api.get<ApiResponse<any>>(API_ENDPOINTS.USAGE),
}

export default api