import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Map, Rocket, FileCode, Cpu } from 'lucide-react';
import TestimonialsSection from '../LandingPage/Testimonials';

const guides = [
  {
    icon: <Rocket className='h-5 w-5' />,
    title: 'Quickstart blueprints',
    description:
      'Bootstrap your workspace, connect providers, and ship your first flow in minutes with guided walkthroughs.',
    href: '/docs/getting-started',
  },
  {
    icon: <FileCode className='h-5 w-5' />,
    title: 'API and SDK reference',
    description:
      'Deep dive into REST, WebSocket, and SDK integrations with annotated examples in TypeScript, Python, and Go.',
    href: '/docs/api',
  },
  {
    icon: <Cpu className='h-5 w-5' />,
    title: 'Workflow recipes',
    description:
      'Model routing, guardrails, billing automation, and analytics dashboards built with production-ready snippets.',
    href: '/docs/recipes',
  },
];

const resources = [
  {
    title: 'Platform architecture',
    description: 'Understand how Knight Omega brokers provider calls, secures credentials, and maintains observability.',
  },
  {
    title: 'Provider compatibility matrix',
    description: 'Compare coverage, response formats, and specific knobs supported for OpenAI, Anthropic, Gemini, and more.',
  },
  {
    title: 'Governance playbook',
    description: 'Roll out access policies, audit trails, and spending limits with templates that scale across teams.',
  },
  {
    title: 'CLI & automation toolkit',
    description: 'Script migrations, rotate keys, and manage environments with our opinionated command-line tooling.',
  },
];

const DocsPage = () => {
  return (
    <div className='min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white'>
      <section className='relative overflow-hidden pt-32 pb-24 sm:pt-36'>
        <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.2),transparent_60%)]' />
        <div className='mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 text-center'>
          <span className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 shadow-sm backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:text-white/70'>
            Documentation Hub
          </span>
          <h1 className='text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white'>
            Discover, build, and scale with total clarity
          </h1>
          <p className='max-w-3xl text-base text-slate-600 dark:text-white/70'>
            Knight Omega brings every provider workflow into a single playbook. Explore curated guides, API specs, and automation recipes that help your team ship faster with predictable excellence.
          </p>

          <div className='flex flex-wrap items-center justify-center gap-4'>
            <Link
              to='/docs/getting-started'
              className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(79,70,229,0.35)] transition hover:-translate-y-0.5'
            >
              Start with the quickstart
            </Link>
            <Link
              to='/docs/changelog'
              className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/15 dark:bg-white/10 dark:text-white/80'
            >
              View release notes
            </Link>
          </div>
        </div>
      </section>

      <section className='relative mx-auto mb-24 w-full max-w-6xl px-6'>
        <div className='grid gap-6 md:grid-cols-3'>
          {guides.map((guide) => (
            <Link
              key={guide.title}
              to={guide.href}
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
                Explore guide →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className='relative mx-auto mb-24 w-full max-w-6xl rounded-3xl border border-slate-200/70 bg-white/95 px-6 py-16 shadow-[0_28px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_28px_70px_rgba(15,23,42,0.45)] sm:px-10'>
        <div className='flex flex-col gap-10 lg:flex-row'>
          <div className='max-w-xl'>
            <span className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.35em] text-slate-500 dark:border-white/20 dark:bg-white/10 dark:text-white/70'>
              Field notes
            </span>
            <h2 className='mt-4 text-3xl font-semibold text-slate-900 dark:text-white'>
              From architecture to automation in one place
            </h2>
            <p className='mt-4 text-sm leading-relaxed text-slate-600 dark:text-white/70'>
              Each resource distils battle-tested playbooks drawn from real deployments. Whether you are orchestrating multi-region routing, rolling out billing guardrails, or establishing compliance baselines, the documentation connects the dots step by step.
            </p>
          </div>

          <div className='grid flex-1 gap-6 sm:grid-cols-2'>
            {resources.map((resource) => (
              <div
                key={resource.title}
                className='relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/10'
              >
                <Map className='h-4 w-4 text-indigo-500 dark:text-indigo-300' />
                <h3 className='mt-4 text-base font-semibold text-slate-900 dark:text-white'>
                  {resource.title}
                </h3>
                <p className='mt-2 text-sm text-slate-600 dark:text-white/70'>
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='relative mx-auto mb-24 w-full max-w-6xl px-6'>
        <div className='grid items-center gap-10 rounded-3xl border border-slate-200/70 bg-white/95 p-10 shadow-[0_24px_60px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_24px_60px_rgba(15,23,42,0.45)] md:grid-cols-[1.1fr_1fr]'>
          <div>
            <span className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.35em] text-slate-500 dark:border-white/20 dark:bg-white/10 dark:text-white/70'>
              Navigate faster
            </span>
            <h2 className='mt-4 text-3xl font-semibold text-slate-900 dark:text-white'>
              All roads lead to confident production launches
            </h2>
            <p className='mt-4 text-sm leading-relaxed text-slate-600 dark:text-white/70'>
              Jump directly into curated maps for platform admins, product engineers, and operations teams. Each journey outlines prerequisites, success checkpoints, and metrics to watch.
            </p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <Link
                to='/docs/architecture'
                className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/15 dark:bg-white/10 dark:text-white/80'
              >
                Architecture overview
              </Link>
              <Link
                to='/docs/cli'
                className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/15 dark:bg-white/10 dark:text-white/80'
              >
                CLI handbook
              </Link>
              <Link
                to='/docs/security'
                className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/15 dark:bg-white/10 dark:text-white/80'
              >
                Security guide
              </Link>
            </div>
          </div>

          <div className='relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-inner dark:border-white/10 dark:bg-white/10'>
            <div className='mb-4 flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-white/70'>
              <BookOpen className='h-4 w-4 text-indigo-500 dark:text-indigo-300' />
              Learning paths
            </div>
            <div className='flex flex-col gap-4'>
              {[
                'Launch control plane in under 30 minutes',
                'Apply fine-grained provider permissions',
                'Instrument cost guardrails with alerting',
              ].map((item) => (
                <div key={item} className='flex items-start gap-3 rounded-2xl border border-slate-200/60 bg-white/80 px-4 py-3 text-left text-sm text-slate-600 shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-white/70'>
                  <div className='mt-1 h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-300' />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </div>
  );
};

export default DocsPage;
