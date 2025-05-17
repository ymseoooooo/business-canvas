import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { DataRecord } from '@/defines/schema';
import { MemberInitialData } from '@/constants/member';

const STORAGE_KEY = 'memberDataList';
const STORAGE_TYPE = import.meta.env.VITE_STORAGE || 'in-memory';

const getInitialData = (): DataRecord[] => {
  if (STORAGE_TYPE === 'local-storage') {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : MemberInitialData;
  }
  return MemberInitialData;
};

const saveToStorage = (data: DataRecord[]) => {
  if (STORAGE_TYPE === 'local-storage') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

interface MemberDataContextType {
  memberDataList: DataRecord[];
  addMember: (data: Omit<DataRecord, 'id'>) => void;
  updateMember: (id: number, data: DataRecord) => void;
  deleteMember: (id: number) => void;
  setMemberDataList: (data: DataRecord[]) => void;
}

const MemberDataContext = createContext<MemberDataContextType>({
  memberDataList: MemberInitialData,
  addMember: () => {},
  updateMember: () => {},
  deleteMember: () => {},
  setMemberDataList: () => {},
});

export function MemberDataProvider({ children }: { children: ReactNode }) {
  const [memberDataList, setMemberDataList] = useState<DataRecord[]>(getInitialData);

  useEffect(() => {
    saveToStorage(memberDataList);
  }, [memberDataList]);

  const addMember = (data: Omit<DataRecord, 'id'>) => {
    const newRecord = { ...data, id: Date.now() };
    setMemberDataList(prev => [...prev, newRecord]);
  };

  const updateMember = (id: number, data: DataRecord) => {
    setMemberDataList(prev => prev.map(item => (item.id === id ? { ...item, ...data } : item)));
  };

  const deleteMember = (id: number) => {
    setMemberDataList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <MemberDataContext.Provider
      value={{
        memberDataList,
        addMember,
        updateMember,
        deleteMember,
        setMemberDataList,
      }}
    >
      {children}
    </MemberDataContext.Provider>
  );
}

export function useMemberDataContext() {
  const context = useContext(MemberDataContext);
  return context;
}
