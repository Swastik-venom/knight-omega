import React from 'react';
import { Tag } from '@douyinfe/semi-ui';

// Glass effect badge component
const GlassBadge = ({ variant = 'default', className = '', children, ...props }) => {
  let variantClasses = 'backdrop-blur-xl';
  
  switch (variant) {
    case 'secondary':
      variantClasses += ' bg-white/20 border border-white/30 text-white';
      break;
    case 'destructive':
      variantClasses += ' bg-red-500/20 border border-red-500/30 text-red-100';
      break;
    case 'outline':
      variantClasses += ' border border-white/30 text-white';
      break;
    default:
      variantClasses += ' bg-white/20 border border-white/30 text-white';
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