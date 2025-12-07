

import Features from "@/components/features"
import { motion } from "framer-motion"
import { Sparkles, Zap, Shield, Globe } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white relative">
      {/* Radial gradient overlays matching landing page */}
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.2),transparent_60%)]' />
      
      {/* Features Content */}
      <div className="pt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <Sparkles className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Features
            </h1>
            <Zap className="w-8 h-8 text-purple-500 dark:text-purple-400" />
          </div>
          <p className="text-lg text-slate-600 dark:text-white/60 max-w-2xl mx-auto mb-8">
            Explore the powerful features that make Knight-Omega the ultimate AI API gateway.
          </p>
          
          <div className="flex justify-center items-center gap-8 text-sm text-slate-500 dark:text-white/50">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Global</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Fast</span>
            </div>
          </div>
        </motion.div>

        <Features />
      </div>
    </div>
  )
}
