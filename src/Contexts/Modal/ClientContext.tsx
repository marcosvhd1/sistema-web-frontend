import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalClientProviderProps {
  children: ReactNode;
}

type ModalClientContextData = UseDisclosureReturn

const ModalClientContext = createContext({} as ModalClientContextData);

export function ModalClientProvider({ children }: ModalClientProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalClientContext.Provider value={disclosure}>
      {children}
    </ModalClientContext.Provider>
  );
}

export const useModalClient = () => useContext(ModalClientContext);