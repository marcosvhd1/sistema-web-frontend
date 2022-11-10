import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalTransportadoraProviderProps {
  children: ReactNode;
}

type ModalTransportadoraContextData = UseDisclosureReturn

const ModalTransportadoraContext = createContext({} as ModalTransportadoraContextData);

export function ModalTransportadoraProvider({ children }: ModalTransportadoraProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalTransportadoraContext.Provider value={disclosure}>
      {children}
    </ModalTransportadoraContext.Provider>
  );
}

export const useModalTransportadora = () => useContext(ModalTransportadoraContext);