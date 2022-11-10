import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface AlertProductContextProviderProps {
  children: ReactNode;
}

type AlertProductContextContextData = UseDisclosureReturn

const AlertProductContextContext = createContext({} as AlertProductContextContextData);

export function AlertProductContextProvider({ children }: AlertProductContextProviderProps) {
  const disclosure = useDisclosure();

  return (
    <AlertProductContextContext.Provider value={disclosure}>
      {children}
    </AlertProductContextContext.Provider>
  );
}

export const useAlertProductContext = () => useContext(AlertProductContextContext);