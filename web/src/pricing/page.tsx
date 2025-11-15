

import { PricingSection } from "@/components/pricing-section"
import { motion } from "framer-motion"
import { CreditCard, Zap, Crown, TrendingUp } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
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
        
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      {/* Pricing Content */}
      <div className="pt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <CreditCard className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Pricing Plans
            </h1>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your AI needs. Start free, scale as you grow.
          </p>
          
          <div className="flex justify-center items-center gap-8 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Fast API</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-purple-400" />
              <span>Premium Models</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-green-400" />
              <span>Flexible Billing</span>
            </div>
          </div>
        </motion.div>

        <PricingSection />
      </div>
    </div>
  )
}
