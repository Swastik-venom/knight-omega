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
      title: t('Model Name'),
      dataIndex: 'model_name',
      key: 'model_name',
      width: 250,
      fixed: !compactMode ? ('left' as const) : undefined,
      render: (text: string, record: any) => (
        <div className="flex items-center gap-2">
          <Tooltip content={t('Copy model name')}>
            <Button
              icon={<IconCopy />}
              type="tertiary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(text);
              }}
            />
          </Tooltip>
          <span className="font-mono text-sm font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: t('Provider'),
      dataIndex: 'vendor_id',
      key: 'vendor',
      width: 150,
      render: (vendorId: number) => {
        const vendor = vendorMap[vendorId];
        return vendor ? (
          <Tag color="blue">{vendor.name}</Tag>
        ) : (
          <Tag color="grey">{t('Unknown')}</Tag>
        );
      },
    },
    {
      title: t('Type'),
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: number) => {
        const typeMap: Record<number, { text: string; color: any }> = {
          1: { text: t('Chat'), color: 'green' },
          2: { text: t('Embedding'), color: 'purple' },
          3: { text: t('Image Generation'), color: 'orange' },
          4: { text: t('Audio'), color: 'cyan' },
          5: { text: t('Video'), color: 'pink' },
        };
        const typeInfo = typeMap[type] || { text: t('Other'), color: 'grey' };
        return <Tag color={typeInfo.color as any}>{typeInfo.text}</Tag>;
      },
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number) => (
        <Tag color={status === 1 ? 'green' : 'red'}>
          {status === 1 ? t('Enabled') : t('Disabled')}
        </Tag>
      ),
    },
    {
      title: t('Pricing Mode'),
      dataIndex: 'pricing_mode',
      key: 'pricing_mode',
      width: 130,
      render: (mode: string) => {
        const modeMap: Record<string, { text: string; color: any }> = {
          ratio: { text: t('Ratio Mode'), color: 'blue' },
          price: { text: t('Fixed Price'), color: 'purple' },
        };
        const modeInfo = modeMap[mode] || { text: t('Not Set'), color: 'grey' };
        return <Tag color={modeInfo.color as any}>{modeInfo.text}</Tag>;
      },
    },
    {
      title: t('Actions'),
      key: 'actions',
      fixed: !compactMode ? ('right' as const) : undefined,
      width: 200,
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <Tooltip content={t('View Details')}>
            <Button
              icon={<IconEyeOpened />}
              type="tertiary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setEditingModel(record);
                setShowEdit(true);
              }}
            />
          </Tooltip>
          
          <Tooltip content={t('Edit')}>
            <Button
              icon={<IconEdit />}
              type="tertiary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setEditingModel(record);
                setShowEdit(true);
              }}
            />
          </Tooltip>

          <Popconfirm
            title={t('Confirm deletion')}
            content={t('Are you sure you want to delete this model?')}
            onConfirm={() => manageModel(record.id, 'delete', record)}
          >
            <Button
              icon={<IconDelete />}
              type="danger"
              theme="borderless"
              size="small"
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>

          {record.status === 1 ? (
            <Button
              type="warning"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                manageModel(record.id, 'disable', record);
              }}
            >
              {t('Disable')}
            </Button>
          ) : (
            <Button
              type="primary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                manageModel(record.id, 'enable', record);
              }}
            >
              {t('Enable')}
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
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
        className="models-table"
      />
    </motion.div>
  );
};

export default ModelsTable;