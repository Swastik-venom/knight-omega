import React from 'react';
import { Tooltip } from '@douyinfe/semi-ui';
import { IconPlus, IconSync, IconSetting, IconDelete } from '@douyinfe/semi-icons';
import { motion } from 'framer-motion';

interface ModelsActionsProps {
  selectedKeys: any[];
  setSelectedKeys: (keys: any[]) => void;
  setEditingModel: (model: any) => void;
  setShowEdit: (show: boolean) => void;
  batchDeleteModels: () => void;
  syncing: boolean;
  syncUpstream: (opts?: any) => Promise<void>;
  compactMode: boolean;
  setCompactMode: (mode: boolean) => void;
  t: (key: string, params?: any) => string;
}

const ModelsActions: React.FC<ModelsActionsProps> = ({
  selectedKeys,
  setEditingModel,
  setShowEdit,
  batchDeleteModels,
  syncing,
  syncUpstream,
  compactMode,
  setCompactMode,
  t,
}) => {
  return (
    <div className="flex flex-nowrap items-center gap-2 overflow-x-auto">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/35 bg-gradient-to-r from-indigo-500/90 via-purple-500/85 to-blue-500/90 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(79,70,229,0.25)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(79,70,229,0.35)]"
        onClick={() => {
          setEditingModel({ id: undefined });
          setShowEdit(true);
        }}
      >
        <IconPlus className="h-4 w-4" />
        <span className="font-medium">{t('Add Model')}</span>
      </motion.button>

      <Tooltip content={t('Sync models from official repository')}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={syncing}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => syncUpstream({ locale: 'en' })}
        >
          <IconSync className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
          <span className="font-medium">{t('Sync')}</span>
        </motion.button>
      </Tooltip>

      <Tooltip content={t('Toggle compact mode')}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 hover:shadow-md"
          onClick={() => setCompactMode(!compactMode)}
        >
          <IconSetting className="h-4 w-4" />
          <span className="font-medium">{compactMode ? t('Normal View') : t('Compact View')}</span>
        </motion.button>
      </Tooltip>

      {selectedKeys.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-red-400/30 bg-red-500/20 px-4 py-2.5 text-sm font-medium text-red-100 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/50 hover:bg-red-500/30 hover:shadow-md"
          onClick={batchDeleteModels}
        >
          <IconDelete className="h-4 w-4" />
          <span className="font-medium">{t('Delete Selected')} ({selectedKeys.length})</span>
        </motion.button>
      )}
    </div>
  );
};

export default ModelsActions;