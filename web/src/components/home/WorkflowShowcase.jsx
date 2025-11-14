import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@douyinfe/semi-ui';
import { ArrowRight } from 'lucide-react';

const WorkflowShowcase = ({ steps }) => {
  return (
    <section className='landing-section home-workflow'>
      <motion.div
        className='home-section-heading home-section-heading--center'
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true }}
      >
        <span className='home-section-kicker'>Guide users from free to Pro effortlessly</span>
        <h2 className='home-section-title'>
          A revenue-ready workflow that unifies product, billing, and platform teams
        </h2>
        <p className='home-section-description'>
          Knight Omega keeps free-tier experimentation humming while premium traffic enjoys guaranteed performance and clear upgrade moments.
        </p>
      </motion.div>

      <div className='home-workflow__timeline'>
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className='home-workflow__item'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <Card bordered={false} className='home-workflow__card'>
              <div className='home-workflow__step'>
                <span className='home-workflow__step-index'>0{index + 1}</span>
                <ArrowRight size={16} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {step.meta ? <span className='home-workflow__meta'>{step.meta}</span> : null}
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorkflowShowcase;
