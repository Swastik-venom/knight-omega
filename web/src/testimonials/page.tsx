

import { TestimonialsSection } from "@/components/testimonials"
import { motion } from "framer-motion"

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Testimonials Content */}
      <div className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent mb-4">
            Testimonials
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            See what our users are saying about Knight-Omega and how it has transformed their AI workflow.
          </p>
        </motion.div>

        <TestimonialsSection />
      </div>
    </div>
  )
}
