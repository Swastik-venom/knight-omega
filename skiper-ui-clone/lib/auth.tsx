"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { auth, User } from './api'

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on mount
    const savedToken = localStorage.getItem('authToken')
    if (savedToken) {
      setToken(savedToken)
      // Verify token and get user info
      auth.getProfile()
        .then(userData => {
          setUser(userData)
        })
        .catch(() => {
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

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await auth.login(email, password)
      const { token: newToken, user: userData } = response
      
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('authToken', newToken)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)
      const response = await auth.register(email, password, name)
      const { token: newToken, user: userData } = response
      
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('authToken', newToken)
    } catch (error) {
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
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token
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