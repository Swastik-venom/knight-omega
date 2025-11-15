"use client"

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const linkGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Documentation', href: '/docs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: 'mailto:support@knightomega.com', external: true },
    ],
  },
];

const AuthFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-16 border-t border-border/70 bg-transparent">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_repeat(2,1fr)]">
          <div className="max-w-md">
            <h3 className="text-xl font-semibold text-foreground">
              Build faster with Knight Omega
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Seamless authentication, unified billing, and real-time insights for every AI workload. Designed with a focus on craft and performance.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {group.title}
              </h4>
              <div className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
                {group.links.map((item) =>
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© {currentYear} Knight Omega. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://github.com/KnightOmega/knight-omega"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              to="/user-agreement"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;