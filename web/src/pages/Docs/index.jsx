import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Card, Tabs, TabPane, Collapse } from '@douyinfe/semi-ui';
import {
  Book,
  Code,
  Zap,
  Shield,
  Settings,
  Terminal,
  FileText,
  Rocket,
  CheckCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StatusContext } from '../../context/Status';

const Docs = () => {
  const { t } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const [activeTab, setActiveTab] = useState('getting-started');
  
  const serverAddress = statusState?.status?.server_address || `${window.location.origin}`;

  const sections = [
    {
      id: 'getting-started',
      title: t('Getting Started'),
      icon: <Rocket size={20} />,
      content: (
        <div className='space-y-6'>
          <div>
            <h3 className='text-2xl font-bold mb-4'>{t('Quick Start Guide')}</h3>
            <p className='text-gray-600 dark:text-gray-400 mb-4'>
              {t('Get up and running with Knight Omega in minutes. Follow these simple steps to start using our API gateway.')}
            </p>
          </div>

          <Card className='dashboard-card'>
            <h4 className='text-xl font-semibold mb-3 flex items-center gap-2'>
              <CheckCircle size={20} className='text-green-500' />
              {t('Step 1: Create an Account')}
            </h4>
            <p className='text-gray-600 dark:text-gray-400 mb-3'>
              {t('Sign up for a free account to get started. No credit card required.')}
            </p>
            <div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg'>
              <code className='text-sm'>
                {t('Visit')}: <span className='text-blue-600'>{serverAddress}/register</span>
              </code>
            </div>
          </Card>

          <Card className='dashboard-card'>
            <h4 className='text-xl font-semibold mb-3 flex items-center gap-2'>
              <CheckCircle size={20} className='text-green-500' />
              {t('Step 2: Get Your API Key')}
            </h4>
            <p className='text-gray-600 dark:text-gray-400 mb-3'>
              {t('Navigate to the console and generate your first API key.')}
            </p>
            <div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg'>
              <code className='text-sm'>
                Console → Tokens → Create New Token
              </code>
            </div>
          </Card>

          <Card className='dashboard-card'>
            <h4 className='text-xl font-semibold mb-3 flex items-center gap-2'>
              <CheckCircle size={20} className='text-green-500' />
              {t('Step 3: Make Your First Request')}
            </h4>
            <p className='text-gray-600 dark:text-gray-400 mb-3'>
              {t('Use your API key to make requests to any supported AI model.')}
            </p>
            <div className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
              <pre className='text-sm'>
{`curl ${serverAddress}/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-4",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`}
              </pre>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'api-reference',
      title: t('API Reference'),
      icon: <Code size={20} />,
      content: (
        <div className='space-y-6'>
          <div>
            <h3 className='text-2xl font-bold mb-4'>{t('API Endpoints')}</h3>
            <p className='text-gray-600 dark:text-gray-400 mb-4'>
              {t('Complete reference for all available API endpoints and their parameters.')}
            </p>
          </div>

          <Collapse defaultActiveKey={['chat']}>
            <Collapse.Panel header={t('Chat Completions')} itemKey='chat'>
              <div className='space-y-4'>
                <div>
                  <h5 className='font-semibold mb-2'>POST /v1/chat/completions</h5>
                  <p className='text-gray-600 dark:text-gray-400 mb-3'>
                    {t('Create a chat completion with any supported model.')}
                  </p>
                  <div className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
                    <pre className='text-sm'>
{`{
  "model": "gpt-4",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
  "temperature": 0.7,
  "max_tokens": 150
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </Collapse.Panel>

            <Collapse.Panel header={t('Embeddings')} itemKey='embeddings'>
              <div className='space-y-4'>
                <div>
                  <h5 className='font-semibold mb-2'>POST /v1/embeddings</h5>
                  <p className='text-gray-600 dark:text-gray-400 mb-3'>
                    {t('Generate embeddings for text input.')}
                  </p>
                  <div className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
                    <pre className='text-sm'>
{`{
  "model": "text-embedding-ada-002",
  "input": "Your text here"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </Collapse.Panel>

            <Collapse.Panel header={t('Image Generation')} itemKey='images'>
              <div className='space-y-4'>
                <div>
                  <h5 className='font-semibold mb-2'>POST /v1/images/generations</h5>
                  <p className='text-gray-600 dark:text-gray-400 mb-3'>
                    {t('Generate images from text prompts.')}
                  </p>
                  <div className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto'>
                    <pre className='text-sm'>
{`{
  "prompt": "A beautiful sunset over mountains",
  "n": 1,
  "size": "1024x1024"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>
      ),
    },
    {
      id: 'features',
      title: t('Features'),
      icon: <Zap size={20} />,
      content: (
        <div className='space-y-6'>
          <div>
            <h3 className='text-2xl font-bold mb-4'>{t('Platform Features')}</h3>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            <Card className='dashboard-card'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
                  <Shield size={24} className='text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <h4 className='text-lg font-semibold mb-2'>{t('Multi-Provider Routing')}</h4>
                  <p className='text-gray-600 dark:text-gray-400'>
                    {t('Automatic failover across multiple AI providers ensures 99.95% uptime.')}
                  </p>
                </div>
              </div>
            </Card>

            <Card className='dashboard-card'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg'>
                  <Zap size={24} className='text-purple-600 dark:text-purple-400' />
                </div>
                <div>
                  <h4 className='text-lg font-semibold mb-2'>{t('Rate Limiting')}</h4>
                  <p className='text-gray-600 dark:text-gray-400'>
                    {t('Intelligent rate limiting protects your infrastructure and ensures fair usage.')}
                  </p>
                </div>
              </div>
            </Card>

            <Card className='dashboard-card'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-green-100 dark:bg-green-900/30 rounded-lg'>
                  <Settings size={24} className='text-green-600 dark:text-green-400' />
                </div>
                <div>
                  <h4 className='text-lg font-semibold mb-2'>{t('Usage Analytics')}</h4>
                  <p className='text-gray-600 dark:text-gray-400'>
                    {t('Detailed analytics help you understand usage patterns and optimize costs.')}
                  </p>
                </div>
              </div>
            </Card>

            <Card className='dashboard-card'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg'>
                  <Terminal size={24} className='text-orange-600 dark:text-orange-400' />
                </div>
                <div>
                  <h4 className='text-lg font-semibold mb-2'>{t('Developer Tools')}</h4>
                  <p className='text-gray-600 dark:text-gray-400'>
                    {t('Built-in playground, API testing tools, and comprehensive documentation.')}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'pricing-info',
      title: t('Pricing'),
      icon: <FileText size={20} />,
      content: (
        <div className='space-y-6'>
          <div>
            <h3 className='text-2xl font-bold mb-4'>{t('Pricing Information')}</h3>
            <p className='text-gray-600 dark:text-gray-400 mb-4'>
              {t('Transparent pricing with no hidden fees. Start free, upgrade when you need more.')}
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            <Card className='dashboard-card border-2 border-blue-500/30'>
              <h4 className='text-xl font-bold mb-4'>{t('Free Tier')}</h4>
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <CheckCircle size={18} className='text-green-500' />
                  <span>{t('10,000 tokens per month')}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle size={18} className='text-green-500' />
                  <span>{t('Shared capacity pool')}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle size={18} className='text-green-500' />
                  <span>{t('60 requests per minute')}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle size={18} className='text-green-500' />
                  <span>{t('Community support')}</span>
                </div>
              </div>
            </Card>

            <Card className='dashboard-card border-2 border-purple-500/30'>
              <h4 className='text-xl font-bold mb-4'>{t('Pro Plan - $8/month')}</h4>
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <CheckCircle size={18} className='text-green-500' />
                  <span>{t('Everything in Free, plus:')}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle size={18} className='text-green-500' />
                  <span>{t('Premium model access')}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle size={18} className='text-green-500' />
                  <span>{t('300 requests per minute')}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle size={18} className='text-green-500' />
                  <span>{t('Priority support')}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-16'>
      <div className='max-w-7xl mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <div className='flex items-center justify-center gap-3 mb-4'>
            <Book size={40} className='text-blue-600' />
            <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              {t('Documentation')}
            </h1>
          </div>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            {t('Everything you need to know about Knight Omega API Gateway')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className='dashboard-card'>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              type='line'
              size='large'
            >
              {sections.map((section) => (
                <TabPane
                  key={section.id}
                  tab={
                    <span className='flex items-center gap-2'>
                      {section.icon}
                      {section.title}
                    </span>
                  }
                  itemKey={section.id}
                >
                  <div className='py-6'>
                    {section.content}
                  </div>
                </TabPane>
              ))}
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Docs;