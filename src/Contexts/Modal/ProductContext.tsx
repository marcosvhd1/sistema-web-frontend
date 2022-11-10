import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalProductProviderProps {
  children: ReactNode;
}

type ModalProductContextData = UseDisclosureReturn

const ModalProductContext = createContext({} as ModalProductContextData);

export function ModalProductProvider({ children }: ModalProductProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalProductContext.Provider value={disclosure}>
      {children}
    </ModalProductContext.Provider>
  );
}

export const useModalProduct = () => useContext(ModalProductContext);