import React, { useContext, useEffect, useRef, useState } from 'react';
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
} from '../../helpers';
import Turnstile from 'react-turnstile';
import { Button, Card, Checkbox, Divider, Form, Icon, Modal } from '@douyinfe/semi-ui-19';
import Title from '@douyinfe/semi-ui-19/lib/es/typography/title';
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
  onDiscordOAuthClicked,
} from '@/helpers';
import OIDCIcon from '../common/logo/OIDCIcon';
import LinuxDoIcon from '../common/logo/LinuxDoIcon';
import WeChatIcon from '../common/logo/WeChatIcon';
import TelegramLoginButton from 'react-telegram-login/src';
import { UserContext } from '../../context/User';
import { useTranslation } from 'react-i18next';
import { SiDiscord } from 'react-icons/si';
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
  const [discordLoading, setDiscordLoading] = useState(false);
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
  const [githubButtonText, setGithubButtonText] = useState('使用 GitHub 继续');
  const [githubButtonDisabled, setGithubButtonDisabled] = useState(false);
  const githubTimeoutRef = useRef(null);

  const mustAgreeToTerms = () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      showInfo(
        t('Please read and agree to the Terms of Service and Privacy Policy first.'),
      );
      return true;
    }
    return false;
  };

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

  useEffect(() => {
    return () => {
      if (githubTimeoutRef.current) {
        clearTimeout(githubTimeoutRef.current);
      }
    };
  }, []);

  const onWeChatLoginClicked = () => {
    if (mustAgreeToTerms()) {
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
    if (mustAgreeToTerms()) {
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
      onGitHubOAuthClicked(status.github_client_id);
    } finally {
      setTimeout(() => setGithubLoading(false), 3000);
    }
  };

  const handleDiscordClick = () => {
    if (mustAgreeToTerms()) {
      return;
    }
    setDiscordLoading(true);
    try {
      onDiscordOAuthClicked(status.discord_client_id);
    } finally {
      setTimeout(() => setDiscordLoading(false), 3000);
    }
  };

  const handleOIDCClick = () => {
    if (mustAgreeToTerms()) {
      return;
    }
    setOidcLoading(true);
    try {
      onOIDCClicked(status.oidc_authorization_endpoint, status.oidc_client_id);
    } finally {
      setTimeout(() => setOidcLoading(false), 3000);
    }
  };

  const handleLinuxDOClick = () => {
    if (mustAgreeToTerms()) {
      return;
    }
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
    if (mustAgreeToTerms()) {
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
        {showEmailRegister ||
        !(
          status.github_oauth ||
          status.discord_oauth ||
          status.oidc_enabled ||
          status.wechat_login ||
          status.linuxdo_oauth ||
          status.telegram_oauth
        )
          ? renderEmailRegisterForm()
          : renderOAuthOptions()}
        {renderWeChatLoginModal()}
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

export default RegisterForm;
