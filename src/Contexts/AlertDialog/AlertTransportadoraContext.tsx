import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface AlertTransportadoraContextProviderProps {
  children: ReactNode;
}

type AlertTransportadoraContextContextData = UseDisclosureReturn

const AlertTransportadoraContextContext = createContext({} as AlertTransportadoraContextContextData);

export function AlertTransportadoraContextProvider({ children }: AlertTransportadoraContextProviderProps) {
  const disclosure = useDisclosure();

  return (
    <AlertTransportadoraContextContext.Provider value={disclosure}>
      {children}
    </AlertTransportadoraContextContext.Provider>
  );
}

export const useAlertTransportadoraContext = () => useContext(AlertTransportadoraContextContext);