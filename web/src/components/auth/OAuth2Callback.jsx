

import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  API,
  showError,
  showSuccess,
  updateAPI,
  setUserData,
} from '@/helpers';
import { UserContext } from '../../context/User';
import Loading from '../common/ui/Loading';

const OAuth2Callback = (props) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [, userDispatch] = useContext(UserContext);
  const navigate = useNavigate();

  // 最大重试次数
  const MAX_RETRIES = 3;

  const sendCode = async (code, state, retry = 0) => {
    try {
      const { data: resData } = await API.get(
        `/api/oauth/${props.type}?code=${code}&state=${state}`,
      );

      const { success, message, data } = resData;

      if (!success) {
        // Translate common Chinese error messages to English
        let errorMessage = message || 'OAuth2 callback error';
        
        if (errorMessage.includes('已被绑定')) {
          errorMessage = 'This account has already been linked to another user';
        } else if (errorMessage.includes('用户字段为空')) {
          errorMessage = 'Failed to retrieve user information. Please try again later';
        } else if (errorMessage.includes('管理员未开启')) {
          errorMessage = 'OAuth login is not enabled by the administrator';
        } else if (errorMessage.includes('管理员关闭了新用户注册')) {
          errorMessage = 'New user registration is disabled by the administrator';
        } else if (errorMessage.includes('用户已被封禁')) {
          errorMessage = 'This user account has been banned';
        } else if (errorMessage.includes('用户已注销')) {
          errorMessage = 'This user account has been deleted';
        } else if (errorMessage.includes('state is empty or not same')) {
          errorMessage = 'Invalid OAuth state. Please try logging in again';
        }
        
        throw new Error(errorMessage);
      }

      if (message === 'bind') {
        showSuccess(t('Account linked successfully!'));
        navigate('/console/personal');
      } else {
        // Ensure user data has proper structure
        const userData = {
          ...data,
          id: data.Id || data.id,
          username: data.Username || data.username,
          role: data.Role || data.role
        };
        
        userDispatch({ type: 'login', payload: userData });
        localStorage.setItem('user', JSON.stringify(userData));
        setUserData(userData);
        updateAPI();
        showSuccess(t('Login successful!'));
        navigate('/console/token');
      }
    } catch (error) {
      // Don't retry on specific errors
      const noRetryErrors = [
        '已被绑定',
        'already been linked',
        '管理员未开启',
        'not enabled',
        '管理员关闭',
        'disabled',
        '用户已被封禁',
        'banned',
        '用户已注销',
        'deleted',
        'state is empty'
      ];
      
      const shouldRetry = !noRetryErrors.some(err =>
        error.message.toLowerCase().includes(err.toLowerCase())
      );
      
      if (shouldRetry && retry < MAX_RETRIES) {
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, (retry + 1) * 2000));
        return sendCode(code, state, retry + 1);
      }

      // Show error and redirect
      showError(error.message || t('Authorization failed'));
      
      // Redirect to login page after showing error
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    // 参数缺失直接返回
    if (!code) {
      showError(t('未获取到授权码'));
      navigate('/console/personal');
      return;
    }

    sendCode(code, state);
  }, []);

  return <Loading />;
};

export default OAuth2Callback;
