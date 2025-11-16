import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Switch, Button } from '@douyinfe/semi-ui';
import { API, showError, showSuccess } from '@/helpers';

interface EditModelModalProps {
  visible: boolean;
  onClose: () => void;
  editingModel: any;
  onSuccess: () => void;
  t: (key: string, params?: any) => string;
}

const EditModelModal: React.FC<EditModelModalProps> = ({
  visible,
  onClose,
  editingModel,
  onSuccess,
  t,
}) => {
  const [loading, setLoading] = useState(false);
  const [formApi, setFormApi] = useState<any>(null);

  useEffect(() => {
    if (visible && editingModel && formApi) {
      formApi.setValues(editingModel);
    }
  }, [visible, editingModel, formApi]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const isEdit = editingModel?.id;
      const url = isEdit ? `/api/models/${editingModel.id}` : '/api/models/';
      const method = isEdit ? 'put' : 'post';
      
      const res = await API[method](url, values);
      
      if (res.data.success) {
        showSuccess(t(isEdit ? 'Model updated successfully!' : 'Model created successfully!'));
        onSuccess();
        onClose();
      } else {
        showError(res.data.message || t('Operation failed'));
      }
    } catch (error: any) {
      showError(error.response?.data?.message || t('Operation failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={editingModel?.id ? t('Edit Model') : t('Add Model')}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form
        getFormApi={(api) => setFormApi(api)}
        onSubmit={handleSubmit}
        labelPosition="left"
        labelWidth={120}
      >
        <Form.Input
          field="model_name"
          label={t('Model Name')}
          placeholder={t('Enter model name, e.g., gpt-4')}
          rules={[{ required: true, message: t('Model name is required') }]}
        />

        <Form.Select
          field="type"
          label={t('Type')}
          placeholder={t('Select model type')}
          rules={[{ required: true, message: t('Type is required') }]}
        >
          <Select.Option value={1}>{t('Chat')}</Select.Option>
          <Select.Option value={2}>{t('Embedding')}</Select.Option>
          <Select.Option value={3}>{t('Image Generation')}</Select.Option>
          <Select.Option value={4}>{t('Audio')}</Select.Option>
          <Select.Option value={5}>{t('Video')}</Select.Option>
        </Form.Select>

        <Form.Select
          field="pricing_mode"
          label={t('Pricing Mode')}
          placeholder={t('Select pricing mode')}
        >
          <Select.Option value="ratio">{t('Ratio Mode')}</Select.Option>
          <Select.Option value="price">{t('Fixed Price')}</Select.Option>
        </Form.Select>

        <Form.InputNumber
          field="model_ratio"
          label={t('Model Ratio')}
          placeholder={t('Enter model ratio')}
          min={0}
          step={0.01}
        />

        <Form.InputNumber
          field="completion_ratio"
          label={t('Completion Ratio')}
          placeholder={t('Enter completion ratio')}
          min={0}
          step={0.01}
        />

        <Form.Switch
          field="status"
          label={t('Status')}
          checkedText={t('Enabled')}
          uncheckedText={t('Disabled')}
        />

        <Form.TextArea
          field="description"
          label={t('Description')}
          placeholder={t('Enter model description')}
          rows={3}
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose}>{t('Cancel')}</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {t('Save')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditModelModal;