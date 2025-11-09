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
import { motion, AnimatePresence } from 'framer-motion';
import { useHeaderBar } from '../../../hooks/common/useHeaderBar';
import { useNotifications } from '../../../hooks/common/useNotifications';
import { useNavigation } from '../../../hooks/common/useNavigation';
import NoticeModal from '../NoticeModal';
import MobileMenuButton from './MobileMenuButton';
import HeaderLogo from './HeaderLogo';
import Navigation from './Navigation';
import ActionButtons from './ActionButtons';
import { Sparkles, Zap } from 'lucide-react';

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
  } = useHeaderBar({ onMobileMenuToggle, drawerOpen });

  const {
    noticeVisible,
    unreadCount,
    handleNoticeOpen,
    handleNoticeClose,
    getUnreadKeys,
  } = useNotifications(statusState);

  const { mainNavLinks } = useNavigation(t, docsLink, headerNavModules);

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  const navItemVariants = {
    initial: { y: -10, opacity: 0 },
    animate: (i) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: 0.3 + i * 0.1,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] 
      } 
    })
  };

  return (
    <motion.header 
      className='sticky top-0 z-[9999] px-4 sm:px-6 transition-all duration-300'
      variants={headerVariants}
      initial="initial"
      animate="animate"
      style={{ pointerEvents: 'auto' }}
    >
      <NoticeModal
        visible={noticeVisible}
        onClose={handleNoticeClose}
        isMobile={isMobile}
        defaultTab={unreadCount > 0 ? 'system' : 'inApp'}
        unreadKeys={getUnreadKeys()}
      />

      <div className='mx-auto mt-3 w-full max-w-6xl'>
        <div className='relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/90 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-colors duration-300'>
          <div className='absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/5 dark:from-white/5 dark:via-transparent' />
          <div className='relative flex items-center justify-between gap-4 px-4 py-2 sm:px-6 sm:py-3'>
            <div className='flex items-center gap-3 sm:gap-4'>
              <motion.div
                custom={0}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
              >
                <MobileMenuButton
                  isConsoleRoute={isConsoleRoute}
                  isMobile={isMobile}
                  drawerOpen={drawerOpen}
                  collapsed={collapsed}
                  onToggle={handleMobileMenuToggle}
                  t={t}
                />
              </motion.div>

              <motion.div
                custom={1}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
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
              </motion.div>
            </div>

            <motion.div
              custom={2}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              className='hidden flex-1 justify-center md:flex'
            >
              <Navigation
                mainNavLinks={mainNavLinks}
                isMobile={isMobile}
                isLoading={isLoading}
                userState={userState}
                pricingRequireAuth={pricingRequireAuth}
              />
            </motion.div>

            <motion.div
              custom={3}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
            >
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
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* New Year or special occasion badge */}
      {isNewYear && (
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Sparkles className="w-3 h-3" />
          <span>New Year</span>
        </motion.div>
      )}
      
      {/* Performance indicator */}
      <motion.div
        className="absolute top-4 left-4 hidden items-center gap-1 px-2 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium rounded-full md:flex"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Zap className="w-3 h-3" />
        <span>Optimized</span>
      </motion.div>
    </motion.header>
  );
};

export default HeaderBar;