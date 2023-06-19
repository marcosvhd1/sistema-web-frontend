import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFCancelarProviderProps {
  children: ReactNode;
}

type ModalNFCancelarContextData = UseDisclosureReturn

const ModalNFCancelarContext = createContext({} as ModalNFCancelarContextData);

export function ModalNFCancelarProvider({ children }: ModalNFCancelarProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFCancelarContext.Provider value={disclosure}>
      {children}
    </ModalNFCancelarContext.Provider>
  );
}

export const useModalNFCancelar = () => useContext(ModalNFCancelarContext);