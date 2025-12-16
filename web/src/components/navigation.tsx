"use client"

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/auth'
import {
  User,
  LogOut,
  Settings,
  Key,
  BarChart3,
  Home,
  Menu,
  X,
  ChevronDown,
  CreditCard,
  Sparkles
} from 'lucide-react'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className = '' }: NavigationProps) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout, isAuthenticated, systemStatus } = useAuth()
  
  // Get logo and system name from system status or localStorage
  const logo = systemStatus?.logo || localStorage.getItem('logo') || '/logo.png'
  const systemName = systemStatus?.system_name || localStorage.getItem('system_name') || 'Knight-Omega'
  
  // Check if we're on a console page
  const isConsolePage = location.pathname.startsWith('/console')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/features', label: 'Features' },
    { to: '/models', label: 'Models' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/docs', label: 'Docs' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/about', label: 'About' },
  ]

  const authenticatedItems = [
    { to: '/console/dashboard', label: 'Dashboard', icon: BarChart3 },
    { to: '/console/token', label: 'API Keys', icon: Key },
    { to: '/console/topup', label: 'Wallet', icon: CreditCard },
    { to: '/console/setting', label: 'Settings', icon: Settings },
  ]

  const isActive = (to: string) => {
    if (to === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(to)
  }

  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Header - Updated for consistency */}
      <header
        className={`sticky top-0 z-[9999] mx-auto hidden md:flex w-full flex-row items-center justify-between self-start rounded-full bg-white/12 backdrop-blur-2xl border border-white/25 shadow-[0_20px_52px_rgba(15,23,42,0.18)] transition-all duration-300 ${
          isScrolled ? "max-w-4xl px-3 py-2" : "max-w-5xl px-5 py-3"
        }`}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        <Link
          className={`z-50 flex items-center justify-center gap-3 transition-all duration-300 ${
            isScrolled ? "ml-2" : ""
          }`}
          to="/"
        >
          <motion.div
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/35 bg-white/70 shadow-[0_10px_26px_rgba(15,23,42,0.2)] backdrop-blur dark:border-white/15 dark:bg-white/10"
            whileHover={{ rotate: 4 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            {logo ? (
              <img src={logo} alt={systemName} className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-semibold text-slate-900 dark:text-white">KΩ</span>
            )}
          </motion.div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] uppercase tracking-[0.5em] text-slate-500 dark:text-white/50">Knight Omega</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">{systemName}</span>
          </div>
        </Link>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <nav className="relative flex items-center gap-1 rounded-full border border-white/25 bg-white/15 p-1 text-sm text-slate-600 shadow-[0_16px_36px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-white/15 dark:bg-white/10 dark:text-white/70">
            {navigationItems.map((item, index) => {
              const isActiveItem = isActive(item.to);
              return (
                <motion.div
                  key={item.to}
                  className="relative"
                >
                  <Link
                    to={item.to}
                    className={`relative inline-flex items-center justify-center overflow-hidden rounded-full px-0 py-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
                  >
                    {isActiveItem && (
                      <motion.span
                        layoutId="marketing-header-pill"
                        className="absolute inset-0 z-0 rounded-full bg-white/80 shadow-[0_18px_40px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:bg-white/15 dark:shadow-[0_16px_40px_rgba(15,23,42,0.45)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                        isActiveItem
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <motion.button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:text-slate-900 dark:border-white/15 dark:bg-white/10 dark:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-semibold text-white shadow-inner">
                  {user?.Username?.slice(0, 2).toUpperCase() || user?.username?.slice(0, 2).toUpperCase() || 'U'}
                </div>
                <span className="hidden lg:inline">{user?.Username || user?.username || 'User'}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/85 backdrop-blur-2xl shadow-[0_20px_45px_rgba(15,23,42,0.45)]"
                  >
                    <div className="border-b border-white/10 p-4">
                      <p className="text-sm font-medium text-white">{user?.Username || user?.username || 'User'}</p>
                      <p className="truncate text-xs text-white/60">{user?.DisplayName || user?.email || ''}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/console"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 transition-all hover:bg-white/10"
                      >
                        <BarChart3 className="h-4 w-4" />
                        Console
                      </Link>
                      <Link
                        to="/console/setting"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 transition-all hover:bg-white/10"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </div>
                    <div className="border-t border-white/10 p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full rounded-xl px-3 py-2 text-sm text-red-300 transition-all hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:text-slate-900 dark:border-white/15 dark:bg-white/10 dark:text-white/80"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-gradient-to-r from-indigo-500/90 via-purple-500/85 to-blue-500/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_20px_46px_rgba(79,70,229,0.35)] transition-transform duration-300 hover:-translate-y-1"
              >
                <Sparkles className="h-4 w-4" />
                Get Started
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Mobile Header - Updated for consistency */}
      <header className={`pointer-events-auto sticky top-4 flex w-full items-center justify-between rounded-full backdrop-blur-xl transition-all duration-300 md:hidden ${
        isConsolePage
          ? "border border-slate-700/50 bg-slate-900/95 px-4 py-3 shadow-[0_18px_46px_rgba(0,0,0,0.3)]"
          : "border border-white/20 bg-white/10 px-4 py-3 shadow-[0_18px_46px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-white/10"
      }`}>
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/35 bg-white/70 shadow-[0_10px_26px_rgba(15,23,42,0.2)] backdrop-blur dark:border-white/15 dark:bg-white/10"
            whileHover={{ rotate: 4 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            {logo ? (
              <img src={logo} alt={systemName} className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-semibold text-slate-900 dark:text-white">KΩ</span>
            )}
          </motion.div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{systemName}</span>
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/15 transition-colors hover:border-white/35 hover:bg-white/25 dark:border-white/10 dark:bg-white/10"
          aria-label="Toggle menu"
        >
          <div className="flex h-5 w-5 flex-col items-center justify-center space-y-1">
            <span className={`block h-0.5 w-4 bg-slate-700 transition-all duration-300 dark:bg-white ${isMobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-4 bg-slate-700 transition-all duration-300 dark:bg-white ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-4 bg-slate-700 transition-all duration-300 dark:bg-white ${isMobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm md:hidden">
            <div className="absolute top-20 left-4 right-4 bg-black/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-left px-4 py-3 text-lg font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}

                {isAuthenticated && (
                  <>
                    <div className="border-t border-gray-200/50 pt-4 mt-4 flex flex-col space-y-3">
                      {authenticatedItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center space-x-2 px-4 py-3 text-lg font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {!isAuthenticated && (
                  <div className="border-t border-gray-200/50 pt-4 mt-4 flex flex-col space-y-3">
                    <Link
                      to="/login"
                      className="px-4 py-3 text-lg font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10 cursor-pointer underline-offset-4 hover:underline"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-3 text-lg font-bold text-center bg-gradient-to-b from-orange-500 to-orange-600 text-white rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200 underline-offset-4 hover:underline"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}