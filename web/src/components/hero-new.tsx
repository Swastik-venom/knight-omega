"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Cpu,
  Code,
  Sparkles,
  Play,
  ChevronRight,
  Star,
  Users,
  BarChart3,
  Lock,
  Layers,
  Terminal,
  Bot,
  Brain,
  Rocket
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Animated gradient orbs background
const GradientOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
    <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-500" />
    <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] animate-pulse delay-700" />
  </div>
)

// Floating particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/20 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
)

// Grid pattern overlay
const GridPattern = () => (
  <div 
    className="absolute inset-0 opacity-[0.02]"
    style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
      backgroundSize: '50px 50px'
    }}
  />
)

// Animated stats counter
const AnimatedStat = ({ value, label, suffix = "" }: { value: string; label: string; suffix?: string }) => (
  <motion.div 
    className="text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
      {value}{suffix}
    </div>
    <div className="text-sm text-white/50 mt-1">{label}</div>
  </motion.div>
)

// Provider badge component
const ProviderBadge = ({ name, icon: Icon, color }: { name: string; icon: any; color: string }) => (
  <motion.div 
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-full",
      "bg-white/5 border border-white/10 backdrop-blur-sm",
      "hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    )}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className={cn("w-4 h-4", color)} />
    <span className="text-sm font-medium text-white/80">{name}</span>
  </motion.div>
)

// Feature pill component
const FeaturePill = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
    <Icon className="w-3.5 h-3.5 text-blue-400" />
    <span className="text-xs text-white/70">{text}</span>
  </div>
)

export default function HeroNew() {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])

  useEffect(() => {
    setMounted(true)
  }, [])

  const providers = [
    { name: "OpenAI", icon: Brain, color: "text-green-400" },
    { name: "Claude", icon: Bot, color: "text-orange-400" },
    { name: "Gemini", icon: Sparkles, color: "text-blue-400" },
    { name: "Llama", icon: Cpu, color: "text-purple-400" },
    { name: "+50 more", icon: Layers, color: "text-cyan-400" },
  ]

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <GradientOrbs />
      <FloatingParticles />
      <GridPattern />

      <motion.div 
        className="relative z-10 container mx-auto px-4 pt-32 pb-20"
        style={{ opacity, scale }}
      >
        {/* Top badge */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-medium text-green-400">Live</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <Rocket className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white/80">
                The Future of AI Integration
              </span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              One API.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Every AI Model.
            </span>
          </h1>
          
          <motion.p
            className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Knight-Omega unifies 50+ AI providers into a single, powerful API. 
            Build faster, scale effortlessly, and never worry about provider lock-in again.
          </motion.p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FeaturePill icon={Zap} text="Ultra-low latency" />
          <FeaturePill icon={Shield} text="Enterprise security" />
          <FeaturePill icon={Globe} text="Global edge network" />
          <FeaturePill icon={BarChart3} text="Real-time analytics" />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/signup">
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Building Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
          
          <Link to="/console/playground">
            <Button
              size="lg"
              variant="outline"
              className="group px-8 py-6 text-lg rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2 text-green-400" />
              Try Playground
            </Button>
          </Link>
        </motion.div>

        {/* Provider badges */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-center text-sm text-white/40 mb-4">
            Trusted by developers building with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {providers.map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <ProviderBadge {...provider} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <AnimatedStat value="50" suffix="+" label="AI Models" />
          <AnimatedStat value="10M" suffix="+" label="API Requests/Day" />
          <AnimatedStat value="99.99" suffix="%" label="Uptime" />
          <AnimatedStat value="<50" suffix="ms" label="Avg. Latency" />
        </motion.div>

        {/* Code preview card */}
        <motion.div
          className="mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-950/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-white/40 ml-2">knight-omega-api</span>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-white/40" />
                  <span className="text-xs text-white/40">bash</span>
                </div>
              </div>
              
              {/* Code content */}
              <div className="p-6 font-mono text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <span className="text-green-400">$</span>
                  <span className="text-blue-400">curl</span>
                  <span className="text-white/80">-X POST https://api.knight-omega.com/v1/chat</span>
                </div>
                <div className="mt-2 text-white/60 pl-4">
                  -H <span className="text-yellow-400">"Authorization: Bearer $API_KEY"</span>
                </div>
                <div className="mt-1 text-white/60 pl-4">
                  -d <span className="text-green-400">'{"{"}"model": "gpt-4", "messages": [...]{"}"}'</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-white/40"># Response in {"<"}50ms from any model</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-white/40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
              <motion.div 
                className="w-1.5 h-1.5 bg-white/40 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}