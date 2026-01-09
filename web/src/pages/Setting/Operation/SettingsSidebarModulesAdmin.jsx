

import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Form,
  Button,
  Switch,
  Row,
  Col,
  Typography,
} from '@douyinfe/semi-ui-19';
import { API, showSuccess, showError } from '@/helpers';
import { StatusContext } from '../../../context/Status';
import { Settings } from 'lucide-react';

const { Text } = Typography;

export default function SettingsSidebarModulesAdmin(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [statusState, statusDispatch] = useContext(StatusContext);

  // 左侧边栏模块管理状态（管理员全局控制）
  const [sidebarModulesAdmin, setSidebarModulesAdmin] = useState({
    chat: {
      enabled: true,
      playground: true,
      chat: true,
    },
    console: {
      enabled: true,
      detail: true,
      token: true,
      log: true,
      midjourney: true,
      task: true,
    },
    personal: {
      enabled: true,
      topup: true,
      personal: true,
    },
    admin: {
      enabled: true,
      channel: true,
      models: true,
      deployment: true,
      redemption: true,
      user: true,
      setting: true,
    },
  });

  // 处理区域级别开关变更
  function handleSectionChange(sectionKey) {
    return (checked) => {
      const newModules = {
        ...sidebarModulesAdmin,
        [sectionKey]: {
          ...sidebarModulesAdmin[sectionKey],
          enabled: checked,
        },
      };
      setSidebarModulesAdmin(newModules);
    };
  }

  // 处理功能级别开关变更
  function handleModuleChange(sectionKey, moduleKey) {
    return (checked) => {
      const newModules = {
        ...sidebarModulesAdmin,
        [sectionKey]: {
          ...sidebarModulesAdmin[sectionKey],
          [moduleKey]: checked,
        },
      };
      setSidebarModulesAdmin(newModules);
    };
  }

  // 重置为默认配置
  function resetSidebarModules() {
    const defaultModules = {
      chat: {
        enabled: true,
        playground: true,
        chat: true,
      },
      console: {
        enabled: true,
        detail: true,
        token: true,
        log: true,
        midjourney: true,
        task: true,
      },
      personal: {
        enabled: true,
        topup: true,
        personal: true,
      },
      admin: {
        enabled: true,
        channel: true,
        models: true,
        deployment: true,
        redemption: true,
        user: true,
        setting: true,
      },
    };
    setSidebarModulesAdmin(defaultModules);
    showSuccess(t('已重置为默认配置'));
  }

  // 保存配置
  async function onSubmit() {
    setLoading(true);
    try {
      const res = await API.put('/api/option/', {
        key: 'SidebarModulesAdmin',
        value: JSON.stringify(sidebarModulesAdmin),
      });
      const { success, message } = res.data;
      if (success) {
        showSuccess(t('保存成功'));

        // 立即更新StatusContext中的状态
        statusDispatch({
          type: 'set',
          payload: {
            ...statusState.status,
            SidebarModulesAdmin: JSON.stringify(sidebarModulesAdmin),
          },
        });

        // 刷新父组件状态
        if (props.refresh) {
          await props.refresh();
        }
      } else {
        showError(message);
      }
    } catch (error) {
      showError(t('保存失败，请重试'));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // 从 props.options 中获取配置
    if (props.options && props.options.SidebarModulesAdmin) {
      try {
        const modules = JSON.parse(props.options.SidebarModulesAdmin);
        setSidebarModulesAdmin(modules);
      } catch (error) {
        // 使用默认配置
        const defaultModules = {
          chat: { enabled: true, playground: true, chat: true },
          console: {
            enabled: true,
            detail: true,
            token: true,
            log: true,
            midjourney: true,
            task: true,
          },
          personal: { enabled: true, topup: true, personal: true },
          admin: {
            enabled: true,
            channel: true,
            models: true,
            deployment: true,
            redemption: true,
            user: true,
            setting: true,
          },
        };
        setSidebarModulesAdmin(defaultModules);
      }
    }
  }, [props.options]);

  // 区域配置数据
  const sectionConfigs = [
    {
      key: 'chat',
      title: t('聊天区域'),
      description: t('操练场和聊天功能'),
      modules: [
        {
          key: 'playground',
          title: t('操练场'),
          description: t('AI模型测试环境'),
        },
        { key: 'chat', title: t('聊天'), description: t('聊天会话管理') },
      ],
    },
    {
      key: 'console',
      title: t('控制台区域'),
      description: t('数据管理和日志查看'),
      modules: [
        { key: 'detail', title: t('数据看板'), description: t('系统数据统计') },
        { key: 'token', title: t('令牌管理'), description: t('API令牌管理') },
        { key: 'log', title: t('使用日志'), description: t('API使用记录') },
        {
          key: 'midjourney',
          title: t('绘图日志'),
          description: t('绘图任务记录'),
        },
        { key: 'task', title: t('任务日志'), description: t('系统任务记录') },
      ],
    },
    {
      key: 'personal',
      title: t('个人中心区域'),
      description: t('用户个人功能'),
      modules: [
        { key: 'topup', title: t('钱包管理'), description: t('余额充值管理') },
        {
          key: 'personal',
          title: t('个人设置'),
          description: t('个人信息设置'),
        },
      ],
    },
    {
      key: 'admin',
      title: t('管理员区域'),
      description: t('系统管理功能'),
      modules: [
        { key: 'channel', title: t('渠道管理'), description: t('API渠道配置') },
        { key: 'models', title: t('模型管理'), description: t('AI模型配置') },
        { key: 'deployment', title: t('模型部署'), description: t('模型部署管理') },
        {
          key: 'redemption',
          title: t('兑换码管理'),
          description: t('兑换码生成管理'),
        },
        { key: 'user', title: t('用户管理'), description: t('用户账户管理') },
        {
          key: 'setting',
          title: t('系统设置'),
          description: t('系统参数配置'),
        },
      ],
    },
  ];

  return (
    <Card className='!rounded-2xl shadow-sm border-0'>
      <Form.Section>
        <div className='mb-6'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg'>
              <Settings size={20} className='text-purple-600 dark:text-purple-400' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-slate-900 dark:text-white'>
                Sidebar Management (Global Control)
              </h3>
              <Text type='secondary' className='text-sm'>
                Control sidebar areas and features globally. Hidden features cannot be enabled by users.
              </Text>
            </div>
          </div>
        </div>
        {sectionConfigs.map((section) => (
          <div key={section.key} className='mb-8'>
            {/* Section Header with Toggle */}
            <div className='flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700'>
              <div>
                <div className='font-semibold text-base text-slate-900 dark:text-white mb-1'>
                  {section.title}
                </div>
                <Text className='text-xs text-slate-600 dark:text-slate-400'>
                  {section.description}
                </Text>
              </div>
              <Switch
                checked={sidebarModulesAdmin[section.key]?.enabled}
                onChange={handleSectionChange(section.key)}
                size='large'
              />
            </div>

            {/* Module Grid */}
            <Row gutter={[12, 12]}>
              {section.modules.map((module) => (
                <Col key={module.key} xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Card
                    className={`!rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 ${
                      sidebarModulesAdmin[section.key]?.enabled ? '' : 'opacity-50'
                    }`}
                    bodyStyle={{ padding: '16px' }}
                  >
                    <div className='flex justify-between items-center h-full'>
                      <div className='flex-1 text-left'>
                        <div className='font-semibold text-sm text-slate-900 dark:text-white mb-1'>
                          {module.title}
                        </div>
                        <Text className='text-xs text-slate-600 dark:text-slate-400 leading-relaxed block'>
                          {module.description}
                        </Text>
                      </div>
                      <div className='ml-4'>
                        <Switch
                          checked={
                            sidebarModulesAdmin[section.key]?.[module.key]
                          }
                          onChange={handleModuleChange(section.key, module.key)}
                          size='default'
                          disabled={!sidebarModulesAdmin[section.key]?.enabled}
                        />
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}

        <div className='flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700'>
          <Button
            size='large'
            type='tertiary'
            onClick={resetSidebarModules}
            className='!rounded-lg'
          >
            Reset to Default
          </Button>
          <Button
            size='large'
            type='primary'
            onClick={onSubmit}
            loading={loading}
            className='!rounded-lg px-8'
          >
            Save Settings
          </Button>
        </div>
      </Form.Section>
    </Card>
  );
}
