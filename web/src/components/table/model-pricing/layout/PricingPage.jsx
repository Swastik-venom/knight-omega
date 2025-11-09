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

import React from 'react';
import { Layout, ImagePreview } from '@douyinfe/semi-ui';
import PricingSidebar from './PricingSidebar';
import PricingContent from './content/PricingContent';
import ModelDetailSideSheet from '../modal/ModelDetailSideSheet';
import { useModelPricingData } from '../../../../hooks/model-pricing/useModelPricingData';
import { useIsMobile } from '../../../../hooks/common/useIsMobile';

const PricingPage = () => {
  const pricingData = useModelPricingData();
  const { Sider, Content } = Layout;
  const isMobile = useIsMobile();
  const [showRatio, setShowRatio] = React.useState(false);
  const [viewMode, setViewMode] = React.useState('card');
  const allProps = {
    ...pricingData,
    showRatio,
    setShowRatio,
    viewMode,
    setViewMode,
  };

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.16),transparent_60%),radial-gradient(circle_at_bottom,_rgba(45,212,191,0.18),transparent_65%)] opacity-80 dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.22),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.2),transparent_60%)]' />

      <div className='relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32'>
        <div className='mb-10 text-center'>
          <span className='inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 shadow-sm backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:text-white/70'>
            Pricing Overview
          </span>
          <h1 className='mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl dark:text-white'>
            Flexible plans built for every AI workload
          </h1>
          <p className='mx-auto mt-4 max-w-3xl text-base text-slate-600 dark:text-white/70'>
            Compare provider rates, manage multipliers, and forecast spend with a control surface engineered for transparency and scale.
          </p>
        </div>

        <div className='rounded-3xl border border-slate-200/70 bg-white/95 shadow-[0_28px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_28px_70px_rgba(15,23,42,0.45)]'>
          <Layout className='pricing-layout rounded-3xl bg-transparent'>
            {!isMobile && (
              <Sider className='pricing-scroll-hide pricing-sidebar rounded-l-3xl border-r border-slate-200/60 bg-white/80 backdrop-blur-lg dark:border-white/10 dark:bg-white/5'>
                <PricingSidebar {...allProps} />
              </Sider>
            )}

            <Content className='pricing-scroll-hide pricing-content rounded-r-3xl bg-white/70 backdrop-blur-lg dark:bg-white/5'>
              <PricingContent
                {...allProps}
                isMobile={isMobile}
                sidebarProps={allProps}
              />
            </Content>
          </Layout>
        </div>
      </div>

      <ImagePreview
        src={pricingData.modalImageUrl}
        visible={pricingData.isModalOpenurl}
        onVisibleChange={(visible) => pricingData.setIsModalOpenurl(visible)}
      />

      <ModelDetailSideSheet
        visible={pricingData.showModelDetail}
        onClose={pricingData.closeModelDetail}
        modelData={pricingData.selectedModel}
        groupRatio={pricingData.groupRatio}
        usableGroup={pricingData.usableGroup}
        currency={pricingData.currency}
        tokenUnit={pricingData.tokenUnit}
        displayPrice={pricingData.displayPrice}
        showRatio={allProps.showRatio}
        vendorsMap={pricingData.vendorsMap}
        endpointMap={pricingData.endpointMap}
        autoGroups={pricingData.autoGroups}
        t={pricingData.t}
      />
    </div>
  );
};

export default PricingPage;
