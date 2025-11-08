import React from 'react';
import { Card } from '@douyinfe/semi-ui';

// Wrapper for Semi UI Card that adds glass effect
const GlassCard = ({ className = '', children, ...props }) => {
  const glassClasses = `bg-white/10 border border-white/20 backdrop-blur-xl ${className}`;
  return (
    <Card 
      className={glassClasses} 
      bodyStyle={{ padding: 0 }}
      {...props}
    >
      {children}
    </Card>
  );
};

const GlassCardHeader = ({ className = '', children, ...props }) => {
  const headerClasses = `flex items-center gap-2 px-6 py-4 border-b border-white/20 ${className}`;
  return (
    <div className={headerClasses} {...props}>
      {children}
    </div>
  );
};

const GlassCardContent = ({ className = '', children, ...props }) => {
  const contentClasses = `p-0 ${className}`;
  return (
    <div className={contentClasses} {...props}>
      {children}
    </div>
  );
};

export { GlassCard as Card, GlassCardHeader as CardHeader, GlassCardContent as CardContent };