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
import { Link } from 'react-router-dom';
import { HeartHandshake, Globe2, MessageSquareHeart, ShieldCheck } from 'lucide-react';
import TestimonialsSection from '../LandingPage/Testimonials';

const milestones = [
  {
    year: '2021',
    title: 'Kernel forged',
    description: 'Early prototypes unified API gateways for internal teams struggling with provider sprawl.',
  },
  {
    year: '2022',
    title: 'Observability unlocked',
    description: 'Real-time analytics, rate guardrails, and billing telemetry landed for our first enterprise rollout.',
  },
  {
    year: '2023',
    title: 'Multi-region scale',
    description: 'Global routing, failover playbooks, and compliance tooling brought zero-downtime resilience.',
  },
  {
    year: '2024',
    title: 'Ecosystem bloom',
    description: 'Templates, SDKs, and community contributions accelerated product teams across 40+ countries.',
  },
];

const stats = [
  { label: 'Workspaces orchestrated', value: '6,400+' },
  { label: 'Providers under one roof', value: '50+' },
  { label: 'Average latency savings', value: '27%' },
  { label: 'Integrations launched', value: '18K' },
];

const principles = [
  {
    icon: <ShieldCheck className='h-5 w-5 text-indigo-500' />,
    title: 'Reliability by default',
    description: 'We build for the edge cases: consistent SLAs, instant failover, and transparent observability.',
  },
  {
    icon: <MessageSquareHeart className='h-5 w-5 text-indigo-500' />,
    title: 'Human-centered tooling',
    description: 'Crafted experiences that help every builder — from solo founders to platform teams — move with clarity.',
  },
  {
    icon: <HeartHandshake className='h-5 w-5 text-indigo-500' />,
    title: 'Generous collaboration',
    description: 'Documentation, templates, and support loops that meet teams where they are, sharing what we learn.',
  },
  {
    icon: <Globe2 className='h-5 w-5 text-indigo-500' />,
    title: 'Global-first mindset',
    description: 'Multi-region routing, compliance guardrails, and language-localised experiences from day one.',
  },
];

const About = () => {
  return (
    <div className='min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white'>
      <section className='relative overflow-hidden pt-32 pb-24 sm:pt-36'>
        <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.2),transparent_60%)]' />
        <div className='mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center'>
          <span className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 shadow-sm backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:text-white/70'>
            Our story
          </span>
          <h1 className='text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white'>
            Building the operating system for responsible AI delivery
          </h1>
          <p className='max-w-3xl text-base text-slate-600 dark:text-white/70'>
            Knight Omega exists so teams can orchestrate, govern, and evolve AI experiences with confidence. We believe tooling should feel as crafted as the products it enables — opinionated, joyful, and relentlessly reliable.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            <Link
              to='/pricing'
              className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5'
            >
              Explore plans
            </Link>
            <Link
              to='/docs'
              className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/15 dark:bg-white/10 dark:text-white/80'
            >
              Browse documentation
            </Link>
          </div>
        </div>
      </section>

      <section className='relative mx-auto mb-24 w-full max-w-6xl px-6'>
        <div className='grid gap-6 rounded-3xl border border-slate-200/70 bg-white/95 p-10 shadow-[0_24px_60px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_24px_60px_rgba(15,23,42,0.45)] sm:grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.label} className='text-left'>
              <p className='text-3xl font-semibold text-slate-900 dark:text-white'>
                {stat.value}
              </p>
              <p className='mt-2 text-sm text-slate-600 dark:text-white/70'>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='relative mx-auto mb-24 w-full max-w-6xl px-6'>
        <div className='grid gap-6 rounded-3xl border border-slate-200/70 bg-white/95 p-10 shadow-[0_28px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_28px_70px_rgba(15,23,42,0.45)] lg:grid-cols-[1fr_1.2fr]'>
          <div>
            <span className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.35em] text-slate-500 dark:border-white/20 dark:bg-white/10 dark:text-white/70'>
              Principles
            </span>
            <h2 className='mt-4 text-3xl font-semibold text-slate-900 dark:text-white'>
              Craft, care, and operational excellence
            </h2>
            <p className='mt-4 text-sm leading-relaxed text-slate-600 dark:text-white/70'>
              From the first commit we shared with partners, we treated orchestration as a design problem. Knight Omega keeps providers honest, teams aligned, and end users delighted — because we obsess over the invisible details.
            </p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            {principles.map((principle) => (
              <div
                key={principle.title}
                className='rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/15 dark:bg-white/10'
              >
                <div className='flex items-center gap-3'>
                  <div className='rounded-xl bg-gradient-to-r from-indigo-500/15 to-sky-500/15 p-3'>
                    {principle.icon}
                  </div>
                  <h3 className='text-base font-semibold text-slate-900 dark:text-white'>
                    {principle.title}
                  </h3>
                </div>
                <p className='mt-3 text-sm text-slate-600 dark:text-white/70'>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='relative mx-auto mb-24 w-full max-w-6xl px-6'>
        <div className='rounded-3xl border border-slate-200/70 bg-white/95 p-10 shadow-[0_24px_60px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_24px_60px_rgba(15,23,42,0.45)]'>
          <span className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.35em] text-slate-500 dark:border-white/20 dark:bg-white/10 dark:text-white/70'>
            Milestones
          </span>
          <h2 className='mt-4 text-3xl font-semibold text-slate-900 dark:text-white'>
            Designed with builders, refined by operators
          </h2>
          <div className='mt-8 grid gap-6 md:grid-cols-2'>
            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className='relative rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/15 dark:bg-white/10'
              >
                <span className='text-sm font-medium uppercase tracking-[0.25em] text-slate-500 dark:text-white/60'>
                  {milestone.year}
                </span>
                <h3 className='mt-3 text-lg font-semibold text-slate-900 dark:text-white'>
                  {milestone.title}
                </h3>
                <p className='mt-2 text-sm text-slate-600 dark:text-white/70'>
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className='relative mx-auto mb-24 w-full max-w-6xl px-6'>
        <div className='flex flex-col items-center gap-6 rounded-3xl border border-slate-200/70 bg-white/95 p-10 text-center shadow-[0_24px_60px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_24px_60px_rgba(15,23,42,0.45)]'>
          <h2 className='text-3xl font-semibold text-slate-900 dark:text-white'>
            Join the teams orchestrating responsibly
          </h2>
          <p className='max-w-2xl text-sm text-slate-600 dark:text-white/70'>
            We partner with builders who see AI as a long-term craft. If you are designing workflows, scaling platforms, or want to shape the operating system behind them, we would love to collaborate.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            <a
              href='mailto:support@quantumnous.com'
              className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5'
            >
              Talk to our team
            </a>
            <Link
              to='/pricing'
              className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/15 dark:bg-white/10 dark:text-white/80'
            >
              View platform plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
