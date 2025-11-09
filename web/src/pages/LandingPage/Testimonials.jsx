import React from 'react';
import Marquee from '../../components/common/ui/marquee';

const testimonials = [
  {
    name: 'Arjun Mehta',
    username: '@arjdev',
    body: 'Knight Omega streamlined our multi-provider integrations. The unified console saves hours every week.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Sara Lin',
    username: '@sara.codes',
    body: 'The analytics dashboard is gorgeous and functional. We ship faster with clear visibility on usage.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Devon Carter',
    username: '@devninja',
    body: 'Swapping AI providers used to take days. Now it’s a toggle. Knight Omega became our reliability layer.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Priya Shah',
    username: '@priyacodes',
    body: 'We love the polished auth flows and billing insights. Clients noticed the improved experience immediately.',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Leo Martin',
    username: '@leobuilds',
    body: 'Our infra team trusts Knight Omega to keep latency in check. The uptime view is now our morning ritual.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Chloe Winters',
    username: '@chloewinters',
    body: 'We launched a multi-tenant product without touching raw provider dashboards. Huge win for focus.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Ayaan Malik',
    username: '@ayaan_dev',
    body: 'As a solo founder, the templates and automation saved me weeks. This feels like an enterprise-grade co-pilot.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'Monica Reeves',
    username: '@monicareeves',
    body: 'Our team relies on the rate-limit guardrails. Knight Omega keeps our SLAs intact.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  },
  {
    name: 'James Roy',
    username: '@jamesrdev',
    body: 'The developer experience is top-tier. The CLI, portal, and docs feel thoughtfully connected.',
    img: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
  },
];

const columns = [
  testimonials.slice(0, 3),
  testimonials.slice(3, 6),
  testimonials.slice(6, 9),
];

const TestimonialCard = ({ img, name, username, body }) => (
  <div className='relative w-full max-w-xs overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_18px_40px_rgba(15,23,42,0.4)]'>
    <div className='absolute -top-6 -left-6 -z-10 h-40 w-40 rounded-full bg-indigo-200/40 blur-md dark:bg-indigo-500/30' />
    <p className='text-sm leading-relaxed text-slate-600 dark:text-white/70'>
      “{body}”
    </p>
    <div className='mt-5 flex items-center gap-3'>
      <img
        src={img}
        alt={name}
        height='40'
        width='40'
        className='h-10 w-10 rounded-full object-cover'
      />
      <div className='flex flex-col'>
        <span className='text-sm font-semibold text-slate-900 dark:text-white'>{name}</span>
        <span className='text-xs text-slate-500 dark:text-white/60'>{username}</span>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className='relative mx-auto mb-24 max-w-6xl px-4'>
      <div className='flex justify-center'>
        <span className='inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-4 py-1 text-xs font-medium uppercase tracking-[0.35em] text-slate-500 backdrop-blur-sm dark:border-white/20 dark:bg-white/10 dark:text-white/70'>
          Voices
        </span>
      </div>
      <h2 className='mt-6 text-center text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl dark:text-white'>
        Teams trust Knight Omega
      </h2>
      <p className='mx-auto mt-4 max-w-2xl text-center text-base text-slate-600 dark:text-white/70'>
        Builders, agencies, and enterprises switch to our unified AI control plane to ship faster with confidence.
      </p>

      <div className='mt-16 flex max-h-[720px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]'>
        {columns.map((list, index) => (
          <Marquee
            key={index}
            pauseOnHover
            vertical
            reverse={index === 1}
            className='[--duration:24s]'
          >
            {list.map((item) => (
              <div key={item.username} className='px-3 py-2'>
                <TestimonialCard {...item} />
              </div>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
