"use client";

import React from 'react';
import ModelsTable from '@/components/table/models/ModelsTable';
import ModelsActions from '@/components/table/models/ModelsActions';
import ModelsFilters from '@/components/table/models/ModelsFilters';
import ModelsTabs from '@/components/table/models/ModelsTabs';
import EditModelModal from '@/components/table/models/modals/EditModelModal';
import EditVendorModal from '@/components/table/models/modals/EditVendorModal';
import { useModelsData } from '@/hooks/models/useModelsData';
import { useIsMobile } from '@/hooks/common/useIsMobile';
import { createCardProPagination } from '@/helpers/utils';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const ModelsConsole: React.FC = () => {
  const modelsData = useModelsData();
  const isMobile = useIsMobile();

  const {
    // Edit state
    showEdit,
    editingModel,
    closeEdit,
    refresh,

    // Actions state
    selectedKeys,
    setSelectedKeys,
    setEditingModel,
    setShowEdit,
    batchDeleteModels,

    // Filters state
    formInitValues,
    setFormApi,
    searchModels,
    loading,
    searching,

    // Description state
    compactMode,
    setCompactMode,

    // Vendor state
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
    <div className="p-6 space-y-6">
      {/* Modals */}
      <EditModelModal
        refresh={refresh}
        editingModel={editingModel}
        visiable={showEdit}
        handleClose={closeEdit}
      />

      <EditVendorModal
        visible={showAddVendor || showEditVendor}
        handleClose={() => {
          setShowAddVendor(false);
          setShowEditVendor(false);
          setEditingVendor({ id: undefined });
        }}
        editingVendor={showEditVendor ? editingVendor : { id: undefined }}
        refresh={() => {
          loadVendors();
          refresh();
        }}
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t('AI Models Management')}
        </h1>
        <p className="text-muted-foreground">
          {t('Configure and manage AI models, endpoints, and vendor settings')}
        </p>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-border/50 bg-card/95 backdrop-blur-xl shadow-xl">
          <CardContent className="p-6 space-y-6">
            {/* Tabs Area */}
            <div className="border-b border-border/50 pb-4">
              <ModelsTabs {...modelsData} />
            </div>

            {/* Actions and Filters Area */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="w-full lg:w-auto">
                <ModelsActions
                  selectedKeys={selectedKeys}
                  setSelectedKeys={setSelectedKeys}
                  setEditingModel={setEditingModel}
                  setShowEdit={setShowEdit}
                  batchDeleteModels={batchDeleteModels}
                  syncing={modelsData.syncing}
                  syncUpstream={modelsData.syncUpstream}
                  previewing={modelsData.previewing}
                  previewUpstreamDiff={modelsData.previewUpstreamDiff}
                  applyUpstreamOverwrite={modelsData.applyUpstreamOverwrite}
                  compactMode={compactMode}
                  setCompactMode={setCompactMode}
                  t={t}
                />
              </div>

              <div className="w-full lg:w-auto lg:min-w-[300px]">
                <ModelsFilters
                  formInitValues={formInitValues}
                  setFormApi={setFormApi}
                  searchModels={searchModels}
                  loading={loading}
                  searching={searching}
                  t={t}
                />
              </div>
            </div>

            {/* Table Area */}
            <div className="rounded-lg border border-border/50 overflow-hidden">
              <ModelsTable {...modelsData} />
            </div>

            {/* Pagination Area */}
            <div className="flex justify-center pt-4 border-t border-border/50">
              {createCardProPagination({
                currentPage: modelsData.activePage,
                pageSize: modelsData.pageSize,
                total: modelsData.modelCount,
                onPageChange: modelsData.handlePageChange,
                onPageSizeChange: modelsData.handlePageSizeChange,
                isMobile: isMobile,
                t: modelsData.t,
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ModelsConsole;