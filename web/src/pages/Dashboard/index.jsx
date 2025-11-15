

import React from 'react';
import Dashboard from '../../components/dashboard';

const Detail = () => (
  <div className='mt-16 px-4 pb-12'>
    <div className='relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_32px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_32px_80px_rgba(15,23,42,0.45)]'>
      <div className='pointer-events-none absolute -top-32 right-[-120px] h-60 w-60 rounded-full bg-indigo-200/60 blur-[140px] dark:bg-indigo-500/30' />
      <div className='pointer-events-none absolute -bottom-32 left-[-110px] h-56 w-56 rounded-full bg-sky-200/55 blur-[140px] dark:bg-sky-500/25' />
      <div className='relative'>
        <Dashboard />
      </div>
    </div>
  </div>
);

export default Detail;
