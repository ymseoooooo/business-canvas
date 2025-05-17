import { type DataRecord, type Schema } from '@/defines/schema';

// 백엔드에서 데이터 스키마에 대한 정보를 가져왔다고 가정
export const memberSchemaData: Schema = [
  { name: 'id', label: 'id', uiType: 'none', value: 'number', isPrimary: true },
  {
    name: 'name',
    label: '이름',
    uiType: 'text',
    value: 'string',
    rules: {
      required: true,
      maxLength: 20,
    },
    filters: [
      { text: 'John Doe', value: 'John Doe' },
      { text: 'Foo bar', value: 'Foo bar' },
    ],
  },
  {
    name: 'address',
    label: '주소',
    uiType: 'text',
    value: 'string',
    rules: {
      maxLength: 20,
    },
    filters: [
      { text: '서울 강남구', value: '서울 강남구' },
      { text: '서울 서초구', value: '서울 서초구' },
    ],
  },
  {
    name: 'memo',
    label: '메모',
    uiType: 'textarea',
    value: 'string',
    rules: { maxLength: 50 },
    filters: [
      { text: '외국인', value: '외국인' },
      { text: '한국인', value: '한국인' },
    ],
  },
  {
    name: 'registrationDate',
    label: '가입일',
    uiType: 'date',
    rules: { required: true },
    value: 'string',
    filters: [
      { text: '2024-10-01', value: '2024-10-01' },
      { text: '2024-10-02', value: '2024-10-02' },
    ],
  },
  {
    name: 'job',
    label: '직업',
    uiType: 'select',
    value: 'string',
    options: [
      { label: '개발자', value: '개발자' },
      { label: 'PO', value: 'PO' },
      { label: '디자이너', value: '디자이너' },
    ],
    filters: [
      { text: '개발자', value: '개발자' },
      { text: 'PO', value: 'PO' },
    ],
  },
  {
    name: 'isEmailAgreement',
    label: '이메일 수신 동의',
    uiType: 'checkbox',
    value: 'boolean',
    filters: [
      { text: '선택됨', value: true },
      { text: '미선택됨', value: false },
    ],
  },
];

// 백엔드에서 스키마 정보에 따른 실제 데이터를 가져 왔다고 가정
export const MemberInitialData: DataRecord<typeof memberSchemaData>[] = [
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
] as unknown as DataRecord<typeof memberSchemaData>[];
