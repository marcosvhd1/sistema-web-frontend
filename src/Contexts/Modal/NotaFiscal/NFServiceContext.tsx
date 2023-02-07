import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFServiceProviderProps {
  children: ReactNode;
}

type ModalNFServiceContextData = UseDisclosureReturn

const ModalNFServiceContext = createContext({} as ModalNFServiceContextData);

export function ModalNFServiceProvider({ children }: ModalNFServiceProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFServiceContext.Provider value={disclosure}>
      {children}
    </ModalNFServiceContext.Provider>
  );
}

export const useModalNFService = () => useContext(ModalNFServiceContext);