import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFApoioCSTProviderProps {
  children: ReactNode;
}

type ModalNFApoioCSTContextData = UseDisclosureReturn

const ModalNFApoioCSTContext = createContext({} as ModalNFApoioCSTContextData);

export function ModalNFApoioCSTProvider({ children }: ModalNFApoioCSTProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFApoioCSTContext.Provider value={disclosure}>
      {children}
    </ModalNFApoioCSTContext.Provider>
  );
}

export const useModalNFApoioCST = () => useContext(ModalNFApoioCSTContext);