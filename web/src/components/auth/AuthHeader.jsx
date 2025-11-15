import React, { useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StatusContext } from '../../context/Status';
import { getLogo, getSystemName } from '../../../helpers';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Docs', href: '/docs' },
];

const AuthHeader = () => {
  const location = useLocation();
  const [statusState] = useContext(StatusContext);

  const logoSrc = useMemo(
    () => statusState?.status?.Logo || getLogo(),
    [statusState?.status?.Logo],
  );

  const systemName = useMemo(
    () => statusState?.status?.SystemName || getSystemName(),
    [statusState?.status?.SystemName],
  );

  const isRegister = location.pathname.startsWith('/register');

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative z-20 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] dark:border-slate-800/70 dark:bg-slate-900/80"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-inner dark:border-slate-700/80 dark:bg-slate-800">
            {logoSrc ? (
              <img src={logoSrc} alt={systemName} className="h-full w-full object-cover" />
            ) : (
              <span className="text-lg font-semibold text-slate-800 transition-colors group-hover:text-primary dark:text-white">
                KΩ
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Knight
            </span>
            <span className="text-base font-semibold text-slate-900 dark:text-white">
              {systemName}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative rounded-full px-4 py-2 transition-colors duration-200 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={isRegister ? '/login' : '/register'}
            className="hidden rounded-full border border-slate-200/80 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:text-slate-900 md:inline-flex dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
          >
            {isRegister ? 'Sign in' : 'Create account'}
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.35)] transition-transform hover:-translate-y-0.5"
          >
            Explore plans
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default AuthHeader;
