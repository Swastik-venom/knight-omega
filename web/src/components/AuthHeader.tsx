"use client"

import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Docs', href: '/docs' },
];

const AuthHeader = () => {
  const location = useLocation();

  const isRegister = location.pathname.startsWith('/register') || location.pathname === '/signup';

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative z-20 w-full border-b border-border/70 bg-card/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-card shadow-inner">
            <span className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              KΩ
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Knight
            </span>
            <span className="text-base font-semibold text-foreground">
              Omega
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium text-muted-foreground md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative rounded-full px-4 py-2 transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={isRegister ? '/login' : '/signup'}
            className="hidden rounded-full border border-border/80 px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 hover:border-border hover:text-foreground md:inline-flex"
          >
            {isRegister ? 'Sign in' : 'Create account'}
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-purple-500 to-blue-500 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_rgba(25,95,53,0.35)] transition-transform hover:-translate-y-0.5"
          >
            Explore plans
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default AuthHeader;