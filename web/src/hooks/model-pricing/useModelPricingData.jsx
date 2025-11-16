

import { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { API, copy, showError, showInfo, showSuccess } from '@/helpers';
import { Modal } from '@douyinfe/semi-ui-19';
import { UserContext } from '../../context/User';
import { StatusContext } from '../../context/Status';

export const useModelPricingData = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const compositionRef = useRef({ isComposition: false });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [isModalOpenurl, setIsModalOpenurl] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [showModelDetail, setShowModelDetail] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [filterGroup, setFilterGroup] = useState('all'); // 用于 Table 的可用分组筛选，"all" 表示不过滤
  const [filterQuotaType, setFilterQuotaType] = useState('all'); // 计费类型筛选: 'all' | 0 | 1
  const [filterEndpointType, setFilterEndpointType] = useState('all'); // 端点类型筛选: 'all' | string
  const [filterVendor, setFilterVendor] = useState('all'); // 供应商筛选: 'all' | 'unknown' | string
  const [filterTag, setFilterTag] = useState('all'); // Model tag filter: 'all' | string
  const [filterCategory, setFilterCategory] = useState('all'); // Category filter: 'all' | 'pro' | 'free' | 'standard'
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const [showWithRecharge, setShowWithRecharge] = useState(false);
  const [tokenUnit, setTokenUnit] = useState('M');
  const [models, setModels] = useState([]);
  const [vendorsMap, setVendorsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [groupRatio, setGroupRatio] = useState({});
  const [usableGroup, setUsableGroup] = useState({});
  const [endpointMap, setEndpointMap] = useState({});
  const [autoGroups, setAutoGroups] = useState([]);

  const [statusState] = useContext(StatusContext);
  const [userState] = useContext(UserContext);

  // Recharge rate (price) and USD to CNY exchange rate (usd_exchange_rate)
  const priceRate = useMemo(
    () => statusState?.status?.price ?? 1,
    [statusState],
  );
  const usdExchangeRate = useMemo(
    () => statusState?.status?.usd_exchange_rate ?? priceRate,
    [statusState, priceRate],
  );
  const customExchangeRate = useMemo(
    () => statusState?.status?.custom_currency_exchange_rate ?? 1,
    [statusState],
  );
  const customCurrencySymbol = useMemo(
    () => statusState?.status?.custom_currency_symbol ?? '¤',
    [statusState],
  );

  // Default currency syncs with site display type (USD/CNY), TOKENS still allows switching currency within view
  const siteDisplayType = useMemo(
    () => statusState?.status?.quota_display_type || 'USD',
    [statusState],
  );
  useEffect(() => {
    if (
      siteDisplayType === 'USD' ||
      siteDisplayType === 'CNY' ||
      siteDisplayType === 'CUSTOM'
    ) {
      setCurrency(siteDisplayType);
    }
  }, [siteDisplayType]);

  const filteredModels = useMemo(() => {
    let result = models;

    // Category filter (pro/free/standard)
    if (filterCategory !== 'all') {
      result = result.filter((model) => model.category === filterCategory);
    }

    // Group filter
    if (filterGroup !== 'all') {
      result = result.filter((model) =>
        model.enable_groups.includes(filterGroup),
      );
    }

    // Billing type filter
    if (filterQuotaType !== 'all') {
      result = result.filter((model) => model.quota_type === filterQuotaType);
    }

    // Endpoint type filter
    if (filterEndpointType !== 'all') {
      result = result.filter(
        (model) =>
          model.supported_endpoint_types &&
          model.supported_endpoint_types.includes(filterEndpointType),
      );
    }

    // Vendor filter
    if (filterVendor !== 'all') {
      if (filterVendor === 'unknown') {
        result = result.filter((model) => !model.vendor_name);
      } else {
        result = result.filter((model) => model.vendor_name === filterVendor);
      }
    }

    // Tag filter
    if (filterTag !== 'all') {
      const tagLower = filterTag.toLowerCase();
      result = result.filter((model) => {
        if (!model.tags) return false;
        const tagsArr = model.tags
          .toLowerCase()
          .split(/[,;|]+/)
          .map((tag) => tag.trim())
          .filter(Boolean);
        return tagsArr.includes(tagLower);
      });
    }

    // Search filter
    if (searchValue.length > 0) {
      const searchTerm = searchValue.toLowerCase();
      result = result.filter(
        (model) =>
          (model.model_name &&
            model.model_name.toLowerCase().includes(searchTerm)) ||
          (model.display_name &&
            model.display_name.toLowerCase().includes(searchTerm)) ||
          (model.description &&
            model.description.toLowerCase().includes(searchTerm)) ||
          (model.tags && model.tags.toLowerCase().includes(searchTerm)) ||
          (model.vendor_name &&
            model.vendor_name.toLowerCase().includes(searchTerm)),
      );
    }

    return result;
  }, [
    models,
    searchValue,
    filterGroup,
    filterQuotaType,
    filterEndpointType,
    filterVendor,
    filterTag,
    filterCategory,
  ]);

  const rowSelection = useMemo(
    () => ({
      selectedRowKeys,
      onChange: (keys) => {
        setSelectedRowKeys(keys);
      },
    }),
    [selectedRowKeys],
  );

  const displayPrice = (usdPrice) => {
    let priceInUSD = usdPrice;
    if (showWithRecharge) {
      priceInUSD = (usdPrice * priceRate) / usdExchangeRate;
    }

    if (currency === 'CNY') {
      return `¥${(priceInUSD * usdExchangeRate).toFixed(3)}`;
    } else if (currency === 'CUSTOM') {
      return `${customCurrencySymbol}${(priceInUSD * customExchangeRate).toFixed(3)}`;
    }
    return `$${priceInUSD.toFixed(3)}`;
  };

  const setModelsFormat = (models, groupRatio, vendorMap) => {
    for (let i = 0; i < models.length; i++) {
      const m = models[i];
      m.key = m.model_name;
      m.group_ratio = groupRatio[m.model_name];

      // Parse category from model name - check for pro/ or free/ prefix
      if (m.model_name.startsWith('pro/')) {
        m.category = 'pro';
        m.display_name = m.model_name.substring(4); // Remove 'pro/' prefix
      } else if (m.model_name.startsWith('free/')) {
        m.category = 'free';
        m.display_name = m.model_name.substring(5); // Remove 'free/' prefix
      } else {
        m.category = 'standard';
        m.display_name = m.model_name;
      }

      // Add vendor information
      if (m.vendor_id && vendorMap[m.vendor_id]) {
        const vendor = vendorMap[m.vendor_id];
        m.vendor_name = vendor.name;
        m.vendor_icon = vendor.icon;
        m.vendor_description = vendor.description;
      }
    }
    
    // Sort by category first (pro > standard > free), then by quota type, then by name
    models.sort((a, b) => {
      // Category priority: pro (0) > standard (1) > free (2)
      const categoryOrder = { pro: 0, standard: 1, free: 2 };
      const catCompare = categoryOrder[a.category] - categoryOrder[b.category];
      if (catCompare !== 0) return catCompare;

      // Then by quota type
      const quotaCompare = a.quota_type - b.quota_type;
      if (quotaCompare !== 0) return quotaCompare;

      // Finally by display name
      return a.display_name.localeCompare(b.display_name);
    });

    setModels(models);
  };

  const loadPricing = async () => {
    setLoading(true);
    let url = '/api/pricing';
    const res = await API.get(url);
    const {
      success,
      message,
      data,
      vendors,
      group_ratio,
      usable_group,
      supported_endpoint,
      auto_groups,
    } = res.data;
    if (success) {
      setGroupRatio(group_ratio);
      setUsableGroup(usable_group);
      setSelectedGroup('all');
      // Build vendor map for easy lookup
      const vendorMap = {};
      if (Array.isArray(vendors)) {
        vendors.forEach((v) => {
          vendorMap[v.id] = v;
        });
      }
      setVendorsMap(vendorMap);
      setEndpointMap(supported_endpoint || {});
      setAutoGroups(auto_groups || []);
      setModelsFormat(data, group_ratio, vendorMap);
    } else {
      showError(message);
    }
    setLoading(false);
  };

  const refresh = async () => {
    await loadPricing();
  };

  const copyText = async (text) => {
    if (await copy(text)) {
      showSuccess(t('Copied: ') + text);
    } else {
      Modal.error({ title: t('Unable to copy to clipboard, please copy manually'), content: text });
    }
  };

  const handleChange = (value) => {
    const newSearchValue = value ? value : '';
    setSearchValue(newSearchValue);
  };

  const handleCompositionStart = () => {
    compositionRef.current.isComposition = true;
  };

  const handleCompositionEnd = (event) => {
    compositionRef.current.isComposition = false;
    const value = event.target.value;
    const newSearchValue = value ? value : '';
    setSearchValue(newSearchValue);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setFilterGroup(group);
    if (group === 'all') {
      showInfo(t('Switched to optimal rate view, each model uses its lowest rate group'));
    } else {
      showInfo(
        t('Current viewing group: {{group}}, rate: {{ratio}}', {
          group: group,
          ratio: groupRatio[group] ?? 1,
        }),
      );
    }
  };

  const openModelDetail = (model) => {
    setSelectedModel(model);
    setShowModelDetail(true);
  };

  const closeModelDetail = () => {
    setShowModelDetail(false);
    setTimeout(() => {
      setSelectedModel(null);
    }, 300);
  };

  useEffect(() => {
    refresh().then();
  }, []);

  // Reset to first page when filter conditions change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    filterGroup,
    filterQuotaType,
    filterEndpointType,
    filterVendor,
    filterTag,
    filterCategory,
    searchValue,
  ]);

  return {
    // State
    searchValue,
    setSearchValue,
    selectedRowKeys,
    setSelectedRowKeys,
    modalImageUrl,
    setModalImageUrl,
    isModalOpenurl,
    setIsModalOpenurl,
    selectedGroup,
    setSelectedGroup,
    showModelDetail,
    setShowModelDetail,
    selectedModel,
    setSelectedModel,
    filterGroup,
    setFilterGroup,
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
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    currency,
    setCurrency,
    showWithRecharge,
    setShowWithRecharge,
    tokenUnit,
    setTokenUnit,
    models,
    loading,
    groupRatio,
    usableGroup,
    endpointMap,
    autoGroups,

    // Computed properties
    priceRate,
    usdExchangeRate,
    filteredModels,
    rowSelection,

    // Vendors
    vendorsMap,

    // User and status
    userState,
    statusState,

    // Methods
    displayPrice,
    refresh,
    copyText,
    handleChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleGroupClick,
    openModelDetail,
    closeModelDetail,

    // References
    compositionRef,

    // Internationalization
    t,
  };
};
