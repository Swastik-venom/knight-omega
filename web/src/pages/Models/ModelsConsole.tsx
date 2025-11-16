"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModelPricingData } from '../../hooks/model-pricing/useModelPricingData';
import PricingCategories from '../../components/table/model-pricing/filter/PricingCategories';
import { Input, Spin, Empty, Tag } from '@douyinfe/semi-ui';
import { IconSearch, IconServer, IconLink, IconUser } from '@douyinfe/semi-icons';
import { Crown, Gift, Package, Sparkles } from 'lucide-react';

const ModelsConsole: React.FC = () => {
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
        return <Crown className="w-4 h-4 text-purple-500" />;
      case 'free':
        return <Gift className="w-4 h-4 text-green-500" />;
      default:
        return <Package className="w-4 h-4 text-blue-500" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'pro':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
            <Crown className="w-3 h-3" />
            PRO
          </span>
        );
      case 'free':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm">
            <Gift className="w-3 h-3" />
            FREE
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm">
            <Package className="w-3 h-3" />
            STANDARD
          </span>
        );
    }
  };

  return (
    <div className="px-6 py-6">
      {/* Hero Section - Compact for console */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-slate-500 dark:text-white/60" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('AI Models')}
          </h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-white/60">
          {t('Browse and manage available AI models from leading providers')}
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <PricingCategories
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          models={models}
          loading={loading}
          t={t}
        />
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <Input
          prefix={<IconSearch className="text-slate-400" />}
          placeholder={t('Search models by name, provider, or description...')}
          value={searchValue}
          onChange={handleChange}
          size="large"
          showClear
          className="w-full"
          style={{
            backgroundColor: 'var(--semi-color-bg-2)',
            borderColor: 'var(--semi-color-border)',
          }}
        />
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
        >
          <Empty
            title={t('No models found')}
            description={t('Try adjusting your filters or search criteria')}
            className="py-20"
          />
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.model_name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group"
              >
                <motion.div
                  className="h-full p-5 rounded-xl border border-slate-200/70 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-slate-800/50"
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      {getCategoryIcon(model.category)}
                      <h3 className="text-base font-semibold text-slate-500 group-hover:text-slate-900 dark:text-white/60 dark:group-hover:text-white transition-colors truncate">
                        {model.display_name || model.model_name}
                      </h3>
                    </div>
                    {getCategoryBadge(model.category)}
                  </div>

                  {/* Model Name */}
                  <div className="mb-4 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-white/40 mb-1 font-medium">
                      {t('Model ID')}
                    </p>
                    <p className="text-xs font-mono text-slate-600 dark:text-white/70 break-all leading-relaxed">
                      {model.model_name}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2.5">
                    {model.vendor_name && (
                      <div className="flex items-center gap-2 text-xs">
                        <IconServer className="w-3.5 h-3.5 text-slate-400 dark:text-white/40 flex-shrink-0" />
                        <span className="text-slate-400 dark:text-white/40">
                          {t('Provider')}:
                        </span>
                        <span className="font-medium text-slate-600 dark:text-white/70 truncate">
                          {model.vendor_name}
                        </span>
                      </div>
                    )}

                    {model.supported_endpoint_types && model.supported_endpoint_types.length > 0 && (
                      <div className="flex items-start gap-2 text-xs">
                        <IconLink className="w-3.5 h-3.5 text-slate-400 dark:text-white/40 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <span className="text-slate-400 dark:text-white/40">
                            {t('Endpoints')}:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {model.supported_endpoint_types.map((endpoint) => (
                              <Tag
                                key={endpoint}
                                size="small"
                                color="blue"
                                className="text-[10px] px-1.5 py-0.5"
                              >
                                {endpoint}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {model.enable_groups && model.enable_groups.length > 0 && (
                      <div className="flex items-start gap-2 text-xs">
                        <IconUser className="w-3.5 h-3.5 text-slate-400 dark:text-white/40 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <span className="text-slate-400 dark:text-white/40">
                            {t('Groups')}:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {model.enable_groups.slice(0, 3).map((group) => (
                              <Tag
                                key={group}
                                size="small"
                                color="cyan"
                                className="text-[10px] px-1.5 py-0.5"
                              >
                                {group}
                              </Tag>
                            ))}
                            {model.enable_groups.length > 3 && (
                              <Tag size="small" color="grey" className="text-[10px] px-1.5 py-0.5">
                                +{model.enable_groups.length - 3}
                              </Tag>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-2.5 border-t border-slate-100 dark:border-slate-700/50">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 dark:text-white/40">
                          {model.quota_type === 0 ? t('Unlimited') : t('Quota-based')}
                        </span>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: hoveredIndex === index ? 1 : 0,
                            x: hoveredIndex === index ? 0 : -10,
                          }}
                          transition={{ duration: 0.2 }}
                          className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1"
                        >
                          {t('View')} →
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm border border-slate-200/70 dark:bg-slate-800/50 dark:border-white/10">
            <span className="text-xs font-medium text-slate-500 dark:text-white/60">
              {t('Showing')}
            </span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {filteredModels.length}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-white/60">
              {t('of')}
            </span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {models.length}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-white/60">
              {t('models')}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ModelsConsole;