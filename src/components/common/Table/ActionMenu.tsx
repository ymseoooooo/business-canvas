import { Button, Dropdown, type DropdownProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

type ActionMenuProps = Omit<DropdownProps, 'children'>;

export function ActionMenu(props: ActionMenuProps) {
  return (
    <Dropdown {...props}>
      <Button type="text" icon={<MoreOutlined />} size="small" />
    </Dropdown>
  );
}
