import React, { useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { StatusContext } from '../../context/Status';
import { getSystemName } from '../../../helpers';

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
      { label: 'Contact', href: 'mailto:support@quantumnous.com', external: true },
    ],
  },
];

const AuthFooter = () => {
  const [statusState] = useContext(StatusContext);
  const currentYear = new Date().getFullYear();
  const systemName = useMemo(
    () => statusState?.status?.SystemName || getSystemName(),
    [statusState?.status?.SystemName],
  );

  return (
    <footer className="relative z-10 mt-16 border-t border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_repeat(2,1fr)]">
          <div className="max-w-md">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Build faster with {systemName}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Seamless authentication, unified billing, and real-time insights for every AI workload. Designed with a focus on craft and performance.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {group.title}
              </h4>
              <div className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                {group.links.map((item) =>
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="transition-colors hover:text-slate-900 dark:hover:text-white"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="transition-colors hover:text-slate-900 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-200/60 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between dark:border-slate-800/60 dark:text-slate-400">
          <span>© {currentYear} {systemName}. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://github.com/QuantumNous/knight-omega"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              GitHub
            </a>
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Privacy
            </Link>
            <Link
              to="/user-agreement"
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
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
