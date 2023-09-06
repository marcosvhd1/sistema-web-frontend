import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFProductCSTProviderProps {
  children: ReactNode;
}

type ModalNFProductCSTContextData = UseDisclosureReturn

const ModalNFProductCSTContext = createContext({} as ModalNFProductCSTContextData);

export function ModalNFProductCSTProvider({ children }: ModalNFProductCSTProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFProductCSTContext.Provider value={disclosure}>
      {children}
    </ModalNFProductCSTContext.Provider>
  );
}

export const useModalNFProductCST = () => useContext(ModalNFProductCSTContext);