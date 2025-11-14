import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import { Rocket, MessageSquare } from 'lucide-react';

const CallToAction = ({ primaryCta, secondaryCta, headline, subheadline }) => {
  return (
    <section className='landing-section landing-section--flush-bottom home-cta'>
      <div className='home-cta__aurora' />
      <motion.div
        className='home-cta__card'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.45 }}
      >
        <div className='home-cta__icon'>
          <Rocket size={28} />
        </div>
        <div className='home-cta__copy'>
          <h2>{headline}</h2>
          <p>{subheadline}</p>
        </div>
        <div className='home-cta__actions'>
          <Button type='primary' theme='solid' size='large' onClick={primaryCta.onClick} className='home-cta__primary'>
            {primaryCta.label}
          </Button>
          {secondaryCta ? (
            <Button
              size='large'
              theme='borderless'
              className='home-cta__secondary'
              icon={<MessageSquare size={16} />}
              onClick={secondaryCta.onClick}
            >
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
