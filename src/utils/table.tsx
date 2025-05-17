import { Checkbox, type TableColumnsType } from 'antd';
import { type DataRecord, type FieldData, type Schema } from '@/defines/schema';

export const generateColumns = (schema: Schema): TableColumnsType<DataRecord> => {
  const columns: TableColumnsType<DataRecord> = schema.map(({ label, name }) => ({
    title: label,
    dataIndex: name,
    key: name,
    render: (value: FieldData) => {
      if (typeof value === 'boolean') {
        return <Checkbox checked={value} />;
      }

      return String(value);
    },
  }));

  return columns;
};
