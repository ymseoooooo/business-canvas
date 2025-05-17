import { createContext, useContext, useState, useCallback } from 'react';
import { type DataRecord } from '@/defines/schema';

interface MemberModalContextType {
  isOpened: boolean;
  selectedMember?: DataRecord;
  openModal: (member?: DataRecord) => void;
  closeModal: () => void;
}

const MemberModalContext = createContext<MemberModalContextType>({
  isOpened: false,
  selectedMember: undefined,
  openModal: () => {},
  closeModal: () => {},
});

export function MemberModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedMember, setSelectedMember] = useState<DataRecord>();

  const openModal = useCallback((member?: DataRecord) => {
    setSelectedMember(member);
    setIsOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpened(false);
    setSelectedMember(undefined);
  }, []);

  return (
    <MemberModalContext.Provider value={{ isOpened, selectedMember, openModal, closeModal }}>
      {children}
    </MemberModalContext.Provider>
  );
}

export function useMemberModalContext() {
  const context = useContext(MemberModalContext);
  return context;
}
