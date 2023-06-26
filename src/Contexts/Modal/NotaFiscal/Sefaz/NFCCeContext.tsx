import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFCCeProviderProps {
  children: ReactNode;
}

type ModalNFCCeContextData = UseDisclosureReturn

const ModalNFCCeContext = createContext({} as ModalNFCCeContextData);

export function ModalNFCCeProvider({ children }: ModalNFCCeProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFCCeContext.Provider value={disclosure}>
      {children}
    </ModalNFCCeContext.Provider>
  );
}

export const useModalNFCCe = () => useContext(ModalNFCCeContext);