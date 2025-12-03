import React from 'react';
import PropTypes from 'prop-types';

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
    <div className={`mt-16 ${noPadding ? '' : 'px-4 pb-12'} ${className}`}>
      {noBackground ? (
        children
      ) : (
        <div className='relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_32px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_32px_80px_rgba(15,23,42,0.45)]'>
          {/* Decorative gradient blurs */}
          <div className='pointer-events-none absolute -top-32 right-[-120px] h-60 w-60 rounded-full bg-indigo-200/60 blur-[140px] dark:bg-indigo-500/30' />
          <div className='pointer-events-none absolute -bottom-32 left-[-110px] h-56 w-56 rounded-full bg-sky-200/55 blur-[140px] dark:bg-sky-500/25' />
          <div className='relative'>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

ConsolePageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noPadding: PropTypes.bool,
  noBackground: PropTypes.bool,
};

export default ConsolePageWrapper;