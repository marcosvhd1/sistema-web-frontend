import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFClientProviderProps {
  children: ReactNode;
}

type ModalNFClientContextData = UseDisclosureReturn

const ModalNFClientContext = createContext({} as ModalNFClientContextData);

export function ModalNFClientProvider({ children }: ModalNFClientProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFClientContext.Provider value={disclosure}>
      {children}
    </ModalNFClientContext.Provider>
  );
}

export const useModalNFClient = () => useContext(ModalNFClientContext);