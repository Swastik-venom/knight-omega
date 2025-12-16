

import Features from "@/components/features"
import { motion } from "framer-motion"
import { Sparkles, Zap, ShieldCheck, Globe2 } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white">
      {/* Landing-style radial overlays */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.2),transparent_60%)]" />

      {/* Subtle animated blobs (kept neutral; avoid bluish wash) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-200/40 blur-[120px] dark:bg-indigo-500/25"
        animate={{ y: [0, 18, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-140px] right-[-80px] -z-10 h-72 w-72 rounded-full bg-purple-200/35 blur-[130px] dark:bg-purple-500/20"
        animate={{ y: [0, -16, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-4xl px-4 text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/85 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/10 dark:text-white/70">
            <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-300" />
            Product highlights
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Features that scale with your AI traffic
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 dark:text-white/70">
            Explore the capabilities that make Knight-Omega feel fast, safe, and delightful — from governance to routing.
          </p>

          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600 dark:text-white/60">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 backdrop-blur-md dark:border-white/15 dark:bg-white/10">
              <ShieldCheck className="h-4 w-4 text-indigo-500 dark:text-indigo-300" />
              Secure
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 backdrop-blur-md dark:border-white/15 dark:bg-white/10">
              <Globe2 className="h-4 w-4 text-indigo-500 dark:text-indigo-300" />
              Global
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 backdrop-blur-md dark:border-white/15 dark:bg-white/10">
              <Zap className="h-4 w-4 text-indigo-500 dark:text-indigo-300" />
              Fast
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mx-auto w-full max-w-7xl px-4"
        >
          {/* Glass container to match landing cards */}
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_20px_55px_rgba(15,23,42,0.45)] md:p-8">
            <Features />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
