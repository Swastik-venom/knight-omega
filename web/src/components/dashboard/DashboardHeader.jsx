

import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import { RefreshCw, Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardHeader = ({
  getGreeting,
  greetingVisible,
  showSearchModal,
  refresh,
  loading,
  t,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: greetingVisible ? 1 : 0.9, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='relative mb-6 overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-indigo-50 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:from-slate-900 dark:via-slate-900/80 dark:to-indigo-900/60 dark:shadow-[0_24px_60px_rgba(15,23,42,0.35)]'
    >
      <div className='pointer-events-none absolute -top-24 -right-20 h-52 w-52 rounded-full bg-indigo-200/60 blur-3xl dark:bg-indigo-500/40' />
      <div className='pointer-events-none absolute -bottom-32 -left-24 h-60 w-60 rounded-full bg-emerald-200/50 blur-3xl dark:bg-emerald-500/30' />

      <div className='relative flex flex-col justify-between gap-4 lg:flex-row lg:items-center'>
        <div className='space-y-2'>
          <div className='inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.35em] text-slate-500 dark:border-white/20 dark:bg-white/10 dark:text-white/70'>
            <Sparkles className='h-3.5 w-3.5 text-indigo-500 dark:text-indigo-300' />
            {t('控制面板', { defaultValue: 'Control panel' })}
          </div>
          <h2 className='text-3xl font-semibold tracking-tight text-slate-900 dark:text-white'>
            {getGreeting}
          </h2>
          <p className='max-w-xl text-sm text-slate-600 dark:text-white/70'>
            {t(
              '实时洞察、消耗趋势与系统健康状态尽在掌握。使用快速搜索定位资源，或刷新以查看最新运行情况。',
              {
                defaultValue:
                  'Real-time insights, consumption trends, and system health at a glance. Use quick search to locate resources or refresh for the latest activity.',
              },
            )}
          </p>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row'>
          <Button
            icon={<Search size={16} />}
            onClick={showSearchModal}
            className='!h-11 !rounded-full !border-slate-200 !bg-white !px-4 !text-slate-700 hover:!bg-slate-100 dark:!border-white/20 dark:!bg-white/10 dark:!text-white dark:hover:!bg-white/15'
          >
            {t('智能搜索', { defaultValue: 'Smart search' })}
          </Button>
          <Button
            icon={<RefreshCw size={16} />}
            onClick={refresh}
            loading={loading}
            className='!h-11 !rounded-full !bg-gradient-to-r from-indigo-500 to-purple-500 !px-5 !text-white hover:!opacity-90'
          >
            {t('刷新数据', { defaultValue: 'Refresh data' })}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
