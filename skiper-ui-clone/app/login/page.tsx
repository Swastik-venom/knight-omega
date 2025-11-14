"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Turnstile from 'react-turnstile'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowLeft, 
  Github, 
  ShieldCheck, 
  User, 
  Key,
  MessageCircle
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from '@/lib/auth'
import { toast } from 'sonner'
import TwoFAVerification from '../../components/TwoFAVerification'

export default function LoginPage() {
  // Basic state
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [wechatCode, setWechatCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [show2FA, setShow2FA] = useState(false)
  const [loginData, setLoginData] = useState<{ identifier: string; password: string } | null>(null)
  
  // UI state
  const [showEmailLogin, setShowEmailLogin] = useState(false)
  const [showWeChatModal, setShowWeChatModal] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  
  // Loading states for different providers
  const [githubLoading, setGithubLoading] = useState(false)
  const [oidcLoading, setOidcLoading] = useState(false)
  const [linuxdoLoading, setLinuxdoLoading] = useState(false)
  const [wechatLoading, setWechatLoading] = useState(false)
  const [passkeyLoading, setPasskeyLoading] = useState(false)
  const [emailLoginLoading, setEmailLoginLoading] = useState(false)
  const [wechatCodeSubmitLoading, setWechatCodeSubmitLoading] = useState(false)
  
  const { 
    login, 
    loading: authLoading, 
    systemStatus, 
    handleOAuthCallback, 
    handlePasskeyLogin, 
    handleWeChatLogin, 
    isPasskeySupported 
  } = useAuth()
  const router = useRouter()

  // Check if features are enabled
  const githubEnabled = systemStatus?.github_oauth
  const oidcEnabled = systemStatus?.oidc_enabled
  const linuxdoEnabled = systemStatus?.linuxdo_oauth
  const wechatEnabled = systemStatus?.wechat_login
  const passkeyEnabled = systemStatus?.passkey_login && isPasskeySupported()
  const telegramEnabled = systemStatus?.telegram_oauth
  const hasUserAgreement = systemStatus?.user_agreement_enabled
  const hasPrivacyPolicy = systemStatus?.privacy_policy_enabled
  
  function isPasskeyEnabled(): boolean {
    try {
      return typeof window !== 'undefined' && 'PublicKeyCredential' in window
    } catch {
      return false
    }
  }
  
  // Check for expired session
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('expired')) {
      toast.error('Session expired, please login again')
    }
  }, [])

  // Handle OAuth provider clicks
  const handleGitHubClick = () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      toast.error('Please read and agree to the user agreement and privacy policy')
      return
    }
    setGithubLoading(true)
    try {
      window.location.href = '/api/oauth/github'
    } finally {
      setTimeout(() => setGithubLoading(false), 3000)
    }
  }

  const handleOIDCClick = () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      toast.error('Please read and agree to the user agreement and privacy policy')
      return
    }
    setOidcLoading(true)
    try {
      window.location.href = '/api/oauth/oidc'
    } finally {
      setTimeout(() => setOidcLoading(false), 3000)
    }
  }

  const handleLinuxDoClick = () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      toast.error('Please read and agree to the user agreement and privacy policy')
      return
    }
    setLinuxdoLoading(true)
    try {
      window.location.href = '/api/oauth/linuxdo'
    } finally {
      setTimeout(() => setLinuxdoLoading(false), 3000)
    }
  }

  const handleWeChatClick = () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      toast.error('Please read and agree to the user agreement and privacy policy')
      return
    }
    setWechatLoading(true)
    setShowWeChatModal(true)
    setWechatLoading(false)
  }

  const handlePasskeyClick = async () => {
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      toast.error('Please read and agree to the user agreement and privacy policy')
      return
    }
    if (!isPasskeySupported()) {
      toast.error('Passkey is not supported in this environment')
      return
    }

    setPasskeyLoading(true)
    try {
      await handlePasskeyLogin()
    } catch (error) {
      // Error handling is done in the auth context
    } finally {
      setPasskeyLoading(false)
    }
  }

  const handleEmailLoginClick = () => {
    setEmailLoginLoading(true)
    setShowEmailLogin(true)
    setEmailLoginLoading(false)
  }

  const handleWeChatCodeSubmit = async () => {
    if (!wechatCode) {
      toast.error('Please enter the verification code')
      return
    }
    
    setWechatCodeSubmitLoading(true)
    try {
      await handleWeChatLogin(wechatCode)
      setShowWeChatModal(false)
      setWechatCode('')
    } catch (error) {
      // Error handling is done in the auth context
    } finally {
      setWechatCodeSubmitLoading(false)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if ((hasUserAgreement || hasPrivacyPolicy) && !agreedToTerms) {
      toast.error('Please read and agree to the user agreement and privacy policy')
      return
    }

    if (!identifier || !password) {
      toast.error('Please fill in all fields')
      return
    }

    // Check Turnstile if enabled
    const turnstileEnabled = systemStatus?.turnstile_check
    if (turnstileEnabled && !turnstileToken) {
      toast.error('Please wait for Turnstile verification to complete')
      return
    }

    try {
      setLoading(true)
      await login(identifier, password, turnstileToken)
      toast.success('Welcome back!')
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Login error:', error)
      if (error?.message === '2FA required') {
        setLoginData({ identifier, password })
        setShow2FA(true)
      } else {
        toast.error(error?.message || 'Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleBackToOAuth = () => {
    setShowEmailLogin(false)
    setIdentifier('')
    setPassword('')
    setTurnstileToken('')
  }

  // Show loading state while auth context initializes
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Show 2FA verification if required
  if (show2FA && loginData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <TwoFAVerification
            onSuccess={(data) => {
              toast.success('Welcome back!')
              router.push('/dashboard')
            }}
            onBack={() => {
              setShow2FA(false)
              setLoginData(null)
            }}
            isModal={false}
            turnstileToken={turnstileToken}
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      {/* Animated background balls */}
      <div className="absolute top-[-80px] right-[-80px] w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-120px] left-[-120px] w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back to Home */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-lg overflow-hidden shadow-lg border border-white/20">
                <Image
                  src="/logo.png"
                  alt="Knight-Omega"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {showEmailLogin ? 'Welcome back' : 'Sign in to Knight-Omega'}
            </CardTitle>
            <CardDescription className="text-center">
              {showEmailLogin 
                ? 'Enter your credentials to access your account' 
                : 'Choose your preferred sign-in method'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <AnimatePresence mode="wait">
              {!showEmailLogin ? (
                // OAuth Options Screen
                <motion.div
                  key="oauth"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {wechatEnabled && (
                    <Button
                      variant="outline"
                      onClick={handleWeChatClick}
                      disabled={wechatLoading}
                      className="w-full h-12 flex items-center justify-center !rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 text-green-500 mr-3" />
                      {wechatLoading ? 'Loading...' : 'Continue with WeChat'}
                    </Button>
                  )}

                  {githubEnabled && (
                    <Button
                      variant="outline"
                      onClick={handleGitHubClick}
                      disabled={githubLoading}
                      className="w-full h-12 flex items-center justify-center !rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Github className="h-5 w-5 mr-3" />
                      {githubLoading ? 'Loading...' : 'Continue with GitHub'}
                    </Button>
                  )}

                  {oidcEnabled && (
                    <Button
                      variant="outline"
                      onClick={handleOIDCClick}
                      disabled={oidcLoading}
                      className="w-full h-12 flex items-center justify-center !rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <ShieldCheck className="h-5 w-5 text-blue-500 mr-3" />
                      {oidcLoading ? 'Loading...' : 'Continue with OIDC'}
                    </Button>
                  )}

                  {linuxdoEnabled && (
                    <Button
                      variant="outline"
                      onClick={handleLinuxDoClick}
                      disabled={linuxdoLoading}
                      className="w-full h-12 flex items-center justify-center !rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <User className="h-5 w-5 text-orange-500 mr-3" />
                      {linuxdoLoading ? 'Loading...' : 'Continue with LinuxDo'}
                    </Button>
                  )}

                  {telegramEnabled && (
                    <div className="flex justify-center my-2">
                      <Button
                        variant="outline"
                        onClick={() => toast.info('Telegram login coming soon')}
                        className="w-full h-12 flex items-center justify-center !rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <MessageCircle className="h-5 w-5 text-blue-400 mr-3" />
                        Continue with Telegram
                      </Button>
                    </div>
                  )}

                  {passkeyEnabled && (
                    <Button
                      variant="outline"
                      onClick={handlePasskeyClick}
                      disabled={passkeyLoading}
                      className="w-full h-12 flex items-center justify-center !rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Key className="h-5 w-5 mr-3" />
                      {passkeyLoading ? 'Loading...' : 'Sign in with Passkey'}
                    </Button>
                  )}

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or
                      </span>
                    </div>
                  </div>

                  {/* Email Login Button */}
                  <Button
                    onClick={handleEmailLoginClick}
                    disabled={emailLoginLoading}
                    className="w-full h-12 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 !rounded-full"
                  >
                    <Mail className="h-5 w-5 mr-3" />
                    {emailLoginLoading ? 'Loading...' : 'Continue with Email or Username'}
                  </Button>

                  {/* User Agreement Checkbox */}
                  {(hasUserAgreement || hasPrivacyPolicy) && (
                    <div className="mt-6">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                          I have read and agree to the{' '}
                          {hasUserAgreement && (
                            <>
                              <Link href="/user-agreement" className="text-blue-400 hover:underline mx-1" target="_blank">
                                User Agreement
                              </Link>
                            </>
                          )}
                          {hasUserAgreement && hasPrivacyPolicy && 'and '}
                          {hasPrivacyPolicy && (
                            <>
                              <Link href="/privacy-policy" className="text-blue-400 hover:underline mx-1" target="_blank">
                                Privacy Policy
                              </Link>
                            </>
                          )}
                        </Label>
                      </div>
                    </div>
                  )}

                  {/* Sign up link */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <Link
                        href="/signup"
                        className="text-primary hover:underline font-medium"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </motion.div>
              ) : (
                // Email Login Form
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Passkey option in email form */}
                  {passkeyEnabled && (
                    <Button
                      variant="outline"
                      onClick={handlePasskeyClick}
                      disabled={passkeyLoading}
                      className="w-full h-12 flex items-center justify-center !rounded-full border border-gray-200 hover:bg-gray-50 transition-colors mb-4"
                    >
                      <Key className="h-5 w-5 mr-3" />
                      {passkeyLoading ? 'Loading...' : 'Sign in with Passkey'}
                    </Button>
                  )}

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="identifier">Username or Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="identifier"
                          type="text"
                          placeholder="Enter your username or email"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* User Agreement Checkbox in email form */}
                    {(hasUserAgreement || hasPrivacyPolicy) && (
                      <div className="pt-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="terms-email"
                            checked={agreedToTerms}
                            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                          />
                          <Label htmlFor="terms-email" className="text-sm text-muted-foreground leading-relaxed">
                            I have read and agree to the{' '}
                            {hasUserAgreement && (
                              <>
                                <Link href="/user-agreement" className="text-blue-400 hover:underline mx-1" target="_blank">
                                  User Agreement
                                </Link>
                              </>
                            )}
                            {hasUserAgreement && hasPrivacyPolicy && 'and '}
                            {hasPrivacyPolicy && (
                              <>
                                <Link href="/privacy-policy" className="text-blue-400 hover:underline mx-1" target="_blank">
                                  Privacy Policy
                                </Link>
                              </>
                            )}
                          </Label>
                        </div>
                      </div>
                    )}
                    
                    {/* Turnstile */}
                    {systemStatus?.turnstile_check && (
                      <div className="flex justify-center my-4">
                        <Turnstile
                          sitekey={systemStatus.turnstile_site_key}
                          onVerify={(token) => setTurnstileToken(token)}
                          onError={() => {
                            toast.error('Turnstile verification failed')
                            setTurnstileToken('')
                          }}
                          onExpire={() => {
                            toast.error('Turnstile verification expired')
                            setTurnstileToken('')
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 !rounded-full"
                        disabled={loading || (systemStatus?.turnstile_check ? !turnstileToken : false)}
                      >
                        {loading ? 'Signing in...' : 'Continue'}
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleBackToOAuth}
                        className="w-full !rounded-full"
                      >
                        Back to other options
                      </Button>
                    </div>
                  </form>

                  {/* Other OAuth options */}
                  {(githubEnabled || oidcEnabled || wechatEnabled || linuxdoEnabled || telegramEnabled) && (
                    <>
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or
                          </span>
                        </div>
                      </div>

                      <div className="text-center">
                        <Button
                          variant="outline"
                          onClick={handleBackToOAuth}
                          className="w-full !rounded-full"
                        >
                          Other sign-in options
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Sign up link */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <Link
                        href="/signup"
                        className="text-primary hover:underline font-medium"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* WeChat Login Modal */}
      <Dialog open={showWeChatModal} onOpenChange={setShowWeChatModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>WeChat QR Code Login</DialogTitle>
            <DialogDescription>
              Scan the QR code with WeChat and enter the verification code
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-4">
            {systemStatus?.wechat_qrcode && (
              <img 
                src={systemStatus.wechat_qrcode} 
                alt="WeChat QR Code" 
                className="w-48 h-48 border rounded-lg"
              />
            )}
            
            <div className="w-full space-y-2">
              <Label htmlFor="wechat-code">Verification Code</Label>
              <Input
                id="wechat-code"
                placeholder="Enter verification code"
                value={wechatCode}
                onChange={(e) => setWechatCode(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Follow the WeChat official account and enter the verification code (valid for 3 minutes)
              </p>
            </div>
            
            <div className="flex space-x-2 w-full">
              <Button
                variant="outline"
                onClick={() => setShowWeChatModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleWeChatCodeSubmit}
                disabled={wechatCodeSubmitLoading || !wechatCode}
                className="flex-1"
              >
                {wechatCodeSubmitLoading ? 'Loading...' : 'Login'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}