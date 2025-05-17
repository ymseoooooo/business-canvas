import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { Button } from '@/components/common/Button';
import { MemberTable } from '@/components/MemberTable';
import { MemberModal } from '@/components/MemberModal';
import { useMemberModalContext } from '@/contexts/MemberModalContext';
import { useMemberDataContext } from '@/contexts/MemberDataContext';
import type { DataRecord, Schema } from '@/defines/schema';
import { memberSchemaData } from '@/constants/member';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 14px;
`;

interface UseMemberViewReturn {
  schema: Schema;
  memberDataList: DataRecord[];
  handleSubmit: (data: DataRecord) => void;
}

function useMemberView(): UseMemberViewReturn {
  const { closeModal: closeMemberModal, selectedMember } = useMemberModalContext();
  const { memberDataList, addMember, updateMember } = useMemberDataContext();
  const [schema] = useState<Schema>(memberSchemaData);

  const handleSubmit = (data: DataRecord) => {
    const isEdit = !!selectedMember;

    if (isEdit) {
      updateMember(selectedMember.id, data);
    } else {
      addMember(data);
    }
    closeMemberModal();
  };

  return { schema, memberDataList, handleSubmit };
}

export function MemberView() {
  const { schema, memberDataList, handleSubmit } = useMemberView();
  const { openModal: openMemberModal, closeModal: closeMemberModal } = useMemberModalContext();

  return (
    <>
      <Header>
        <span>회원 목록</span>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openMemberModal()}>
          추가
        </Button>
      </Header>

      <MemberTable data={memberDataList} />

      <MemberModal schema={schema} onClose={closeMemberModal} onSubmit={handleSubmit} />
    </>
  );
}
