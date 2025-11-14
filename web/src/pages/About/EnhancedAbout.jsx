import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@douyinfe/semi-ui';
import { 
  Heart, 
  Users, 
  Globe, 
  Zap, 
  Shield, 
  TrendingUp,
  Github,
  Mail,
  Twitter
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EnhancedAbout = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const stats = [
    { label: t('Active Users'), value: '10K+', icon: <Users size={24} /> },
    { label: t('API Requests/Day'), value: '1M+', icon: <Zap size={24} /> },
    { label: t('Uptime'), value: '99.95%', icon: <TrendingUp size={24} /> },
    { label: t('Countries'), value: '50+', icon: <Globe size={24} /> },
  ];

  const team = [
    {
      name: 'QuantumNous Team',
      role: t('Core Development'),
      description: t('Building the future of AI API management'),
    },
  ];

  const values = [
    {
      icon: <Shield size={32} />,
      title: t('Security First'),
      description: t('Enterprise-grade security with SOC 2 compliance and end-to-end encryption.'),
    },
    {
      icon: <Zap size={32} />,
      title: t('Performance'),
      description: t('Lightning-fast response times with intelligent routing and caching.'),
    },
    {
      icon: <Heart size={32} />,
      title: t('Developer Experience'),
      description: t('Built by developers, for developers. Simple, intuitive, and powerful.'),
    },
    {
      icon: <Globe size={32} />,
      title: t('Global Scale'),
      description: t('Multi-region deployment with automatic failover and load balancing.'),
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-16'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <h1 className='text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            {t('About Knight Omega')}
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed'>
            {t('We\'re building the most developer-friendly AI API gateway. Our mission is to make AI accessible, reliable, and affordable for everyone.')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-16'
        >
          {stats.map((stat, index) => (
            <Card key={index} className='dashboard-card text-center'>
              <div className='flex justify-center mb-3'>
                <div className='p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
                  {stat.icon}
                </div>
              </div>
              <div className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
                {stat.value}
              </div>
              <div className='text-gray-600 dark:text-gray-400'>{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mb-16'
        >
          <Card className='dashboard-card'>
            <h2 className='text-3xl font-bold mb-6'>{t('Our Story')}</h2>
            <div className='space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed'>
              <p>
                {t('Knight Omega was born from a simple observation: managing multiple AI providers is unnecessarily complex. Developers were spending more time on infrastructure than building amazing products.')}
              </p>
              <p>
                {t('We set out to change that. Our platform provides a unified API that works with all major AI providers, intelligent routing, automatic failover, and transparent pricing. No more juggling multiple API keys or worrying about rate limits.')}
              </p>
              <p>
                {t('Today, Knight Omega powers thousands of applications worldwide, from indie projects to enterprise solutions. We\'re proud to be the infrastructure that enables the next generation of AI applications.')}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='mb-16'
        >
          <h2 className='text-3xl font-bold text-center mb-12'>{t('Our Values')}</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            {values.map((value, index) => (
              <Card key={index} className='dashboard-card'>
                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg'>
                    {value.icon}
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold mb-2'>{value.title}</h3>
                    <p className='text-gray-600 dark:text-gray-400'>{value.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Open Source */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='mb-16'
        >
          <Card className='dashboard-card bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'>
            <div className='text-center'>
              <Github size={48} className='mx-auto mb-4 text-gray-800 dark:text-gray-200' />
              <h2 className='text-3xl font-bold mb-4'>{t('Open Source')}</h2>
              <p className='text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto'>
                {t('Knight Omega is built on open source principles. We believe in transparency, community collaboration, and giving back to the ecosystem.')}
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                <a
                  href='https://github.com/QuantumNous/knight-omega'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full font-semibold hover:scale-105 transition-transform'
                >
                  <Github size={20} />
                  {t('View on GitHub')}
                </a>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className='dashboard-card'>
            <h2 className='text-3xl font-bold text-center mb-8'>{t('Get in Touch')}</h2>
            <div className='grid md:grid-cols-3 gap-6'>
              <div className='text-center'>
                <div className='flex justify-center mb-3'>
                  <div className='p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full'>
                    <Mail size={24} className='text-blue-600 dark:text-blue-400' />
                  </div>
                </div>
                <h3 className='font-semibold mb-2'>{t('Email')}</h3>
                <a href='mailto:support@quantumnous.com' className='text-blue-600 hover:text-blue-700'>
                  support@quantumnous.com
                </a>
              </div>
              <div className='text-center'>
                <div className='flex justify-center mb-3'>
                  <div className='p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full'>
                    <Twitter size={24} className='text-purple-600 dark:text-purple-400' />
                  </div>
                </div>
                <h3 className='font-semibold mb-2'>{t('Twitter')}</h3>
                <a href='https://twitter.com/quantumnous' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-700'>
                  @quantumnous
                </a>
              </div>
              <div className='text-center'>
                <div className='flex justify-center mb-3'>
                  <div className='p-4 bg-green-100 dark:bg-green-900/30 rounded-full'>
                    <Github size={24} className='text-green-600 dark:text-green-400' />
                  </div>
                </div>
                <h3 className='font-semibold mb-2'>{t('GitHub')}</h3>
                <a href='https://github.com/QuantumNous' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-700'>
                  QuantumNous
                </a>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className='mt-16 text-center text-gray-600 dark:text-gray-400'
        >
          <p className='mb-2'>
            <a
              href='https://github.com/QuantumNous/knight-omega'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:text-blue-700 font-semibold'
            >
              Knight Omega
            </a>{' '}
            © {currentYear}{' '}
            <a
              href='https://github.com/QuantumNous'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:text-blue-700'
            >
              QuantumNous
            </a>
          </p>
          <p className='text-sm'>
            {t('Based on')}{' '}
            <a
              href='https://github.com/songquanpeng/one-api'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:text-blue-700'
            >
              One API v0.5.4
            </a>{' '}
            © 2023{' '}
            <a
              href='https://github.com/songquanpeng'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:text-blue-700'
            >
              JustSong
            </a>
          </p>
          <p className='text-sm mt-2'>
            {t('Licensed under')}{' '}
            <a
              href='https://www.gnu.org/licenses/agpl-3.0.html'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:text-blue-700'
            >
              AGPL v3.0
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedAbout;