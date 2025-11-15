import React from 'react';
import { Input, Button, Select } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';

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
      <Input
        prefix={<IconSearch />}
        placeholder={t('Search model name')}
        value={searchKeyword}
        onChange={(value) => setSearchKeyword(value)}
        onEnterPress={handleSearch}
        className="w-full md:w-64"
      />

      <Select
        prefix={<IconSearch />}
        placeholder={t('Search vendor')}
        value={searchVendor}
        onChange={(value) => setSearchVendor(value)}
        className="w-full md:w-48"
        showClear
      >
        <Select.Option value="">{t('All Vendors')}</Select.Option>
        {vendors.map((vendor) => (
          <Select.Option key={vendor.id} value={vendor.id}>
            {vendor.name}
          </Select.Option>
        ))}
      </Select>

      <div className="flex gap-2">
        <Button
          type="primary"
          onClick={handleSearch}
          loading={loading || searching}
        >
          {t('Search')}
        </Button>

        <Button type="tertiary" onClick={handleReset}>
          {t('Reset')}
        </Button>
      </div>
    </div>
  );
};

export default ModelsFilters;