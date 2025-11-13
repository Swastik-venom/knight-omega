"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useHeaderBar } from "../../../hooks/common/useHeaderBar"
import { useNotifications } from "../../../hooks/common/useNotifications"
import { useNavigation } from "../../../hooks/common/useNavigation"
import NoticeModal from "../NoticeModal"
import MobileMenuButton from "./MobileMenuButton"
import HeaderLogo from "./HeaderLogo"
import Navigation from "./Navigation"
import ActionButtons from "./ActionButtons"
import { Sparkles, Zap } from "lucide-react"

const EnhancedHeaderBar = ({ onMobileMenuToggle, drawerOpen }) => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

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
  } = useHeaderBar({ onMobileMenuToggle, drawerOpen })

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const { noticeVisible, unreadCount, handleNoticeOpen, handleNoticeClose, getUnreadKeys } =
    useNotifications(statusState)

  const { mainNavLinks } = useNavigation(t, docsLink, headerNavModules)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const navItemVariants = {
    initial: { y: -10, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.12,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const blurAmount = Math.min(scrollY / 50, 1)
  const bgOpacity = 0.85 + blurAmount * 0.1

  return (
    <motion.header
      className="sticky top-0 z-[9999] px-4 sm:px-6 transition-all duration-300"
      variants={headerVariants}
      initial="initial"
      animate="animate"
      style={{ pointerEvents: "auto" }}
    >
      <NoticeModal
        visible={noticeVisible}
        onClose={handleNoticeClose}
        isMobile={isMobile}
        defaultTab={unreadCount > 0 ? "system" : "inApp"}
        unreadKeys={getUnreadKeys()}
      />

      <div className="mx-auto mt-3 w-full max-w-6xl">
        <motion.div
          className="relative overflow-hidden rounded-2xl border transition-all duration-300"
          animate={{
            borderColor: isScrolled ? "rgba(148, 163, 184, 0.5)" : "rgba(226, 232, 240, 0.5)",
          }}
          style={{
            backdropFilter: `blur(${8 + blurAmount * 12}px)`,
            WebkitBackdropFilter: `blur(${8 + blurAmount * 12}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.95] via-white/[0.85] to-white/[0.75] dark:from-slate-950/[0.95] dark:via-slate-900/[0.85] dark:to-slate-800/[0.75]" />

          {isScrolled && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent dark:via-white/[0.05]"
              animate={{
                x: ["100%", "-100%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-transparent to-slate-100/20 dark:from-white/5 dark:via-transparent dark:to-white/2" />

          <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <motion.div custom={0} variants={navItemVariants} initial="initial" animate="animate">
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
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
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
              className="hidden flex-1 justify-center md:flex"
            >
              <Navigation
                mainNavLinks={mainNavLinks}
                isMobile={isMobile}
                isLoading={isLoading}
                userState={userState}
                pricingRequireAuth={pricingRequireAuth}
              />
            </motion.div>

            <motion.div custom={3} variants={navItemVariants} initial="initial" animate="animate">
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
        </motion.div>
      </div>

      <AnimatePresence>
        {isNewYear && (
          <motion.div
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
            <span>New Year</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="absolute top-4 left-4 hidden items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500/80 to-teal-500/80 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm md:flex"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <Zap className="w-3.5 h-3.5" />
            </motion.div>
            <span>Optimized</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default EnhancedHeaderBar
