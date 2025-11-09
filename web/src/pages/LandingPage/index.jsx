import React, { useState, useEffect, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/User';
import { useTranslation } from 'react-i18next';
import { StatusContext } from '../../context/Status';
import { getLogo, getSystemName } from '../../helpers';
import TestimonialsSection from './Testimonials';
import {
  Layers,
  ShieldCheck,
  Zap,
  Gauge,
  Braces,
  Wallet,
  ServerCog,
  Radar,
} from 'lucide-react';

const FeatureCard = ({ icon, title, description, index }) => (
  <motion.div
    className='relative rounded-3xl border border-slate-200/70 bg-white/90 p-6 text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-slate-900/70 dark:shadow-[0_18px_45px_rgba(15,23,42,0.45)]'
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
  >
    <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500/15 to-sky-500/15 text-indigo-500 dark:text-indigo-300'>
      {icon}
    </div>
    <h3 className='text-xl font-semibold text-slate-900 dark:text-white'>{title}</h3>
    <p className='mt-2 text-sm text-slate-600 dark:text-white/70'>{description}</p>
  </motion.div>
);

const LandingPage = () => {
  const { t } = useTranslation();
  const { userState } = useContext(UserContext);
  const { status } = useContext(StatusContext);
  const [copied, setCopied] = useState(false);

  const logo = useMemo(() => getLogo(status), [status]);
  const systemName = useMemo(() => getSystemName(status), [status]);

  const features = useMemo(
    () => [
      {
        icon: <Layers className='h-5 w-5' />,
        title: t('Unified orchestration'),
        description: t('Manage every provider with a single key to minimise context switching and enforce consistent integrations.'),
      },
      {
        icon: <ShieldCheck className='h-5 w-5' />,
        title: t('Security and governance'),
        description: t('Apply fine-grained keys and rate policies that scale with teams, environments, and audit requirements.'),
      },
      {
        icon: <Zap className='h-5 w-5' />,
        title: t('Adaptive routing'),
        description: t('Route calls based on latency, spend, and SLA targets to keep every experience responsive.'),
      },
      {
        icon: <Gauge className='h-5 w-5' />,
        title: t('Live observability'),
        description: t('Visualise call chains, response times, and error rates with rich filtering and proactive alerts.'),
      },
      {
        icon: <Braces className='h-5 w-5' />,
        title: t('Developer experience'),
        description: t('Ship faster with unified SDKs, CLI tooling, and multilingual examples that keep best practices close.'),
      },
      {
        icon: <Wallet className='h-5 w-5' />,
        title: t('Cost intelligence'),
        description: t('Track spend hourly, forecast consumption, and stay on budget while scaling usage.'),
      },
      {
        icon: <ServerCog className='h-5 w-5' />,
        title: t('Compatibility bridge'),
        description: t('Offer out-of-the-box parity for OpenAI, Anthropic, Gemini, and custom models with zero rewrites.'),
      },
      {
        icon: <Radar className='h-5 w-5' />,
        title: t('Resilience guardrails'),
        description: t('Embed circuit breakers and retries that automatically throttle anomalies and alert owners.'),
      },
    ],
    [t],
  );

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopyAPIUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy API URL', error);
    }
  };

  return (
    <div className='min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white'>
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.2),transparent_60%)]' />
        <div className='container mx-auto flex min-h-[88vh] flex-col items-center justify-center px-4 py-20 sm:py-28'>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-slate-500 shadow-sm backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:text-white/70'
          >
            <span className='h-2 w-2 rounded-full bg-emerald-500' />
            <span>{t('Unified AI Control')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='mx-auto max-w-4xl text-center text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl'
          >
            {t('Knight-Omega API: Seamless AI Integration')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mx-auto mt-6 max-w-2xl text-center text-base text-slate-600 dark:text-white/70 sm:text-lg'
          >
            {t('Connect, monitor, and switch providers in minutes with a unified API, live analytics, and built-in governance.')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mt-10 flex flex-col items-center gap-4 sm:flex-row'
          >
            <Link
              to='/register'
              className='inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5'
            >
              {t('Get started now')}
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M5 12h14'></path><path d='m12 5 7 7-7 7'></path></svg>
            </Link>
            <Link
              to='/docs'
              className='inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/15 dark:bg-white/10 dark:text-white/80'
            >
              {t('View documentation')}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className='mt-12 w-full max-w-3xl'
          >
            <div className='relative flex items-center gap-4 rounded-3xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-[0_14px_35px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_14px_35px_rgba(15,23,42,0.45)]'>
              <div className='hidden h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-500 sm:flex'>
                <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='4 17 10 11 4 5' /><line x1='12' x2='20' y1='19' y2='19' /></svg>
              </div>
              <input
                readOnly
                value={window.location.origin}
                className='flex-1 rounded-2xl bg-transparent text-sm text-slate-700 outline-none dark:text-white'
              />
              <button
                onClick={handleCopyAPIUrl}
                className='flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200/70 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-white/20 dark:bg-white/10 dark:text-white'
              >
                {copied ? (
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M20 6 9 17l-5-5' /></svg>
                ) : (
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect width='14' height='14' x='8' y='8' rx='2' ry='2' /><path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' /></svg>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-indigo-200/40 blur-[120px] dark:bg-indigo-500/30' />
        </div>
        <div className='container mx-auto px-4 py-20'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
          >
            {[
              {
                title: t('99.99% availability'),
                description: t('Multi-region deployments with automatic failover keep mission-critical traffic online.'),
              },
              {
                title: t('Transparent billing'),
                description: t('Real-time usage, soft limits, and proactive alerts keep finance and engineering aligned.'),
              },
              {
                title: t('Enterprise compliance'),
                description: t('Audit logs, access controls, and compliance reports help you meet regulatory expectations.'),
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className='relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-8 shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_55px_rgba(15,23,42,0.4)]'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-indigo-200/40 via-transparent to-sky-200/40 opacity-60 dark:from-indigo-500/20 dark:to-sky-500/20' />
                <div className='relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-500 shadow-inner dark:bg-slate-950 dark:text-indigo-300'>
                  <span className='text-lg font-semibold'>0{index + 1}</span>
                </div>
                <h3 className='relative mt-6 text-2xl font-semibold text-slate-900 dark:text-white'>
                  {item.title}
                </h3>
                <p className='relative mt-3 text-sm text-slate-600 dark:text-white/70'>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id='features' className='container mx-auto px-4 py-20'>
        <div className='mb-16 text-center'>
          <h2 className='text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl dark:text-white'>
            {t('Capability matrix')}
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-white/70'>
            {t('From key governance to call tracing, Knight Omega helps teams manage AI supply chains of any scale without friction.')}
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </section>

      <TestimonialsSection />

      <section className='container mx-auto px-4 pb-24'>
        <div className='relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 px-6 py-12 text-center shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_55px_rgba(15,23,42,0.4)]'>
          <div className='absolute inset-0 bg-gradient-to-r from-indigo-200/50 via-transparent to-sky-200/50 opacity-70 dark:from-indigo-500/20 dark:to-sky-500/20' />
          <div className='relative space-y-4'>
            <h3 className='text-2xl font-semibold text-slate-900 dark:text-white'>
              {t('Build your next-generation AI experience today')}
            </h3>
            <p className='mx-auto max-w-2xl text-sm text-slate-600 dark:text-white/70'>
              {t('Join thousands of builders worldwide enjoying unified model access, routing, and billing in minutes.')}
            </p>
            <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
              {userState?.user ? (
                <Link
                  to='/console'
                  className='inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/20 dark:bg-white/10 dark:text-white/80'
                >
                  {t('Go to console')}
                </Link>
              ) : (
                <Link
                  to='/register'
                  className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5'
                >
                  {t('Create your workspace')}
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M5 12h14'></path><path d='m12 5 7 7-7 7'></path></svg>
                </Link>
              )}
              <Link
                to='/pricing'
                className='inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/20 dark:bg-white/10 dark:text-white/80'
              >
                {t('Explore pricing')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;