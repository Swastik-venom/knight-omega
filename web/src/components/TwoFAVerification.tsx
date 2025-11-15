import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { auth } from '@/lib/api';

interface TwoFAVerificationProps {
  onSuccess: (data: any) => void;
  onBack: () => void;
  isModal?: boolean;
  turnstileToken?: string;
}

const TwoFAVerification: React.FC<TwoFAVerificationProps> = ({ 
  onSuccess, 
  onBack, 
  isModal = false,
  turnstileToken = ''
}) => {
  const [loading, setLoading] = useState(false);
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) {
      toast.error('Please enter verification code');
      return;
    }
    
    // Validate code format
    if (useBackupCode && verificationCode.length !== 8) {
      toast.error('Backup code must be 8 characters');
      return;
    } else if (!useBackupCode && !/^\d{6}$/.test(verificationCode)) {
      toast.error('Verification code must be 6 digits');
      return;
    }

    setLoading(true);
    try {
      const res = await auth.verify2FA(verificationCode, turnstileToken);

      if (res.success) {
        toast.success('Login successful');
        // Save user info to local storage
        localStorage.setItem('user', JSON.stringify(res.data?.user));
        localStorage.setItem('authToken', res.data?.token || '');
        
        if (onSuccess) {
          onSuccess(res.data);
        }
      } else {
        toast.error(res.message || 'Verification failed');
      }
    } catch (error: any) {
      toast.error('Verification failed, please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  if (isModal) {
    return (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          Please enter the verification code displayed in your authenticator app to complete login
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="code">
              {useBackupCode ? 'Backup Code' : 'Verification Code'}
            </Label>
            <Input
              id="code"
              placeholder={useBackupCode ? 'Enter 8-character backup code' : 'Enter 6-digit code'}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              onKeyPress={handleKeyPress}
              className="mb-4"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mb-4"
          >
            {loading ? 'Verifying...' : 'Verify and Login'}
          </Button>
        </form>

        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => {
              setUseBackupCode(!useBackupCode);
              setVerificationCode('');
            }}
            className="text-blue-500 hover:text-blue-600 p-0 h-auto"
          >
            {useBackupCode ? 'Use Authenticator Code' : 'Use Backup Code'}
          </Button>

          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-blue-500 hover:text-blue-600 p-0 h-auto ml-4"
            >
              Back to Login
            </Button>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <strong>Tip:</strong>
            <br />
            • Codes update every 30 seconds
            <br />
            • Use backup code if you can't access your authenticator
            <br />• Each backup code can only be used once
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-border/50">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Two-Factor Authentication</CardTitle>
          <CardDescription className="text-center">
            Please enter the verification code displayed in your authenticator app to complete login
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">
                {useBackupCode ? 'Backup Code' : 'Verification Code'}
              </Label>
              <Input
                id="code"
                placeholder={useBackupCode ? 'Enter 8-character backup code' : 'Enter 6-digit code'}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-center text-lg tracking-widest"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Verifying...' : 'Verify and Login'}
            </Button>
          </form>

          <div className="flex justify-center mt-4 space-x-4">
            <Button
              variant="ghost"
              onClick={() => {
                setUseBackupCode(!useBackupCode);
                setVerificationCode('');
              }}
              className="text-blue-500 hover:text-blue-600 p-0 h-auto"
            >
              {useBackupCode ? 'Use Authenticator Code' : 'Use Backup Code'}
            </Button>

            {onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-blue-500 hover:text-blue-600 p-0 h-auto"
              >
                Back to Login
              </Button>
            )}
          </div>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <strong>Tip:</strong>
              <br />
              • Codes update every 30 seconds
              <br />
              • Use backup code if you can't access your authenticator
              <br />• Each backup code can only be used once
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoFAVerification;
