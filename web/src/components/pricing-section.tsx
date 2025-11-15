

import { motion } from "framer-motion"
import { Check, Sparkles, Zap, Shield, Crown, ArrowRight } from "lucide-react"
import { useState } from "react"

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    priceSubtext: "forever",
    description: "Perfect for testing and personal projects",
    features: [
      "5,000 API requests/month",
      "Access to 10+ AI models",
      "GPT-3.5 Turbo & Claude 3 Haiku",
      "Basic rate limiting",
      "Community support",
      "REST API access",
      "Standard documentation"
    ],
    popular: false,
    cta: "Get Started Free",
    color: "gray",
    highlight: false
  },
  {
    name: "Pro",
    price: "$8",
    priceSubtext: "per month",
    description: "For professionals and growing businesses",
    features: [
      "500,000 API requests/month",
      "Access to 50+ AI models",
      "GPT-4, Claude 3.5 Sonnet, Gemini Pro",
      "Advanced rate limiting & quotas",
      "Priority email support (24h response)",
      "REST & GraphQL APIs",
      "Real-time streaming",
      "Webhook support",
      "Advanced analytics dashboard",
      "Custom model configurations"
    ],
    popular: true,
    cta: "Start 14-Day Free Trial",
    color: "blue",
    highlight: true
  }
]

export function PricingSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <Crown className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-white/80">Pricing Plans</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent mb-4">
            Simple, Transparent Pricing
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            Start free, upgrade to Pro for just $8/month. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl p-8 backdrop-blur-sm border transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-blue-500/10 to-purple-600/10 border-blue-500/30 shadow-lg shadow-blue-500/10"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  {plan.name === 'Free' && <Sparkles className="w-8 h-8 text-gray-400" />}
                  {plan.name === 'Pro' && <Crown className="w-8 h-8 text-blue-400" />}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60 text-lg">{plan.priceSubtext}</span>
                </div>
                <p className="text-white/60 text-sm mt-4">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 text-base ${
                  plan.highlight
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:shadow-xl"
                    : "bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-white/30"
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {[
              {
                icon: <Sparkles className="w-6 h-6 text-blue-400" />,
                title: "14-Day Free Trial",
                description: "Try Pro features free for 14 days, no credit card required"
              },
              {
                icon: <Shield className="w-6 h-6 text-green-400" />,
                title: "No Hidden Fees",
                description: "Transparent pricing with no surprise charges or hidden costs"
              },
              {
                icon: <Zap className="w-6 h-6 text-purple-400" />,
                title: "Cancel Anytime",
                description: "Upgrade, downgrade, or cancel your plan at any time"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">Need Enterprise Features?</h3>
            <p className="text-white/60 mb-6">Custom solutions for large teams with dedicated support, SLA guarantees, and unlimited usage.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Contact Sales Team <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
