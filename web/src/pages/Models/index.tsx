import React from 'react';
import { motion } from 'framer-motion';
import ModelsContent from './ModelsContent';
import Footer from '../../components/Footer';

const ModelsPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.2),transparent_60%)]" />
      
      {/* Header Section */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-slate-500 shadow-sm backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:text-white/70">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>AI Models</span>
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Explore AI Models
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-center text-base text-slate-600 dark:text-white/70 sm:text-lg">
              Browse and manage available AI models from multiple providers. Configure pricing, manage vendors, and optimize your AI infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Models Content */}
      <section className="relative pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ModelsContent />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ModelsPage;