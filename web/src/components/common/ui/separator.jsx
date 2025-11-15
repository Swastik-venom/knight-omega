import React from 'react';

// Glass effect separator component
const GlassSeparator = ({ orientation = 'horizontal', className = '', ...props }) => {
  const baseClasses = 'bg-white/20';
  const orientationClasses = orientation === 'horizontal' 
    ? 'h-px w-full' 
    : 'h-full w-px';
  
  const separatorClasses = `${baseClasses} ${orientationClasses} ${className}`;
  
  return (
    <div 
      className={separatorClasses}
      {...props}
    />
  );
};

export { GlassSeparator as Separator };