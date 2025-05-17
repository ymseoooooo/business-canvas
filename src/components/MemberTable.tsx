import { useMemo } from 'react';
import { TableColumnsType } from 'antd';
import { ItemType } from 'antd/es/menu/interface';

import { Table } from './common/Table/Table';
import { MemberInitialData, memberSchema } from '../constants/member';
import { DataRecord, Schema } from '../defines/schema';
import { isPrimaryField } from '../utils/schema';
import { ActionMenu } from './common/Table';
import { generateColumns } from '../utils/table';

interface UseColumnsReturn {
  columns: TableColumnsType<DataRecord>;
}

interface UseColumnsParams {
  schema: Schema;
}

export function useMemberTable(params: UseColumnsParams): UseColumnsReturn {
  const { schema } = params;

  const columns = useMemo(() => {
    const filteredSchema = schema.filter(field => !isPrimaryField(field));
    const tableColumns = generateColumns(filteredSchema);

    const primaryField = schema.find(field => isPrimaryField(field));

    if (primaryField) {
      const { name } = primaryField;

      tableColumns.push({
        title: '',
        dataIndex: name,
        key: name,
        width: 1,
        render: (_, record: DataRecord) => {
          const actionItems: ItemType[] = [
            {
              key: 'edit',
              label: '수정',
              onClick: () => {
                console.log('Edit', record);
              },
            },
            {
              key: 'delete',
              label: '삭제',
              danger: true,
              onClick: () => {
                console.log('Delete', record);
              },
            },
          ];

          return (
            <ActionMenu
              menu={{
                items: actionItems,
                style: { width: '185px' },
              }}
            />
          );
        },
      });
    }

    return tableColumns;
  }, [schema]);

  return { columns };
}

export function MemberTable() {
  const { columns } = useMemberTable({ schema: memberSchema });

  return <Table columns={columns} dataSource={MemberInitialData} rowKey={row => row.id} pagination={false} />;
}
