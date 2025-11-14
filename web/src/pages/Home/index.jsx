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

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { API, showError, copy, showSuccess } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { API_ENDPOINTS } from '../../constants/common.constant';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import {
  Moonshot,
  OpenAI,
  Claude,
  Gemini,
  DeepSeek,
  Qwen,
  Grok,
  AzureAI,
} from '@lobehub/icons';
import { ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import HeroSection from '../../components/home/HeroSection';
import FeatureShowcase from '../../components/home/FeatureShowcase';
import MetricsRibbon from '../../components/home/MetricsRibbon';
import WorkflowShowcase from '../../components/home/WorkflowShowcase';
import CallToAction from '../../components/home/CallToAction';
import TestimonialsMarquee from '../../components/home/TestimonialsMarquee';
import LandingBackground from '../../components/layout/LandingBackground';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const docsLink = statusState?.status?.docs_link || '';
  const serverAddress =
    statusState?.status?.server_address || `${window.location.origin}`;
  const endpointItems = API_ENDPOINTS.map((e) => ({ value: e }));
  const [endpointIndex, setEndpointIndex] = useState(0);

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent('Failed to load home page content...');
    }
    setHomePageContentLoaded(true);
  };

  const handleCopyBaseURL = async () => {
    const ok = await copy(serverAddress);
    if (ok) {
      showSuccess(t('Copied to clipboard'));
    }
  };

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate !== today) {
        try {
          const res = await API.get('/api/notice');
          const { success, data } = res.data;
          if (success && data && data.trim() !== '') {
            setNoticeVisible(true);
          }
        } catch (error) {
          console.error('获取公告失败:', error);
        }
      }
    };

    checkNoticeAndShow();
  }, []);

  useEffect(() => {
    displayHomePageContent().then();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setEndpointIndex((prev) => (prev + 1) % endpointItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [endpointItems.length]);

  const heroBadges = useMemo(
    () => [
      { label: t('Free tier ready in minutes'), color: 'green' },
      { label: t('$8 Pro unlocks premium lanes'), color: 'blue' },
    ],
    [t],
  );

  const heroIntegrations = useMemo(
    () => [
      { key: 'openai', icon: <OpenAI size={36} /> },
      { key: 'claude', icon: <Claude.Color size={36} /> },
      { key: 'deepseek', icon: <DeepSeek.Color size={36} /> },
      { key: 'moonshot', icon: <Moonshot size={36} /> },
      { key: 'gemini', icon: <Gemini.Color size={36} /> },
      { key: 'qwen', icon: <Qwen.Color size={36} /> },
      { key: 'grok', icon: <Grok size={36} /> },
      { key: 'azure', icon: <AzureAI.Color size={36} /> },
    ],
    [],
  );

  const heroHighlights = useMemo(
    () => [
      {
        title: t('Launch a free API tier instantly'),
        description: t('Ship 10,000 complimentary tokens per month with shared capacity out of the box.'),
        icon: <Sparkles size={20} />,
      },
      {
        title: t('Protected multi-provider routing'),
        description: t('Failover across global regions so both hobby and paying users stay online.'),
        icon: <ShieldCheck size={20} />,
      },
      {
        title: t('Upgrade to $8 Pro when ready'),
        description: t('Unlock premium models, priority bandwidth, and consolidated billing as you scale.'),
        icon: <Wallet size={20} />,
      },
    ],
    [t],
  );

  const featureSections = useMemo(
    () => [
      {
        icon: 'reliability',
        title: t('Free tier without the maintenance tax'),
        description: t('Serve generous usage caps with intelligent throttling, shared limits, and zero manual intervention.'),
        points: [
          t('10K monthly tokens included for each workspace'),
          t('Automatic pooling across upstream providers'),
          t('Realtime health scoring for free-plan traffic'),
        ],
      },
      {
        icon: 'observability',
        title: t('Transparent upgrades to paid lanes'),
        description: t('Help teams understand when to move to Pro with built-in analytics, cost previews, and upgrade nudges.'),
        points: [
          t('Forecast monthly spend before committing'),
          t('Usage insights surfaced inside your product'),
          t('Experiment-friendly sandbox reporting'),
        ],
      },
      {
        icon: 'automation',
        title: t('Billing & governance that scales with you'),
        description: t('Blend credit wallets, seat permissions, and key rotation without rebuilding your stack.'),
        points: [
          t('Seat-based or usage-based monetisation options'),
          t('Automated key rotation & audit trails'),
          t('Webhook-ready status and billing events'),
        ],
      },
      {
        icon: 'performance',
        title: t('Premium providers for Pro users'),
        description: t('Route Pro traffic through priority providers, dedicated bandwidth, and faster inference lanes.'),
        points: [
          t('Curated paid model catalogue with SLAs'),
          t('Latency-optimised routing for paying customers'),
          t('Provider-level spend controls and alerts'),
        ],
      },
    ],
    [t],
  );

  const metrics = useMemo(
    () => [
      { value: '10K', label: t('Complimentary tokens every month') },
      { value: '$8', label: t('Pro plan unlocks premium routing') },
      { value: '6', label: t('Premium providers bundled in Pro') },
      { value: '99.95%', label: t('Uptime backed by smart failover') },
    ],
    [t],
  );

  const workflowSteps = useMemo(
    () => [
      {
        title: t('Launch a free workspace'),
        description: t('Invite users, ship sandbox keys, and cap usage with a single toggle.'),
        meta: t('Ready in under five minutes'),
      },
      {
        title: t('Add monetisation rules'),
        description: t('Bundle credits, define the $8 Pro plan, and preview upgrade-ready cohorts.'),
        meta: t('Usage scoring + conversion prompts'),
      },
      {
        title: t('Route free vs. paid traffic'),
        description: t('Auto-promote Pro users through premium providers while guarding the free tier.'),
        meta: t('Failover-ready multi-region mesh'),
      },
      {
        title: t('Report & grow revenue'),
        description: t('Export billing events, trigger payouts, and surface upgrade nudges across the funnel.'),
        meta: t('BI, CRM, and webhook friendly'),
      },
    ],
    [t],
  );

  return (
    <LandingBackground>
      <div className='w-full overflow-x-hidden'>
        <NoticeModal
          visible={noticeVisible}
          onClose={() => setNoticeVisible(false)}
          isMobile={isMobile}
        />
        {homePageContentLoaded && homePageContent === '' ? (
          <div className='w-full overflow-x-hidden'>
          <HeroSection
            headline={
              <>
                {t('Knight Omega')}
                <br />
                {t('Free-to-Pro API Gateway')}
              </>
            }
            subheadline={t('Free + paid API platform for modern builders')}
            description={t('Offer an always-on free tier and a $8 Pro upgrade with premium providers, all from one control plane.')}
            serverAddress={serverAddress}
            endpointItems={endpointItems}
            endpointIndex={endpointIndex}
            onEndpointChange={setEndpointIndex}
            onCopy={handleCopyBaseURL}
            primaryCta={{
              label: t('Get API keys'),
              onClick: () => navigate('/console'),
            }}
            secondaryCta={
              docsLink
                ? {
                    label: t('Explore documentation'),
                    onClick: () => window.open(docsLink, '_blank'),
                  }
                : null
            }
            badges={heroBadges}
            integrations={heroIntegrations}
            highlights={heroHighlights}
            isMobile={isMobile}
          />

          <MetricsRibbon metrics={metrics} />

          <FeatureShowcase sections={featureSections} />

          <TestimonialsMarquee />

          <WorkflowShowcase steps={workflowSteps} />

          <CallToAction
            headline={t('Monetise your API with a delightful free-to-Pro journey')}
            subheadline={t('Chat with our team to tailor the $8 Pro plan, premium providers, and billing flows to your product roadmap.')}
            primaryCta={{
              label: t('Launch free tier'),
              onClick: () => navigate('/console'),
            }}
            secondaryCta={{
              label: t('Design my Pro plan'),
              onClick: () => window.open('https://cal.com', '_blank'),
            }}
          />
          </div>
        ) : (
          <div className='overflow-x-hidden w-full'>
            {homePageContent.startsWith('https://') ? (
              <iframe src={homePageContent} className='w-full h-screen border-none' />
            ) : (
              <div
                className='mt-[60px]'
                dangerouslySetInnerHTML={{ __html: homePageContent }}
              />
            )}
          </div>
        )}
      </div>
    </LandingBackground>
  );
};

export default Home;
