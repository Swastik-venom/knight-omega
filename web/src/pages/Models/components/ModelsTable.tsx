import React from 'react';
import { Table, Tag, Button, Popconfirm, Tooltip } from '@douyinfe/semi-ui';
import { IconEdit, IconDelete, IconCopy, IconEyeOpened } from '@douyinfe/semi-icons';
import { motion } from 'framer-motion';

interface ModelsTableProps {
  models: any[];
  loading: boolean;
  rowSelection: any;
  handleRow: (record: any, index?: number) => any;
  manageModel: (id: number, action: string, record: any) => void;
  setEditingModel: (model: any) => void;
  setShowEdit: (show: boolean) => void;
  vendorMap: Record<string, any>;
  compactMode: boolean;
  t: (key: string, params?: any) => string;
}

const ModelsTable: React.FC<ModelsTableProps> = ({
  models,
  loading,
  rowSelection,
  handleRow,
  manageModel,
  setEditingModel,
  setShowEdit,
  vendorMap,
  compactMode,
  t,
}) => {
  const columns = [
    {
      title: <span className="text-slate-600 dark:text-white/70">{t('Model Name')}</span>,
      dataIndex: 'model_name',
      key: 'model_name',
      width: 250,
      fixed: !compactMode ? ('left' as const) : undefined,
      render: (text: string, record: any) => (
        <div className="flex items-center gap-2">
          <Tooltip content={t('Copy model name')}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200/70 bg-white/50 text-slate-600 transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(text);
              }}
            >
              <IconCopy className="h-3.5 w-3.5" />
            </motion.button>
          </Tooltip>
          <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">{text}</span>
        </div>
      ),
    },
    {
      title: <span className="text-slate-600 dark:text-white/70">{t('Provider')}</span>,
      dataIndex: 'vendor_id',
      key: 'vendor',
      width: 150,
      render: (vendorId: number) => {
        const vendor = vendorMap[vendorId];
        return vendor ? (
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
            {vendor.name}
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-slate-200/50 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-white/50">
            {t('Unknown')}
          </span>
        );
      },
    },
    {
      title: <span className="text-slate-600 dark:text-white/70">{t('Type')}</span>,
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: number) => {
        const typeMap: Record<number, { text: string; bgColor: string; textColor: string }> = {
          1: { text: t('Chat'), bgColor: 'bg-green-500/10 dark:bg-green-400/10', textColor: 'text-green-700 dark:text-green-300' },
          2: { text: t('Embedding'), bgColor: 'bg-purple-500/10 dark:bg-purple-400/10', textColor: 'text-purple-700 dark:text-purple-300' },
          3: { text: t('Image Generation'), bgColor: 'bg-orange-500/10 dark:bg-orange-400/10', textColor: 'text-orange-700 dark:text-orange-300' },
          4: { text: t('Audio'), bgColor: 'bg-cyan-500/10 dark:bg-cyan-400/10', textColor: 'text-cyan-700 dark:text-cyan-300' },
          5: { text: t('Video'), bgColor: 'bg-pink-500/10 dark:bg-pink-400/10', textColor: 'text-pink-700 dark:text-pink-300' },
        };
        const typeInfo = typeMap[type] || { text: t('Other'), bgColor: 'bg-slate-200/50 dark:bg-white/10', textColor: 'text-slate-600 dark:text-white/50' };
        return (
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${typeInfo.bgColor} ${typeInfo.textColor}`}>
            {typeInfo.text}
          </span>
        );
      },
    },
    {
      title: <span className="text-slate-600 dark:text-white/70">{t('Status')}</span>,
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number) => (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
          status === 1
            ? 'bg-green-500/10 text-green-700 dark:bg-green-400/10 dark:text-green-300'
            : 'bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-300'
        }`}>
          {status === 1 ? t('Enabled') : t('Disabled')}
        </span>
      ),
    },
    {
      title: <span className="text-slate-600 dark:text-white/70">{t('Pricing Mode')}</span>,
      dataIndex: 'pricing_mode',
      key: 'pricing_mode',
      width: 130,
      render: (mode: string) => {
        const modeMap: Record<string, { text: string; bgColor: string; textColor: string }> = {
          ratio: { text: t('Ratio Mode'), bgColor: 'bg-blue-500/10 dark:bg-blue-400/10', textColor: 'text-blue-700 dark:text-blue-300' },
          price: { text: t('Fixed Price'), bgColor: 'bg-purple-500/10 dark:bg-purple-400/10', textColor: 'text-purple-700 dark:text-purple-300' },
        };
        const modeInfo = modeMap[mode] || { text: t('Not Set'), bgColor: 'bg-slate-200/50 dark:bg-white/10', textColor: 'text-slate-600 dark:text-white/50' };
        return (
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${modeInfo.bgColor} ${modeInfo.textColor}`}>
            {modeInfo.text}
          </span>
        );
      },
    },
    {
      title: <span className="text-slate-600 dark:text-white/70">{t('Actions')}</span>,
      key: 'actions',
      fixed: !compactMode ? ('right' as const) : undefined,
      width: 200,
      render: (_: any, record: any) => (
        <div className="flex items-center gap-1.5">
          <Tooltip content={t('View Details')}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/70 bg-white/50 text-slate-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
              onClick={(e) => {
                e.stopPropagation();
                setEditingModel(record);
                setShowEdit(true);
              }}
            >
              <IconEyeOpened className="h-4 w-4" />
            </motion.button>
          </Tooltip>
          
          <Tooltip content={t('Edit')}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/70 bg-white/50 text-slate-600 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
              onClick={(e) => {
                e.stopPropagation();
                setEditingModel(record);
                setShowEdit(true);
              }}
            >
              <IconEdit className="h-4 w-4" />
            </motion.button>
          </Tooltip>

          <Popconfirm
            title={t('Confirm deletion')}
            content={t('Are you sure you want to delete this model?')}
            onConfirm={() => manageModel(record.id, 'delete', record)}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200/70 bg-red-50/50 text-red-600 transition-all hover:border-red-300 hover:bg-red-100 hover:text-red-700 dark:border-red-500/20 dark:bg-red-500/5 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
              onClick={(e) => e.stopPropagation()}
            >
              <IconDelete className="h-4 w-4" />
            </motion.button>
          </Popconfirm>

          {record.status === 1 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg border border-orange-200/70 bg-orange-50/50 px-3 py-1.5 text-xs font-medium text-orange-700 transition-all hover:border-orange-300 hover:bg-orange-100 dark:border-orange-500/20 dark:bg-orange-500/5 dark:text-orange-400 dark:hover:bg-orange-500/10"
              onClick={(e) => {
                e.stopPropagation();
                manageModel(record.id, 'disable', record);
              }}
            >
              {t('Disable')}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg border border-green-200/70 bg-green-50/50 px-3 py-1.5 text-xs font-medium text-green-700 transition-all hover:border-green-300 hover:bg-green-100 dark:border-green-500/20 dark:bg-green-500/5 dark:text-green-400 dark:hover:bg-green-500/10"
              onClick={(e) => {
                e.stopPropagation();
                manageModel(record.id, 'enable', record);
              }}
            >
              {t('Enable')}
            </motion.button>
          )}
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="overflow-hidden rounded-xl border border-slate-200/70 bg-white/50 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
    >
      <Table
        columns={columns}
        dataSource={models}
        loading={loading}
        rowSelection={rowSelection}
        onRow={handleRow}
        pagination={false}
        scroll={{ x: compactMode ? undefined : 1200 }}
        rowKey="id"
        className="models-table [&_.semi-table-thead>tr>th]:border-b [&_.semi-table-thead>tr>th]:border-slate-200/70 [&_.semi-table-thead>tr>th]:bg-slate-50/50 [&_.semi-table-thead>tr>th]:py-3 [&_.semi-table-thead>tr>th]:font-semibold [&_.semi-table-tbody>tr]:border-b [&_.semi-table-tbody>tr]:border-slate-200/50 [&_.semi-table-tbody>tr]:transition-colors [&_.semi-table-tbody>tr:hover]:bg-slate-50/50 dark:[&_.semi-table-thead>tr>th]:border-white/10 dark:[&_.semi-table-thead>tr>th]:bg-white/5 dark:[&_.semi-table-tbody>tr]:border-white/5 dark:[&_.semi-table-tbody>tr:hover]:bg-white/5"
      />
    </motion.div>
  );
};

export default ModelsTable;