

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../context/User';
import {
  API,
  getLogo,
  showError,
  showInfo,
  showSuccess,
  updateAPI,
  getSystemName,
  setUserData,
  onGitHubOAuthClicked,
  onDiscordOAuthClicked,
  onOIDCClicked,
  onLinuxDOOAuthClicked,
  prepareCredentialRequestOptions,
  buildAssertionResult,
  isPasskeySupported,
} from '@/helpers';
import Turnstile from 'react-turnstile';
import { Button, Card, Checkbox, Divider, Form, Icon, Modal } from '@douyinfe/semi-ui-19';
import Title from '@douyinfe/semi-ui-19/lib/es/typography/title';
import TelegramLoginButton from 'react-telegram-login';

import {
  IconGithubLogo,
  IconMail,
  IconLock,
  IconKey,
} from '@douyinfe/semi-icons';
import OIDCIcon from '../common/logo/OIDCIcon';
import WeChatIcon from '../common/logo/WeChatIcon';
import LinuxDoIcon from '../common/logo/LinuxDoIcon';
import TwoFAVerification from './TwoFAVerification';
import AuthFooter from './AuthFooter';
import { useTranslation } from 'react-i18next';
import { SiDiscord } from 'react-icons/si';

const LoginForm = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    wechat_verification_code: '',
  });
  const { username, password } = inputs;
  const [searchParams, setSearchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [userState, userDispatch] = useContext(UserContext);
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [showWeChatLoginModal, setShowWeChatLoginModal] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [wechatLoading, setWechatLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);
  const [oidcLoading, setOidcLoading] = useState(false);
  const [linuxdoLoading, setLinuxdoLoading] = useState(false);
  const [emailLoginLoading, setEmailLoginLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [otherLoginOptionsLoading, setOtherLoginOptionsLoading] =
    useState(false);
  const [wechatCodeSubmitLoading, setWechatCodeSubmitLoading] = useState(false);
  const [showTwoFA, setShowTwoFA] = useState(false);
  const [passkeySupported, setPasskeySupported] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [hasUserAgreement, setHasUserAgreement] = useState(false);
  const [hasPrivacyPolicy, setHasPrivacyPolicy] = useState(false);
  const [githubButtonText, setGithubButtonText] = useState('使用 GitHub 继续');
  const [githubButtonDisabled, setGithubButtonDisabled] = useState(false);
  const githubTimeoutRef = useRef(null);

  const logo = getLogo();
  const systemName = getSystemName();
  const heroHighlights = [
    { label: 'Live latency', value: '<120ms' },
    { label: 'Global regions', value: '12' },
    { label: 'Active teams', value: '8K+' },
  ];

  let affCode = new URLSearchParams(window.location.search).get('aff');
  if (affCode) {
    localStorage.setItem('aff', affCode);
  }

  const [status] = useState(() => {
    const savedStatus = localStorage.getItem('status');
    return savedStatus ? JSON.parse(savedStatus) : {};
  });

  // Load Turnstile configuration and agreement settings from status
  useEffect(() => {
    if (status.turnstile_check) {
      setTurnstileEnabled(true);
      setTurnstileSiteKey(status.turnstile_site_key);
    }
    
    setHasUserAgreement(status.user_agreement_enabled || false);
    setHasPrivacyPolicy(status.privacy_policy_enabled || false);
  }, [status]);

  useEffect(() => {
    isPasskeySupported()
      .then(setPasskeySupported)
      .catch(() => setPasskeySupported(false));

    return () => {
      if (githubTimeoutRef.current) {
        clearTimeout(githubTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (searchParams.get('expired')) {
      showError(t('You are not logged in or your session has expired, please sign in again.'));
    }
  }, []);

  const onWeChatLoginClicked = () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      showInfo(t('Please read and agree to the Terms of Service and Privacy Policy first.'));
      return;
    }
    setWechatLoading(true);
    setShowWeChatLoginModal(true);
    setWechatLoading(false);
  };

  const onSubmitWeChatVerificationCode = async () => {
    if (turnstileEnabled && turnstileToken === '') {
      showInfo('Please wait a moment - Turnstile is verifying your environment.');
      return;
    }
    setWechatCodeSubmitLoading(true);
    try {
      const res = await API.get(
        `/api/oauth/wechat?code=${inputs.wechat_verification_code}`,
      );
      const { success, message, data } = res.data;
      if (success) {
        userDispatch({ type: 'login', payload: data });
        localStorage.setItem('user', JSON.stringify(data));
        setUserData(data);
        updateAPI();
        navigate('/');
        showSuccess('Signed in successfully!');
        setShowWeChatLoginModal(false);
      } else {
      showError(message);
      }
    } catch (error) {
      showError('Sign in failed, please try again.');
    } finally {
      setWechatCodeSubmitLoading(false);
    }
  };

  function handleChange(name, value) {
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  async function handleSubmit(e) {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      showInfo(t('Please read and agree to the Terms of Service and Privacy Policy first.'));
      return;
    }
    if (turnstileEnabled && turnstileToken === '') {
      showInfo('Please wait a moment - Turnstile is verifying your environment.');
      return;
    }
    setSubmitted(true);
    setLoginLoading(true);
    try {
      if (username && password) {
        const res = await API.post(
          `/api/user/login?turnstile=${turnstileToken}`,
          {
            username,
            password,
          },
        );
        const { success, message, data } = res.data;
        if (success) {
          // If 2FA is required, show the verification modal
          if (data && data.require_2fa) {
            setShowTwoFA(true);
            setLoginLoading(false);
            return;
          }

          userDispatch({ type: 'login', payload: data });
          setUserData(data);
          updateAPI();
          showSuccess('Signed in successfully!');
          if (username === 'root' && password === '123456') {
            Modal.error({
              title: 'You are using the default password!',
              content: 'Please change the default password immediately!',
              centered: true,
            });
          }
          navigate('/console');
        } else {
          showError(message);
        }
      } else {
        showError('Please enter your username and password.');
      }
    } catch (error) {
      showError('Sign in failed, please try again.');
    } finally {
      setLoginLoading(false);
    }
  }

  // Telegram login handler
  const onTelegramLoginClicked = async (response) => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      showInfo(t('Please read and agree to the Terms of Service and Privacy Policy first.'));
      return;
    }
    const fields = [
      'id',
      'first_name',
      'last_name',
      'username',
      'photo_url',
      'auth_date',
      'hash',
      'lang',
    ];
    const params = {};
    fields.forEach((field) => {
      if (response[field]) {
        params[field] = response[field];
      }
    });
    try {
      const res = await API.get(`/api/oauth/telegram/login`, { params });
      const { success, message, data } = res.data;
      if (success) {
        userDispatch({ type: 'login', payload: data });
        localStorage.setItem('user', JSON.stringify(data));
        showSuccess('Signed in successfully!');
        setUserData(data);
        updateAPI();
        navigate('/');
      } else {
        showError(message);
      }
    } catch (error) {
      showError('Sign in failed, please try again.');
    }
  };

  // GitHub login handler
  const handleGitHubClick = () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      showInfo(t('Please read and agree to the Terms of Service and Privacy Policy first.'));
      return;
    }
    if (githubButtonDisabled) {
      return;
    }
    setGithubLoading(true);
    setGithubButtonDisabled(true);
    setGithubButtonText(t('正在跳转 GitHub...'));
    if (githubTimeoutRef.current) {
      clearTimeout(githubTimeoutRef.current);
    }
    githubTimeoutRef.current = setTimeout(() => {
      setGithubLoading(false);
      setGithubButtonText(t('请求超时，请刷新页面后重新发起 GitHub 登录'));
      setGithubButtonDisabled(true);
    }, 20000);
    try {
      onGitHubOAuthClicked(status.github_client_id, { shouldLogout: true });
    } finally {
      // This won't execute due to the redirect, included for completeness
      setTimeout(() => setGithubLoading(false), 3000);
    }
  };

  // 包装的Discord登录点击处理
  const handleDiscordClick = () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      showInfo(t('请先阅读并同意用户协议和隐私政策'));
      return;
    }
    setDiscordLoading(true);
    try {
      onDiscordOAuthClicked(status.discord_client_id, { shouldLogout: true });
    } finally {
      // 由于重定向，这里不会执行到，但为了完整性添加
      setTimeout(() => setDiscordLoading(false), 3000);
    }
  };

  // OIDC login handler
  const handleOIDCClick = () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      showInfo(t('Please read and agree to the Terms of Service and Privacy Policy first.'));
      return;
    }
    setOidcLoading(true);
    try {
      onOIDCClicked(
        status.oidc_authorization_endpoint,
        status.oidc_client_id,
        false,
        { shouldLogout: true },
      );
    } finally {
      // This won't execute due to the redirect, included for completeness
      setTimeout(() => setOidcLoading(false), 3000);
    }
  };

  // LinuxDO login handler
  const handleLinuxDOClick = () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      showInfo(t('Please read and agree to the Terms of Service and Privacy Policy first.'));
      return;
    }
    setLinuxdoLoading(true);
    try {
      onLinuxDOOAuthClicked(status.linuxdo_client_id, { shouldLogout: true });
    } finally {
      // This won't execute due to the redirect, included for completeness
      setTimeout(() => setLinuxdoLoading(false), 3000);
    }
  };

  // Email login option handler
  const handleEmailLoginClick = () => {
    setEmailLoginLoading(true);
    setShowEmailLogin(true);
    setEmailLoginLoading(false);
  };

  const handlePasskeyLogin = async () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      showInfo(t('Please read and agree to the Terms of Service and Privacy Policy first.'));
      return;
    }
    if (!passkeySupported) {
      showInfo('Passkey sign-in is not available in this environment.');
      return;
    }
    if (!window.PublicKeyCredential) {
      showInfo('Your browser does not support Passkey.');
      return;
    }

    setPasskeyLoading(true);
    try {
      const beginRes = await API.post('/api/user/passkey/login/begin');
      const { success, message, data } = beginRes.data;
      if (!success) {
        showError(message || 'Unable to start Passkey sign-in.');
        return;
      }

      const publicKeyOptions = prepareCredentialRequestOptions(
        data?.options || data?.publicKey || data,
      );
      const assertion = await navigator.credentials.get({
        publicKey: publicKeyOptions,
      });
      const payload = buildAssertionResult(assertion);
      if (!payload) {
        showError('Passkey verification failed, please try again.');
        return;
      }

      const finishRes = await API.post(
        '/api/user/passkey/login/finish',
        payload,
      );
      const finish = finishRes.data;
      if (finish.success) {
        userDispatch({ type: 'login', payload: finish.data });
        setUserData(finish.data);
        updateAPI();
        showSuccess('Signed in successfully!');
        navigate('/console');
      } else {
        showError(finish.message || 'Passkey sign-in failed, please try again.');
      }
    } catch (error) {
      if (error?.name === 'AbortError') {
        showInfo('Passkey sign-in canceled.');
      } else {
        showError('Passkey sign-in failed, please try again.');
      }
    } finally {
      setPasskeyLoading(false);
    }
  };

  // Reset password handler
  const handleResetPasswordClick = () => {
    setResetPasswordLoading(true);
    navigate('/reset');
    setResetPasswordLoading(false);
  };

  // Other login options handler
  const handleOtherLoginOptionsClick = () => {
    setOtherLoginOptionsLoading(true);
    setShowEmailLogin(false);
    setOtherLoginOptionsLoading(false);
  };

  // 2FA success handler
  const handle2FASuccess = (data) => {
    userDispatch({ type: 'login', payload: data });
    setUserData(data);
    updateAPI();
    showSuccess('Signed in successfully!');
    navigate('/console');
  };

  // Reset login state
  const handleBackToLogin = () => {
    setShowTwoFA(false);
    setInputs({ username: '', password: '', wechat_verification_code: '' });
  };

  const renderOAuthOptions = () => {
    return (
      <div className='flex flex-col items-center'>
        <div className='w-full max-w-md'>
          <div className='flex items-center justify-center mb-6 gap-2'>
            <img src={logo} alt='Logo' className='h-10 rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-white/30 dark:bg-white/10' />
            <Title heading={3} className='!text-slate-900 dark:!text-white'>
              {systemName}
            </Title>
          </div>

          <Card className='border border-slate-200 !bg-white/95 !backdrop-blur-2xl !rounded-[28px] overflow-hidden !shadow-[0_25px_60px_rgba(15,23,42,0.15)] dark:border-white/15 dark:!bg-white/10'>
            <div className='flex justify-center pt-6 pb-2'>
              <Title heading={3} className='!text-slate-900 dark:!text-white'>
                {t('Sign In')}
              </Title>
            </div>
            <div className='relative px-6 py-8'>
              <div className='pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-br from-white/25 via-transparent to-white/10 opacity-80' />
              <div className='relative space-y-3'>
                {status.wechat_login && (
                  <Button
                    theme='solid'
                    className='w-full h-12 flex items-center justify-center !rounded-full !border-slate-200 !bg-white !text-slate-700 hover:!bg-slate-50 transition-all duration-300 dark:!border-white/20 dark:!bg-white/10 dark:!text-white dark:hover:!bg-white/20'
                    type='tertiary'
                    icon={
                      <Icon svg={<WeChatIcon />} style={{ color: '#07C160' }} />
                    }
                    onClick={onWeChatLoginClicked}
                    loading={wechatLoading}
                  >
                    <span className='ml-3'>{t('Continue with WeChat')}</span>
                  </Button>
                )}

                {status.github_oauth && (
                  <Button
                    theme='solid'
                    className='w-full h-12 flex items-center justify-center !rounded-full !border-slate-200 !bg-white !text-slate-700 hover:!bg-slate-50 transition-all duration-300 dark:!border-white/20 dark:!bg-white/10 dark:!text-white dark:hover:!bg-white/20'
                    type='tertiary'
                    icon={<IconGithubLogo size='large' />}
                    onClick={handleGitHubClick}
                    loading={githubLoading}
                    disabled={githubButtonDisabled}
                  >
                    <span className='ml-3'>{t('使用 GitHub 继续')}</span>
                  </Button>
                )}

                {status.discord_oauth && (
                  <Button
                    theme='outline'
                    className='w-full h-12 flex items-center justify-center !rounded-full border border-gray-200 hover:bg-gray-50 transition-colors'
                    type='tertiary'
                    icon={<SiDiscord style={{ color: '#5865F2', width: '20px', height: '20px' }} />}
                    onClick={handleDiscordClick}
                    loading={discordLoading}
                  >
                    <span className='ml-3'>{t('使用 Discord 继续')}</span>
                  </Button>
                )}

                {status.oidc_enabled && (
                  <Button
                    theme='solid'
                    className='w-full h-12 flex items-center justify-center !rounded-full !border-slate-200 !bg-white !text-slate-700 hover:!bg-slate-50 transition-all duration-300 dark:!border-white/20 dark:!bg-white/10 dark:!text-white dark:hover:!bg-white/20'
                    type='tertiary'
                    icon={<OIDCIcon style={{ color: '#1877F2' }} />}
                    onClick={handleOIDCClick}
                    loading={oidcLoading}
                  >
                    <span className='ml-3'>{t('Continue with OIDC')}</span>
                  </Button>
                )}

                {status.linuxdo_oauth && (
                  <Button
                    theme='solid'
                    className='w-full h-12 flex items-center justify-center !rounded-full !border-slate-200 !bg-white !text-slate-700 hover:!bg-slate-50 transition-all duration-300 dark:!border-white/20 dark:!bg-white/10 dark:!text-white dark:hover:!bg-white/20'
                    type='tertiary'
                    icon={
                      <LinuxDoIcon
                        style={{
                          color: '#E95420',
                          width: '20px',
                          height: '20px',
                        }}
                      />
                    }
                    onClick={handleLinuxDOClick}
                    loading={linuxdoLoading}
                  >
                    <span className='ml-3'>{t('Continue with LinuxDO')}</span>
                  </Button>
                )}

                {status.telegram_oauth && (
                  <div className='flex justify-center my-2'>
                    <TelegramLoginButton
                      dataOnauth={onTelegramLoginClicked}
                      botName={status.telegram_bot_name}
                    />
                  </div>
                )}

                {status.passkey_login && passkeySupported && (
                  <Button
                    theme='solid'
                    className='w-full h-12 flex items-center justify-center !rounded-full !border-slate-200 !bg-white !text-slate-700 hover:!bg-slate-50 transition-all duration-300 dark:!border-white/20 dark:!bg-white/10 dark:!text-white dark:hover:!bg-white/20'
                    type='tertiary'
                    icon={<IconKey size='large' />}
                    onClick={handlePasskeyLogin}
                    loading={passkeyLoading}
                  >
                    <span className='ml-3'>{t('Sign in with Passkey')}</span>
                  </Button>
                )}

                <Divider margin='12px' align='center' className='!border-slate-200 !text-slate-400 dark:!border-white/10 dark:!text-white/60'>
                  {t('OR')}
                </Divider>

                <Button
                  theme='solid'
                  type='primary'
                  className='w-full h-12 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white !rounded-full shadow-[0_15px_35px_rgba(99,102,241,0.35)] hover:opacity-90 transition-opacity'
                  icon={<IconMail size='large' />}
                  onClick={handleEmailLoginClick}
                  loading={emailLoginLoading}
                >
                  <span className='ml-3'>{t('Continue with Email or Username')}</span>
                </Button>
              </div>

              {(hasUserAgreement || hasPrivacyPolicy) && (
                <div className='mt-6 text-xs text-slate-600 dark:text-white/70'>
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className='text-slate-700 dark:text-white'
                  >
                    <span>
                      {t('I have read and agree to the')}
                      {hasUserAgreement && (
                        <>
                          <a
                            href='/user-agreement'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mx-1 text-slate-900 font-medium hover:text-slate-600 dark:text-white dark:hover:text-white/80'
                          >
                            {t('Terms of Service')}
                          </a>
                        </>
                      )}
                      {hasUserAgreement && hasPrivacyPolicy && t('and')}
                      {hasPrivacyPolicy && (
                        <>
                          <a
                            href='/privacy-policy'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mx-1 text-slate-900 font-medium hover:text-slate-600 dark:text-white dark:hover:text-white/80'
                          >
                            {t('Privacy Policy')}
                          </a>
                        </>
                      )}
                    </span>
                  </Checkbox>
                </div>
              )}

              {!status.self_use_mode_enabled && (
                <div className='mt-6 text-center text-sm text-slate-600 dark:text-white/70'>
                  {t("Don't have an account?")}{' '}
                  <Link
                    to='/register'
                    className='font-medium text-slate-900 hover:text-slate-600 dark:text-white dark:hover:text-white/80'
                  >
                    {t('Sign Up')}
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderEmailLoginForm = () => {
    return (
      <div className='flex flex-col items-center'>
        <div className='w-full max-w-md'>
          <div className='mb-6 flex items-center justify-center gap-2'>
            <img
              src={logo}
              alt='Logo'
              className='h-10 rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-white/30 dark:bg-white/10'
            />
            <Title heading={3} className='!text-slate-900 dark:!text-white'>
              {systemName}
            </Title>
          </div>

          <Card className='border border-slate-200 !bg-white/95 !backdrop-blur-2xl !rounded-[28px] overflow-hidden !shadow-[0_25px_60px_rgba(15,23,42,0.15)] dark:border-white/15 dark:!bg-white/10'>
            <div className='flex justify-center pt-6 pb-2'>
              <Title heading={3} className='!text-slate-900 dark:!text-white'>
                {t('Sign In')}
              </Title>
            </div>

            <div className='relative px-6 py-8'>
              <div className='pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-br from-white/45 via-transparent to-white/15 opacity-90 dark:from-white/25 dark:to-white/10' />

              {status.passkey_login && passkeySupported && (
                <Button
                  theme='solid'
                  type='tertiary'
                  className='mb-4 flex h-12 w-full items-center justify-center !rounded-full !border-slate-200 !bg-white !text-slate-700 hover:!bg-slate-50 transition-all duration-300 dark:!border-white/20 dark:!bg-white/10 dark:!text-white dark:hover:!bg-white/20'
                  icon={<IconKey size='large' />}
                  onClick={handlePasskeyLogin}
                  loading={passkeyLoading}
                >
                  <span className='ml-3'>{t('Sign in with Passkey')}</span>
                </Button>
              )}

              <Form className='relative space-y-3'>
                <Form.Input
                  field='username'
                  label={t('Username or Email')}
                  placeholder={t('Enter your username or email address')}
                  name='username'
                  onChange={(value) => handleChange('username', value)}
                  prefix={<IconMail />}
                  className='!text-slate-900 dark:!text-white'
                  style={{
                    background: 'rgba(248,250,252,0.92)',
                    borderColor: 'rgba(148,163,184,0.35)',
                    color: '#0f172a',
                  }}
                />

                <Form.Input
                  field='password'
                  label={t('Password')}
                  placeholder={t('Enter your password')}
                  name='password'
                  mode='password'
                  onChange={(value) => handleChange('password', value)}
                  prefix={<IconLock />}
                  className='!text-slate-900 dark:!text-white'
                  style={{
                    background: 'rgba(248,250,252,0.92)',
                    borderColor: 'rgba(148,163,184,0.35)',
                    color: '#0f172a',
                  }}
                />

                {(hasUserAgreement || hasPrivacyPolicy) && (
                  <div className='pt-4'>
                    <Checkbox
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className='text-slate-700 dark:text-white'
                    >
                      <span className='text-xs text-slate-600 sm:text-sm dark:text-white/70'>
                        {t('I have read and agree to the')}
                        {hasUserAgreement && (
                          <>
                            <a
                              href='/user-agreement'
                              target='_blank'
                              rel='noopener noreferrer'
                              className='mx-1 text-slate-900 font-medium hover:text-slate-600 dark:text-white dark:hover:text-white/80'
                            >
                              {t('Terms of Service')}
                            </a>
                          </>
                        )}
                        {hasUserAgreement && hasPrivacyPolicy && t('and')}
                        {hasPrivacyPolicy && (
                          <>
                            <a
                              href='/privacy-policy'
                              target='_blank'
                              rel='noopener noreferrer'
                              className='mx-1 text-slate-900 font-medium hover:text-slate-600 dark:text-white dark:hover:text-white/80'
                            >
                              {t('Privacy Policy')}
                            </a>
                          </>
                        )}
                      </span>
                    </Checkbox>
                  </div>
                )}

                <div className='space-y-2 pt-2'>
                  <Button
                    theme='solid'
                    className='w-full !rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-[0_15px_35px_rgba(99,102,241,0.35)] hover:opacity-90 transition-opacity'
                    type='primary'
                    htmlType='submit'
                    onClick={handleSubmit}
                    loading={loginLoading}
                    disabled={(hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms}
                  >
                    {t('Continue')}
                  </Button>

                  <Button
                    theme='borderless'
                    type='tertiary'
                    className='w-full !rounded-full !text-slate-600 hover:!text-slate-900 dark:!text-white/70 dark:hover:!text-white'
                    onClick={handleResetPasswordClick}
                    loading={resetPasswordLoading}
                  >
                    {t('Forgot password?')}
                  </Button>
                </div>
              </Form>

              {(status.github_oauth ||
                status.discord_oauth ||
                status.oidc_enabled ||
                status.wechat_login ||
                status.linuxdo_oauth ||
                status.telegram_oauth) && (
                <>
                  <Divider margin='12px' align='center' className='!border-slate-200 !text-slate-400 dark:!border-white/10 dark:!text-white/60'>
                    {t('OR')}
                  </Divider>

                  <div className='mt-4 text-center'>
                    <Button
                      theme='solid'
                      type='tertiary'
                      className='w-full !rounded-full !border-slate-200 !bg-white !text-slate-700 hover:!bg-slate-50 transition-all duration-300 dark:!border-white/20 dark:!bg-white/10 dark:!text-white dark:hover:!bg-white/20'
                      onClick={handleOtherLoginOptionsClick}
                      loading={otherLoginOptionsLoading}
                    >
                      {t('Other sign-in options')}
                    </Button>
                  </div>
                </>
              )}

              {!status.self_use_mode_enabled && (
                <div className='mt-6 text-center text-sm text-slate-600 dark:text-white/70'>
                  {t("Don't have an account?")}{' '}
                  <Link
                    to='/register'
                    className='font-medium text-slate-900 hover:text-slate-600 dark:text-white dark:hover:text-white/80'
                  >
                    {t('Sign Up')}
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  // WeChat login modal
  const renderWeChatLoginModal = () => {
    return (
      <Modal
        title={t('Sign in with WeChat QR code')}
        visible={showWeChatLoginModal}
        maskClosable={true}
        onOk={onSubmitWeChatVerificationCode}
        onCancel={() => setShowWeChatLoginModal(false)}
        okText={t('Sign In')}
        centered={true}
        okButtonProps={{
          loading: wechatCodeSubmitLoading,
        }}
      >
        <div className='flex flex-col items-center'>
          <img src={status.wechat_qrcode} alt='WeChat QR code' className='mb-4' />
        </div>

        <div className='text-center mb-4'>
          <p>
            {t('Scan the QR code with WeChat, then send "verification code" to receive a code (valid for 3 minutes).')}
          </p>
        </div>

        <Form>
          <Form.Input
            field='wechat_verification_code'
            placeholder={t('Verification code')}
            label={t('Verification code')}
            value={inputs.wechat_verification_code}
            onChange={(value) =>
              handleChange('wechat_verification_code', value)
            }
          />
        </Form>
      </Modal>
    );
  };

  // Two-factor modal
  const render2FAModal = () => {
    return (
      <Modal
        title={
          <div className='flex items-center'>
            <div className='w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3'>
              <svg
                className='w-4 h-4 text-green-600 dark:text-green-400'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M6 8a2 2 0 11-4 0 2 2 0 014 0zM8 7a1 1 0 100 2h8a1 1 0 100-2H8zM6 14a2 2 0 11-4 0 2 2 0 014 0zM8 13a1 1 0 100 2h8a1 1 0 100-2H8z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            {t('Two-factor verification')}
          </div>
        }
        visible={showTwoFA}
        onCancel={handleBackToLogin}
        footer={null}
        width={450}
        centered
      >
        <TwoFAVerification
          onSuccess={handle2FASuccess}
          onBack={handleBackToLogin}
          isModal={true}
          turnstileToken={turnstileToken}
        />
      </Modal>
    );
  };

  return (
    <div className='relative overflow-hidden bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      {/* 背景模糊晕染球 */}
      <div
        className='blur-ball blur-ball-indigo'
        style={{ top: '-80px', right: '-80px', transform: 'none' }}
      />
      <div
        className='blur-ball blur-ball-teal'
        style={{ top: '50%', left: '-120px' }}
      />
      <div className='w-full max-w-sm mt-[60px]'>
        {showEmailLogin ||
        !(
          status.github_oauth ||
          status.discord_oauth ||
          status.oidc_enabled ||
          status.wechat_login ||
          status.linuxdo_oauth ||
          status.telegram_oauth
        )
          ? renderEmailLoginForm()
          : renderOAuthOptions()}
        {renderWeChatLoginModal()}
        {render2FAModal()}
      </div>

      {turnstileEnabled && (
        <div className='relative z-10 flex justify-center pb-12'>
          <Turnstile
            sitekey={turnstileSiteKey}
            onVerify={(token) => {
              setTurnstileToken(token);
            }}
          />
        </div>
      )}

      <AuthFooter />
    </div>
  );

};

export default LoginForm;