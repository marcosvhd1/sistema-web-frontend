import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface AlertEmailContextProviderProps {
  children: ReactNode;
}

type AlertEmailContextData = UseDisclosureReturn

const AlertEmailContext = createContext({} as AlertEmailContextData);

export function AlertEmailContextProvider({ children }: AlertEmailContextProviderProps) {
  const disclosure = useDisclosure();

  return (
    <AlertEmailContext.Provider value={disclosure}>
      {children}
    </AlertEmailContext.Provider>
  );
}

export const useAlertEmailContext = () => useContext(AlertEmailContext);