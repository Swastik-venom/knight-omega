/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

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
