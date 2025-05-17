import { Checkbox } from 'antd';
import type { FilterDropdownProps as AntdFilterDropdownProps } from 'antd/es/table/interface';
import styled from 'styled-components';

type FilterDropdownProps = AntdFilterDropdownProps;

export function FilterDropdown({ setSelectedKeys, selectedKeys, confirm, filters }: FilterDropdownProps) {
  return (
    <FilterWrapper>
      {filters?.map(filter => (
        <div key={String(filter.value)}>
          <Checkbox
            checked={selectedKeys?.find(key => key === filter.value) !== undefined}
            onChange={e => {
              const newSelectedKeys = e.target.checked
                ? [...selectedKeys, String(filter.value)]
                : selectedKeys.filter(key => key !== filter.value);
              setSelectedKeys(newSelectedKeys);
              confirm({ closeDropdown: false });
            }}
          >
            {filter.text}
          </Checkbox>
        </div>
      ))}
    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;
