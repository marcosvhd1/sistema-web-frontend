import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFSearchServiceProviderProps {
  children: ReactNode;
}

type ModalNFSearchServiceContextData = UseDisclosureReturn

const ModalNFSearchServiceContext = createContext({} as ModalNFSearchServiceContextData);

export function ModalNFSearchServiceProvider({ children }: ModalNFSearchServiceProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFSearchServiceContext.Provider value={disclosure}>
      {children}
    </ModalNFSearchServiceContext.Provider>
  );
}

export const useModalNFSearchService = () => useContext(ModalNFSearchServiceContext);