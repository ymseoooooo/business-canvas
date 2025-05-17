import { Checkbox, type TableColumnsType } from 'antd';
import { type DataRecord, type FieldData, type Schema } from '@/defines/schema';
import { isDateField } from './schema';
import dayjs from 'dayjs';

export const generateColumns = (schema: Schema): TableColumnsType<DataRecord> => {
  const columns: TableColumnsType<DataRecord> = schema.map(field => {
    const { name, label } = field;

    return {
      title: label,
      dataIndex: name,
      key: name,
      render: (value: FieldData) => {
        if (typeof value === 'boolean') {
          return <Checkbox checked={value} />;
        }

        if (isDateField(field)) {
          return dayjs(value).format('YYYY-MM-DD');
        }

        return value;
      },
    };
  });

  return columns;
};
