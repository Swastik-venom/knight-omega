"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Mail, Lock, Key, User, Github, Shield, MessageSquare } from "lucide-react";
import { SiWechat, SiTelegram } from 'react-icons/si';
import { useAuth } from '@/lib/auth';
import Turnstile from 'react-turnstile';
import TelegramLoginButton from 'react-telegram-login';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import AuthFooter from '@/components/AuthFooter';

const LoginPage = () => {
  const { t } = { t: (key: string) => key }; // Placeholder for i18n
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { login, systemStatus, loading: authLoading, isAuthenticated, handleOAuthCallback, handlePasskeyLogin, handleTelegramLogin, handleWeChatLogin, isPasskeySupported, showTwoFA, setShowTwoFA, twoFAData } = useAuth();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    wechat_verification_code: '',
  });
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [showWeChatModal, setShowWeChatModal] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [emailLoginLoading, setEmailLoginLoading] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [wechatLoading, setWechatLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [hasUserAgreement, setHasUserAgreement] = useState(false);
  const [hasPrivacyPolicy, setHasPrivacyPolicy] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<{ [key: string]: boolean }>({});

  const { username, password } = inputs;
  const logo = '/logo.png'; // Adjust path as needed
  const systemName = 'Knight Omega';

  const heroHighlights = useMemo(() => [
    { label: 'Live latency', value: '<120ms' },
    { label: 'Global regions', value: '12' },
    { label: 'Active teams', value: '8K+' },
  ], []);

  useEffect(() => {
    if (systemStatus) {
      setTurnstileEnabled(systemStatus.turnstile_check || false);
      setTurnstileSiteKey(systemStatus.turnstile_site_key || '');
      setHasUserAgreement(systemStatus.user_agreement_enabled || false);
      setHasPrivacyPolicy(systemStatus.privacy_policy_enabled || false);
    }
  }, [systemStatus]);

  useEffect(() => {
    if (searchParams.get('expired')) {
      toast({
        variant: "destructive",
        title: "Session Expired",
        description: "Please sign in again.",
      });
    }
  }, [searchParams, toast]);

  const handleChange = (name: string, value: string) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Agreement Required",
        description: "Please agree to the Terms of Service and Privacy Policy.",
      });
      return;
    }
    if (turnstileEnabled && !turnstileToken) {
      toast({
        title: "Verification Pending",
        description: "Please complete the Turnstile verification.",
      });
      return;
    }
    setLoginLoading(true);
    try {
      await login(username, password, turnstileToken);
    } catch (error: any) {
      if (error.message === '2FA required') {
        // Handled by context
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message || "Please try again.",
        });
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleEmailLoginClick = () => {
    setShowEmailLogin(true);
  };

  const handleOtherOptionsClick = () => {
    setShowEmailLogin(false);
  };

  const handleWeChatClick = () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Agreement Required",
        description: "Please agree to the Terms of Service and Privacy Policy.",
      });
      return;
    }
    setShowWeChatModal(true);
  };

  const handleWeChatSubmit = async () => {
    if (turnstileEnabled && !turnstileToken) {
      toast({
        title: "Verification Pending",
        description: "Please complete the Turnstile verification.",
      });
      return;
    }
    try {
      await handleWeChatLogin(inputs.wechat_verification_code);
      setShowWeChatModal(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "WeChat Login Failed",
        description: error.message || "Please try again.",
      });
    }
  };

  const handleOauthClick = async (provider: string) => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Agreement Required",
        description: "Please agree to the Terms of Service and Privacy Policy.",
      });
      return;
    }
    setOauthLoading(prev => ({ ...prev, [provider]: true }));
    try {
      // Step 1: Generate OAuth state from backend
      const stateResponse = await fetch('/api/oauth/state', {
        method: 'GET',
        credentials: 'include', // Important: Include cookies for session
      });
      
      if (!stateResponse.ok) {
        throw new Error('Failed to generate OAuth state');
      }
      
      const stateData = await stateResponse.json();
      if (!stateData.success || !stateData.data) {
        throw new Error('Invalid state response');
      }
      
      const state = stateData.data;
      
      // Step 2: Redirect directly to OAuth provider (GitHub, OIDC, etc.)
      // The callback URL must match what's registered in the OAuth app settings
      // For GitHub: https://knight-omega.duckdns.org/oauth/github (without /api)
      const callbackUri = `${window.location.origin}/oauth/${provider}`;
      
      if (provider === 'github') {
        // Get GitHub Client ID from system status
        const githubClientId = systemStatus.github_client_id;
        if (!githubClientId) {
          throw new Error('GitHub OAuth is not properly configured');
        }
        
        // Redirect to GitHub's authorization URL
        const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
        githubAuthUrl.searchParams.set('client_id', githubClientId);
        githubAuthUrl.searchParams.set('redirect_uri', callbackUri);
        githubAuthUrl.searchParams.set('state', state);
        githubAuthUrl.searchParams.set('scope', 'user:email');
        window.location.href = githubAuthUrl.toString();
      } else if (provider === 'oidc') {
        // For OIDC, redirect to backend which will handle the OIDC flow
        const oidcAuthUrl = new URL(`${window.location.origin}/api/oauth/oidc`);
        oidcAuthUrl.searchParams.set('state', state);
        window.location.href = oidcAuthUrl.toString();
      } else if (provider === 'linuxdo') {
        // Get LinuxDO Client ID from system status
        const linuxdoClientId = systemStatus.linuxdo_client_id;
        if (!linuxdoClientId) {
          throw new Error('LinuxDO OAuth is not properly configured');
        }
        
        // Redirect to LinuxDO's authorization URL
        const linuxdoAuthUrl = new URL('https://connect.linux.do/oauth2/authorize');
        linuxdoAuthUrl.searchParams.set('client_id', linuxdoClientId);
        linuxdoAuthUrl.searchParams.set('redirect_uri', callbackUri);
        linuxdoAuthUrl.searchParams.set('state', state);
        linuxdoAuthUrl.searchParams.set('response_type', 'code');
        linuxdoAuthUrl.searchParams.set('scope', 'user:email');
        window.location.href = linuxdoAuthUrl.toString();
      } else {
        throw new Error(`Unsupported OAuth provider: ${provider}`);
      }
    } catch (error) {
      console.error('OAuth initiation error:', error);
      toast({
        variant: "destructive",
        title: `${provider} Login Failed`,
        description: error instanceof Error ? error.message : "Please try again.",
      });
      setOauthLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  const handlePasskeyClick = async () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Agreement Required",
        description: "Please agree to the Terms of Service and Privacy Policy.",
      });
      return;
    }
    if (!isPasskeySupported()) {
      toast({
        title: "Passkey Not Supported",
        description: "Your browser does not support Passkey.",
      });
      return;
    }
    setPasskeyLoading(true);
    try {
      await handlePasskeyLogin();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Passkey Login Failed",
        description: error.message || "Please try again.",
      });
    } finally {
      setPasskeyLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/console/dashboard');
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (isAuthenticated && !authLoading) {
    return null;
  }

  const renderOAuthOptions = () => (
    <Card className="w-full max-w-md border-border/50 bg-card/95 backdrop-blur-xl shadow-xl">
      <CardHeader className="flex flex-col items-center space-y-2">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8 rounded-full border border-border/50" />
          <CardTitle className="text-foreground">{systemName}</CardTitle>
        </div>
        <CardDescription className="text-center">Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {systemStatus.wechat_login && (
          <Button
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-green-50 hover:border-green-300 transition-colors"
            onClick={handleWeChatClick}
            disabled={wechatLoading}
          >
            <SiWechat className="h-4 w-4 text-green-600" />
            <span>Continue with WeChat</span>
            {wechatLoading && <Loader2 className="h-4 w-4 animate-spin ml-auto" />}
          </Button>
        )}

        {systemStatus.github_oauth && (
          <Button
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-gray-50 hover:border-gray-400 transition-colors"
            onClick={() => handleOauthClick('github')}
            disabled={oauthLoading.github}
          >
            <Github className="h-4 w-4" />
            <span>Continue with GitHub</span>
            {oauthLoading.github && <Loader2 className="h-4 w-4 animate-spin ml-auto" />}
          </Button>
        )}

        {systemStatus.oidc_enabled && (
          <Button
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            onClick={() => handleOauthClick('oidc')}
            disabled={oauthLoading.oidc}
          >
            <Shield className="h-4 w-4 text-blue-600" />
            <span>Continue with OIDC</span>
            {oauthLoading.oidc && <Loader2 className="h-4 w-4 animate-spin ml-auto" />}
          </Button>
        )}

        {systemStatus.linuxdo_oauth && (
          <Button
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-orange-50 hover:border-orange-300 transition-colors"
            onClick={() => handleOauthClick('linuxdo')}
            disabled={oauthLoading.linuxdo}
          >
            <MessageSquare className="h-4 w-4 text-orange-600" />
            <span>Continue with LinuxDO</span>
            {oauthLoading.linuxdo && <Loader2 className="h-4 w-4 animate-spin ml-auto" />}
          </Button>
        )}

        {systemStatus.telegram_oauth && (
          <Button
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-blue-50 hover:border-blue-400 transition-colors"
            onClick={() => handleOauthClick('telegram')}
            disabled={oauthLoading.telegram}
          >
            <SiTelegram className="h-4 w-4 text-blue-500" />
            <span>Continue with Telegram</span>
            {oauthLoading.telegram && <Loader2 className="h-4 w-4 animate-spin ml-auto" />}
          </Button>
        )}

        {systemStatus.passkey_login && isPasskeySupported() && (
          <Button
            variant="outline"
            className="w-full justify-start space-x-2"
            onClick={handlePasskeyClick}
            disabled={passkeyLoading}
          >
            <Key className="h-4 w-4" />
            <span>Sign in with Passkey</span>
            {passkeyLoading && <Loader2 className="h-4 w-4 animate-spin ml-auto" />}
          </Button>
        )}

        <Separator />

        <Button
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90"
          onClick={handleEmailLoginClick}
          disabled={emailLoginLoading}
        >
          <Mail className="h-4 w-4 mr-2" />
          Continue with Email or Username
          {emailLoginLoading && <Loader2 className="h-4 w-4 animate-spin ml-auto" />}
        </Button>

        {(hasUserAgreement || hasPrivacyPolicy) && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
              />
              <Label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I have read and agree to the{' '}
                {hasUserAgreement && (
                  <Link to="/user-agreement" className="underline underline-offset-4 hover:no-underline">
                    Terms of Service
                  </Link>
                )}
                {hasUserAgreement && hasPrivacyPolicy && ' and '}
                {hasPrivacyPolicy && (
                  <Link to="/privacy-policy" className="underline underline-offset-4 hover:no-underline">
                    Privacy Policy
                  </Link>
                )}
                .
              </Label>
            </div>
          </div>
        )}

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="underline underline-offset-4 hover:no-underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  const renderEmailLoginForm = () => (
    <Card className="w-full max-w-md border-border/50 bg-card/95 backdrop-blur-xl shadow-xl">
      <CardHeader className="flex flex-col items-center space-y-2">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8 rounded-full border border-border/50" />
          <CardTitle className="text-foreground">{systemName}</CardTitle>
        </div>
        <CardDescription className="text-center">Welcome back! Please sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {systemStatus.passkey_login && isPasskeySupported() && (
          <Button
            variant="outline"
            className="w-full justify-start space-x-2"
            onClick={handlePasskeyClick}
            disabled={passkeyLoading}
          >
            <Key className="h-4 w-4" />
            <span>Sign in with Passkey</span>
            {passkeyLoading && <Loader2 className="h-4 w-4 animate-spin ml-auto" />}
          </Button>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username or Email</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username or email address"
              value={username}
              onChange={(e) => handleChange('username', e.target.value)}
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="bg-muted/50 border-border/50"
            />
          </div>

          {(hasUserAgreement || hasPrivacyPolicy) && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                />
                <Label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I have read and agree to the{' '}
                  {hasUserAgreement && (
                    <Link to="/user-agreement" className="underline underline-offset-4 hover:no-underline">
                      Terms of Service
                    </Link>
                  )}
                  {hasUserAgreement && hasPrivacyPolicy && ' and '}
                  {hasPrivacyPolicy && (
                    <Link to="/privacy-policy" className="underline underline-offset-4 hover:no-underline">
                      Privacy Policy
                    </Link>
                  )}
                  .
                </Label>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90" disabled={loginLoading || ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms)}>
            <Mail className="h-4 w-4 mr-2" />
            Sign In
            {loginLoading && <Loader2 className="h-4 w-4 animate-spin ml-auto" />}
          </Button>

          <Button
            variant="link"
            className="w-full justify-start"
            onClick={() => navigate('/reset')}
          >
            Forgot password?
          </Button>
        </form>

        {(systemStatus.github_oauth || systemStatus.oidc_enabled || systemStatus.wechat_login || systemStatus.linuxdo_oauth || systemStatus.telegram_oauth) && (
          <>
            <Separator />
            <Button
              variant="outline"
              className="w-full"
              onClick={handleOtherOptionsClick}
            >
              Other sign-in options
            </Button>
          </>
        )}

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="underline underline-offset-4 hover:no-underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  const renderWeChatModal = () => (
    <Dialog open={showWeChatModal} onOpenChange={setShowWeChatModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in with WeChat</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <img src={systemStatus.wechat_qrcode} alt="WeChat QR" className="h-48 w-48 rounded-lg" />
          <p className="text-sm text-muted-foreground text-center">
            Scan the QR code with WeChat, then send "verification code" to receive a code (valid for 3 minutes).
          </p>
          <Input
            placeholder="Verification code"
            value={inputs.wechat_verification_code}
            onChange={(e) => handleChange('wechat_verification_code', e.target.value)}
            className="w-full"
          />
          <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowWeChatModal(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleWeChatSubmit}>
              Sign In
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-16 pt-24 lg:flex-row lg:items-center lg:justify-between lg:pt-28">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex-1 space-y-8"
        >
          <Badge variant="secondary" className="inline-flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            Secure Access Portal
          </Badge>

          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/70 bg-card shadow-lg">
              <img src={logo} alt={systemName} className="h-12 w-12 rounded-full object-cover" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Knight Omega</p>
              <h1 className="text-4xl font-bold sm:text-5xl">Welcome back to {systemName}</h1>
            </div>
          </div>

          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Manage keys, monitor usage, and orchestrate teams with a refined control surface connected to 50+ premium AI providers.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {heroHighlights.map((item, index) => (
              <Card key={item.label} className="border-border/50 bg-card/90 shadow-md">
                <CardContent className="p-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.section>

        {/* Form Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="w-full max-w-lg"
        >
          {showEmailLogin || !(
            systemStatus.github_oauth ||
            systemStatus.oidc_enabled ||
            systemStatus.wechat_login ||
            systemStatus.linuxdo_oauth ||
            systemStatus.telegram_oauth
          ) ? renderEmailLoginForm() : renderOAuthOptions()}
        </motion.section>
      </main>

      {renderWeChatModal()}

      {turnstileEnabled && (
        <div className="relative z-10 flex justify-center pb-12">
          <Turnstile
            sitekey={turnstileSiteKey}
            onVerify={setTurnstileToken}
          />
        </div>
      )}

      <AuthFooter />
    </div>
  );
};

export default LoginPage;