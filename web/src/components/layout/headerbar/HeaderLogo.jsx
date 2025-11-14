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
import { Link } from 'react-router-dom';
import { Typography, Tag } from '@douyinfe/semi-ui';
import SkeletonWrapper from '../components/SkeletonWrapper';

const HeaderLogo = ({
  isMobile,
  isConsoleRoute,
  logo,
  logoLoaded,
  isLoading,
  systemName,
  isSelfUseMode,
  isDemoSiteMode,
  t,
}) => {
  if (isMobile && isConsoleRoute) {
    return null;
  }

  const fallbackInitial = systemName ? systemName.charAt(0).toUpperCase() : 'K';
  const showBadge = (isSelfUseMode || isDemoSiteMode) && !isLoading;

  return (
    <Link to='/' className='glass-brand' aria-label={systemName || 'Home'}>
      <div className='glass-brand__icon-wrapper'>
        <div className='glass-brand__icon-glow' aria-hidden='true' />
        <SkeletonWrapper loading={isLoading || !logoLoaded} type='image' />
        {logo ? (
          <img
            src={logo}
            alt={systemName || 'logo'}
            className={`glass-brand__image ${!isLoading && logoLoaded ? 'is-visible' : ''}`}
          />
        ) : (
          <div className='glass-brand__fallback'>{fallbackInitial}</div>
        )}
      </div>

      <div className='glass-brand__meta'>
        <SkeletonWrapper loading={isLoading} type='title' width={120} height={24}>
          <Typography.Title heading={5} className='glass-brand__title'>
            {systemName}
          </Typography.Title>
        </SkeletonWrapper>

        {showBadge && (
          <Tag
            color={isSelfUseMode ? 'purple' : 'blue'}
            className='glass-brand__badge'
            size='small'
            shape='circle'
          >
            {isSelfUseMode ? t('Private deployment') : t('Demo environment')}
          </Tag>
        )}
      </div>
    </Link>
  );
};

export default HeaderLogo;
