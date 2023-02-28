import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFApoioProviderProps {
  children: ReactNode;
}

type ModalNFApoioContextData = UseDisclosureReturn

const ModalNFApoioContext = createContext({} as ModalNFApoioContextData);

export function ModalNFApoioProvider({ children }: ModalNFApoioProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFApoioContext.Provider value={disclosure}>
      {children}
    </ModalNFApoioContext.Provider>
  );
}

export const useModalNFApoio = () => useContext(ModalNFApoioContext);