import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFInutilizarProviderProps {
  children: ReactNode;
}

type ModalNFInutilizarContextData = UseDisclosureReturn

const ModalNFInutilizarContext = createContext({} as ModalNFInutilizarContextData);

export function ModalNFInutilizarProvider({ children }: ModalNFInutilizarProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFInutilizarContext.Provider value={disclosure}>
      {children}
    </ModalNFInutilizarContext.Provider>
  );
}

export const useModalNFInutilizar = () => useContext(ModalNFInutilizarContext);