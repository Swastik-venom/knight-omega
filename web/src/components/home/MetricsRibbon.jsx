import React from 'react';
import { motion } from 'framer-motion';

const MetricsRibbon = ({ metrics }) => {
  return (
    <section className='landing-section landing-section--compact home-metrics-ribbon'>
      <div className='home-metrics-ribbon__glow' />
      <div className='home-metrics-ribbon__items'>
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className='home-metric'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            viewport={{ once: true }}
          >
            <span className='home-metric__value'>{metric.value}</span>
            <span className='home-metric__label'>{metric.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MetricsRibbon;
