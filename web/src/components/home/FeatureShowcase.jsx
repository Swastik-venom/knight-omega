import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@douyinfe/semi-ui';
import {
  ShieldCheck,
  Workflow,
  Sparkles,
  BarChart3,
  Gauge,
  Layers,
  Coins,
  LineChart,
  ArrowUpRight,
} from 'lucide-react';

const icons = {
  reliability: ShieldCheck,
  automation: Workflow,
  personalization: Sparkles,
  observability: BarChart3,
  performance: Gauge,
  governance: Layers,
};

const FeatureShowcase = ({ sections }) => {
  const introHighlights = [
    {
      icon: Sparkles,
      title: 'Free plan launch-ready',
      description: 'Provision 10K tokens and safe rate limits instantly.',
    },
    {
      icon: Coins,
      title: '$8 Pro revenue engine',
      description: 'Bundle premium providers, billing, and upgrade nudges.',
    },
    {
      icon: LineChart,
      title: 'Insights that convert',
      description: 'Usage analytics spotlight cohorts ready to upgrade.',
    },
  ];

  return (
    <section className='landing-section home-feature-section'>
      <div className='home-feature-intro'>
        <motion.span
          className='home-feature-intro__badge'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          <ArrowUpRight size={16} />
          Built for free-to-Pro API programs
        </motion.span>

        <motion.h2
          className='home-feature-intro__title'
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          viewport={{ once: true }}
        >
          Everything you need to launch, monetise, and scale your API
        </motion.h2>

        <motion.p
          className='home-feature-intro__description'
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          viewport={{ once: true }}
        >
          Blend generous free allowances with premium experiences, while Knight Omega orchestrates routing, billing, and compliance behind the scenes.
        </motion.p>

        <motion.div
          className='home-feature-intro__highlights'
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          viewport={{ once: true }}
        >
          {introHighlights.map((item) => {
            const HighlightIcon = item.icon;
            return (
              <div key={item.title} className='home-feature-intro__highlight'>
                <HighlightIcon size={18} />
                <div>
                  <span>{item.title}</span>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className='home-feature-grid'>
        {sections.map((feature, index) => {
          const Icon = icons[feature.icon] || Sparkles;
          return (
            <motion.div
              key={feature.title}
              className='home-feature-card'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <Card bordered={false} className='home-feature-card__inner'>
                <div className='home-feature-card__icon'>
                  <Icon size={22} />
                </div>
                <h3 className='home-feature-card__title'>{feature.title}</h3>
                <p className='home-feature-card__description'>{feature.description}</p>
                {feature.points?.length ? (
                  <ul className='home-feature-card__list'>
                    {feature.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureShowcase;
