

import React from 'react';
import { Button } from '@douyinfe/semi-ui-19';
import PricingCategories from '../filter/PricingCategories';
import PricingGroups from '../filter/PricingGroups';
import PricingQuotaTypes from '../filter/PricingQuotaTypes';
import PricingEndpointTypes from '../filter/PricingEndpointTypes';
import PricingVendors from '../filter/PricingVendors';
import PricingTags from '../filter/PricingTags';

import { resetPricingFilters } from '../../../../helpers/index.js';
import { usePricingFilterCounts } from '@/hooks/model-pricing/usePricingFilterCounts';

const PricingSidebar = ({
  showWithRecharge,
  setShowWithRecharge,
  currency,
  setCurrency,
  handleChange,
  setActiveKey,
  showRatio,
  setShowRatio,
  viewMode,
  setViewMode,
  filterGroup,
  setFilterGroup,
  handleGroupClick,
  filterQuotaType,
  setFilterQuotaType,
  filterEndpointType,
  setFilterEndpointType,
  filterVendor,
  setFilterVendor,
  filterTag,
  setFilterTag,
  filterCategory,
  setFilterCategory,
  currentPage,
  setCurrentPage,
  tokenUnit,
  setTokenUnit,
  loading,
  t,
  ...categoryProps
}) => {
  const {
    quotaTypeModels,
    endpointTypeModels,
    vendorModels,
    tagModels,
    groupCountModels,
    categoryModels,
  } = usePricingFilterCounts({
    models: categoryProps.models,
    filterGroup,
    filterQuotaType,
    filterEndpointType,
    filterVendor,
    filterTag,
    filterCategory,
    searchValue: categoryProps.searchValue,
  });

  const handleResetFilters = () =>
    resetPricingFilters({
      handleChange,
      setShowWithRecharge,
      setCurrency,
      setShowRatio,
      setViewMode,
      setFilterGroup,
      setFilterQuotaType,
      setFilterEndpointType,
      setFilterVendor,
      setFilterTag,
      setFilterCategory,
      setCurrentPage,
      setTokenUnit,
    });

  return (
    <div className='p-2'>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-lg font-semibold text-gray-800'>{t('Filters')}</div>
        <Button
          theme='outline'
          type='tertiary'
          onClick={handleResetFilters}
          className='text-gray-500 hover:text-gray-700'
        >
          {t('Reset')}
        </Button>
      </div>

      <PricingCategories
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        models={categoryModels || categoryProps.models}
        loading={loading}
        t={t}
      />

      <PricingVendors
        filterVendor={filterVendor}
        setFilterVendor={setFilterVendor}
        models={vendorModels}
        allModels={categoryProps.models}
        loading={loading}
        t={t}
      />

      <PricingTags
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        models={tagModels}
        allModels={categoryProps.models}
        loading={loading}
        t={t}
      />

      <PricingGroups
        filterGroup={filterGroup}
        setFilterGroup={handleGroupClick}
        usableGroup={categoryProps.usableGroup}
        groupRatio={categoryProps.groupRatio}
        models={groupCountModels}
        loading={loading}
        t={t}
      />

      <PricingQuotaTypes
        filterQuotaType={filterQuotaType}
        setFilterQuotaType={setFilterQuotaType}
        models={quotaTypeModels}
        loading={loading}
        t={t}
      />

      <PricingEndpointTypes
        filterEndpointType={filterEndpointType}
        setFilterEndpointType={setFilterEndpointType}
        models={endpointTypeModels}
        allModels={categoryProps.models}
        loading={loading}
        t={t}
      />
    </div>
  );
};

export default PricingSidebar;
