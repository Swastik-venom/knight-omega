/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React from 'react';
import { Spin } from '@douyinfe/semi-ui';

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