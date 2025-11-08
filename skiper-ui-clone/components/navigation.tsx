"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  User,
  LogOut,
  Settings,
  Key,
  BarChart3,
  Home,
  Menu,
  X,
  ChevronDown
} from 'lucide-react'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className = '' }: NavigationProps) {
  const { user, logout, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/models', label: 'Models' },
  ]

  const authenticatedItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/api-keys', label: 'API Keys', icon: Key },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`sticky top-4 z-[9999] mx-auto hidden md:flex w-full flex-row items-center justify-between self-start rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${
          isScrolled ? "max-w-4xl px-3" : "max-w-5xl px-4"
        } py-2`}
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
          href="/"
        >
          <div className="h-8 w-8 rounded-lg overflow-hidden shadow-lg border border-white/20">
            <Image
              src="/logo.png"
              alt="Knight-Omega"
              width={32}
              height={32}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="font-semibold text-white text-lg tracking-tight">Knight-Omega</span>
        </Link>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex md:space-x-2">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${
                isActive(item.href) ? 'text-blue-400' : ''
              }`}
            >
              <span className="relative z-20">{item.label}</span>
            </Link>
          ))}
          
          {isAuthenticated && authenticatedItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${
                isActive(item.href) ? 'text-blue-400' : ''
              }`}
            >
              <span className="relative z-20">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-white hidden md:block">
                  {user?.name || 'User'}
                </span>
                <ChevronDown className="w-4 h-4 text-white/60" />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl"
                  >
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        <p className="text-xs text-white/60">{user?.email}</p>
                      </div>
                      {authenticatedItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="font-medium transition-colors hover:text-foreground text-muted-foreground text-sm cursor-pointer"
              >
                Log In
              </Link>

              <Link
                href="/signup"
                className="rounded-md font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.2)_inset] px-4 py-2 text-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
        <Link
          className="flex items-center justify-center gap-2"
          href="/"
        >
          <div className="h-7 w-7 rounded-lg overflow-hidden shadow-lg border border-white/20">
            <Image
              src="/logo.png"
              alt="Knight-Omega"
              width={28}
              height={28}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="font-semibold text-white">Knight-Omega</span>
        </Link>

        <div className="flex items-center space-x-2">
          {!isAuthenticated && (
            <>
              <Link
                href="/login"
                className="text-white/60 hover:text-white transition-colors text-sm font-medium"
              >
                Log In
              </Link>
            </>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
              <span
                className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></span>
              <span
                className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
            <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
                  >
                    {item.label}
                  </Link>
                ))}
                
                {isAuthenticated && (
                  <>
                    <div className="border-t border-border/50 pt-4 mt-4 flex flex-col space-y-3">
                      {authenticatedItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center space-x-2 px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {!isAuthenticated && (
                  <div className="border-t border-border/50 pt-4 mt-4 flex flex-col space-y-3">
                    <Link
                      href="/login"
                      className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50 cursor-pointer"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="px-4 py-3 text-lg font-bold text-center bg-gradient-to-b from-orange-500 to-orange-600 text-white rounded-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200"
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