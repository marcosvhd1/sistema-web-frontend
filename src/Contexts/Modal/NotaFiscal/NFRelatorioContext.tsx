import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFRelatorioProviderProps {
  children: ReactNode;
}

type ModalNFRelatorioContextData = UseDisclosureReturn

const ModalNFRelatorioContext = createContext({} as ModalNFRelatorioContextData);

export function ModalNFRelatorioProvider({ children }: ModalNFRelatorioProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFRelatorioContext.Provider value={disclosure}>
      {children}
    </ModalNFRelatorioContext.Provider>
  );
}

export const useModalNFRelatorio = () => useContext(ModalNFRelatorioContext);