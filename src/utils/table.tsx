import { Checkbox, type TableColumnsType } from 'antd';
import { type DataRecord, type FieldData, type FieldDefinition, type Schema } from '@/defines/schema';
import { isCheckboxField, isDateField } from './schema';
import dayjs from 'dayjs';
import type { ColumnType } from 'antd/es/table';
import { FilterDropdown } from '@/components/common/Table/FilterDropdown';

const generateFilter = (field: FieldDefinition): ColumnType<DataRecord> => {
  return {
    filters: field.filters,
    onFilter: (value, record) => {
      if (isCheckboxField(field)) {
        return Boolean(record[field.name]) === value;
      }

      return String(record[field.name]).includes(String(value));
    },
    filterDropdown: props => <FilterDropdown {...props} />,
  };
};

export const generateColumns = (schema: Schema): TableColumnsType<DataRecord> => {
  const columns: TableColumnsType<DataRecord> = schema.map(field => {
    const { name, label } = field;

    return {
      title: label,
      dataIndex: name,
      key: name,
      render: (value: FieldData) => {
        if (isCheckboxField(field)) {
          return <Checkbox checked={Boolean(value)} />;
        }

        if (isDateField(field)) {
          return dayjs(String(value)).format('YYYY-MM-DD');
        }

        return value;
      },
      ...generateFilter(field),
    };
  });

  return columns;
};
