import { useEffect, useState, Fragment, type ReactNode } from 'react';
import { Checkbox, Form, Input, Select, type FormInstance } from 'antd';
import dayjs from 'dayjs';

import { useMemberModalContext } from '@/contexts/MemberModalContext';
import { Modal } from './common/Modal';
import { type DataRecord, type FieldDefinition, type Schema } from '@/defines/schema';
import {
  isCheckboxField,
  isDateField,
  isPrimaryField,
  isSelectField,
  isTextareaField,
  isTextField,
} from '@/utils/schema';
import { Button } from './common/Button';
import { DatePicker } from './common/DatePicker';

interface MemberModalProps {
  schema: Schema;
  onClose: () => void;
  onSubmit: (data: DataRecord) => void;
}

const validateMessages = {
  required: '${label}은 필수값입니다.',
  string: {
    max: '글자수 ${max}을 초과할 수 없습니다.',
  },
};

type UseMemberModalParams = MemberModalProps;

interface UseMemberModalReturn {
  isOpened: boolean;
  selectedMember?: DataRecord;
  isEdit: boolean;
  form: FormInstance;
  submittable: boolean;
  handleSubmit: () => void;
  renderField: (field: FieldDefinition) => ReactNode;
}

function useMemberModal(params: UseMemberModalParams): UseMemberModalReturn {
  const { onSubmit } = params;

  const { isOpened, selectedMember } = useMemberModalContext();
  const [form] = Form.useForm<DataRecord>();
  const [submittable, setSubmittable] = useState<boolean>(false);
  const values = Form.useWatch([], form);

  const isEdit = !!selectedMember;

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = selectedMember ? { ...selectedMember, ...values } : values;
      onSubmit(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const renderField = (field: FieldDefinition) => {
    const { name } = field;
    if (isPrimaryField(field)) return null;

    if (isTextField(field)) {
      return (
        <Form.Item
          name={name}
          label={field.label}
          rules={[{ required: field.rules?.required, max: field.rules?.maxLength }]}
        >
          <Input />
        </Form.Item>
      );
    }

    if (isTextareaField(field)) {
      return (
        <Form.Item
          name={name}
          label={field.label}
          rules={[{ required: field.rules?.required, max: field.rules?.maxLength }]}
        >
          <Input.TextArea />
        </Form.Item>
      );
    }

    if (isDateField(field)) {
      return (
        <Form.Item
          name={name}
          label={field.label}
          rules={[{ required: field.rules?.required }]}
          getValueFromEvent={date => {
            return date ? dayjs(date).format('YYYY-MM-DD') : '';
          }}
          getValueProps={value => ({
            value: value ? dayjs(value, 'YYYY-MM-DD') : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
      );
    }

    if (isCheckboxField(field)) {
      return (
        <Form.Item
          name={name}
          label={field.label}
          rules={[{ required: field.rules?.required }]}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      );
    }

    if (isSelectField(field)) {
      return (
        <Form.Item key={name} name={name} label={field.label} rules={[{ required: field.rules?.required }]}>
          <Select options={field.options} />
        </Form.Item>
      );
    }
  };

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values, isOpened]);

  useEffect(() => {
    if (isOpened) {
      form.resetFields();
      if (selectedMember) {
        form.setFieldsValue(selectedMember);
      }
    }
  }, [isOpened, selectedMember, form]);

  return { isOpened, selectedMember, isEdit, form, submittable, handleSubmit, renderField };
}

export function MemberModal(props: MemberModalProps) {
  const { schema, onClose } = props;
  const { isOpened, selectedMember, isEdit, form, submittable, handleSubmit, renderField } = useMemberModal(props);

  if (!isOpened) return null;

  return (
    <Modal title={isEdit ? '멤버 수정' : '멤버 추가'} onCancel={onClose} footer={null} open>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        validateMessages={validateMessages}
        initialValues={selectedMember}
      >
        {schema.map(field => {
          const { name } = field;
          return <Fragment key={name}>{renderField(field)}</Fragment>;
        })}

        <Form.Item style={{ marginTop: 24, marginBottom: 0, textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            취소
          </Button>
          <Button type="primary" htmlType="submit" disabled={!submittable}>
            {isEdit ? '수정' : '추가'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
