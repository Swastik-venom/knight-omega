"use client"
import { lazy, Suspense, useContext, useMemo } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { ConsoleLayout } from "@/components/console/ConsoleLayout"
import DashboardPage from "@/pages/Dashboard"
import ModelsPage from "@/pages/Models/index"
import ModelsConsole from "@/pages/Models/ModelsConsole"
import ModelsShowcase from "@/pages/Models/ModelsShowcase"
import ApiKeysPage from "@/pages/ApiKeys"
// Import old-files pages
import TopUpPage from "@/pages/TopUp"
import LogPage from "@/pages/Log"
import SettingPage from "@/pages/Setting"
import ChannelPage from "@/pages/Channel"
import UserPage from "@/pages/User"
import RedemptionPage from "@/pages/Redemption"
import SetupPage from "@/pages/Setup"
import PlaygroundPage from "@/pages/Playground"
import Hero from "@/components/home/hero"
import Features from "@/components/features"
import { TestimonialsSection } from "@/components/testimonials"
import { NewReleasePromo } from "@/components/new-release-promo"
import { FAQSection } from "@/components/faq-section"
import { PricingSection } from "@/components/pricing-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth"
import { Toaster } from "@/components/ui/sonner"
import { UserProvider } from "@/context/User"
import { StatusProvider } from "@/context/Status"
import FeaturesPage from "@/features/page"
import LoginPage from "@/pages/Login"
import SignupPage from "@/pages/Signup"
import GitHubOAuthPage from "@/oauth/github/page"
import OIDCOAuthPage from "@/oauth/oidc/page"
import LinuxDOOAuthPage from "@/oauth/linuxdo/page"
import "./globals.css"

function AppContent() {
  const location = useLocation()

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen w-full relative bg-background overflow-hidden flex flex-col">
            {/* Unified Background with Seamless Gradients */}
            <div className="absolute inset-0 z-0">
              {/* Top gradient - Pearl mist */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%)",
                }}
              />

              {/* Middle gradient - Blue to purple transition */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse 60% 40% at 50% 45%, rgba(59, 130, 246, 0.08), transparent 70%)",
                }}
              />

              {/* Bottom gradient - Purple to cyan */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse 55% 35% at 50% 85%, rgba(168, 85, 247, 0.06), transparent 65%)",
                }}
              />

              {/* Ambient glow effects */}
              <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
              <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            {/* Hero Section */}
            <Hero />

            {/* Features Section */}
            <div id="features" className="relative z-10">
              <Features />
            </div>

            {/* Pricing Section */}
            <div id="pricing" className="relative z-10">
              <PricingSection />
            </div>

            {/* Testimonials Section */}
            <div id="testimonials" className="relative z-10">
              <TestimonialsSection />
            </div>

            <div className="relative z-10">
              <NewReleasePromo />
            </div>

            {/* FAQ Section */}
            <div id="faq" className="relative z-10">
              <FAQSection />
            </div>

            <Footer />
          </div>
        } />
        
        <Route path="/features" element={
          <div className="min-h-screen w-full relative bg-background overflow-hidden flex flex-col">
            <FeaturesPage />
            <Footer />
          </div>
        } />
        
        <Route path="/pricing" element={
          <div className="min-h-screen w-full relative bg-background overflow-hidden flex flex-col">
            <PricingSection />
            <Footer />
          </div>
        } />
        
        <Route path="/testimonials" element={
          <div className="min-h-screen w-full relative bg-background overflow-hidden flex flex-col">
            <TestimonialsSection />
            <Footer />
          </div>
        } />
        
        <Route path="/models" element={<ModelsPage />} />
        <Route path="/models/showcase" element={<ModelsShowcase />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/setup" element={<SetupPage />} />
        
        {/* OAuth callback routes */}
        <Route path="/oauth/github" element={<GitHubOAuthPage />} />
        <Route path="/oauth/oidc" element={<OIDCOAuthPage />} />
        <Route path="/oauth/linuxdo" element={<LinuxDOOAuthPage />} />
        
        {/* Console routes - wrapped with ConsoleLayout */}
        <Route path="/console" element={
          <ProtectedRoute>
            <ConsoleLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="chat" element={<PlaygroundPage />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="api-keys" element={<ApiKeysPage />} />
          <Route path="token" element={<ApiKeysPage />} />
          <Route path="log" element={<LogPage />} />
          <Route path="logs" element={<LogPage />} />
          <Route path="topup" element={<TopUpPage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="settings" element={<SettingPage />} />
          <Route path="models" element={<ModelsConsole />} />
          <Route path="channel" element={<ChannelPage />} />
          <Route path="channels" element={<ChannelPage />} />
          <Route path="redemption" element={<RedemptionPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="users" element={<UserPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default function App() {
  return (
    <div className="dark antialiased">
      <ThemeProvider defaultTheme="dark">
        <StatusProvider>
          <UserProvider>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </UserProvider>
        </StatusProvider>
      </ThemeProvider>
    </div>
  )
}