import React from 'react';
import { Tabs, Tag, Button } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';

interface VendorTabsProps {
  activeVendorKey: string;
  setActiveVendorKey: (key: string) => void;
  vendorCounts: Record<string, number>;
  vendors: any[];
  setShowAddVendor: (show: boolean) => void;
  t: (key: string) => string;
}

const VendorTabs: React.FC<VendorTabsProps> = ({
  activeVendorKey,
  setActiveVendorKey,
  vendorCounts,
  vendors,
  setShowAddVendor,
  t,
}) => {
  const { TabPane } = Tabs;

  return (
    <div className="mb-6">
      <Tabs
        activeKey={activeVendorKey}
        onChange={(key) => setActiveVendorKey(key as string)}
        type="button"
        tabBarExtraContent={
          <Button
            icon={<IconPlus />}
            size="small"
            onClick={() => setShowAddVendor(true)}
          >
            {t('Add Vendor')}
          </Button>
        }
      >
        <TabPane
          tab={
            <span className="flex items-center gap-2">
              {t('All')}
              <Tag color="blue" size="small">
                {vendorCounts['all'] || 0}
              </Tag>
            </span>
          }
          itemKey="all"
        />

        {vendors.map((vendor) => (
          <TabPane
            key={vendor.id}
            tab={
              <span className="flex items-center gap-2">
                {vendor.name}
                <Tag color="cyan" size="small">
                  {vendorCounts[vendor.id] || 0}
                </Tag>
              </span>
            }
            itemKey={String(vendor.id)}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default VendorTabs;