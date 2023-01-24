import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFProductProviderProps {
  children: ReactNode;
}

type ModalNFProductContextData = UseDisclosureReturn

const ModalNFProductContext = createContext({} as ModalNFProductContextData);

export function ModalNFProductProvider({ children }: ModalNFProductProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFProductContext.Provider value={disclosure}>
      {children}
    </ModalNFProductContext.Provider>
  );
}

export const useModalNFProduct = () => useContext(ModalNFProductContext);