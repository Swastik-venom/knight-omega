"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModelPricingData } from '../../hooks/model-pricing/useModelPricingData';
import PricingCategories from '../../components/table/model-pricing/filter/PricingCategories';
import { Input, Spin, Empty, Tag } from '@douyinfe/semi-ui';
import { IconSearch, IconServer, IconLink, IconUser } from '@douyinfe/semi-icons';
import { Crown, Gift, Package, Sparkles } from 'lucide-react';

const ModelsPage: React.FC = () => {
  // Log to verify this component is loading
  console.log('[ModelsPage] Using /api/pricing endpoint with category filtering');
  
  const {
    models,
    loading,
    filteredModels,
    filterCategory,
    setFilterCategory,
    searchValue,
    handleChange,
    t,
  } = useModelPricingData();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pro':
        return <Crown className="w-5 h-5 text-purple-500" />;
      case 'free':
        return <Gift className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-blue-500" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'pro':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
            <Crown className="w-3 h-3" />
            PRO
          </span>
        );
      case 'free':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
            <Gift className="w-3 h-3" />
            FREE
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg">
            <Package className="w-3 h-3" />
            STANDARD
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white">
      {/* Radial gradient overlays matching landing page */}
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.2),transparent_60%)]' />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-md mb-6 dark:border-white/20 dark:bg-white/10">
            <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span className="text-sm font-medium text-slate-600 dark:text-white">
              {t('AI Models Catalog')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
            {t('Explore AI Models')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-white/70 max-w-2xl mx-auto">
            {t('Discover and access powerful AI models from leading providers')}
          </p>
        </motion.div>

        {/* Category Filter - Single Line like Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <nav className="relative flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/90 p-1 text-sm shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/10">
            {[
              { value: 'all', label: t('All Categories'), icon: <Package className="w-4 h-4" />, count: models.length },
              { value: 'pro', label: t('Pro Models'), icon: <Crown className="w-4 h-4" />, count: models.filter(m => m.category === 'pro').length },
              { value: 'free', label: t('Free Models'), icon: <Gift className="w-4 h-4" />, count: models.filter(m => m.category === 'free').length },
              { value: 'standard', label: t('Standard Models'), icon: <Package className="w-4 h-4" />, count: models.filter(m => m.category === 'standard').length },
            ].map((category) => {
              const isActive = filterCategory === category.value;
              return (
                <motion.div
                  key={category.value}
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setFilterCategory(category.value)}
                    disabled={loading}
                    className="relative inline-flex items-center justify-center overflow-hidden rounded-full px-0 py-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="category-pill"
                        className="absolute inset-0 z-0 rounded-full bg-white shadow-sm dark:bg-white/15"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white'
                      }`}
                    >
                      {category.icon}
                      {category.label}
                      <span
                        className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${
                          isActive
                            ? 'bg-indigo-500/15 text-indigo-700 dark:bg-indigo-400/20 dark:text-indigo-300'
                            : 'bg-slate-200/50 text-slate-600 dark:bg-white/10 dark:text-white/50'
                        }`}
                      >
                        {category.count}
                      </span>
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </nav>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto">
            <Input
              prefix={<IconSearch className="text-slate-400 dark:text-white/60" />}
              placeholder={t('Search models by name, provider, or description...')}
              value={searchValue}
              onChange={handleChange}
              size="large"
              showClear
              className="w-full rounded-xl border-slate-200/70 bg-white/90 text-slate-900 placeholder:text-slate-400 shadow-lg backdrop-blur-md dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50 [&_.semi-input]:text-slate-900 dark:[&_.semi-input]:text-white [&_.semi-input]:placeholder:text-slate-400 dark:[&_.semi-input]:placeholder:text-white/50"
            />
          </div>
        </motion.div>

        {/* Models Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : filteredModels.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="py-20 text-center"
          >
            <div className="mx-auto max-w-md">
              <p className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {t('No models found')}
              </p>
              <p className="text-slate-600 dark:text-white/70">
                {t('Try adjusting your filters or search criteria')}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredModels.map((model, index) => (
                <motion.div
                  key={model.model_name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="group"
                >
                  <div className="h-full p-6 rounded-3xl border border-slate-200/70 bg-white/90 backdrop-blur-md shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)] hover:scale-[1.02] hover:-translate-y-1 dark:border-white/15 dark:bg-slate-900/70 dark:shadow-[0_18px_45px_rgba(15,23,42,0.45)]">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(model.category)}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {model.display_name || model.model_name}
                          </h3>
                        </div>
                      </div>
                      {getCategoryBadge(model.category)}
                    </div>

                    {/* Model Name */}
                    <div className="mb-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/50">
                      <p className="text-xs text-slate-500 dark:text-white/50 mb-1">
                        {t('Model ID')}
                      </p>
                      <p className="text-sm font-mono text-slate-700 dark:text-white/90 break-all">
                        {model.model_name}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      {model.vendor_name && (
                        <div className="flex items-center gap-2 text-sm">
                          <IconServer className="w-4 h-4 text-slate-400 dark:text-white/50" />
                          <span className="text-slate-600 dark:text-white/60">
                            {t('Provider')}:
                          </span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {model.vendor_name}
                          </span>
                        </div>
                      )}

                      {model.supported_endpoint_types && model.supported_endpoint_types.length > 0 && (
                        <div className="flex items-start gap-2 text-sm">
                          <IconLink className="w-4 h-4 text-slate-400 dark:text-white/50 mt-0.5" />
                          <div className="flex-1">
                            <span className="text-slate-600 dark:text-white/60">
                              {t('Endpoints')}:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {model.supported_endpoint_types.map((endpoint) => (
                                <Tag
                                  key={endpoint}
                                  size="small"
                                  color="blue"
                                  className="text-xs"
                                >
                                  {endpoint}
                                </Tag>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {model.enable_groups && model.enable_groups.length > 0 && (
                        <div className="flex items-start gap-2 text-sm">
                          <IconUser className="w-4 h-4 text-slate-400 dark:text-white/50 mt-0.5" />
                          <div className="flex-1">
                            <span className="text-slate-600 dark:text-white/60">
                              {t('Groups')}:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {model.enable_groups.slice(0, 3).map((group) => (
                                <Tag
                                  key={group}
                                  size="small"
                                  color="cyan"
                                  className="text-xs"
                                >
                                  {group}
                                </Tag>
                              ))}
                              {model.enable_groups.length > 3 && (
                                <Tag size="small" color="grey" className="text-xs">
                                  +{model.enable_groups.length - 3}
                                </Tag>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-200 dark:border-white/10">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 dark:text-white/50">
                            {model.quota_type === 0 ? t('Unlimited') : t('Quota-based')}
                          </span>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                            className="text-indigo-600 dark:text-indigo-400 font-medium"
                          >
                            {t('View Details')} →
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Summary */}
        {!loading && filteredModels.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-lg dark:border-white/20 dark:bg-white/10">
              <span className="text-sm font-medium text-slate-600 dark:text-white/70">
                {t('Showing')}
              </span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {filteredModels.length}
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-white/70">
                {t('of')}
              </span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {models.length}
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-white/70">
                {t('models')}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ModelsPage;