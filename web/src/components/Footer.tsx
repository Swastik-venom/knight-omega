import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StatusContext } from '../context/Status';
import { getLogo, getSystemName } from '../helpers';

const Footer: React.FC = () => {
  const [statusState] = useContext(StatusContext);
  const status = statusState?.status;
  const logo = getLogo(status);
  const systemName = getSystemName(status);
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', to: '/#features' },
      { name: 'Pricing', to: '/pricing' },
      { name: 'Models', to: '/models' },
      { name: 'Testimonials', to: '/#testimonials' },
    ],
    company: [
      { name: 'About Us', to: '/about' },
      { name: 'Privacy Policy', to: '/privacy-policy' },
      { name: 'User Agreement', to: '/user-agreement' },
      { name: 'FAQ', to: '/#faq' },
    ],
    resources: [
      { name: 'Console', to: '/console' },
      { name: 'GitHub', href: 'https://github.com/QuantumNous/knight-omega' },
      { name: 'Community', href: 'https://github.com/QuantumNous/knight-omega/discussions' },
      { name: 'Login', to: '/login' },
    ],
  };

  return (
    <footer className="relative mt-20 border-t border-slate-200/70 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black shadow-lg">
                <img src={logo} alt={systemName} className="h-8 w-8 object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/50">
                  Knight Omega
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {systemName}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-white/70">
              The unified LLM API gateway for seamless AI integration across multiple providers.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-white/70 dark:hover:text-indigo-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-white/70 dark:hover:text-indigo-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-white/70 dark:hover:text-indigo-400"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-white/70 dark:hover:text-indigo-400"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-slate-200/70 pt-8 dark:border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center text-sm text-slate-600 dark:text-white/70 md:text-left">
              <p>
                © {currentYear} Knight Omega. All rights reserved.
              </p>
              <p className="mt-1">
                Powered by{' '}
                <a
                  href="https://github.com/QuantumNous/knight-omega"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Knight Omega
                </a>
                {' '}under AGPL v3.0 License
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/QuantumNous/knight-omega"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-white/50 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 dark:border-white/15 dark:bg-white/10 dark:text-white/70 dark:hover:text-indigo-400"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;