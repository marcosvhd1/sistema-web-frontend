import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalCFOPProviderProps {
  children: ReactNode;
}

type ModalCFOPContextData = UseDisclosureReturn

const ModalCFOPContext = createContext({} as ModalCFOPContextData);

export function ModalCFOPProvider({ children }: ModalCFOPProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalCFOPContext.Provider value={disclosure}>
      {children}
    </ModalCFOPContext.Provider>
  );
}

export const useModalCFOP = () => useContext(ModalCFOPContext);