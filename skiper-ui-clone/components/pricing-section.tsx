"use client"

import { motion } from "framer-motion"
import { Check, Sparkles, Zap, Shield, Crown, ArrowRight } from "lucide-react"
import { useState } from "react"

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for personal projects and small-scale applications",
    features: [
      "10,000 API requests/month",
      "5 AI models (GPT-3.5, Claude 3 Haiku)",
      "Basic rate limiting",
      "Standard support",
      "REST API access",
      "Community forum"
    ],
    popular: false,
    cta: "Get Started",
    color: "gray"
  },
  {
    name: "Pro",
    monthlyPrice: 20,
    annualPrice: 16,
    description: "For professionals and small businesses scaling their AI applications",
    features: [
      "500,000 API requests/month",
      "25+ AI models (GPT-4, Claude 3.5, Gemini Pro)",
      "Advanced rate limiting & quotas",
      "Priority email support",
      "REST & GraphQL APIs",
      "Real-time streaming",
      "Webhook support",
      "Usage analytics dashboard"
    ],
    popular: true,
    cta: "Start Free Trial",
    color: "blue"
  },
  {
    name: "Enterprise",
    monthlyPrice: 40,
    annualPrice: 32,
    description: "For large teams and enterprise-grade deployments",
    features: [
      "Unlimited API requests",
      "All 50+ AI models & future releases",
      "Custom rate limits & quotas",
      "24/7 dedicated support",
      "SLA guarantee (99.9% uptime)",
      "Advanced security & compliance",
      "Team management & RBAC",
      "Custom integrations",
      "Dedicated account manager",
      "Priority feature requests"
    ],
    popular: false,
    cta: "Contact Sales",
    color: "purple"
  },
]

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

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
            Choose the perfect plan for your AI needs. Start free, scale as you grow.
          </p>

          {/* Monthly/Annual Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-4 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm w-fit mx-auto"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !isAnnual ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" : "text-white/60 hover:text-white/80"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 relative ${
                isAnnual ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" : "text-white/60 hover:text-white/80"
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  {plan.name === 'Starter' && <Zap className="w-6 h-6 text-gray-400" />}
                  {plan.name === 'Pro' && <Shield className="w-6 h-6 text-blue-400" />}
                  {plan.name === 'Enterprise' && <Crown className="w-6 h-6 text-purple-400" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  {plan.price ? (
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-white">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-white/60 text-lg">{isAnnual ? "/month" : "/month"}</span>
                    </>
                  )}
                </div>
                <p className="text-white/60 text-sm">{plan.description}</p>
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
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    : plan.name === 'Enterprise'
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
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
          className="text-center mt-16"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Free Trial",
                description: "Try Pro features free for 14 days, no credit card required"
              },
              {
                title: "No Hidden Fees",
                description: "Transparent pricing with no surprise charges or hidden costs"
              },
              {
                title: "Cancel Anytime",
                description: "Upgrade, downgrade, or cancel your plan at any time"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <p className="text-white/60 mb-4">Need a custom solution? We're here to help.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors inline-flex items-center gap-2"
            >
              Contact our sales team <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
