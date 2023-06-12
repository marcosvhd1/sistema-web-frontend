import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalRetornoSefazProviderProps {
  children: ReactNode;
}

type ModalRetornoSefazContextData = UseDisclosureReturn

const ModalRetornoSefazContext = createContext({} as ModalRetornoSefazContextData);

export function ModalRetornoSefazProvider({ children }: ModalRetornoSefazProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalRetornoSefazContext.Provider value={disclosure}>
      {children}
    </ModalRetornoSefazContext.Provider>
  );
}

export const useModalRetornoSefaz = () => useContext(ModalRetornoSefazContext);