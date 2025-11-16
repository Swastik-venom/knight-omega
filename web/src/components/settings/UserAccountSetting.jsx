

import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  API,
  showError,
  showSuccess,
  renderQuota,
} from '../../helpers/index.js';
import {
  Button,
  Space,
  Spin,
  Typography,
  Card,
  Form,
  Avatar,
  Row,
  Col,
} from '@douyinfe/semi-ui-19';
import {
  IconUser,
  IconSave,
  IconLink,
  IconCreditCard,
} from '@douyinfe/semi-icons';
import { User, Mail, Lock, UserCircle } from 'lucide-react';

const { Text } = Typography;

const UserAccountSetting = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const formApiRef = useRef(null);

  const getInitValues = () => ({
    username: '',
    display_name: '',
    password: '',
    github_id: '',
    oidc_id: '',
    wechat_id: '',
    telegram_id: '',
    email: '',
    quota: 0,
    group: 'default',
  });

  const loadUser = async () => {
    setLoading(true);
    try {
      const res = await API.get('/api/user/self');
      const { success, message, data } = res.data;
      if (success) {
        data.password = '';
        formApiRef.current?.setValues({ ...getInitValues(), ...data });
      } else {
        showError(message);
      }
    } catch (error) {
      showError('Failed to load user information');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const submit = async (values) => {
    setLoading(true);
    try {
      let payload = { ...values };
      if (typeof payload.quota === 'string')
        payload.quota = parseInt(payload.quota) || 0;
      
      const res = await API.put('/api/user/self', payload);
      const { success, message } = res.data;
      if (success) {
        showSuccess('Account information updated successfully!');
        loadUser();
      } else {
        showError(message);
      }
    } catch (error) {
      showError('Failed to update account information');
    }
    setLoading(false);
  };

  return (
    <Spin spinning={loading}>
      <Form
        initValues={getInitValues()}
        getFormApi={(api) => (formApiRef.current = api)}
        onSubmit={submit}
      >
        {({ values }) => (
          <div className='space-y-4'>
            {/* Account Information Card */}
            <Card 
              className='!rounded-2xl shadow-sm border-0'
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(234, 88, 12, 0.05) 100%)',
                border: '1px solid rgba(249, 115, 22, 0.1)'
              }}
            >
              <div className='flex items-center mb-4'>
                <Avatar
                  size='small'
                  style={{ background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))' }}
                  className='mr-3 shadow-md'
                >
                  <User size={16} />
                </Avatar>
                <div>
                  <Text className='text-lg font-semibold text-gray-900'>
                    Account Information
                  </Text>
                  <div className='text-xs text-gray-600'>
                    Manage your basic account details
                  </div>
                </div>
              </div>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Input
                    field='username'
                    label='Username'
                    placeholder='Enter your username'
                    rules={[{ required: true, message: 'Please enter username' }]}
                    showClear
                    prefix={<UserCircle size={16} className='text-gray-400' />}
                  />
                </Col>

                <Col span={24}>
                  <Form.Input
                    field='display_name'
                    label='Display Name'
                    placeholder='Enter your display name'
                    showClear
                    prefix={<User size={16} className='text-gray-400' />}
                  />
                </Col>

                <Col span={24}>
                  <Form.Input
                    field='password'
                    label='Password'
                    placeholder='Enter new password (minimum 8 characters)'
                    mode='password'
                    showClear
                    prefix={<Lock size={16} className='text-gray-400' />}
                  />
                  <Text type='tertiary' size='small' className='mt-1 block'>
                    Leave blank to keep current password
                  </Text>
                </Col>
              </Row>
            </Card>

            {/* Account Status Card */}
            <Card 
              className='!rounded-2xl shadow-sm border-0'
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(22, 163, 74, 0.05) 100%)',
                border: '1px solid rgba(34, 197, 94, 0.1)'
              }}
            >
              <div className='flex items-center mb-4'>
                <Avatar
                  size='small'
                  style={{ background: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74))' }}
                  className='mr-3 shadow-md'
                >
                  <IconCreditCard size={16} />
                </Avatar>
                <div>
                  <Text className='text-lg font-semibold text-gray-900'>
                    Account Status
                  </Text>
                  <div className='text-xs text-gray-600'>
                    View your account quota and group
                  </div>
                </div>
              </div>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className='p-4 rounded-xl border border-green-500/30' style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%)'
                  }}>
                    <Text size='small' className='block mb-1' style={{ color: 'rgb(134, 239, 172)' }}>
                      Remaining Quota
                    </Text>
                    <Text className='text-2xl font-bold' style={{ color: 'rgb(34, 197, 94)' }}>
                      {renderQuota(values.quota || 0)}
                    </Text>
                  </div>
                </Col>

                <Col span={12}>
                  <div className='p-4 rounded-xl border border-blue-500/30' style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)'
                  }}>
                    <Text size='small' className='block mb-1' style={{ color: 'rgb(147, 197, 253)' }}>
                      User Group
                    </Text>
                    <Text className='text-2xl font-bold' style={{ color: 'rgb(59, 130, 246)' }}>
                      {values.group || 'default'}
                    </Text>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Linked Accounts Card */}
            <Card 
              className='!rounded-2xl shadow-sm border-0'
              style={{
                background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(126, 34, 206, 0.05) 100%)',
                border: '1px solid rgba(147, 51, 234, 0.1)'
              }}
            >
              <div className='flex items-center mb-4'>
                <Avatar
                  size='small'
                  style={{ background: 'linear-gradient(135deg, rgb(147, 51, 234), rgb(126, 34, 206))' }}
                  className='mr-3 shadow-md'
                >
                  <IconLink size={16} />
                </Avatar>
                <div>
                  <Text className='text-lg font-semibold text-gray-900'>
                    Linked Accounts
                  </Text>
                  <div className='text-xs text-gray-600'>
                    Third-party account connections (read-only)
                  </div>
                </div>
              </div>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Input
                    field='email'
                    label='Email'
                    readonly
                    placeholder='No email linked'
                    prefix={<Mail size={16} className='text-gray-400' />}
                  />
                </Col>

                {[
                  { field: 'github_id', label: 'GitHub' },
                  { field: 'oidc_id', label: 'OIDC' },
                  { field: 'wechat_id', label: 'WeChat' },
                  { field: 'telegram_id', label: 'Telegram' },
                ].map(({ field, label }) => (
                  <Col span={12} key={field}>
                    <Form.Input
                      field={field}
                      label={label}
                      readonly
                      placeholder={`No ${label} account linked`}
                    />
                  </Col>
                ))}
              </Row>

              <div className='mt-4 p-3 rounded-lg border border-blue-500/30' style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)'
              }}>
                <Text size='small' style={{ color: 'rgb(147, 197, 253)' }}>
                  <strong>Note:</strong> Linked accounts are read-only. To link or unlink accounts, please use the respective authentication buttons on the login page.
                </Text>
              </div>
            </Card>

            {/* Save Button */}
            <div className='flex justify-end pt-4'>
              <Button
                theme='solid'
                type='primary'
                size='large'
                htmlType='submit'
                icon={<IconSave />}
                loading={loading}
                style={{
                  background: 'linear-gradient(135deg, rgb(249, 115, 22), rgb(234, 88, 12))',
                  border: 'none'
                }}
                className='!rounded-xl px-8 shadow-lg hover:shadow-xl transition-all'
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Form>
    </Spin>
  );
};

export default UserAccountSetting;