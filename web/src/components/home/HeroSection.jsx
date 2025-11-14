import React from 'react';
import { Button, Input, ScrollItem, ScrollList, Typography } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import { Tooltip, Tag } from 'antd';
import { IconCopy, IconFile, IconPlay } from '@douyinfe/semi-icons';

const HeroSection = ({
  headline,
  subheadline,
  description,
  serverAddress,
  endpointItems,
  endpointIndex,
  onEndpointChange,
  onCopy,
  primaryCta,
  secondaryCta,
  badges,
  integrations,
  highlights,
  isMobile,
}) => {
  return (
    <section className='landing-section landing-section--hero home-hero'>
      <div className='home-hero__bg-sphere home-hero__bg-sphere--primary' />
      <div className='home-hero__bg-sphere home-hero__bg-sphere--secondary' />

      <motion.div
        className='home-hero__content'
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <div className='home-hero__headline'>
          <div className='home-hero__badges'>
            {badges?.map((badge) => (
              <Tag key={badge.label} color={badge.color} className='home-hero__badge'>
                {badge.label}
              </Tag>
            ))}
          </div>

          <motion.h1
            className='home-hero__title'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            {headline}
            {subheadline ? <span className='home-hero__title-highlight'>{subheadline}</span> : null}
          </motion.h1>

          {description ? (
            <motion.p
              className='home-hero__subtitle'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55, ease: 'easeOut' }}
            >
              {description}
            </motion.p>
          ) : null}
        </div>

        <motion.div
          className='home-hero__input'
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5, ease: 'easeOut' }}
        >
          <Input
            readonly
            value={serverAddress}
            size={isMobile ? 'default' : 'large'}
            className='home-hero__input-control'
            suffix={
              <div className='home-hero__input-suffix'>
                {endpointItems?.length ? (
                  <ScrollList
                    bodyHeight={32}
                    style={{ border: 'unset', boxShadow: 'unset' }}
                  >
                    <ScrollItem
                      mode='wheel'
                      cycled
                      list={endpointItems}
                      selectedIndex={endpointIndex}
                      onSelect={({ index }) => onEndpointChange(index)}
                    />
                  </ScrollList>
                ) : null}
                <Tooltip title='Copy base URL'>
                  <Button
                    type='primary'
                    icon={<IconCopy />}
                    className='!rounded-full'
                    onClick={onCopy}
                  />
                </Tooltip>
              </div>
            }
          />
        </motion.div>

        <motion.div
          className='home-hero__cta'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.5, ease: 'easeOut' }}
        >
          <Button
            theme='solid'
            type='primary'
            size={isMobile ? 'default' : 'large'}
            className='home-hero__cta-primary'
            icon={<IconPlay />}
            onClick={primaryCta.onClick}
          >
            {primaryCta.label}
          </Button>

          {secondaryCta ? (
            <Button
              size={isMobile ? 'default' : 'large'}
              className='home-hero__cta-secondary'
              icon={<IconFile />}
              onClick={secondaryCta.onClick}
              theme='borderless'
            >
              {secondaryCta.label}
            </Button>
          ) : null}
        </motion.div>

        {integrations?.length ? (
          <div className='home-hero__integrations'>
            <Typography.Text type='tertiary' className='home-hero__integrations-label'>
              Works brilliantly with
            </Typography.Text>
            <div className='home-hero__integrations-grid'>
              {integrations.map(({ key, icon }) => (
                <motion.div
                  key={key}
                  className='home-hero__integration-icon'
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>
        ) : null}
      </motion.div>

      {highlights?.length ? (
        <motion.div
          className='home-hero__highlights'
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {highlights.map((item) => (
            <div key={item.title} className='home-hero__highlight-card'>
              <div className='home-hero__highlight-icon'>{item.icon}</div>
              <div className='home-hero__highlight-content'>
                <span className='home-hero__highlight-title'>{item.title}</span>
                <p className='home-hero__highlight-description'>{item.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      ) : null}

      <div className='home-hero__floating-cards'>
        <motion.div
          className='home-hero__floating-card'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className='home-hero__floating-label'>Latency Auto-Adapts</span>
          <Typography.Title heading={4} className='home-hero__floating-value'>
            99.95%
          </Typography.Title>
          <Typography.Text type='tertiary'>
            SLA with multi-region routing and fallback.
          </Typography.Text>
        </motion.div>

        <motion.div
          className='home-hero__floating-card home-hero__floating-card--accent'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.32 }}
          viewport={{ once: true }}
        >
          <span className='home-hero__floating-label'>Unified Billing</span>
          <Typography.Title heading={4} className='home-hero__floating-value'>
            USD $0.0008
          </Typography.Title>
          <Typography.Text type='tertiary'>
            Weighted across providers with intelligent throttling.
          </Typography.Text>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
