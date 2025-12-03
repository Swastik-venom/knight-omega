import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { StatusContext } from '../../context/Status';
import { getSystemName } from '@/helpers';
import {
  BookOpen,
  Map,
  Rocket,
  FileCode,
  Cpu,
  Copy,
  Check,
  Terminal,
  Braces,
  MessageSquare,
  Image,
  AudioLines,
  Video,
  Search,
  Sparkles,
  RefreshCw,
  Shield,
  Zap,
} from 'lucide-react';
import TestimonialsSection from '../LandingPage/Testimonials';

// Endpoint category component
const EndpointCategory = ({ title, icon, endpoints, baseUrl }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className='rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_55px_rgba(15,23,42,0.4)]'
    >
      <div className='mb-4 flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500/15 to-sky-500/15 text-indigo-500 dark:text-indigo-300'>
          {icon}
        </div>
        <h3 className='text-lg font-semibold text-slate-900 dark:text-white'>{title}</h3>
      </div>
      <div className='space-y-3'>
        {endpoints.map((endpoint, index) => (
          <div
            key={index}
            className='group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-50/80 p-4 transition hover:border-indigo-200 dark:border-white/10 dark:bg-slate-800/50 dark:hover:border-indigo-400/30'
          >
            <div className='flex items-start justify-between gap-4'>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 mb-2'>
                  <span className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-bold ${
                    endpoint.method === 'GET' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                      : endpoint.method === 'POST'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300'
                      : endpoint.method === 'DELETE'
                      ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                  }`}>
                    {endpoint.method}
                  </span>
                  <span className='text-sm font-medium text-slate-700 dark:text-white/90'>
                    {endpoint.name}
                  </span>
                </div>
                <code className='block text-sm text-slate-600 dark:text-white/70 font-mono break-all'>
                  {baseUrl}{endpoint.path}
                </code>
                {endpoint.description && (
                  <p className='mt-2 text-xs text-slate-500 dark:text-white/50'>
                    {endpoint.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleCopy(`${baseUrl}${endpoint.path}`, index)}
                className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200/70 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:border-white/20 dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/20'
              >
                {copiedIndex === index ? (
                  <Check className='h-4 w-4 text-emerald-500' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Code example component
const CodeExample = ({ title, code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className='rounded-2xl border border-slate-200/60 bg-slate-900 overflow-hidden dark:border-white/10'>
      <div className='flex items-center justify-between border-b border-slate-700/50 px-4 py-2'>
        <span className='text-xs font-medium text-slate-400'>{title}</span>
        <button
          onClick={handleCopy}
          className='flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white'
        >
          {copied ? <Check className='h-3 w-3' /> : <Copy className='h-3 w-3' />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className='overflow-x-auto p-4 text-sm'>
        <code className='text-slate-300 font-mono whitespace-pre'>{code}</code>
      </pre>
    </div>
  );
};

const guides = [
  {
    icon: <Rocket className='h-5 w-5' />,
    title: 'Quickstart blueprints',
    description:
      'Bootstrap your workspace, connect providers, and ship your first flow in minutes with guided walkthroughs.',
    href: '#quickstart',
  },
  {
    icon: <FileCode className='h-5 w-5' />,
    title: 'API and SDK reference',
    description:
      'Deep dive into REST, WebSocket, and SDK integrations with annotated examples in TypeScript, Python, and Go.',
    href: '#api-reference',
  },
  {
    icon: <Cpu className='h-5 w-5' />,
    title: 'Workflow recipes',
    description:
      'Model routing, guardrails, billing automation, and analytics dashboards built with production-ready snippets.',
    href: '#recipes',
  },
];

const DocsPage = () => {
  const { t } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const [copied, setCopied] = useState(false);
  
  // Get the base URL dynamically from the current window location
  const baseUrl = useMemo(() => window.location.origin, []);
  const systemName = useMemo(
    () => statusState?.status?.SystemName || getSystemName(),
    [statusState?.status?.SystemName],
  );

  // API Endpoint categories
  const apiEndpoints = useMemo(() => ({
    chat: {
      title: 'Chat Completions (OpenAI Compatible)',
      icon: <MessageSquare className='h-5 w-5' />,
      endpoints: [
        { method: 'POST', name: 'Chat Completions', path: '/v1/chat/completions', description: 'Create a chat completion with streaming support' },
        { method: 'POST', name: 'Completions', path: '/v1/completions', description: 'Create a text completion (legacy)' },
      ],
    },
    anthropic: {
      title: 'Anthropic Claude API',
      icon: <Sparkles className='h-5 w-5' />,
      endpoints: [
        { method: 'POST', name: 'Messages', path: '/v1/messages', description: 'Claude-style messages API' },
      ],
    },
    embeddings: {
      title: 'Embeddings',
      icon: <Braces className='h-5 w-5' />,
      endpoints: [
        { method: 'POST', name: 'Create Embeddings', path: '/v1/embeddings', description: 'Create vector embeddings for text' },
      ],
    },
    images: {
      title: 'Image Generation',
      icon: <Image className='h-5 w-5' />,
      endpoints: [
        { method: 'POST', name: 'Generate Images', path: '/v1/images/generations', description: 'Generate images with DALL-E, Midjourney, etc.' },
        { method: 'POST', name: 'Edit Images', path: '/v1/images/edits', description: 'Edit existing images' },
        { method: 'POST', name: 'Image Variations', path: '/v1/images/variations', description: 'Create variations of an image' },
      ],
    },
    audio: {
      title: 'Audio',
      icon: <AudioLines className='h-5 w-5' />,
      endpoints: [
        { method: 'POST', name: 'Speech to Text', path: '/v1/audio/transcriptions', description: 'Transcribe audio to text (Whisper)' },
        { method: 'POST', name: 'Text to Speech', path: '/v1/audio/speech', description: 'Convert text to speech' },
        { method: 'POST', name: 'Translations', path: '/v1/audio/translations', description: 'Translate audio to English' },
      ],
    },
    video: {
      title: 'Video Generation',
      icon: <Video className='h-5 w-5' />,
      endpoints: [
        { method: 'POST', name: 'Generate Video', path: '/v1/video/generations', description: 'Generate videos with Sora, Kling, etc.' },
      ],
    },
    models: {
      title: 'Models',
      icon: <Cpu className='h-5 w-5' />,
      endpoints: [
        { method: 'GET', name: 'List Models', path: '/v1/models', description: 'List all available models' },
        { method: 'GET', name: 'Retrieve Model', path: '/v1/models/{model}', description: 'Get details of a specific model' },
      ],
    },
    rerank: {
      title: 'Reranking',
      icon: <Search className='h-5 w-5' />,
      endpoints: [
        { method: 'POST', name: 'Rerank', path: '/v1/rerank', description: 'Rerank documents by relevance (Jina, Cohere)' },
      ],
    },
    billing: {
      title: 'Billing & Usage',
      icon: <Shield className='h-5 w-5' />,
      endpoints: [
        { method: 'GET', name: 'Subscription', path: '/v1/dashboard/billing/subscription', description: 'Get subscription details' },
        { method: 'GET', name: 'Usage', path: '/v1/dashboard/billing/usage', description: 'Get usage statistics' },
      ],
    },
  }), []);

  const handleCopyBaseUrl = async () => {
    try {
      await navigator.clipboard.writeText(baseUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Code examples
  const curlExample = `curl ${baseUrl}/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-4",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "stream": true
  }'`;

  const pythonExample = `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="${baseUrl}/v1"
)

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Hello!"}
    ],
    stream=True
)

for chunk in response:
    print(chunk.choices[0].delta.content, end="")`;

  const nodeExample = `import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'YOUR_API_KEY',
  baseURL: '${baseUrl}/v1',
});

const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'user', content: 'Hello!' }
  ],
  stream: true,
});

for await (const chunk of response) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}`;

  const anthropicExample = `curl ${baseUrl}/v1/messages \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{
    "model": "claude-3-opus-20240229",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello, Claude!"}
    ]
  }'`;

  return (
    <div className='min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white'>
      {/* Hero Section */}
      <section className='relative overflow-hidden pt-32 pb-24 sm:pt-36'>
        <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.2),transparent_60%)]' />
        <div className='mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 text-center'>
          <span className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 shadow-sm backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:text-white/70'>
            API Documentation
          </span>
          <h1 className='text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white'>
            {systemName} API Reference
          </h1>
          <p className='max-w-3xl text-base text-slate-600 dark:text-white/70'>
            OpenAI-compatible API gateway supporting multiple providers including GPT-4, Claude, Gemini, and more. 
            Drop-in replacement for OpenAI API with unified billing and observability.
          </p>

          {/* Base URL Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='w-full max-w-2xl'
          >
            <div className='relative flex items-center gap-4 rounded-3xl border border-slate-200/70 bg-white/90 px-4 py-4 shadow-[0_14px_35px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_14px_35px_rgba(15,23,42,0.45)]'>
              <div className='hidden h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-500 sm:flex'>
                <Terminal className='h-5 w-5' />
              </div>
              <div className='flex-1'>
                <p className='text-xs font-medium text-slate-500 dark:text-white/50 mb-1'>API Base URL</p>
                <code className='text-sm font-mono text-slate-700 dark:text-white'>{baseUrl}/v1</code>
              </div>
              <button
                onClick={handleCopyBaseUrl}
                className='flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/70 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-white/20 dark:bg-white/10 dark:text-white'
              >
                {copied ? (
                  <Check className='h-4 w-4 text-emerald-500' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </button>
            </div>
          </motion.div>

          <div className='flex flex-wrap items-center justify-center gap-4'>
            <a
              href='#api-reference'
              className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5'
            >
              Explore API Endpoints
            </a>
            <Link
              to='/console/token'
              className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/15 dark:bg-white/10 dark:text-white/80'
            >
              Get API Key
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className='relative mx-auto mb-16 w-full max-w-6xl px-6'>
        <div className='grid gap-6 md:grid-cols-3'>
          {guides.map((guide) => (
            <a
              key={guide.title}
              href={guide.href}
              className='group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 p-8 text-left shadow-[0_20px_55px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-indigo-400/30 dark:hover:shadow-[0_28px_70px_rgba(15,23,42,0.45)]'
            >
              <div className='absolute -top-24 right-0 h-36 w-36 rounded-full bg-indigo-200/40 blur-3xl transition-opacity group-hover:opacity-100 dark:bg-indigo-500/30' />
              <div className='mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500/15 to-sky-500/15 p-3 text-indigo-500 dark:text-indigo-300'>
                {guide.icon}
              </div>
              <h3 className='text-lg font-semibold text-slate-900 dark:text-white'>
                {guide.title}
              </h3>
              <p className='mt-3 text-sm text-slate-600 dark:text-white/70'>
                {guide.description}
              </p>
              <span className='mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 transition group-hover:translate-x-1 dark:text-indigo-300'>
                Learn more →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Quick Start Section */}
      <section id='quickstart' className='relative mx-auto mb-16 w-full max-w-6xl px-6'>
        <div className='rounded-3xl border border-slate-200/70 bg-white/95 p-8 shadow-[0_28px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_28px_70px_rgba(15,23,42,0.45)]'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-500 dark:text-emerald-300'>
              <Zap className='h-5 w-5' />
            </div>
            <h2 className='text-2xl font-semibold text-slate-900 dark:text-white'>Quick Start</h2>
          </div>
          
          <p className='text-slate-600 dark:text-white/70 mb-6'>
            {systemName} is fully compatible with OpenAI's SDK. Simply change the base URL to start using multiple AI providers through a single API.
          </p>

          <div className='grid gap-6 lg:grid-cols-2'>
            <CodeExample title='cURL' code={curlExample} />
            <CodeExample title='Python (OpenAI SDK)' code={pythonExample} />
            <CodeExample title='Node.js (OpenAI SDK)' code={nodeExample} />
            <CodeExample title='Anthropic API Format' code={anthropicExample} />
          </div>
        </div>
      </section>

      {/* API Reference Section */}
      <section id='api-reference' className='relative mx-auto mb-16 w-full max-w-6xl px-6'>
        <div className='mb-10 text-center'>
          <h2 className='text-3xl font-semibold text-slate-900 dark:text-white'>API Endpoints</h2>
          <p className='mt-4 text-slate-600 dark:text-white/70'>
            All endpoints automatically route to the best available provider based on your configuration.
          </p>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          {Object.values(apiEndpoints).map((category) => (
            <EndpointCategory
              key={category.title}
              title={category.title}
              icon={category.icon}
              endpoints={category.endpoints}
              baseUrl={baseUrl}
            />
          ))}
        </div>
      </section>

      {/* Supported Providers Section */}
      <section id='recipes' className='relative mx-auto mb-24 w-full max-w-6xl px-6'>
        <div className='rounded-3xl border border-slate-200/70 bg-white/95 p-10 shadow-[0_24px_60px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_24px_60px_rgba(15,23,42,0.45)]'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500/15 to-pink-500/15 text-purple-500 dark:text-purple-300'>
              <RefreshCw className='h-5 w-5' />
            </div>
            <h2 className='text-2xl font-semibold text-slate-900 dark:text-white'>Supported Providers</h2>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {[
              { name: 'OpenAI', models: 'GPT-4, GPT-4o, o1, DALL-E 3' },
              { name: 'Anthropic', models: 'Claude 3.5, Claude 3 Opus/Sonnet/Haiku' },
              { name: 'Google', models: 'Gemini Pro, Gemini 1.5' },
              { name: 'DeepSeek', models: 'DeepSeek V3, DeepSeek Coder' },
              { name: 'Mistral', models: 'Mistral Large, Medium, Small' },
              { name: 'Cohere', models: 'Command R+, Rerank' },
              { name: 'Perplexity', models: 'Sonar, Online Models' },
              { name: 'xAI', models: 'Grok-2, Grok-2 Vision' },
              { name: 'Azure OpenAI', models: 'All Azure-hosted models' },
              { name: 'AWS Bedrock', models: 'Claude, Titan, Llama' },
              { name: 'Vertex AI', models: 'Gemini, PaLM' },
              { name: 'Ollama', models: 'Local models' },
            ].map((provider) => (
              <div
                key={provider.name}
                className='rounded-2xl border border-slate-200/60 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-800/50'
              >
                <h4 className='font-semibold text-slate-900 dark:text-white'>{provider.name}</h4>
                <p className='mt-1 text-xs text-slate-500 dark:text-white/50'>{provider.models}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container mx-auto px-4 pb-24'>
        <div className='relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 px-6 py-12 text-center shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_55px_rgba(15,23,42,0.4)]'>
          <div className='absolute inset-0 bg-gradient-to-r from-indigo-200/50 via-transparent to-sky-200/50 opacity-70 dark:from-indigo-500/20 dark:to-sky-500/20' />
          <div className='relative space-y-4'>
            <h3 className='text-2xl font-semibold text-slate-900 dark:text-white'>
              Ready to integrate?
            </h3>
            <p className='mx-auto max-w-2xl text-sm text-slate-600 dark:text-white/70'>
              Create your API key and start building with {systemName} in minutes.
            </p>
            <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <Link
                to='/console/token'
                className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(79,70,229,0.45)]'
              >
                Generate API Key
              </Link>
              <Link
                to='/console/playground'
                className='inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/20 dark:bg-white/10 dark:text-white/80'
              >
                Try Playground
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </div>
  );
};

export default DocsPage;
