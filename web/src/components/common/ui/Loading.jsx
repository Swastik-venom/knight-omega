

import React from 'react';
import { Spin } from '@douyinfe/semi-ui-19';

const Loading = ({ 
  size = 'small', 
  fullScreen = true,
  className = '',
  wrapperClassName = '',
  spinning = true,
  tip = null,
  children = null
}) => {
  const wrapperClasses = fullScreen 
    ? `fixed inset-0 w-screen h-screen flex items-center justify-center bg-black/10 z-[9999] ${wrapperClassName}`
    : `flex items-center justify-center ${wrapperClassName}`;

  const spinnerClasses = `text-blue-500 ${className}`;

  return (
    <div className={wrapperClasses}>
      <Spin 
        size={size} 
        spinning={spinning}
        tip={tip}
        className={spinnerClasses}
      >
        {children}
      </Spin>
    </div>
  );
};

export default Loading;