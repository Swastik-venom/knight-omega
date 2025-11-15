'use client'

import * as React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

interface ThemeProviderState {
  theme: string
  setTheme: (theme: string | (() => string)) => void
  forcedTheme?: string
  resolvedTheme: string
  systemTheme?: boolean
}

const ThemeProviderContext = createContext<ThemeProviderState | null>(null)

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  enableSystem = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(defaultTheme)

  // Force dark theme always
  const resolvedTheme = 'dark'

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
  }, [resolvedTheme])

  const value = {
    theme: 'dark',
    setTheme: () => {}, // Disable theme switching
    forcedTheme: 'dark',
    resolvedTheme,
    systemTheme: false,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context == null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
