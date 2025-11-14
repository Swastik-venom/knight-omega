"use client"
import { useState, useEffect } from "react"
import Hero from "@/components/home/hero"
import Features from "@/components/features"
import { TestimonialsSection } from "@/components/testimonials"
import { NewReleasePromo } from "@/components/new-release-promo"
import { FAQSection } from "@/components/faq-section"
import { PricingSection } from "@/components/pricing-section"
import { StickyFooter } from "@/components/sticky-footer"

export default function Home() {
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "system")
    root.classList.add("dark")
  }, [])

  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden">
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

      {/* Sticky Footer */}
      <StickyFooter />
    </div>
  )
}
