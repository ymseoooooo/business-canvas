import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { Button } from './components/common/Button';
import { MemberTable } from './components/MemberTable';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 14px;
`;

function App() {
  return (
    <div>
      <PageHeader>
        <span>회원 목록</span>
        <Button type="primary" icon={<PlusOutlined />}>
          추가
        </Button>
      </PageHeader>

      <MemberTable />
    </div>
  );
}

export default App;
