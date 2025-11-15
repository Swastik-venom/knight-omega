

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { geist } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { 
  Zap, 
  Shield, 
  Globe, 
  Code, 
  Database, 
  Lock, 
  Cpu, 
  ArrowRight,
  CheckCircle,
  Monitor,
  Layers,
  Key,
  Activity
} from "lucide-react"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isHovering, setIsHovering] = useState(false)

  const features = [
    {
      title: "50+ AI Models",
      description: "Access OpenAI, Claude, Gemini, and 47+ other cutting-edge AI models through one unified API",
      icon: <Database className="h-full w-full" />,
      details: [
        "OpenAI GPT-4, GPT-3.5 Turbo",
        "Anthropic Claude 3.5 Sonnet",
        "Google Gemini Pro",
        "Meta Llama 3.1",
        "Mistral AI models",
        "And 45+ more models"
      ],
      color: "blue"
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption, SOC 2 compliance, and advanced security features for enterprise use",
      icon: <Shield className="h-full w-full" />,
      details: [
        "End-to-end encryption",
        "SOC 2 Type II compliance",
        "Role-based access control",
        "Audit logging",
        "DDoS protection",
        "24/7 security monitoring"
      ],
      color: "purple"
    },
    {
      title: "Global Performance",
      description: "Lightning-fast responses with edge caching across 100+ global locations for minimal latency",
      icon: <Globe className="h-full w-full" />,
      details: [
        "99.9% uptime SLA",
        "Sub-100ms response times",
        "Global edge network",
        "Automatic failover",
        "Smart load balancing",
        "Real-time monitoring"
      ],
      color: "green"
    },
    {
      title: "Developer First",
      description: "Built for developers with comprehensive documentation, SDKs, and developer-friendly features",
      icon: <Code className="h-full w-full" />,
      details: [
        "RESTful & GraphQL APIs",
        "SDKs for 8+ languages",
        "Interactive playground",
        "Rate limiting & quotas",
        "Webhook support",
        "Real-time streaming"
      ],
      color: "orange"
    }
  ]

  return (
    <section id="features" className="text-foreground relative py-12 sm:py-24 md:py-32">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="container mx-auto flex flex-col items-center gap-6 sm:gap-12"
      >
        <h2
          className={cn(
            "via-foreground mb-8 bg-gradient-to-b from-zinc-800 to-zinc-700 bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]",
            geist.className,
          )}
        >
          Why Choose Knight-Omega?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative rounded-2xl p-8 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                    feature.color === 'blue' ? 'from-blue-500/20 to-cyan-500/20' :
                    feature.color === 'purple' ? 'from-purple-500/20 to-pink-500/20' :
                    feature.color === 'green' ? 'from-green-500/20 to-emerald-500/20' :
                    'from-orange-500/20 to-red-500/20'
                  } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detailIndex}
                        className="flex items-center gap-3 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + detailIndex * 0.05 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-white/80">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <motion.div
                  className="mt-6 pt-6 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                >
                  <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { icon: <Database className="w-6 h-6" />, label: "AI Models", value: "50+" },
            { icon: <Globe className="w-6 h-6" />, label: "Global Regions", value: "100+" },
            { icon: <Activity className="w-6 h-6" />, label: "Uptime", value: "99.9%" },
            { icon: <Zap className="w-6 h-6" />, label: "Response Time", value: "<100ms" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
