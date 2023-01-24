import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFSearchProductProviderProps {
  children: ReactNode;
}

type ModalNFSearchProductContextData = UseDisclosureReturn

const ModalNFSearchProductContext = createContext({} as ModalNFSearchProductContextData);

export function ModalNFSearchProductProvider({ children }: ModalNFSearchProductProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFSearchProductContext.Provider value={disclosure}>
      {children}
    </ModalNFSearchProductContext.Provider>
  );
}

export const useModalNFSearchProduct = () => useContext(ModalNFSearchProductContext);