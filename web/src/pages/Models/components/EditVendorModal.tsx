import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from '@douyinfe/semi-ui';
import { API, showError, showSuccess } from '@/helpers';

interface EditVendorModalProps {
  visible: boolean;
  onClose: () => void;
  editingVendor: any;
  onSuccess: () => void;
  t: (key: string, params?: any) => string;
}

const EditVendorModal: React.FC<EditVendorModalProps> = ({
  visible,
  onClose,
  editingVendor,
  onSuccess,
  t,
}) => {
  const [loading, setLoading] = useState(false);
  const [formApi, setFormApi] = useState<any>(null);

  useEffect(() => {
    if (visible && editingVendor && formApi) {
      formApi.setValues(editingVendor);
    }
  }, [visible, editingVendor, formApi]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const isEdit = editingVendor?.id;
      const url = isEdit ? `/api/vendors/${editingVendor.id}` : '/api/vendors/';
      const method = isEdit ? 'put' : 'post';
      
      const res = await API[method](url, values);
      
      if (res.data.success) {
        showSuccess(t(isEdit ? 'Vendor updated successfully!' : 'Vendor created successfully!'));
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
      title={editingVendor?.id ? t('Edit Vendor') : t('Add Vendor')}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <Form
        getFormApi={(api) => setFormApi(api)}
        onSubmit={handleSubmit}
        labelPosition="left"
        labelWidth={100}
      >
        <Form.Input
          field="name"
          label={t('Vendor Name')}
          placeholder={t('Enter vendor name, e.g., OpenAI')}
          rules={[{ required: true, message: t('Vendor name is required') }]}
        />

        <Form.Input
          field="icon"
          label={t('Icon')}
          placeholder={t('Enter icon name')}
        />

        <Form.TextArea
          field="description"
          label={t('Description')}
          placeholder={t('Enter vendor description')}
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

export default EditVendorModal;