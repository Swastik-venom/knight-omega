"use client"

import { geist } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ArrowRight, Zap, Shield, Globe, Cpu, Code, Database, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {

  const features = [
    {
      title: "Lightning Fast",
      description: "Low latency API responses with global edge caching",
      icon: <Zap className="h-full w-full" />,
      variant: "blue",
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance ready",
      icon: <Shield className="h-full w-full" />,
      variant: "purple",
    },
  ] as const

  return (
    <div id="hero-section" className="bg-background relative min-h-screen w-full overflow-x-hidden py-32 md:px-6">
      <img
        src="/vector1.webp"
        alt="Vector"
        width={300}
        draggable={false}
        height={300}
        className="absolute top-0 right-0 z-[2] object-cover object-center select-none"
      />
      <img
        src="/vector2.png"
        alt="Vector"
        width={300}
        height={300}
        draggable={false}
        className="absolute top-0 left-0 z-[2] object-cover object-center select-none"
      />
      <img
        src="/vector5.webp"
        alt="Vector"
        width={300}
        draggable={false}
        height={300}
        className="absolute bottom-0 -left-44 z-[2] -rotate-90 object-cover object-center select-none"
      />
      <img
        src="/vector6.png"
        alt="Vector"
        width={300}
        draggable={false}
        height={300}
        className="absolute -right-44 bottom-0 z-[2] rotate-90 object-cover object-center select-none"
      />
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Cpu className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-white/80">AI API Gateway</span>
          </div>
        </motion.div>
        <div className="mx-auto mt-5 max-w-4xl text-center">
          <motion.h1
            className={cn(
              "from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 max-w-5xl bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none",
              geist.className,
            )}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            The Ultimate
            <span className="inline-flex items-center gap-2 mx-4 mb-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">KΩ</span>
              </div>
            </span>
            AI API Gateway
          </motion.h1>
        </div>
        <motion.div
          className="mx-auto mt-5 max-w-3xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
        >
          <p className="text-muted-foreground text-xl">
            Seamlessly access 50+ leading AI models through a single, unified API. 
            Built for developers, trusted by enterprises, powered by cutting-edge technology.
          </p>
        </motion.div>
        <motion.div
          className="mt-8 flex justify-center gap-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.4 }}
        >
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              Get Started Free
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              View Docs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          className="mt-5 flex items-center justify-center gap-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.75 }}
        >
          <span className="text-sm text-gray-500">Trusted by developers building with</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Code className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-white/80">OpenAI</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Database className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-white/80">Claude</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-white/80">Gemini</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Globe className="w-4 h-4 text-green-400" />
              <span className="text-xs text-white/80">+47 more</span>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-12 max-w-4xl text-center">
          <div className="grid md:grid-cols-2 gap-8 justify-center">
            {features.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.25 + i * 0.2 }}
                className="group relative rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                  <p className="text-white/60 text-sm">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
