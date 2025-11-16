
import React from 'react';
import SelectableButtonGroup from '../../../common/ui/SelectableButtonGroup';
import { Crown, Gift, Package } from 'lucide-react';

/**
 * Category filter component for Pro/Free/Standard models
 * @param {string|'all'} filterCategory Current value
 * @param {Function} setFilterCategory Setter
 * @param {Array} models Model list
 * @param {boolean} loading Loading state
 * @param {Function} t i18n
 */
const PricingCategories = ({
  filterCategory,
  setFilterCategory,
  models = [],
  loading = false,
  t,
}) => {
  // Calculate count for each category
  const getCategoryCount = React.useCallback(
    (category) => {
      if (category === 'all') {
        return models.length;
      }
      return models.filter((model) => model.category === category).length;
    },
    [models],
  );

  // Generate category options
  const items = React.useMemo(() => {
    const allCount = getCategoryCount('all');
    const proCount = getCategoryCount('pro');
    const freeCount = getCategoryCount('free');
    const standardCount = getCategoryCount('standard');

    return [
      {
        value: 'all',
        label: t('All Categories'),
        icon: <Package size={16} />,
        tagCount: allCount,
        disabled: allCount === 0,
      },
      {
        value: 'pro',
        label: t('Pro Models'),
        icon: <Crown size={16} />,
        tagCount: proCount,
        disabled: proCount === 0,
      },
      {
        value: 'free',
        label: t('Free Models'),
        icon: <Gift size={16} />,
        tagCount: freeCount,
        disabled: freeCount === 0,
      },
      {
        value: 'standard',
        label: t('Standard Models'),
        icon: <Package size={16} />,
        tagCount: standardCount,
        disabled: standardCount === 0,
      },
    ];
  }, [getCategoryCount, t]);

  return (
    <SelectableButtonGroup
      title={t('Model Category')}
      items={items}
      activeValue={filterCategory}
      onChange={setFilterCategory}
      loading={loading}
      t={t}
    />
  );
};

export default PricingCategories;