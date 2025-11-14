import React from 'react';
import { motion } from 'framer-motion';
import Marquee from '../ui/Marquee';

const testimonials = [
  {
    name: 'Arjun Mehta',
    username: '@arjdev',
    quote:
      'Knight Omega let us ship a generous free tier without building custom limits or monitoring. The $8 Pro upsell felt native on day one.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    company: 'CoFounder · VectorStack',
  },
  {
    name: 'Sara Lin',
    username: '@sara.codes',
    quote:
      'We replaced three providers with Knight Omega. Free users stay responsive, and Pro teams get premium latency automatically.',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    company: 'Platform Lead · Northwind AI',
  },
  {
    name: 'Devon Carter',
    username: '@devninja',
    quote:
      'Billing events, rate limits, and quota resets are all handled. We focus on product, not stitching APIs together.',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    company: 'Head of Product · SupraOps',
  },
  {
    name: 'Priya Shah',
    username: '@priyacodes',
    quote:
      'The Pro plan paywall was live in a weekend. Dashboard insights show exactly when teams are ready to upgrade.',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    company: 'Engineering Manager · Nova Studio',
  },
  {
    name: 'Leo Martin',
    username: '@leobuilds',
    quote:
      'We cut infra spend by 60% while giving our Pro customers premium providers. Knight Omega makes the trade-off effortless.',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    company: 'CTO · Brightly',
  },
  {
    name: 'Chloe Winters',
    username: '@chloewinters',
    quote:
      'Security and audit trails were must-haves. Knight Omega handled SCIM, SSO, and webhook logs without custom work.',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    company: 'Security Lead · Stratus Labs',
  },
  {
    name: 'Ayaan Malik',
    username: '@ayaan_dev',
    quote:
      'As an indie team, the free tier let us prove demand fast. Upgrading to Pro was a flip of a switch.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    company: 'Founder · Modulo',
  },
  {
    name: 'Monica Reeves',
    username: '@monicareeves',
    quote:
      'Usage analytics and cost previews help success managers guide customers towards the paid plan with confidence.',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    company: 'Customer Success · Flowbit',
  },
  {
    name: 'James Roy',
    username: '@jamesrdev',
    quote:
      'Migration support was outstanding. We onboarded 20+ enterprise accounts without interrupting their production traffic.',
    avatar:
      'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    company: 'Director of Platform · HelixCloud',
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className='relative w-full max-w-xs mx-2 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-8 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] backdrop-blur-sm'>
      <div className='absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-[#6b7dff]/10 to-transparent blur-md'></div>

      <div className='text-white/90 leading-relaxed mb-5'>&ldquo;{testimonial.quote}&rdquo;</div>

      <div className='flex items-center gap-3'>
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className='h-10 w-10 rounded-full object-cover'
        />
        <div className='flex flex-col'>
          <div className='leading-5 font-medium tracking-tight text-white'>
            {testimonial.name}
          </div>
          <div className='leading-5 tracking-tight text-white/60 text-sm'>
            {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsMarquee = () => {
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className='landing-section home-testimonials'>
      <div className='home-testimonials__header'>
        <motion.span
          className='home-testimonials__badge'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          Loved by platform and product teams
        </motion.span>

        <motion.h2
          className='home-testimonials__title'
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          viewport={{ once: true }}
        >
          Stories from teams scaling with Knight Omega
        </motion.h2>

        <motion.p
          className='home-testimonials__description'
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          viewport={{ once: true }}
        >
          Free plan experimentation, graceful $8 Pro upgrades, and premium provider routing—directly from the engineers and founders who rely on it.
        </motion.p>
      </div>

      <div className='flex justify-center gap-6 overflow-hidden max-h-[738px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]'>
        <Marquee pauseOnHover vertical className='[--duration:20s]'>
          {firstColumn.map((testimonial) => (
            <TestimonialCard key={testimonial.username} testimonial={testimonial} />
          ))}
        </Marquee>

        <div className='hidden md:block'>
          <Marquee reverse pauseOnHover vertical className='[--duration:25s]'>
            {secondColumn.map((testimonial) => (
              <TestimonialCard key={testimonial.username} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>

        <div className='hidden lg:block'>
          <Marquee pauseOnHover vertical className='[--duration:30s]'>
            {thirdColumn.map((testimonial) => (
              <TestimonialCard key={testimonial.username} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsMarquee;