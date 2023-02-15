import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNFTransporteProviderProps {
  children: ReactNode;
}

type ModalNFTransporteContextData = UseDisclosureReturn

const ModalNFTransporteContext = createContext({} as ModalNFTransporteContextData);

export function ModalNFTransporteProvider({ children }: ModalNFTransporteProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNFTransporteContext.Provider value={disclosure}>
      {children}
    </ModalNFTransporteContext.Provider>
  );
}

export const useModalNFTransporte = () => useContext(ModalNFTransporteContext);