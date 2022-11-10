import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface AlertClientContextProviderProps {
  children: ReactNode;
}

type AlertClientContextContextData = UseDisclosureReturn

const AlertClientContextContext = createContext({} as AlertClientContextContextData);

export function AlertClientContextProvider({ children }: AlertClientContextProviderProps) {
  const disclosure = useDisclosure();

  return (
    <AlertClientContextContext.Provider value={disclosure}>
      {children}
    </AlertClientContextContext.Provider>
  );
}

export const useAlertClientContext = () => useContext(AlertClientContextContext);