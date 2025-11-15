import React from 'react';
import { useModelsData } from '../../hooks/models/useModelsData';
import ModelsTable from './components/ModelsTable';
import ModelsFilters from './components/ModelsFilters';
import ModelsActions from './components/ModelsActions';
import VendorTabs from './components/VendorTabs';
import EditModelModal from './components/EditModelModal';
import EditVendorModal from './components/EditVendorModal';
import { Spin } from '@douyinfe/semi-ui';

const ModelsContent: React.FC = () => {
  const modelsData = useModelsData();

  const {
    // Loading states
    loading,
    searching,

    // Modal states
    showEdit,
    editingModel,
    closeEdit,
    refresh,

    // Vendor states
    showAddVendor,
    setShowAddVendor,
    showEditVendor,
    setShowEditVendor,
    editingVendor,
    setEditingVendor,
    loadVendors,

    // Translation
    t,
  } = modelsData;

  return (
    <>
      {/* Edit Model Modal */}
      <EditModelModal
        visible={showEdit}
        onClose={closeEdit}
        editingModel={editingModel}
        onSuccess={refresh}
        t={t}
      />

      {/* Edit Vendor Modal */}
      <EditVendorModal
        visible={showAddVendor || showEditVendor}
        onClose={() => {
          setShowAddVendor(false);
          setShowEditVendor(false);
          setEditingVendor({ id: undefined });
        }}
        editingVendor={showEditVendor ? editingVendor : { id: undefined }}
        onSuccess={() => {
          loadVendors();
          refresh();
        }}
        t={t}
      />

      {/* Main Content Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_55px_rgba(15,23,42,0.4)]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/20 via-transparent to-sky-200/20 opacity-60 dark:from-indigo-500/10 dark:to-sky-500/10" />
        
        <div className="relative p-6">
          {/* Vendor Tabs */}
          <VendorTabs {...modelsData} />

          {/* Actions and Filters */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <ModelsActions {...modelsData} />
            <ModelsFilters {...modelsData} />
          </div>

          {/* Models Table */}
          {loading && !modelsData.models.length ? (
            <div className="flex items-center justify-center py-20">
              <Spin size="large" />
            </div>
          ) : (
            <ModelsTable {...modelsData} />
          )}

          {/* Pagination Info */}
          {modelsData.models.length > 0 && (
            <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-4 dark:border-white/10">
              <div className="text-sm text-slate-600 dark:text-white/70">
                {t('共 {{total}} 项，当前显示 {{start}}-{{end}} 项', {
                  total: modelsData.modelCount,
                  start: (modelsData.activePage - 1) * modelsData.pageSize + 1,
                  end: Math.min(
                    modelsData.activePage * modelsData.pageSize,
                    modelsData.modelCount
                  ),
                })}
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => modelsData.handlePageChange(modelsData.activePage - 1)}
                  disabled={modelsData.activePage === 1}
                  className="rounded-lg border border-slate-200/70 bg-white px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                >
                  {t('上一页')}
                </button>
                
                <span className="text-sm text-slate-600 dark:text-white/70">
                  {t('显示第')} {modelsData.activePage} / {Math.ceil(modelsData.modelCount / modelsData.pageSize)} {t('页')}
                </span>

                <button
                  onClick={() => modelsData.handlePageChange(modelsData.activePage + 1)}
                  disabled={modelsData.activePage >= Math.ceil(modelsData.modelCount / modelsData.pageSize)}
                  className="rounded-lg border border-slate-200/70 bg-white px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                >
                  {t('下一页')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModelsContent;