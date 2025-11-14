import React from 'react';
import { Button, Card } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PricingCards = ({ onGetStarted }) => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('Free'),
      price: '$0',
      period: t('/month'),
      description: t('Perfect for experimentation and hobby projects'),
      icon: <Sparkles size={28} />,
      features: [
        t('10,000 tokens per month'),
        t('Shared capacity pool'),
        t('Standard response times'),
        t('Community support'),
        t('Basic analytics'),
        t('Rate limiting: 60 req/min'),
      ],
      cta: t('Start Free'),
      popular: false,
      gradient: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-500/20',
      buttonStyle: 'outline',
    },
    {
      name: t('Pro'),
      price: '$8',
      period: t('/month'),
      description: t('Unlock premium providers and priority routing'),
      icon: <Crown size={28} />,
      features: [
        t('Everything in Free, plus:'),
        t('Premium model access'),
        t('Priority bandwidth'),
        t('Faster inference lanes'),
        t('Advanced analytics'),
        t('Rate limiting: 300 req/min'),
        t('Email support'),
        t('Consolidated billing'),
      ],
      cta: t('Upgrade to Pro'),
      popular: true,
      gradient: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/30',
      buttonStyle: 'solid',
    },
  ];

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-16'>
      <div className='text-center mb-12'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            {t('Simple, Transparent Pricing')}
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            {t('Start free, upgrade when you need premium features')}
          </p>
        </motion.div>
      </div>

      <div className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='relative'
          >
            {plan.popular && (
              <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 z-10'>
                <span className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1'>
                  <Zap size={14} />
                  {t('Most Popular')}
                </span>
              </div>
            )}

            <Card
              className={`relative overflow-hidden border-2 ${plan.borderColor} transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                plan.popular ? 'shadow-xl' : ''
              } bg-white dark:bg-gray-900`}
              style={{
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-30 dark:opacity-50`} />
              
              <div className='relative z-10 p-8'>
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center gap-3'>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${plan.gradient} border ${plan.borderColor} dark:bg-opacity-80`}>
                      <div className='text-gray-800 dark:text-gray-100'>
                        {plan.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>{plan.name}</h3>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>{plan.description}</p>
                    </div>
                  </div>
                </div>

                <div className='mb-6'>
                  <div className='flex items-baseline gap-1'>
                    <span className='text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
                      {plan.price}
                    </span>
                    <span className='text-gray-600 dark:text-gray-400'>{plan.period}</span>
                  </div>
                </div>

                <Button
                  theme={plan.buttonStyle}
                  type='primary'
                  size='large'
                  block
                  className='mb-6 !rounded-full !h-12 font-semibold'
                  onClick={() => onGetStarted && onGetStarted(plan.name)}
                  style={
                    plan.popular
                      ? {
                          background: 'linear-gradient(135deg, #5f6fff 0%, #5ed4ff 100%)',
                          border: 'none',
                        }
                      : {}
                  }
                >
                  {plan.cta}
                </Button>

                <div className='space-y-3'>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className='flex items-start gap-3'>
                      <div className='mt-1 flex-shrink-0'>
                        <div className='w-5 h-5 rounded-full bg-green-500/20 dark:bg-green-500/30 flex items-center justify-center'>
                          <Check size={14} className='text-green-600 dark:text-green-400' />
                        </div>
                      </div>
                      <span className='text-gray-700 dark:text-gray-300'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='text-center mt-12'
      >
        <p className='text-gray-600 dark:text-gray-400'>
          {t('Need enterprise features?')}{' '}
          <a href='#contact' className='text-blue-600 hover:text-blue-700 font-semibold'>
            {t('Contact us')}
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default PricingCards;