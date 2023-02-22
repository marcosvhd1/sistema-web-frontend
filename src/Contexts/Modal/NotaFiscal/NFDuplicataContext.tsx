import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFDuplicataProviderProps {
  children: ReactNode;
}

type ModalNFDuplicataContextData = UseDisclosureReturn

const ModalNFDuplicataContext = createContext({} as ModalNFDuplicataContextData);

export function ModalNFDuplicataProvider({ children }: ModalNFDuplicataProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFDuplicataContext.Provider value={disclosure}>
      {children}
    </ModalNFDuplicataContext.Provider>
  );
}

export const useModalNFDuplicata = () => useContext(ModalNFDuplicataContext);