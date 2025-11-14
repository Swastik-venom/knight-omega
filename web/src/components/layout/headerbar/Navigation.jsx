/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import SkeletonWrapper from '../components/SkeletonWrapper';

export const resolveNavLinks = (mainNavLinks = [], userState, pricingRequireAuth) => {
  const isAuthenticated = Boolean(userState?.user);

  return mainNavLinks.map((link) => {
    if (link.isExternal) {
      return {
        key: link.itemKey,
        label: link.text,
        type: 'external',
        href: link.externalLink,
      };
    }

    let targetPath = link.to;
    if (link.itemKey === 'console' && !isAuthenticated) {
      targetPath = '/login';
    }
    if (link.itemKey === 'pricing' && pricingRequireAuth && !isAuthenticated) {
      targetPath = '/login';
    }

    return {
      key: link.itemKey,
      label: link.text,
      type: 'internal',
      href: targetPath,
      originalHref: link.to,
    };
  });
};

const getIsActive = (link, activePathname) => {
  if (link.type !== 'internal') return false;
  const basePath = link.originalHref ?? link.href;
  if (basePath === '/') {
    return activePathname === '/';
  }
  return activePathname.startsWith(basePath);
};

const Navigation = ({
  mainNavLinks,
  isLoading,
  userState,
  pricingRequireAuth,
  activePathname,
}) => {
  const links = resolveNavLinks(mainNavLinks, userState, pricingRequireAuth);

  return (
    <nav className='glass-nav'>
      <SkeletonWrapper
        loading={isLoading}
        type='navigation'
        count={4}
        width={80}
        height={22}
        isMobile={false}
      >
        {links.map((link) => {
          const isActive = getIsActive(link, activePathname || '');
          const linkClass = clsx('glass-nav__link', {
            'glass-nav__link--active': isActive,
          });

          if (link.type === 'external') {
            return (
              <a
                key={link.key}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className={linkClass}
              >
                <span className='glass-nav__label'>{link.label}</span>
                <span aria-hidden='true' className='glass-nav__external-indicator'>
                  ↗
                </span>
              </a>
            );
          }

          return (
            <Link key={link.key} to={link.href} className={linkClass}>
              <span className='glass-nav__label'>{link.label}</span>
            </Link>
          );
        })}
      </SkeletonWrapper>
    </nav>
  );
};

export const MobileNavigation = ({
  isOpen,
  mainNavLinks,
  userState,
  pricingRequireAuth,
  activePathname,
  onNavigate,
  actionsSlot,
}) => {
  const links = resolveNavLinks(mainNavLinks, userState, pricingRequireAuth);

  const handleNavigate = (callback) => {
    if (typeof onNavigate === 'function') {
      onNavigate();
    }
    if (typeof callback === 'function') {
      callback();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='glass-nav__mobile-overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => handleNavigate()}
        >
          <motion.div
            className='glass-nav__mobile-panel'
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <nav className='glass-nav__mobile-nav'>
              {links.map((link) => {
                const isActive = getIsActive(link, activePathname || '');
                const itemClass = clsx('glass-nav__mobile-link', {
                  'glass-nav__mobile-link--active': isActive,
                });

                if (link.type === 'external') {
                  return (
                    <a
                      key={link.key}
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={itemClass}
                      onClick={() => handleNavigate()}
                    >
                      <span>{link.label}</span>
                      <span aria-hidden='true' className='glass-nav__mobile-external'>
                        ↗
                      </span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.key}
                    to={link.href}
                    className={itemClass}
                    onClick={() => handleNavigate()}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {actionsSlot ? (
              <div className='glass-nav__mobile-actions'>{actionsSlot}</div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
