

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

  const sendCode = async (code, state) => {
    try {
      const { data: resData } = await API.get(
        `/api/oauth/${props.type}?code=${code}&state=${state}`,
      );

      const { success, message, data } = resData;

      if (!success) {
        throw new Error(message || 'OAuth2 callback error');
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
      showError(error.message || t('Authorization failed'));
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
