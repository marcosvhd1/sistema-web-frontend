import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalStatusServidorProviderProps {
  children: ReactNode;
}

type ModalStatusServidorContextData = UseDisclosureReturn

const ModalStatusServidorContext = createContext({} as ModalStatusServidorContextData);

export function ModalStatusServidorProvider({ children }: ModalStatusServidorProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalStatusServidorContext.Provider value={disclosure}>
      {children}
    </ModalStatusServidorContext.Provider>
  );
}

export const useModalStatusServidor = () => useContext(ModalStatusServidorContext);