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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import ModelPricingPage from '../../components/table/model-pricing/layout/PricingPage';
import PricingCards from '../../components/pricing/PricingCards';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('plans');

  const handleGetStarted = (planName) => {
    if (planName === 'Free') {
      navigate('/register');
    } else {
      navigate('/console/topup');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-[100px] transition-colors duration-500'>
      <div className='max-w-7xl mx-auto px-4'>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type='line'
          size='large'
        >
          <TabPane tab={t('Pricing Plans')} itemKey='plans'>
            <PricingCards onGetStarted={handleGetStarted} />
          </TabPane>
          <TabPane tab={t('Model Pricing')} itemKey='models'>
            <div className='mt-4'>
              <ModelPricingPage />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Pricing;
