import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';

type TableProps<RecordType extends AnyObject = AnyObject> = AntdTableProps<RecordType>;

export function Table<RecordType extends AnyObject = AnyObject>(props: TableProps<RecordType>) {
  return <AntdTable {...props}></AntdTable>;
}
