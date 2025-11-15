

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Dropdown, Typography } from '@douyinfe/semi-ui';
import { ChevronDown } from 'lucide-react';
import {
  IconExit,
  IconUserSetting,
  IconCreditCard,
  IconKey,
} from '@douyinfe/semi-icons';
import { stringToColor } from '../../../helpers/index.js';
import SkeletonWrapper from '../components/SkeletonWrapper';

const UserArea = ({
  userState,
  isLoading,
  isMobile,
  isSelfUseMode,
  logout,
  navigate,
  t,
}) => {
  const dropdownRef = useRef(null);
  if (isLoading) {
    return (
      <SkeletonWrapper
        loading={true}
        type='userArea'
        width={50}
        isMobile={isMobile}
      />
    );
  }

  if (userState.user) {
    return (
      <div className='relative' ref={dropdownRef}>
        <Dropdown
          position='bottomRight'
          getPopupContainer={() => document.body}
          render={
            <Dropdown.Menu className='!bg-white/20 dark:!bg-black/20 !backdrop-blur-2xl !border !border-white/30 dark:!border-white/20 !shadow-2xl !rounded-2xl !py-2 z-[9999] transition-all duration-300 hover:!backdrop-blur-3xl hover:!bg-white/30 dark:hover:!bg-black/30'>
              <Dropdown.Item
                onClick={() => {
                  navigate('/console/personal');
                }}
                className='!px-4 !py-2.5 !text-sm !text-white/90 dark:!text-white/90 hover:!bg-white/20 dark:hover:!bg-white/10 mx-2 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:backdrop-blur-sm'
              >
                <div className='flex items-center gap-3'>
                  <IconUserSetting
                    size='small'
                    className='text-white/70 dark:!text-white/70'
                  />
                  <span>{t('个人设置')}</span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate('/console/token');
                }}
                className='!px-4 !py-2.5 !text-sm !text-white/90 dark:!text-white/90 hover:!bg-white/20 dark:hover:!bg-white/10 mx-2 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:backdrop-blur-sm'
              >
                <div className='flex items-center gap-3'>
                  <IconKey
                    size='small'
                    className='text-white/70 dark:!text-white/70'
                  />
                  <span>{t('令牌管理')}</span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate('/console/topup');
                }}
                className='!px-4 !py-2.5 !text-sm !text-white/90 dark:!text-white/90 hover:!bg-white/20 dark:hover:!bg-white/10 mx-2 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:backdrop-blur-sm'
              >
                <div className='flex items-center gap-3'>
                  <IconCreditCard
                    size='small'
                    className='text-white/70 dark:!text-white/70'
                  />
                  <span>{t('钱包管理')}</span>
                </div>
              </Dropdown.Item>
              <div className='!my-2 !mx-4 !border-t !border-white/30 dark:!border-white/30'></div>
              <Dropdown.Item
                onClick={logout}
                className='!px-4 !py-2.5 !text-sm !text-red-300 dark:!text-red-300 hover:!bg-red-500/20 dark:hover:!bg-red-500/30 mx-2 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:backdrop-blur-sm'
              >
                <div className='flex items-center gap-3'>
                  <IconExit
                    size='small'
                    className='text-red-300 dark:!text-red-300'
                  />
                  <span>{t('退出')}</span>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <Button
            theme='borderless'
            type='tertiary'
            className='flex items-center gap-2 !px-3 !py-1.5 !rounded-xl transition-all duration-300 hover:!bg-white/20 dark:hover:!bg-white/10 hover:scale-105 !text-white/90 dark:!text-white/90 hover:backdrop-blur-sm hover:shadow-md border border-white/20 dark:border-white/20'
          >
            <Avatar
              size='extra-small'
              color={stringToColor(userState.user.username)}
              className='border-2 border-white/50 shadow-lg transition-all duration-300 hover:scale-110'
            >
              {userState.user.username[0].toUpperCase()}
            </Avatar>
            <span className='hidden sm:inline text-sm font-medium'>
              {userState.user.username}
            </span>
            <ChevronDown
              size={13}
              className='text-white/70 dark:!text-white/70 transition-transform duration-300 group-hover:rotate-180'
            />
          </Button>
        </Dropdown>
      </div>
    );
  } else {
    const showRegisterButton = !isSelfUseMode;

    const commonSizingAndLayoutClass =
      'flex items-center justify-center !py-[10px] !px-1.5';

    const loginButtonSpecificStyling =
      '!bg-semi-color-fill-0 dark:!bg-semi-color-fill-1 hover:!bg-semi-color-fill-1 dark:hover:!bg-gray-700 transition-colors';
    let loginButtonClasses = `${commonSizingAndLayoutClass} ${loginButtonSpecificStyling}`;

    let registerButtonClasses = `${commonSizingAndLayoutClass}`;

    const loginButtonTextSpanClass =
      '!text-xs !text-semi-color-text-1 dark:!text-gray-300 !p-1.5';
    const registerButtonTextSpanClass = '!text-xs !text-white !p-1.5';

    if (showRegisterButton) {
      if (isMobile) {
        loginButtonClasses += ' !rounded-full';
      } else {
        loginButtonClasses += ' !rounded-l-full !rounded-r-none';
      }
      registerButtonClasses += ' !rounded-r-full !rounded-l-none';
    } else {
      loginButtonClasses += ' !rounded-full';
    }

    return (
      <div className='flex items-center'>
        <Link to='/login' className='flex'>
          <Button
            theme='borderless'
            type='tertiary'
            className={loginButtonClasses}
          >
            <span className={loginButtonTextSpanClass}>{t('登录')}</span>
          </Button>
        </Link>
        {showRegisterButton && (
          <div className='hidden md:block'>
            <Link to='/register' className='flex -ml-px'>
              <Button
                theme='solid'
                type='primary'
                className={registerButtonClasses}
              >
                <span className={registerButtonTextSpanClass}>{t('注册')}</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
};

export default UserArea;
