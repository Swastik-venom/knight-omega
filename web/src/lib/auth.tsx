import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { api, auth as apiAuth, passkeyUtils as apiPasskeyUtils, ApiResponse, User } from './api';

// Define AuthContextType
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  systemStatus: any;
  login: (identifier: string, password: string, turnstileToken?: string) => Promise<void>;
  register: (userData: { username: string; password: string; password2: string; email?: string; verification_code?: string; aff_code?: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  handleOAuthCallback: (provider: 'github' | 'oidc' | 'linuxdo' | 'wechat' | 'telegram', code: string, state?: string) => Promise<void>;
  handlePasskeyLogin: () => Promise<void>;
  handleWeChatLogin: (code: string) => Promise<void>;
  handleTelegramLogin: (response: any) => Promise<void>;
  isPasskeySupported: () => boolean;
  showTwoFA: boolean;
  setShowTwoFA: (show: boolean) => void;
  twoFAData: any;
  setTwoFAData: (data: any) => void;
}

// AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState<any>({});
  const [showTwoFA, setShowTwoFA] = useState(false);
  const [twoFAData, setTwoFAData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load system status
    apiAuth.getSystemStatus()
      .then((response) => {
        if (response.success) {
          setSystemStatus(response.data || {});
        }
      })
      .catch((error) => {
        console.error('Failed to load system status:', error);
      });

    // Check for existing user data on mount (like old implementation)
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('authToken');
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        
        // Ensure token is set in user object
        if (!userData.token) {
          userData.token = savedToken;
        }
        
        setToken(savedToken);
        setUser(userData);
        
        // Verify token is still valid
        apiAuth.getProfile()
          .then((response) => {
            if (response.success && response.data) {
              // Update user data if needed
              const updatedUser = {
                ...userData,
                ...response.data,
                token: savedToken,
                id: response.data.Id || userData.id,
                username: response.data.Username || userData.username,
                role: response.data.Role || userData.role
              };
              setUser(updatedUser);
              localStorage.setItem('user', JSON.stringify(updatedUser));
            }
          })
          .catch((error) => {
            console.error('Token verification failed:', error);
            // Token is invalid, clear everything
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (identifier: string, password: string, turnstileToken?: string) => {
    try {
      setLoading(true);
      const response = await apiAuth.login(identifier, password, turnstileToken);
      if (!response.success) {
        // Check if 2FA is required
        if (response.data?.require_2fa) {
          setTwoFAData(response.data);
          setShowTwoFA(true);
          throw new Error('2FA required');
        }
        throw new Error(response.message || 'Login failed');
      }
      const { token: newToken, data: userData } = response;
      
      // Create user object with all necessary fields
      const userObj = {
        ...userData,
        token: newToken,
        id: userData.Id || userData.id,
        username: userData.Username || userData.username,
        role: userData.Role || userData.role
      };
      
      setToken(newToken);
      setUser(userObj);
      
      // Store both token and user data like old implementation
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('user', JSON.stringify(userObj));
      
      toast.success('Signed in successfully!');
      // Redirect to console dashboard after successful login
      window.location.href = '/console/dashboard';
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message !== '2FA required') {
        toast.error(error.message || 'Login failed');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { username: string; password: string; password2: string; email?: string; verification_code?: string; aff_code?: string }) => {
    try {
      setLoading(true);
      if (userData.password !== userData.password2) {
        throw new Error('Passwords do not match');
      }
      if (userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      const response = await apiAuth.register(userData);
      if (!response.success) {
        throw new Error(response.message || 'Registration failed');
      }
      const { token: newToken, data: userDataRes } = response;
      
      // Create user object with all necessary fields
      const userObj = {
        ...userDataRes,
        token: newToken,
        id: userDataRes.Id || userDataRes.id,
        username: userDataRes.Username || userDataRes.username,
        role: userDataRes.Role || userDataRes.role
      };
      
      setToken(newToken);
      setUser(userObj);
      
      // Store both token and user data like old implementation
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('user', JSON.stringify(userObj));
      
      toast.success('Account created successfully!');
      navigate('/console/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    apiAuth.logout().catch(() => {
      // Ignore logout errors
    });
    navigate('/login');
  };

  const handleOAuthCallback = async (provider: 'github' | 'oidc' | 'linuxdo' | 'wechat' | 'telegram', code: string, state?: string) => {
    try {
      setLoading(true);
      let response;
      
      switch (provider) {
        case 'github':
          response = await apiAuth.exchangeGitHubOAuthCode(code, state);
          break;
        case 'oidc':
          response = await apiAuth.exchangeOIDCOAuthCode(code, state);
          break;
        case 'linuxdo':
          response = await apiAuth.exchangeLinuxDoOAuthCode(code, state);
          break;
        case 'wechat':
          response = await apiAuth.wechatLogin(code);
          break;
        case 'telegram':
          // Telegram handled differently, via dataOnauth
          throw new Error('Telegram handled via button callback');
        default:
          throw new Error(`Unsupported OAuth provider: ${provider}`);
      }
      
      if (!response.success) {
        throw new Error(response.message || 'OAuth login failed');
      }
      const { token: newToken, data: userData } = response;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('authToken', newToken);
      
      toast.success(`Successfully signed in with ${provider}`);
      navigate('/console/dashboard');
    } catch (error: any) {
      console.error('OAuth callback error:', error);
      toast.error(error?.message || `Failed to sign in with ${provider}`);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    try {
      if (!apiPasskeyUtils.isSupported()) {
        throw new Error('Passkey is not supported in this environment');
      }

      const beginResponse = await apiAuth.passkeyLoginBegin();
      if (!beginResponse.success) {
        throw new Error(beginResponse.message || 'Failed to initiate passkey login');
      }

      const publicKeyOptions = apiPasskeyUtils.prepareCredentialRequestOptions(
        beginResponse.data?.options || beginResponse.data?.publicKey || beginResponse.data
      );

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyOptions,
      });

      if (!assertion) {
        throw new Error('Passkey authentication was cancelled');
      }

      const payload = apiPasskeyUtils.buildAssertionResult(assertion);

      const finishResponse = await apiAuth.passkeyLoginFinish(payload);
      if (!finishResponse.success) {
        throw new Error(finishResponse.message || 'Passkey authentication failed');
      }

      const { token: newToken, data: userData } = finishResponse;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('authToken', newToken);
      
      toast.success('Successfully signed in with Passkey');
      navigate('/console/dashboard');
    } catch (error: any) {
      console.error('Passkey login error:', error);
      if (error.name === 'AbortError') {
        toast.info('Passkey authentication was cancelled');
      } else {
        toast.error(error.message || 'Passkey login failed');
      }
      throw error;
    }
  };

  const handleWeChatLogin = async (code: string) => {
    try {
      const response = await apiAuth.wechatLogin(code);
      if (!response.success) {
        throw new Error(response.message || 'WeChat login failed');
      }
      
      const { token: newToken, data: userData } = response;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('authToken', newToken);
      
      toast.success('Successfully signed in with WeChat');
      navigate('/console/dashboard');
    } catch (error: any) {
      console.error('WeChat login error:', error);
      toast.error(error.message || 'WeChat login failed');
      throw error;
    }
  };

  const handleTelegramLogin = async (response: any) => {
    try {
      const fields = [
        'id', 'first_name', 'last_name', 'username', 'photo_url',
        'auth_date', 'hash', 'lang'
      ];
      const params: any = {};
      fields.forEach((field) => {
        if (response[field]) {
          params[field] = response[field];
        }
      });
      const apiResponse = await api.get<ApiResponse<{ token: string; user: User }>>('/api/oauth/telegram/login', { params });
      if (!apiResponse.success) {
        throw new Error(apiResponse.message || 'Telegram login failed');
      }
      const { token: newToken, data: userData } = apiResponse;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('authToken', newToken);
      
      toast.success('Successfully signed in with Telegram');
      navigate('/console/dashboard');
    } catch (error: any) {
      console.error('Telegram login error:', error);
      toast.error(error.message || 'Telegram login failed');
      throw error;
    }
  };

  const isPasskeySupported = (): boolean => {
    return apiPasskeyUtils.isSupported();
  };

  const value: AuthContextType = {
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
    handleTelegramLogin,
    isPasskeySupported,
    showTwoFA,
    setShowTwoFA,
    twoFAData,
    setTwoFAData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}