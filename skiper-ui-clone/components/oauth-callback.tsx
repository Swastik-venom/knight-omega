"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { toast } from 'sonner'

interface OAuthCallbackProps {
  type: 'github' | 'oidc' | 'linuxdo'
}

export default function OAuthCallback({ type }: OAuthCallbackProps) {
  const [searchParams] = useSearchParams()
  const router = useRouter()
  const { login: authLogin } = useAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const error = searchParams.get('error')
        const errorDescription = searchParams.get('error_description')

        // Handle OAuth errors
        if (error) {
          setStatus('error')
          const errorMsg = errorDescription || error || 'OAuth authorization failed'
          setErrorMessage(errorMsg)
          toast.error(errorMsg)
          return
        }

        // Handle missing code
        if (!code) {
          setStatus('error')
          const errorMsg = 'Authorization code not received, please try again'
          setErrorMessage(errorMsg)
          toast.error(errorMsg)
          return
        }

        // Exchange code for token
        setStatus('loading')
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/oauth/${type}?code=${code}&state=${state}`, {
          method: 'GET',
          credentials: 'include',
        })

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.message || 'OAuth callback failed')
        }

        // Handle successful authentication
        if (data.data) {
          setStatus('success')
          toast.success('OAuth login successful!')
          
          // If this is a popup, send message to parent window
          if (window.opener) {
            window.opener.postMessage({
              type: 'oauth_success',
              data: data.data
            }, window.location.origin)
          }
          
          // Login the user
          if (data.data.token && data.data.user) {
            await authLogin(data.data.user.email, '', data.data.token)
          }
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push('/dashboard')
          }, 1500)
        }
      } catch (error) {
        console.error('OAuth callback error:', error)
        setStatus('error')
        const errorMsg = error instanceof Error ? error.message : 'OAuth authorization failed'
        setErrorMessage(errorMsg)
        toast.error(errorMsg)
      }
    }

    handleOAuthCallback()
  }, [searchParams, type, authLogin, router])

  const handleRetry = () => {
    router.push('/login')
  }

  const handleBack = () => {
    router.push('/')
  }

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
        <div className="bg-card/50 backdrop-blur-xl border-border/50 rounded-lg p-8">
          <div className="text-center">
            {/* Loading State */}
            {status === 'loading' && (
              <>
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Processing Authorization
                </h2>
                <p className="text-white/60">
                  Please wait while we verify your authorization...
                </p>
              </>
            )}

            {/* Success State */}
            {status === 'success' && (
              <>
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Authorization Successful
                </h2>
                <p className="text-white/60">
                  Redirecting to your dashboard...
                </p>
              </>
            )}

            {/* Error State */}
            {status === 'error' && (
              <>
                <div className="mb-4">
                  <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="w-8 h-8 text-red-400" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Authorization Failed
                </h2>
                <p className="text-white/60 mb-6">
                  {errorMessage}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRetry}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-md font-medium transition-all duration-200"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleBack}
                    className="flex-1 px-4 py-2 border border-white/20 text-white hover:bg-white/10 rounded-md font-medium transition-colors"
                  >
                    Go Home
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}