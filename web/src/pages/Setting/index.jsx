

import React, { useEffect, useState } from 'react';
import { Layout, TabPane, Tabs } from '@douyinfe/semi-ui-19';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Settings,
  Calculator,
  Gauge,
  Shapes,
  Cog,
  MoreHorizontal,
  LayoutDashboard,
  MessageSquare,
  Palette,
  CreditCard,
} from 'lucide-react';

import SystemSetting from '../../components/settings/SystemSetting';
import { isRoot } from '../../helpers';
import OtherSetting from '../../components/settings/OtherSetting';
import OperationSetting from '../../components/settings/OperationSetting';
import RateLimitSetting from '../../components/settings/RateLimitSetting';
import ModelSetting from '../../components/settings/ModelSetting';
import DashboardSetting from '../../components/settings/DashboardSetting';
import RatioSetting from '../../components/settings/RatioSetting';
import ChatsSetting from '../../components/settings/ChatsSetting';
import DrawingSetting from '../../components/settings/DrawingSetting';
import PaymentSetting from '../../components/settings/PaymentSetting';

const Setting = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [tabActiveKey, setTabActiveKey] = useState('1');
  let panes = [];

  // Admin-only tabs
  if (isRoot()) {
    panes.push({
      tab: (
        <span className='flex items-center gap-2'>
          <Settings size={18} />
          <span className='font-medium'>Operation Settings</span>
        </span>
      ),
      content: <OperationSetting />,
      itemKey: 'operation',
    });
    panes.push({
      tab: (
        <span className='flex items-center gap-2'>
          <LayoutDashboard size={18} />
          <span className='font-medium'>Dashboard Settings</span>
        </span>
      ),
      content: <DashboardSetting />,
      itemKey: 'dashboard',
    });
    panes.push({
      tab: (
        <span className='flex items-center gap-2'>
          <MessageSquare size={18} />
          <span className='font-medium'>Chat Settings</span>
        </span>
      ),
      content: <ChatsSetting />,
      itemKey: 'chats',
    });
    panes.push({
      tab: (
        <span className='flex items-center gap-2'>
          <Palette size={18} />
          <span className='font-medium'>Drawing Settings</span>
        </span>
      ),
      content: <DrawingSetting />,
      itemKey: 'drawing',
    });
    panes.push({
      tab: (
        <span className='flex items-center gap-2'>
          <CreditCard size={18} />
          <span className='font-medium'>Payment Settings</span>
        </span>
      ),
      content: <PaymentSetting />,
      itemKey: 'payment',
    });
    panes.push({
      tab: (
        <span className='flex items-center gap-2'>
          <Calculator size={18} />
          <span className='font-medium'>Pricing & Groups</span>
        </span>
      ),
      content: <RatioSetting />,
      itemKey: 'ratio',
    });
    panes.push({
      tab: (
        <span className='flex items-center gap-2'>
          <Gauge size={18} />
          <span className='font-medium'>Rate Limits</span>
        </span>
      ),
      content: <RateLimitSetting />,
      itemKey: 'ratelimit',
    });
    panes.push({
      tab: (
        <span className='flex items-center gap-2'>
          <Shapes size={18} />
          <span className='font-medium'>Model Settings</span>
        </span>
      ),
      content: <ModelSetting />,
      itemKey: 'models',
    });
    panes.push({
      tab: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Server size={18} />
          {t('模型部署设置')}
        </span>
      ),
      content: <ModelDeploymentSetting />,
      itemKey: 'model-deployment',
    });
    panes.push({
      tab: (
        <span className='flex items-center gap-2'>
          <Cog size={18} />
          <span className='font-medium'>System Settings</span>
        </span>
      ),
      content: <SystemSetting />,
      itemKey: 'system',
    });
    panes.push({
      tab: (
        <span className='flex items-center gap-2'>
          <MoreHorizontal size={18} />
          <span className='font-medium'>Other Settings</span>
        </span>
      ),
      content: <OtherSetting />,
      itemKey: 'other',
    });
  } else {
    // Regular user tabs
    panes.push({
      tab: (
        <span className='flex items-center gap-2'>
          <User size={18} />
          <span className='font-medium'>Personal Settings</span>
        </span>
      ),
      content: <PersonalSetting />,
      itemKey: 'personal',
    });
  }

  const onChangeTab = (key) => {
    setTabActiveKey(key);
    navigate(`?tab=${key}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setTabActiveKey(tab);
    } else {
      onChangeTab(isRoot() ? 'operation' : 'personal');
    }
  }, [location.search]);

  return (
    <div className='settings-page mt-16 px-4 pb-12'>
      <div className='relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-[0_32px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:shadow-[0_32px_80px_rgba(15,23,42,0.45)]'>
        <div className='pointer-events-none absolute -top-32 right-[-120px] h-60 w-60 rounded-full bg-orange-200/60 blur-[140px] dark:bg-orange-500/30' />
        <div className='pointer-events-none absolute -bottom-32 left-[-110px] h-56 w-56 rounded-full bg-amber-200/55 blur-[140px] dark:bg-amber-500/25' />
        
        <div className='relative p-6'>
          <div className='mb-6'>
            <h1 className='text-3xl font-bold text-slate-900 dark:text-white mb-2'>
              {isRoot() ? 'Admin Settings' : 'Settings'}
            </h1>
            <p className='text-slate-600 dark:text-slate-400'>
              {isRoot()
                ? 'Manage system configuration and preferences'
                : 'Manage your personal preferences and account settings'}
            </p>
          </div>

          <Layout>
            <Layout.Content>
              <Tabs
                type='line'
                collapsible
                activeKey={tabActiveKey}
                onChange={(key) => onChangeTab(key)}
                className='settings-tabs'
              >
                {panes.map((pane) => (
                  <TabPane itemKey={pane.itemKey} tab={pane.tab} key={pane.itemKey}>
                    <div className='mt-6'>
                      {tabActiveKey === pane.itemKey && pane.content}
                    </div>
                  </TabPane>
                ))}
              </Tabs>
            </Layout.Content>
          </Layout>
        </div>
      </div>
    </div>
  );
};

export default Setting;
