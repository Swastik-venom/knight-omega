import React from 'react';
import { useActualTheme } from '../../context/Theme';

const LandingBackground = ({ children, variant = 'default' }) => {
  const actualTheme = useActualTheme();
  const isDark = actualTheme === 'dark';

  const variants = {
    default: {
      light: 'bg-gradient-to-b from-[#f8faff] via-[#eef3ff] to-[#f8faff]',
      dark: 'bg-gradient-to-b from-[#111627] via-[#0b1328] to-[#111627]',
    },
    hero: {
      light: 'bg-gradient-to-br from-[#f8faff] via-[#eef3ff] to-[#e8f0ff]',
      dark: 'bg-gradient-to-br from-[#111627] via-[#0b1328] to-[#0a1020]',
    },
    feature: {
      light: 'bg-gradient-to-b from-[#eef3ff] via-[#f8faff] to-[#eef3ff]',
      dark: 'bg-gradient-to-b from-[#0b1328] via-[#111627] to-[#0b1328]',
    },
  };

  const currentVariant = variants[variant] || variants.default;
  const gradientClass = isDark ? currentVariant.dark : currentVariant.light;

  return (
    <div className={`relative min-h-screen ${gradientClass} transition-colors duration-500`}>
      {/* Animated gradient orbs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Primary orb - top right */}
        <div
          className='absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30 blur-3xl animate-pulse'
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(95, 111, 255, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(136, 164, 255, 0.3) 0%, transparent 70%)',
            animationDuration: '8s',
          }}
        />
        
        {/* Secondary orb - bottom left */}
        <div
          className='absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-25 blur-3xl animate-pulse'
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(76, 224, 255, 0.35) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(188, 232, 255, 0.25) 0%, transparent 70%)',
            animationDuration: '10s',
            animationDelay: '2s',
          }}
        />
        
        {/* Tertiary orb - center */}
        <div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse'
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%)',
            animationDuration: '12s',
            animationDelay: '4s',
          }}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className='absolute inset-0 opacity-[0.03] pointer-events-none'
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className='relative z-10'>{children}</div>
    </div>
  );
};

export default LandingBackground;