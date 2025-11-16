import React from 'react';
import { Empty } from '@douyinfe/semi-ui-19';

// Glass effect empty component
const GlassEmpty = ({ title, description, className = '', ...props }) => {
  const glassClasses = `bg-white/10 border border-white/20 backdrop-blur-xl rounded-xl p-8 text-center ${className}`;
  
  return (
    <div className={glassClasses}>
      <Empty 
        className="flex flex-col items-center justify-center"
        {...props}
      >
        <div className="text-center">
          <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
          <p className="text-white/60">{description}</p>
        </div>
      </Empty>
    </div>
  );
};

export { GlassEmpty as Empty };