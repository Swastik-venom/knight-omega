import React from 'react';
import { useModelsData } from '../../hooks/models/useModelsData';
import ModelsTable from './components/ModelsTable';
import ModelsFilters from './components/ModelsFilters';
import ModelsActions from './components/ModelsActions';
import VendorTabs from './components/VendorTabs';
import EditModelModal from './components/EditModelModal';
import EditVendorModal from './components/EditVendorModal';
import { motion } from 'framer-motion';

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

      {/* Main Content Card with Enhanced Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 shadow-[0_20px_55px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-60" />
        
        <div className="relative p-6">
          {/* Vendor Tabs */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <VendorTabs {...modelsData} />
          </motion.div>

          {/* Actions and Filters */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <ModelsActions {...modelsData} />
            <ModelsFilters {...modelsData} />
          </motion.div>

          {/* Models Table */}
          {loading && !modelsData.models.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-20"
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-indigo-500 dark:border-slate-700 dark:border-t-indigo-400"
                />
                <p className="text-sm font-medium text-white/70">Loading models...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <ModelsTable {...modelsData} />
            </motion.div>
          )}

          {/* Pagination Info */}
          {modelsData.models.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row"
            >
              <div className="text-sm font-medium text-white/80">
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
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => modelsData.handlePageChange(modelsData.activePage - 1)}
                  disabled={modelsData.activePage === 1}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {t('上一页')}
                </motion.button>
                
                <span className="flex items-center gap-2 text-sm font-medium text-white/80">
                  <span className="hidden sm:inline">{t('显示第')}</span>
                  <span className="inline-flex items-center justify-center rounded-lg bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300">
                    {modelsData.activePage}
                  </span>
                  <span>/</span>
                  <span>{Math.ceil(modelsData.modelCount / modelsData.pageSize)}</span>
                  <span className="hidden sm:inline">{t('页')}</span>
                </span>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => modelsData.handlePageChange(modelsData.activePage + 1)}
                  disabled={modelsData.activePage >= Math.ceil(modelsData.modelCount / modelsData.pageSize)}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {t('下一页')}
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ModelsContent;