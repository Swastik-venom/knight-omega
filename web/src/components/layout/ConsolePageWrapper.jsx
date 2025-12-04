import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * ConsolePageWrapper - A unified wrapper component for all console pages
 * Provides consistent background styling with glass-morphism effects
 * and proper dark mode support across all console pages.
 */
const ConsolePageWrapper = ({
  children,
  className = '',
  noPadding = false,
  noBackground = false
}) => {
  return (
    <motion.div
      className={`mt-16 ${noPadding ? '' : 'px-4 pb-12'} ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {noBackground ? (
        children
      ) : (
        <motion.div
          className='relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-6 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl'
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          {/* Decorative gradient blurs - darker for black theme */}
          <div className='pointer-events-none absolute -top-32 right-[-120px] h-60 w-60 rounded-full bg-indigo-500/15 blur-[140px]' />
          <div className='pointer-events-none absolute -bottom-32 left-[-110px] h-56 w-56 rounded-full bg-sky-500/10 blur-[140px]' />
          <div className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-purple-500/5 blur-[180px]' />
          <div className='relative'>
            {children}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

ConsolePageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noPadding: PropTypes.bool,
  noBackground: PropTypes.bool,
};

export default ConsolePageWrapper;