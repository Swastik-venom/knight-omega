import React from 'react';
import { Input, Select } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { motion } from 'framer-motion';

interface ModelsFiltersProps {
  formInitValues: any;
  setFormApi: (api: any) => void;
  searchModels: () => void;
  loading: boolean;
  searching: boolean;
  vendors: any[];
  t: (key: string) => string;
}

const ModelsFilters: React.FC<ModelsFiltersProps> = ({
  searchModels,
  loading,
  searching,
  vendors,
  t,
}) => {
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [searchVendor, setSearchVendor] = React.useState('');

  const handleSearch = () => {
    searchModels();
  };

  const handleReset = () => {
    setSearchKeyword('');
    setSearchVendor('');
    setTimeout(() => {
      searchModels();
    }, 100);
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="relative w-full md:w-64">
        <Input
          prefix={<IconSearch className="text-white/60" />}
          placeholder={t('Search model name')}
          value={searchKeyword}
          onChange={(value) => setSearchKeyword(value)}
          onEnterPress={handleSearch}
          className="w-full rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 backdrop-blur-xl focus:border-white/30 focus:ring-2 focus:ring-white/20 [&_.semi-input]:text-white [&_.semi-input]:placeholder:text-white/50"
        />
      </div>

      <div className="relative w-full md:w-48">
        <Select
          prefix={<IconSearch className="text-white/60" />}
          placeholder={t('Search vendor')}
          value={searchVendor}
          onChange={(value) => setSearchVendor(value)}
          className="w-full rounded-xl border-white/20 bg-white/10 text-white backdrop-blur-xl [&_.semi-select-selection]:rounded-xl [&_.semi-select-selection]:border-white/20 [&_.semi-select-selection]:bg-white/10 [&_.semi-select-selection]:text-white [&_.semi-select-selection]:backdrop-blur-xl [&_.semi-select-selection-text]:text-white [&_.semi-select-selection-placeholder]:text-white/50"
          showClear
        >
          <Select.Option value="">{t('All Vendors')}</Select.Option>
          {vendors.map((vendor) => (
            <Select.Option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading || searching}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-indigo-400/30 bg-indigo-500/80 px-4 py-2.5 text-sm font-medium text-white shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/50 hover:bg-indigo-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleSearch}
        >
          {loading || searching ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
            />
          ) : (
            <IconSearch className="h-4 w-4" />
          )}
          <span className="font-medium">{t('Search')}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 hover:shadow-md"
          onClick={handleReset}
        >
          <span className="font-medium">{t('Reset')}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ModelsFilters;