// API configuration for Knight-Omega frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3030'

// Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
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
    const errorData = await response.json().catch(() => ({
      error: `HTTP ${response.status}: ${response.statusText}`
    }))
    throw new Error(errorData.error || errorData.message || 'API request failed')
  }
  return response.json()
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
  LOGIN: '/api/v1/user/login',
  REGISTER: '/api/v1/user/register',
  LOGOUT: '/api/v1/user/logout',
  PROFILE: '/api/v1/user/profile',
  
  // Models
  MODELS: '/api/v1/models',
  MODEL_DETAIL: (modelId: string) => `/api/v1/models/${modelId}`,
  
  // API Keys
  API_KEYS: '/api/v1/keys',
  CREATE_API_KEY: '/api/v1/keys',
  UPDATE_API_KEY: (id: string) => `/api/v1/keys/${id}`,
  DELETE_API_KEY: (id: string) => `/api/v1/keys/${id}`,
  
  // Usage & Analytics
  USAGE: '/api/v1/usage',
  USAGE_STATS: '/api/v1/usage/stats',
  
  // Channels
  CHANNELS: '/api/v1/channels',
  CHANNEL_DETAIL: (id: string) => `/api/v1/channels/${id}`,
  
  // Tokens
  TOKENS: '/api/v1/tokens',
  TOKEN_DETAIL: (id: string) => `/api/v1/tokens/${id}`,
  
  // User Management
  USERS: '/api/v1/users',
  USER_DETAIL: (id: string) => `/api/v1/users/${id}`,
  
  // Dashboard
  DASHBOARD: '/api/v1/dashboard',
  DASHBOARD_STATS: '/api/v1/dashboard/stats',
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
  login: (email: string, password: string) => 
    api.post<{ token: string; user: User }>(API_ENDPOINTS.LOGIN, { email, password }),
  
  register: (email: string, password: string, name: string) => 
    api.post<{ token: string; user: User }>(API_ENDPOINTS.REGISTER, { email, password, name }),
  
  logout: () => api.post(API_ENDPOINTS.LOGOUT),
  
  getProfile: () => api.get<User>(API_ENDPOINTS.PROFILE),
}

// Model methods
export const models = {
  getAll: () => api.get<Model[]>(API_ENDPOINTS.MODELS),
  getById: (id: string) => api.get<Model>(API_ENDPOINTS.MODEL_DETAIL(id)),
}

// API Key methods
export const apiKeys = {
  getAll: () => api.get<ApiKey[]>(API_ENDPOINTS.API_KEYS),
  create: (name: string) => api.post<ApiKey>(API_ENDPOINTS.CREATE_API_KEY, { name }),
  update: (id: string, data: Partial<ApiKey>) => api.put<ApiKey>(API_ENDPOINTS.UPDATE_API_KEY(id), data),
  delete: (id: string) => api.delete(API_ENDPOINTS.DELETE_API_KEY(id)),
}

// Usage methods
export const usage = {
  getStats: () => api.get<UsageStats>(API_ENDPOINTS.USAGE_STATS),
  getHistory: () => api.get(API_ENDPOINTS.USAGE),
}

export default api