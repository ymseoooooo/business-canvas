import { DataRecord, Schema } from '../defines/schema';

// 백엔드에서 데이터 스키마에 대한 정보를 가져왔다고 가정
export const memberSchema: Schema = [
  { name: 'id', label: 'id', uiType: 'none', value: 'number', isPrimary: true },
  {
    name: 'name',
    label: '이름',
    uiType: 'text',
    value: 'string',
    options: {
      required: true,
    },
  },
  {
    name: 'address',
    label: '주소',
    uiType: 'text',
    value: 'string',
  },
  { name: 'memo', label: '메모', uiType: 'textarea', value: 'string' },
  { name: 'registrationDate', label: '가입일', uiType: 'date', options: { required: true }, value: 'string' },
  { name: 'job', label: '직업', uiType: 'select', value: 'string' },
  { name: 'isEmailAgreement', label: '이메일 수신 동의', uiType: 'checkbox', value: 'boolean' },
];

// 백엔드에서 스키마 정보에 따른 실제 데이터를 가져 왔다고 가정
export const MemberInitialData: DataRecord<typeof memberSchema>[] = [
  {
    id: 1,
    name: 'John Doe',
    address: '서울 강남구',
    memo: '외국인',
    registrationDate: '2024-10-02',
    job: '개발자',
    isEmailAgreement: true,
  },
  {
    id: 2,
    name: 'Foo bar',
    address: '서울 서초구',
    memo: '한국인',
    registrationDate: '2024-10-01',
    job: 'PO',
    isEmailAgreement: false,
  },
] as unknown as DataRecord<typeof memberSchema>[];
