import React from 'react';
import { Button as SemiButton } from '@douyinfe/semi-ui-19';

// Modern glass effect button component with skiper-ui-clone design
const GlassButton = ({ variant = 'primary', size = 'default', className = '', children, ...props }) => {
  let variantClasses = 'transition-all duration-300 ease-in-out ';
  
  switch (variant) {
    case 'outline':
      variantClasses += 'bg-transparent border border-white/30 text-white hover:bg-white/10 backdrop-blur-xl';
      break;
    case 'secondary':
      variantClasses += 'bg-white/20 border border-white/30 text-white hover:bg-white/30 backdrop-blur-xl';
      break;
    case 'ghost':
      variantClasses += 'bg-transparent border border-transparent text-white hover:bg-white/10 backdrop-blur-xl';
      break;
    case 'link':
      variantClasses += 'bg-transparent border border-transparent text-primary hover:underline hover:text-primary/80 backdrop-blur-xl';
      break;
    default:
      variantClasses += 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] hover:opacity-90 backdrop-blur-xl hover:shadow-[0px_4px_0px_0px_rgba(255,255,255,0.4)_inset]';
  }

  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'h-8 px-3 text-xs rounded-full';
      break;
    case 'lg':
      sizeClasses = 'h-12 px-8 text-base rounded-full';
      break;
    case 'xl':
      sizeClasses = 'h-14 px-10 text-lg rounded-full';
      break;
    default:
      sizeClasses = 'h-10 px-6 text-sm rounded-full';
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