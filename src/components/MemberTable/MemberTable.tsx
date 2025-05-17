import { useMemo } from 'react';
import type { TableColumnsType } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';

import { Table, ActionMenu } from '@/components/common/Table';
import { memberSchemaData } from '@/constants/member';
import { type DataRecord, type Schema } from '@/defines/schema';
import { isPrimaryField } from '@/utils/schema';
import { generateColumns } from '@/utils/table';
import { useMemberModalContext } from '@/contexts/MemberModalContext';
import { useMemberDataContext } from '@/contexts/MemberDataContext';

interface MemberTableProps {
  data: DataRecord[];
}

interface UseColumnsReturn {
  columns: TableColumnsType<DataRecord>;
}

interface UseColumnsParams {
  schema: Schema;
}

export function useMemberTable(params: UseColumnsParams): UseColumnsReturn {
  const { schema } = params;
  const { openModal } = useMemberModalContext();
  const { deleteMember } = useMemberDataContext();

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
                openModal(record);
              },
            },
            {
              key: 'delete',
              label: '삭제',
              danger: true,
              onClick: () => {
                deleteMember(record.id);
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
  }, [schema, openModal]);

  return { columns };
}

export function MemberTable({ data }: MemberTableProps) {
  const { columns } = useMemberTable({ schema: memberSchemaData });

  return <Table columns={columns} dataSource={data} rowKey={row => row.id} pagination={false} />;
}
