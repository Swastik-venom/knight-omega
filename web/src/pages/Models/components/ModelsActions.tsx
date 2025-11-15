import React from 'react';
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { IconPlus, IconSync, IconSetting, IconDelete } from '@douyinfe/semi-icons';

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
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="primary"
        icon={<IconPlus />}
        onClick={() => {
          setEditingModel({ id: undefined });
          setShowEdit(true);
        }}
      >
        {t('Add Model')}
      </Button>

      <Tooltip content={t('Sync models from official repository')}>
        <Button
          type="secondary"
          icon={<IconSync />}
          loading={syncing}
          onClick={() => syncUpstream({ locale: 'en' })}
        >
          {t('Sync')}
        </Button>
      </Tooltip>

      <Tooltip content={t('Toggle compact mode')}>
        <Button
          type="tertiary"
          icon={<IconSetting />}
          onClick={() => setCompactMode(!compactMode)}
        >
          {compactMode ? t('Normal View') : t('Compact View')}
        </Button>
      </Tooltip>

      {selectedKeys.length > 0 && (
        <Button
          type="danger"
          icon={<IconDelete />}
          onClick={batchDeleteModels}
        >
          {t('Delete Selected')} ({selectedKeys.length})
        </Button>
      )}
    </div>
  );
};

export default ModelsActions;