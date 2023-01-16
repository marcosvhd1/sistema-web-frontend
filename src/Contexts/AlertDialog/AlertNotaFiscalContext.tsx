import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface AlertNotaFiscalContextProviderProps {
  children: ReactNode;
}

type AlertNotaFiscalContextContextData = UseDisclosureReturn

const AlertNotaFiscalContextContext = createContext({} as AlertNotaFiscalContextContextData);

export function AlertNotaFiscalContextProvider({ children }: AlertNotaFiscalContextProviderProps) {
  const disclosure = useDisclosure();

  return (
    <AlertNotaFiscalContextContext.Provider value={disclosure}>
      {children}
    </AlertNotaFiscalContextContext.Provider>
  );
}

export const useAlertNotaFiscalContext = () => useContext(AlertNotaFiscalContextContext);