import React, { useState, useEffect, useContext, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { UserContext } from '../../context/User';
import { StatusContext } from '../../context/Status';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getLogo, getSystemName, API, showSuccess } from '@/helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import {
  ChevronRight,
  Sparkles,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  User as UserIcon,
} from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [userState, userDispatch] = useContext(UserContext);
  const [statusState] = useContext(StatusContext);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await API.get('/api/user/logout');
      showSuccess('Logged out successfully');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('user');
      userDispatch({ type: 'logout', payload: null });
      setIsUserMenuOpen(false);
      navigate('/');
    }
  };

  const navItems = useMemo(
    () => [
      { key: 'home', label: 'Home', path: '/' },
      { key: 'features', label: 'Features', path: '/#features' },
      { key: 'pricing', label: 'Pricing', path: '/pricing' },
      { key: 'models', label: 'Models', path: '/models' },
    ],
    [],
  );

  const logoSrc = statusState?.status?.Logo || getLogo();
  const systemName = statusState?.status?.SystemName || getSystemName();

  useEffect(() => {
    setHoveredNav(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const activeNavKey = useMemo(() => {
    const matchedRoute = navItems.find((item) => {
      if (!item.path) return false;
      if (item.path === '/') {
        return location.pathname === '/';
      }
      return location.pathname.startsWith(item.path);
    });
    return matchedRoute?.key ?? null;
  }, [location.pathname, navItems]);

  const handleNavSelection = useCallback(
    (item, onItemClick) => {
      if (onItemClick) onItemClick();
      if (!item.path) return;

      if (item.path === '/' && location.pathname === '/') {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (item.path !== location.pathname) {
        navigate(item.path);
      }
    },
    [navigate, location.pathname],
  );

  const highlightTarget = hoveredNav ?? activeNavKey;

  useEffect(() => {
    if (!isUserMenuOpen) return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1],
      } 
    }
  };

  const navItemVariants = {
    initial: { y: -12, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.18 + i * 0.07,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const desktopSizing = isScrolled
    ? 'w-full max-w-4xl px-3 py-2'
    : 'w-full max-w-5xl px-5 py-3';

  const renderNavLinks = (onItemClick) => (
    <LayoutGroup id="marketing-header-nav">
      <motion.nav
        layout
        className="relative flex items-center gap-1 rounded-full border border-white/25 bg-white/12 p-1 text-sm text-slate-600 shadow-[0_16px_36px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-white/15 dark:bg-white/5 dark:text-white/70"
      >
        {navItems.map((item, index) => {
          const isHighlighted = highlightTarget === item.key;

          return (
            <motion.div
              key={item.key}
              custom={index}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              className="relative"
            >
              <button
                type="button"
                onClick={() => handleNavSelection(item, onItemClick)}
                onMouseEnter={() => setHoveredNav(item.key)}
                onMouseLeave={() => setHoveredNav(null)}
                onFocus={() => setHoveredNav(item.key)}
                onBlur={() => setHoveredNav(null)}
                className="relative inline-flex items-center justify-center overflow-hidden rounded-full px-0 py-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="marketing-header-pill"
                    className="absolute inset-0 z-0 rounded-full bg-white/75 shadow-[0_18px_40px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:bg-white/10 dark:shadow-[0_16px_40px_rgba(15,23,42,0.45)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                    isHighlighted
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </motion.div>
          );
        })}
      </motion.nav>
    </LayoutGroup>
  );

  return (
    <div className="relative z-[9999] mx-auto w-full max-w-[92rem] px-4 md:px-6">
      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className={`pointer-events-auto sticky top-4 hidden items-center justify-between rounded-full border border-white/20 bg-white/12 shadow-[0_20px_52px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-white/10 md:flex ${desktopSizing} mx-auto`}
        style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden', perspective: '1000px' }}
      >
        <Link
          to="/"
          className={`flex items-center gap-3 transition-all duration-300 ${isScrolled ? 'pl-2' : ''}`}
        >
          <motion.div
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/35 bg-white/70 shadow-[0_10px_26px_rgba(15,23,42,0.2)] backdrop-blur dark:border-white/15 dark:bg-white/10"
            whileHover={{ rotate: 4 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            {logoSrc ? (
              <img src={logoSrc} alt={systemName} className="h-full w-full object-cover" />
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
          {renderNavLinks()}
        </div>

        <div className="flex items-center gap-3">
          {userState?.user ? (
            <div className="relative" ref={menuRef}>
              <motion.button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:text-slate-900 dark:border-white/15 dark:bg-white/10 dark:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-semibold text-white shadow-inner">
                  {userState.user.username?.slice(0, 2).toUpperCase()}
                </div>
                <span className="hidden lg:inline">{userState.user.username}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/85 backdrop-blur-2xl shadow-[0_20px_45px_rgba(15,23,42,0.45)]"
                  >
                    <div className="border-b border-white/10 p-4">
                      <p className="text-sm font-medium text-white">{userState.user.username}</p>
                      <p className="truncate text-xs text-white/60">{userState.user.email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          navigate('/console');
                          setIsUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 transition-all hover:bg-white/10"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Console
                      </button>
                      <button
                        onClick={() => {
                          navigate('/console/personal');
                          setIsUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 transition-all hover:bg-white/10"
                      >
                        <UserIcon className="h-4 w-4" />
                        Profile
                      </button>
                    </div>
                    <div className="border-t border-white/10 p-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-300 transition-all hover:bg-red-500/10"
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
            <div className="hidden items-center gap-2 md:flex">
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
            </div>
          )}
        </div>
      </motion.header>

      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className="pointer-events-auto sticky top-4 flex w-full items-center justify-between rounded-full border border-white/20 bg-white/10 px-4 py-3 shadow-[0_18px_46px_rgba(15,23,42,0.2)] backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-white/10 md:hidden"
      >
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/35 bg-white/70 shadow-[0_10px_26px_rgba(15,23,42,0.2)] backdrop-blur dark:border-white/15 dark:bg-white/10"
            whileHover={{ rotate: 4 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            {logoSrc ? (
              <img src={logoSrc} alt={systemName} className="h-full w-full object-cover" />
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
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[9998] bg-slate-900/50 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="absolute left-4 right-4 top-20 rounded-3xl border border-white/20 bg-white/90 p-6 text-slate-700 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/90 dark:text-white"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col space-y-3 text-base">
                {navItems.map((item, index) => {
                  const isActive = highlightTarget === item.key;
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.06, duration: 0.22 }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handleNavSelection(item, () => setIsMobileMenuOpen(false));
                        }}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
                          isActive
                            ? 'border-white/30 bg-white text-slate-900 shadow-[0_22px_48px_rgba(15,23,42,0.16)] dark:bg-white/15 dark:text-white'
                            : 'border-white/18 bg-white/20 text-slate-700 hover:bg-white/35 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/15'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  );
                })}

                <div className="mt-4 border-t border-white/20 pt-4 dark:border-white/10">
                  {userState?.user ? (
                    <div className="flex flex-col space-y-3">
                      <Link
                        to="/console"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-base font-medium text-slate-900 transition-colors hover:bg-white/90 dark:bg-white/10 dark:text-white"
                      >
                        Console
                        <LayoutDashboard className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-between rounded-2xl border border-red-200/60 px-4 py-3 text-base font-medium text-red-600 transition-all hover:bg-red-50/70 dark:border-red-500/25 dark:text-red-200 dark:hover:bg-red-500/15"
                      >
                        <span>Logout</span>
                        <LogOut className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl border border-white/25 bg-white/40 px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-white/70 dark:border-white/10 dark:bg-white/10 dark:text-white"
                      >
                        Log In
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 px-4 py-3 text-base font-semibold text-white shadow-[0_20px_40px_rgba(79,70,229,0.35)]"
                      >
                        Get Started
                        <Sparkles className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}