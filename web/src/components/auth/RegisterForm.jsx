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

import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  API,
  getLogo,
  showError,
  showInfo,
  showSuccess,
  updateAPI,
  getSystemName,
  setUserData,
} from '../../../helpers';
import Turnstile from 'react-turnstile';
import { Button, Card, Checkbox, Divider, Form, Icon, Modal } from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import {
  IconGithubLogo,
  IconMail,
  IconUser,
  IconLock,
  IconKey,
} from '@douyinfe/semi-icons';
import {
  onGitHubOAuthClicked,
  onLinuxDOOAuthClicked,
  onOIDCClicked,
} from '../../../helpers';
import OIDCIcon from '../common/logo/OIDCIcon';
import LinuxDoIcon from '../common/logo/LinuxDoIcon';
import WeChatIcon from '../common/logo/WeChatIcon';
import TelegramLoginButton from 'react-telegram-login/src';
import { UserContext } from '../../context/User';
import { useTranslation } from 'react-i18next';
import AuthFooter from './AuthFooter';

const RegisterForm = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    verification_code: '',
    wechat_verification_code: '',
  });
  const { username, password, password2 } = inputs;
  const [userState, userDispatch] = useContext(UserContext);
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [showWeChatLoginModal, setShowWeChatLoginModal] = useState(false);
  const [showEmailRegister, setShowEmailRegister] = useState(false);
  const [wechatLoading, setWechatLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [oidcLoading, setOidcLoading] = useState(false);
  const [linuxdoLoading, setLinuxdoLoading] = useState(false);
  const [emailRegisterLoading, setEmailRegisterLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [verificationCodeLoading, setVerificationCodeLoading] = useState(false);
  const [otherRegisterOptionsLoading, setOtherRegisterOptionsLoading] =
    useState(false);
  const [wechatCodeSubmitLoading, setWechatCodeSubmitLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [hasUserAgreement, setHasUserAgreement] = useState(false);
  const [hasPrivacyPolicy, setHasPrivacyPolicy] = useState(false);

  const logo = getLogo();
  const systemName = getSystemName();
  const heroHighlights = [
    { label: 'Setup time', value: '<2 min' },
    { label: 'Team seats', value: 'Unlimited' },
    { label: 'Providers', value: '50+' },
  ];

  let affCode = new URLSearchParams(window.location.search).get('aff');
  if (affCode) {
    localStorage.setItem('aff', affCode);
  }

  const [status] = useState(() => {
    const savedStatus = localStorage.getItem('status');
    return savedStatus ? JSON.parse(savedStatus) : {};
  });

  const [showEmailVerification, setShowEmailVerification] = useState(() => {
    return status.email_verification ?? false;
  });

  useEffect(() => {
    setShowEmailVerification(status.email_verification);
    if (status.turnstile_check) {
      setTurnstileEnabled(true);
      setTurnstileSiteKey(status.turnstile_site_key);
    }

    // Track whether legal agreements are enabled in status
    setHasUserAgreement(status.user_agreement_enabled || false);
    setHasPrivacyPolicy(status.privacy_policy_enabled || false);
  }, [status]);

  useEffect(() => {
    let countdownInterval = null;
    if (disableButton && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setDisableButton(false);
      setCountdown(30);
    }
    return () => clearInterval(countdownInterval); // Clean up on unmount
  }, [disableButton, countdown]);

  const onWeChatLoginClicked = () => {
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
    if (password.length < 8) {
      showInfo('Password must be at least 8 characters long.');
      return;
    }
    if (password !== password2) {
      showInfo('Passwords do not match.');
      return;
    }
    if (username && password) {
      if (turnstileEnabled && turnstileToken === '') {
        showInfo('Please wait a moment - Turnstile is verifying your environment.');
        return;
      }
      setRegisterLoading(true);
      try {
        if (!affCode) {
          affCode = localStorage.getItem('aff');
        }
        inputs.aff_code = affCode;
        const res = await API.post(
          `/api/user/register?turnstile=${turnstileToken}`,
          inputs,
        );
        const { success, message } = res.data;
        if (success) {
          navigate('/login');
          showSuccess('Account created successfully!');
        } else {
          showError(message);
        }
      } catch (error) {
        showError('Sign up failed, please try again.');
      } finally {
        setRegisterLoading(false);
      }
    }
  }

  const sendVerificationCode = async () => {
    if (inputs.email === '') return;
    if (turnstileEnabled && turnstileToken === '') {
      showInfo('Please wait a moment - Turnstile is verifying your environment.');
      return;
    }
    setVerificationCodeLoading(true);
    try {
      const res = await API.get(
        `/api/verification?email=${inputs.email}&turnstile=${turnstileToken}`,
      );
      const { success, message } = res.data;
      if (success) {
        showSuccess('Verification code sent, please check your inbox.');
        setDisableButton(true); // Disable button after sending successfully and start countdown
      } else {
        showError(message);
      }
    } catch (error) {
      showError('Failed to send verification code, please try again.');
    } finally {
      setVerificationCodeLoading(false);
    }
  };

  const handleGitHubClick = () => {
    setGithubLoading(true);
    try {
      onGitHubOAuthClicked(status.github_client_id);
    } finally {
      setTimeout(() => setGithubLoading(false), 3000);
    }
  };

  const handleOIDCClick = () => {
    setOidcLoading(true);
    try {
      onOIDCClicked(status.oidc_authorization_endpoint, status.oidc_client_id);
    } finally {
      setTimeout(() => setOidcLoading(false), 3000);
    }
  };

  const handleLinuxDOClick = () => {
    setLinuxdoLoading(true);
    try {
      onLinuxDOOAuthClicked(status.linuxdo_client_id);
    } finally {
      setTimeout(() => setLinuxdoLoading(false), 3000);
    }
  };

  const handleEmailRegisterClick = () => {
    setEmailRegisterLoading(true);
    setShowEmailRegister(true);
    setEmailRegisterLoading(false);
  };

  const handleOtherRegisterOptionsClick = () => {
    setOtherRegisterOptionsLoading(true);
    setShowEmailRegister(false);
    setOtherRegisterOptionsLoading(false);
  };

  const onTelegramLoginClicked = async (response) => {
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
                {t('Sign Up')}
              </Title>
            </div>
            <div className='relative px-6 py-8'>
              <div className='pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-br from-white/45 via-transparent to-white/15 opacity-90 dark:from-white/25 dark:to-white/10' />
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
                  >
                    <span className='ml-3'>{t('Continue with GitHub')}</span>
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

                <Divider margin='12px' align='center' className='!border-slate-200 !text-slate-400 dark:!border-white/10 dark:!text-white/60'>
                  {t('OR')}
                </Divider>

                <Button
                  theme='solid'
                  type='primary'
                  className='w-full h-12 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white !rounded-full shadow-[0_15px_35px_rgba(99,102,241,0.35)] hover:opacity-90 transition-opacity'
                  icon={<IconMail size='large' />}
                  onClick={handleEmailRegisterClick}
                  loading={emailRegisterLoading}
                >
                  <span className='ml-3'>{t('Continue with Email or Username')}</span>
                </Button>
              </div>

              <div className='mt-6 text-center text-sm text-slate-600 dark:text-white/70'>
                {t("Already have an account?")}{' '}
                <Link
                  to='/login'
                  className='font-medium text-slate-900 hover:text-slate-600 dark:text-white dark:hover:text-white/80'
                >
                  {t('Sign In')}
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderEmailRegisterForm = () => {
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
                {t('Sign Up')}
              </Title>
            </div>
            <div className='relative px-6 py-8'>
              <div className='pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-br from-white/45 via-transparent to-white/15 opacity-90 dark:from-white/25 dark:to-white/10' />
              <Form className='relative space-y-3'>
                <Form.Input
                  field='username'
                  label={t('Username')}
                  placeholder={t('Enter a username')}
                  name='username'
                  onChange={(value) => handleChange('username', value)}
                  prefix={<IconUser />}
                  className='!text-slate-900 dark:!text-white'
                  style={{ background: 'rgba(248,250,252,0.92)', borderColor: 'rgba(148,163,184,0.35)', color: '#0f172a' }}
                />

                <Form.Input
                  field='password'
                  label={t('Password')}
                  placeholder={t('Enter a password (8-20 characters)')}
                  name='password'
                  mode='password'
                  onChange={(value) => handleChange('password', value)}
                  prefix={<IconLock />}
                  className='!text-slate-900 dark:!text-white'
                  style={{ background: 'rgba(248,250,252,0.92)', borderColor: 'rgba(148,163,184,0.35)', color: '#0f172a' }}
                />

                <Form.Input
                  field='password2'
                  label={t('Confirm password')}
                  placeholder={t('Re-enter your password')}
                  name='password2'
                  mode='password'
                  onChange={(value) => handleChange('password2', value)}
                  prefix={<IconLock />}
                  className='!text-slate-900 dark:!text-white'
                  style={{ background: 'rgba(248,250,252,0.92)', borderColor: 'rgba(148,163,184,0.35)', color: '#0f172a' }}
                />

                {showEmailVerification && (
                  <>
                    <Form.Input
                      field='email'
                      label={t('Email')}
                      placeholder={t('Enter your email address')}
                      name='email'
                      type='email'
                      onChange={(value) => handleChange('email', value)}
                      prefix={<IconMail />}
                      className='!text-slate-900 dark:!text-white'
                      style={{ background: 'rgba(248,250,252,0.92)', borderColor: 'rgba(148,163,184,0.35)', color: '#0f172a' }}
                      suffix={
                        <Button
                          onClick={sendVerificationCode}
                          loading={verificationCodeLoading}
                          disabled={disableButton || verificationCodeLoading}
                        >
                          {disableButton
                            ? `${t('Resend')} (${countdown})`
                            : t('Get verification code')}
                        </Button>
                      }
                    />
                    <Form.Input
                      field='verification_code'
                      label={t('Verification code')}
                      placeholder={t('Enter verification code')}
                      name='verification_code'
                      onChange={(value) =>
                        handleChange('verification_code', value)
                      }
                      prefix={<IconKey />}
                      className='!text-slate-900 dark:!text-white'
                      style={{ background: 'rgba(248,250,252,0.92)', borderColor: 'rgba(148,163,184,0.35)', color: '#0f172a' }}
                    />
                  </>
                )}

                {(hasUserAgreement || hasPrivacyPolicy) && (
                  <div className='pt-4'>
                    <Checkbox
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className='text-slate-700 dark:text-white'
                    >
                      <span className='text-slate-600 text-xs sm:text-sm dark:text-white/70'>
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
                    loading={registerLoading}
                    disabled={(hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms}
                  >
                    {t('Sign Up')}
                  </Button>
                </div>
              </Form>

              {(status.github_oauth ||
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
                      onClick={handleOtherRegisterOptionsClick}
                      loading={otherRegisterOptionsLoading}
                    >
                      {t('Other sign-up options')}
                    </Button>
                  </div>
                </>
              )}

              <div className='mt-6 text-center text-sm text-slate-600 dark:text-white/70'>
                {t("Already have an account?")}{' '}
                <Link
                  to='/login'
                  className='font-medium text-slate-900 hover:text-slate-600 dark:text-white dark:hover:text-white/80'
                >
                  {t('Sign In')}
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

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

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f5f7ff] via-white to-[#f0fdf4] text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.16),transparent_60%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.22),transparent_60%)]' />
      <div className='absolute -top-40 right-[-140px] h-[460px] w-[460px] rounded-full bg-indigo-200/50 blur-[170px] dark:bg-indigo-600/25' />
      <div className='absolute -bottom-48 left-[-160px] h-[520px] w-[520px] rounded-full bg-emerald-200/45 blur-[180px] dark:bg-emerald-500/20' />

      <main className='relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-16 pt-24 lg:flex-row lg:items-center lg:justify-between lg:pt-28'>
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='flex-1 space-y-8'
        >
          <div className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/85 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-500 shadow-sm backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:text-white/70'>
            <span className='h-2 w-2 rounded-full bg-emerald-500' />
            Launch in minutes
          </div>

          <div className='flex items-center gap-4'>
            <div className='relative flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200/70 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] dark:border-white/20 dark:bg-white/10'>
              {logo ? (
                <img src={logo} alt={systemName} className='h-12 w-12 rounded-full object-cover' />
              ) : (
                <span className='text-2xl font-semibold text-slate-800 dark:text-white'>KΩ</span>
              )}
            </div>
            <div>
              <p className='text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-white/60'>Knight Omega</p>
              <h1 className='text-4xl font-semibold text-slate-900 sm:text-5xl dark:text-white'>Create your {systemName} workspace</h1>
            </div>
          </div>

          <p className='max-w-xl text-base text-slate-600 sm:text-lg dark:text-white/70'>
            Spin up collaborative environments, manage team access, and monitor usage across every AI provider with a unified control plane.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='grid gap-4 sm:grid-cols-3'
          >
            {heroHighlights.map((item) => (
              <div
                key={item.label}
                className='rounded-3xl border border-slate-200/80 bg-white/90 px-4 py-4 text-slate-700 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur-lg dark:border-white/15 dark:bg-white/10 dark:text-white'
              >
                <p className='text-xs uppercase tracking-widest text-slate-500 dark:text-white/60'>{item.label}</p>
                <p className='mt-2 text-2xl font-semibold text-slate-900 dark:text-white'>{item.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className='w-full max-w-lg'
        >
          {showEmailRegister ||
          !(
            status.github_oauth ||
            status.oidc_enabled ||
            status.wechat_login ||
            status.linuxdo_oauth ||
            status.telegram_oauth
          )
            ? renderEmailRegisterForm()
            : renderOAuthOptions()}
        </motion.section>
      </main>

      {renderWeChatLoginModal()}

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

export default RegisterForm;
