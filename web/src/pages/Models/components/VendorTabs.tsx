import React from 'react';
import { Button } from '@douyinfe/semi-ui-19';
import { IconPlus } from '@douyinfe/semi-icons';
import { motion } from 'framer-motion';

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
  const allVendors = [
    { id: 'all', name: t('All') },
    ...vendors,
  ];

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Vendor Tabs with Glass Effect */}
      <div className="flex-1 overflow-x-auto">
        <nav className="relative flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 text-sm shadow-[0_16px_36px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
          {allVendors.map((vendor) => {
            const vendorKey = String(vendor.id);
            const isActive = activeVendorKey === vendorKey;
            const count = vendorCounts[vendorKey] || 0;

            return (
              <motion.div
                key={vendorKey}
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => setActiveVendorKey(vendorKey)}
                  className="relative inline-flex items-center justify-center overflow-hidden rounded-full px-0 py-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  {isActive && (
                    <motion.span
                      layoutId="vendor-tab-pill"
                      className="absolute inset-0 z-0 rounded-full bg-white/20 shadow-[0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {vendor.name}
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-indigo-500/30 text-indigo-200 backdrop-blur-sm'
                          : 'bg-white/10 text-white/60 backdrop-blur-sm'
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              </motion.div>
            );
          })}
        </nav>
      </div>

      {/* Add Vendor Button with Glass Effect */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          icon={<IconPlus />}
          onClick={() => setShowAddVendor(true)}
          className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/20"
        >
          {t('Add Vendor')}
        </Button>
      </motion.div>
    </div>
  );
};

export default VendorTabs;