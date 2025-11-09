import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const ConsoleHeader = () => {
  const location = useLocation();

  const segments = useMemo(
    () =>
      location.pathname
        .replace('/console', '')
        .split('/')
        .filter(Boolean),
    [location.pathname],
  );

  const title = segments[segments.length - 1]
    ? segments[segments.length - 1].replace(/-/g, ' ')
    : 'Overview';

  const trail = segments.length
    ? ['Dashboard', ...segments.map((segment) => segment.replace(/-/g, ' '))].join(' › ')
    : 'Dashboard';

  return (
    <div className='rounded-3xl border border-slate-200/70 bg-white/95 px-6 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70'>
      <div className='text-sm font-medium text-slate-500 dark:text-white/60'>
        {trail}
      </div>
      <div className='mt-3 flex items-center justify-between'>
        <h1 className='text-xl font-semibold text-slate-900 dark:text-white'>
          {title}
        </h1>
        <span className='rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:border-white/15 dark:bg-white/10 dark:text-white/70'>
          Console
        </span>
      </div>
    </div>
  );
};

export default ConsoleHeader;
