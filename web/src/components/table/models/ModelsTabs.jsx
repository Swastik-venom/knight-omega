

import React from 'react';
import { Tabs, TabPane, Tag, Button, Dropdown, Modal } from '@douyinfe/semi-ui-19';
import { IconEdit, IconDelete } from '@douyinfe/semi-icons';
import { getLobeHubIcon, showError, showSuccess } from '../../../helpers/index.js';
import { API } from '../../../helpers/index.js';

const ModelsTabs = ({
  activeVendorKey,
  setActiveVendorKey,
  vendorCounts,
  vendors,
  loadModels,
  activePage,
  pageSize,
  setActivePage,
  setShowAddVendor,
  setShowEditVendor,
  setEditingVendor,
  loadVendors,
  t,
}) => {
  const handleTabChange = (key) => {
    setActiveVendorKey(key);
    setActivePage(1);
    loadModels(1, pageSize, key);
  };

  const handleEditVendor = (vendor, e) => {
    e.stopPropagation(); // Prevent event bubbling to avoid triggering tab switch
    setEditingVendor(vendor);
    setShowEditVendor(true);
  };

  const handleDeleteVendor = async (vendor, e) => {
    e.stopPropagation(); // Prevent event bubbling to avoid triggering tab switch
    try {
      const res = await API.delete(`/api/vendors/${vendor.id}`);
      if (res.data.success) {
        showSuccess(t('Vendor deleted successfully'));
        // If deleting the currently selected vendor, switch to "All"
        if (activeVendorKey === String(vendor.id)) {
          setActiveVendorKey('all');
          loadModels(1, pageSize, 'all');
        } else {
          loadModels(activePage, pageSize, activeVendorKey);
        }
        loadVendors(); // Reload vendor list
      } else {
        showError(res.data.message || t('Delete failed'));
      }
    } catch (error) {
      showError(error.response?.data?.message || t('Delete failed'));
    }
  };

  return (
    <Tabs
      activeKey={activeVendorKey}
      type='card'
      collapsible
      onChange={handleTabChange}
      className='mb-2'
      tabBarExtraContent={
        <Button
          type='primary'
          size='small'
          onClick={() => setShowAddVendor(true)}
        >
          {t('Add Vendor')}
        </Button>
      }
    >
      <TabPane
        itemKey='all'
        tab={
          <span className='flex items-center gap-2'>
            {t('All')}
            <Tag
              color={activeVendorKey === 'all' ? 'red' : 'grey'}
              shape='circle'
            >
              {vendorCounts['all'] || 0}
            </Tag>
          </span>
        }
      />

      {vendors.map((vendor) => {
        const key = String(vendor.id);
        const count = vendorCounts[vendor.id] || 0;
        return (
          <TabPane
            key={key}
            itemKey={key}
            tab={
              <span className='flex items-center gap-2'>
                {getLobeHubIcon(vendor.icon || 'Layers', 14)}
                {vendor.name}
                <Tag
                  color={activeVendorKey === key ? 'red' : 'grey'}
                  shape='circle'
                >
                  {count}
                </Tag>
                <Dropdown
                  trigger='click'
                  position='bottomRight'
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item
                        icon={<IconEdit />}
                        onClick={(e) => handleEditVendor(vendor, e)}
                      >
                        {t('Edit')}
                      </Dropdown.Item>
                      <Dropdown.Item
                        type='danger'
                        icon={<IconDelete />}
                        onClick={(e) => {
                          e.stopPropagation();
                          Modal.confirm({
                            title: t('Confirm Delete'),
                            content: t(
                              'Are you sure you want to delete vendor "{{name}}"? This action cannot be undone.',
                              { name: vendor.name },
                            ),
                            onOk: () => handleDeleteVendor(vendor, e),
                            okText: t('Delete'),
                            cancelText: t('Cancel'),
                            type: 'warning',
                            okType: 'danger',
                          });
                        }}
                      >
                        {t('Delete')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  }
                  onClickOutSide={(e) => e.stopPropagation()}
                >
                  <Button
                    size='small'
                    type='tertiary'
                    theme='outline'
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t('Actions')}
                  </Button>
                </Dropdown>
              </span>
            }
          />
        );
      })}
    </Tabs>
  );
};

export default ModelsTabs;
