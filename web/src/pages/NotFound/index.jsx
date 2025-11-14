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
import { useNavigate } from 'react-router-dom';
import { Button } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-500'>
      <div className='max-w-2xl w-full text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <div className='mb-8'>
            <h1 className='text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
              404
            </h1>
          </div>

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mb-6'
          >
            <div className='inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6'>
              <Search size={48} className='text-blue-600 dark:text-blue-400' />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4'
          >
            {t('Page Not Found')}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto'
          >
            {t('The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.')}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            <Button
              theme='solid'
              type='primary'
              size='large'
              icon={<Home size={20} />}
              onClick={() => navigate('/')}
              className='!rounded-full min-w-[160px]'
              style={{
                background: 'linear-gradient(135deg, #5f6fff 0%, #5ed4ff 100%)',
                border: 'none',
              }}
            >
              {t('Go Home')}
            </Button>

            <Button
              theme='outline'
              size='large'
              icon={<ArrowLeft size={20} />}
              onClick={() => navigate(-1)}
              className='!rounded-full min-w-[160px]'
            >
              {t('Go Back')}
            </Button>
          </motion.div>

          {/* Additional Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='mt-12 pt-8 border-t border-gray-200 dark:border-gray-700'
          >
            <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
              {t('You might be interested in:')}
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <button
                onClick={() => navigate('/docs')}
                className='text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-none'
              >
                {t('Documentation')}
              </button>
              <span className='text-gray-400'>•</span>
              <button
                onClick={() => navigate('/about')}
                className='text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-none'
              >
                {t('About')}
              </button>
              <span className='text-gray-400'>•</span>
              <button
                onClick={() => navigate('/pricing')}
                className='text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-none'
              >
                {t('Pricing')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;