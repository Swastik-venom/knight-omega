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

import React, { useCallback, useEffect, useState } from 'react';
import { useHeaderBar } from '../../../hooks/common/useHeaderBar';
import { useNotifications } from '../../../hooks/common/useNotifications';
import { useNavigation } from '../../../hooks/common/useNavigation';
import NoticeModal from '../NoticeModal';
import MobileMenuButton from './MobileMenuButton';
import HeaderLogo from './HeaderLogo';
import Navigation, { MobileNavigation } from './Navigation';
import ActionButtons from './ActionButtons';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const HeaderBar = ({ onMobileMenuToggle, drawerOpen }) => {
  const {
    userState,
    statusState,
    isMobile,
    collapsed,
    logoLoaded,
    currentLang,
    isLoading,
    systemName,
    logo,
    isNewYear,
    isSelfUseMode,
    docsLink,
    isDemoSiteMode,
    isConsoleRoute,
    theme,
    headerNavModules,
    pricingRequireAuth,
    logout,
    handleLanguageChange,
    handleThemeToggle,
    handleMobileMenuToggle,
    navigate,
    t,
    location,
  } = useHeaderBar({ onMobileMenuToggle, drawerOpen });

  const {
    noticeVisible,
    unreadCount,
    handleNoticeOpen,
    handleNoticeClose,
    getUnreadKeys,
  } = useNotifications(statusState);

  const { mainNavLinks } = useNavigation(t, docsLink, headerNavModules);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOffset = useTransform(scrollY, [0, 120], [0, -48]);
  const headerSpring = useSpring(headerOffset, { stiffness: 160, damping: 26, mass: 0.4 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 64);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location?.pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileNavOpen]);

  const toggleMobileNavigation = useCallback(() => {
    setIsMobileNavOpen((prev) => !prev);
  }, []);

  const closeMobileNavigation = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);

  return (
    <>
      <motion.header
        className={`glass-header ${isScrolled ? 'glass-header--scrolled' : ''}`}
        style={{ y: headerSpring }}
      >
        <NoticeModal
          visible={noticeVisible}
          onClose={handleNoticeClose}
          isMobile={isMobile}
          defaultTab={unreadCount > 0 ? 'system' : 'inApp'}
          unreadKeys={getUnreadKeys()}
        />

        <motion.div
          className='glass-header__inner'
          initial={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className='glass-header__left'>
            <MobileMenuButton
              isConsoleRoute={isConsoleRoute}
              isMobile={isMobile}
              drawerOpen={drawerOpen}
              collapsed={collapsed}
              onToggle={handleMobileMenuToggle}
              t={t}
            />

            <HeaderLogo
              isMobile={isMobile}
              isConsoleRoute={isConsoleRoute}
              logo={logo}
              logoLoaded={logoLoaded}
              isLoading={isLoading}
              systemName={systemName}
              isSelfUseMode={isSelfUseMode}
              isDemoSiteMode={isDemoSiteMode}
              t={t}
            />
          </div>

          <Navigation
            mainNavLinks={mainNavLinks}
            isLoading={isLoading}
            userState={userState}
            pricingRequireAuth={pricingRequireAuth}
            activePathname={location?.pathname}
          />

          <div className='glass-header__right'>
            <div className='glass-header__actions'>
              <ActionButtons
                isNewYear={isNewYear}
                unreadCount={unreadCount}
                onNoticeOpen={handleNoticeOpen}
                theme={theme}
                onThemeToggle={handleThemeToggle}
                currentLang={currentLang}
                onLanguageChange={handleLanguageChange}
                userState={userState}
                isLoading={isLoading}
                isMobile={isMobile}
                isSelfUseMode={isSelfUseMode}
                logout={logout}
                navigate={navigate}
                t={t}
              />
            </div>

            {!isConsoleRoute && (
              <button
                type='button'
                className={`glass-header__menu-btn ${isMobileNavOpen ? 'is-open' : ''}`}
                onClick={toggleMobileNavigation}
                aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {isMobileNavOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}
          </div>
        </motion.div>
      </motion.header>

      <MobileNavigation
        isOpen={isMobileNavOpen && !isConsoleRoute}
        mainNavLinks={mainNavLinks}
        userState={userState}
        pricingRequireAuth={pricingRequireAuth}
        activePathname={location?.pathname}
        onNavigate={closeMobileNavigation}
        actionsSlot={
          <div className='glass-header__mobile-actions-wrapper'>
            <ActionButtons
              isNewYear={isNewYear}
              unreadCount={unreadCount}
              onNoticeOpen={() => {
                closeMobileNavigation();
                handleNoticeOpen();
              }}
              theme={theme}
              onThemeToggle={handleThemeToggle}
              currentLang={currentLang}
              onLanguageChange={handleLanguageChange}
              userState={userState}
              isLoading={isLoading}
              isMobile={true}
              isSelfUseMode={isSelfUseMode}
              logout={() => {
                closeMobileNavigation();
                logout();
              }}
              navigate={(path) => {
                closeMobileNavigation();
                navigate(path);
              }}
              t={t}
            />
          </div>
        }
      />
    </>
  );
};

export default HeaderBar;
