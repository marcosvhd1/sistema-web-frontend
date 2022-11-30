import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalGroupProviderProps {
  children: ReactNode;
}

type ModalGroupContextData = UseDisclosureReturn

const ModalGroupContext = createContext({} as ModalGroupContextData);

export function ModalGroupProvider({ children }: ModalGroupProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalGroupContext.Provider value={disclosure}>
      {children}
    </ModalGroupContext.Provider>
  );
}

export const useModalGroup = () => useContext(ModalGroupContext);
