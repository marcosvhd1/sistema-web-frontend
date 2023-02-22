import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFFormaPagtoProviderProps {
  children: ReactNode;
}

type ModalNFFormaPagtoContextData = UseDisclosureReturn

const ModalNFFormaPagtoContext = createContext({} as ModalNFFormaPagtoContextData);

export function ModalNFFormaPagtoProvider({ children }: ModalNFFormaPagtoProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFFormaPagtoContext.Provider value={disclosure}>
      {children}
    </ModalNFFormaPagtoContext.Provider>
  );
}

export const useModalNFFormaPagto = () => useContext(ModalNFFormaPagtoContext);