import React from 'react';
import { Tag } from '@douyinfe/semi-ui';

// Modern glass effect badge component with skiper-ui-clone design
const GlassBadge = ({ variant = 'default', className = '', children, ...props }) => {
  let variantClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-xl ';
  
  switch (variant) {
    case 'secondary':
      variantClasses += 'border-transparent bg-white/20 text-white hover:bg-white/30 backdrop-blur-xl';
      break;
    case 'destructive':
      variantClasses += 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80';
      break;
    case 'outline':
      variantClasses += 'border-white/30 text-foreground bg-transparent';
      break;
    default:
      variantClasses += 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80';
  }

  const badgeClasses = `${variantClasses} ${className}`;
  return (
    <Tag 
      className={badgeClasses}
      color="white"
      {...props}
    >
      {children}
    </Tag>
  );
};

export { GlassBadge as Badge };