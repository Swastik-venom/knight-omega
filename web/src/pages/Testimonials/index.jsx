import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Users, Building, Globe } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/Footer';

const testimonials = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'CTO',
    company: 'TechFlow AI',
    avatar: '/placeholder-user.jpg',
    content: 'Knight-Omega has transformed how we integrate AI into our products. The unified API saved us months of development time and the reliability is unmatched.',
    rating: 5,
    industry: 'SaaS'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Head of Engineering',
    company: 'DataDriven Inc',
    avatar: '/placeholder-user.jpg',
    content: 'Switching between AI providers used to be a nightmare. With Knight-Omega, we can experiment with different models seamlessly without rewriting our entire codebase.',
    rating: 5,
    industry: 'Analytics'
  },
  {
    id: 3,
    name: 'Michael Park',
    role: 'Founder',
    company: 'StartupAI',
    avatar: '/placeholder-user.jpg',
    content: 'As a startup, we needed flexibility and cost-efficiency. Knight-Omega delivered both. The pricing transparency and model variety are exactly what we needed.',
    rating: 5,
    industry: 'Startup'
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    role: 'VP of Product',
    company: 'Enterprise Solutions',
    avatar: '/placeholder-user.jpg',
    content: 'The enterprise features are top-notch. SOC2 compliance, detailed analytics, and 24/7 support made our security team very happy.',
    rating: 5,
    industry: 'Enterprise'
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'Lead Developer',
    company: 'CreativeAI Studio',
    avatar: '/placeholder-user.jpg',
    content: 'The image generation capabilities through DALL-E and Midjourney are incredible. Having them all in one place with consistent API structure is a game-changer.',
    rating: 5,
    industry: 'Creative'
  },
  {
    id: 6,
    name: 'Lisa Wang',
    role: 'AI Researcher',
    company: 'Research Labs',
    avatar: '/placeholder-user.jpg',
    content: 'For our research projects, we need access to multiple models for comparison. Knight-Omega makes benchmarking and testing incredibly efficient.',
    rating: 5,
    industry: 'Research'
  },
  {
    id: 7,
    name: 'James Thompson',
    role: 'DevOps Lead',
    company: 'CloudNative Co',
    avatar: '/placeholder-user.jpg',
    content: 'The reliability and uptime are exceptional. We have processed millions of API calls without any issues. The monitoring dashboard is also very helpful.',
    rating: 5,
    industry: 'Infrastructure'
  },
  {
    id: 8,
    name: 'Anna Martinez',
    role: 'Product Manager',
    company: 'HealthTech Solutions',
    avatar: '/placeholder-user.jpg',
    content: 'In healthcare, we need accurate and compliant AI solutions. Knight-Omega enterprise features and model variety helped us build a HIPAA-compliant assistant.',
    rating: 5,
    industry: 'Healthcare'
  },
  {
    id: 9,
    name: 'Robert Lee',
    role: 'Senior Engineer',
    company: 'FinanceAI',
    avatar: '/placeholder-user.jpg',
    content: 'The response times are incredible. For our real-time trading analysis, latency matters. Knight-Omega consistently delivers sub-100ms responses.',
    rating: 5,
    industry: 'Finance'
  }
];

const stats = [
  { icon: Users, value: '10,000+', label: 'Developers' },
  { icon: Building, value: '500+', label: 'Companies' },
  { icon: Globe, value: '50+', label: 'Countries' },
  { icon: Star, value: '4.9/5', label: 'Rating' }
];

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.08), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 45%, rgba(59, 130, 246, 0.05), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 55% 35% at 50% 85%, rgba(168, 85, 247, 0.04), transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-50 pt-4 pb-2 flex justify-center">
        <Navigation />
      </div>

      <section className="relative z-10 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <Quote className="w-8 h-8 text-orange-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                What Our Customers Say
              </h1>
            </div>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Join thousands of developers and companies who trust Knight-Omega 
              for their AI integration needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -4 }}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
              >
                <stat.icon className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                  <Quote className="w-8 h-8 text-orange-400/40 mb-4" />
                  
                  <p className="text-white/80 mb-6 leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/60">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/60 border border-white/10">
                      {testimonial.industry}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center p-12 rounded-3xl bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-white/10 backdrop-blur-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Start building with Knight-Omega today and experience why thousands 
              of developers choose us for their AI integration needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
              >
                Get Started Free
              </motion.a>
              <motion.a
                href="/pricing"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                View Pricing
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;