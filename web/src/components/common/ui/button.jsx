import React from 'react';
import { Button as SemiButton } from '@douyinfe/semi-ui';

// Glass effect button component
const GlassButton = ({ variant = 'primary', size = 'default', className = '', children, ...props }) => {
  let variantClasses = '';
  
  switch (variant) {
    case 'outline':
      variantClasses = 'border border-white/30 text-white hover:bg-white/20 backdrop-blur-xl';
      break;
    case 'secondary':
      variantClasses = 'bg-white/20 border border-white/30 text-white hover:bg-white/30 backdrop-blur-xl';
      break;
    case 'ghost':
      variantClasses = 'bg-transparent border border-transparent text-white hover:bg-white/10 backdrop-blur-xl';
      break;
    default:
      variantClasses = 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 backdrop-blur-xl';
  }

  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'h-8 px-3 text-xs';
      break;
    case 'lg':
      sizeClasses = 'h-12 px-8 text-base';
      break;
    default:
      sizeClasses = 'h-9 px-4 text-sm';
  }

  const glassClasses = `${variantClasses} ${sizeClasses} ${className}`;
  return (
    <SemiButton 
      className={glassClasses}
      type="tertiary"
      {...props}
    >
      {children}
    </SemiButton>
  );
};

export { GlassButton as Button };