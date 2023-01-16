import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNotaFiscalProviderProps {
  children: ReactNode;
}

type ModalNotaFiscalContextData = UseDisclosureReturn

const ModalNotaFiscalContext = createContext({} as ModalNotaFiscalContextData);

export function ModalNotaFiscalProvider({ children }: ModalNotaFiscalProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNotaFiscalContext.Provider value={disclosure}>
      {children}
    </ModalNotaFiscalContext.Provider>
  );
}

export const useModalNotaFiscal = () => useContext(ModalNotaFiscalContext);