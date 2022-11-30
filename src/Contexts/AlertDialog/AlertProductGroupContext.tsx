import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface AlertProductGroupContextProviderProps {
  children: ReactNode;
}

type AlertProductGroupContextContextData = UseDisclosureReturn

const AlertProductGroupContextContext = createContext({} as AlertProductGroupContextContextData);

export function AlertProductGroupContextProvider({ children }: AlertProductGroupContextProviderProps) {
  const disclosure = useDisclosure();

  return (
    <AlertProductGroupContextContext.Provider value={disclosure}>
      {children}
    </AlertProductGroupContextContext.Provider>
  );
}

export const useAlertProductGroupContext = () => useContext(AlertProductGroupContextContext);
