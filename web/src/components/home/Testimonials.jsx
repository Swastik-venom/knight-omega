import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

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

const splitIntoColumns = (items, count) => {
  const columns = Array.from({ length: count }, () => []);
  items.forEach((item, index) => {
    columns[index % count].push(item);
  });
  return columns;
};

const Testimonials = () => {
  const columns = useMemo(() => splitIntoColumns(testimonials, 3), []);

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

      <div className='home-testimonials__columns'>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className='home-testimonials__column'>
            {column.map((testimonial, rowIndex) => (
              <motion.article
                key={testimonial.username}
                className='home-testimonials__card'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: columnIndex * 0.12 + rowIndex * 0.08 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className='home-testimonials__quote'>“{testimonial.quote}”</div>
                <div className='home-testimonials__profile'>
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <div>
                    <span className='home-testimonials__name'>{testimonial.name}</span>
                    <span className='home-testimonials__meta'>
                      {testimonial.company} · {testimonial.username}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
