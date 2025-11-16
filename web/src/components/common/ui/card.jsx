import React from 'react';
import { Card as SemiCard } from '@douyinfe/semi-ui-19';

// GlassCard component with enhanced styling and functionality
const GlassCard = ({ 
  className = '', 
  children, 
  variant = 'default', // 'default', 'primary', 'secondary', 'accent'
  size = 'default', // 'small', 'default', 'large'
  elevated = false, // adds more shadow
  ...props 
}) => {
  // Determine base classes based on variant and size
  const variantClasses = {
    default: 'bg-white/10 border border-white/20',
    primary: 'bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/30',
    secondary: 'bg-gradient-to-br from-gray-500/10 to-gray-700/10 border border-gray-500/30',
    accent: 'bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30',
  };
  
  const sizeClasses = {
    small: 'p-3',
    default: 'p-4',
    large: 'p-6',
  };
  
  const elevationClasses = elevated 
    ? 'shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15' 
    : '';
  
  const glassClasses = `
    ${variantClasses[variant]} 
    backdrop-blur-xl 
    ${sizeClasses[size]} 
    ${elevationClasses} 
    ${className}
  `.trim();
  
  return (
    <SemiCard
      className={glassClasses}
      bodyStyle={{ padding: 0 }}
      {...props}
    >
      {children}
    </SemiCard>
  );
};

// GlassCardHeader with enhanced styling
const GlassCardHeader = ({ 
  className = '', 
  children, 
  borderBottom = true, // controls border visibility
  ...props 
}) => {
  const headerClasses = `
    flex items-center gap-2 
    px-6 py-4 
    ${borderBottom ? 'border-b border-white/20' : ''} 
    ${className}
  `.trim();
  return (
    <div className={headerClasses} {...props}>
      {children}
    </div>
  );
};

// GlassCardTitle for consistent title styling
const GlassCardTitle = ({ 
  className = '', 
  children, 
  ...props 
}) => {
  const titleClasses = `
    text-lg font-semibold text-white 
    ${className}
  `.trim();
  return (
    <h3 className={titleClasses} {...props}>
      {children}
    </h3>
  );
};

// GlassCardDescription for consistent description styling
const GlassCardDescription = ({ 
  className = '', 
  children, 
  ...props 
}) => {
  const descriptionClasses = `
    text-sm text-white/70 
    ${className}
  `.trim();
  return (
    <p className={descriptionClasses} {...props}>
      {children}
    </p>
  );
};

// GlassCardContent with consistent padding options
const GlassCardContent = ({ 
  className = '', 
  children, 
  padding = 'default', // 'none', 'small', 'default', 'large'
  ...props 
}) => {
  const paddingClasses = {
    none: 'p-0',
    small: 'p-3',
    default: 'p-4',
    large: 'p-6',
  };
  
  const contentClasses = `
    ${paddingClasses[padding]} 
    ${className}
  `.trim();
  return (
    <div className={contentClasses} {...props}>
      {children}
    </div>
  );
};

// GlassCardFooter with consistent styling
const GlassCardFooter = ({ 
  className = '', 
  children, 
  borderTop = true, // controls border visibility
  ...props 
}) => {
  const footerClasses = `
    flex items-center gap-2 
    px-6 py-4 
    ${borderTop ? 'border-t border-white/20' : ''} 
    ${className}
  `.trim();
  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  );
};

// GlassCardAction for consistent action button styling
const GlassCardAction = ({ 
  className = '', 
  children, 
  variant = 'default', // 'default', 'primary', 'secondary', 'ghost'
  size = 'default', // 'small', 'default', 'large'
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-white/20 hover:bg-white/30 text-white border border-white/30',
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    ghost: 'hover:bg-white/20 text-white',
  };
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  
  const actionClasses = `
    inline-flex items-center justify-center gap-2 
    rounded-lg transition-colors 
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();
  
  return (
    <button className={actionClasses} {...props}>
      {children}
    </button>
  );
};

export { 
  GlassCard as Card, 
  GlassCardHeader as CardHeader, 
  GlassCardTitle as CardTitle,
  GlassCardDescription as CardDescription,
  GlassCardContent as CardContent,
  GlassCardFooter as CardFooter,
  GlassCardAction as CardAction
};