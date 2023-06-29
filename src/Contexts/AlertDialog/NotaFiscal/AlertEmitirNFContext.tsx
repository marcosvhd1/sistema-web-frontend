import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface AlertEmitirNFContextProviderProps {
  children: ReactNode;
}

type AlertEmitirNFContextContextData = UseDisclosureReturn

const AlertEmitirNFContextContext = createContext({} as AlertEmitirNFContextContextData);

export function AlertEmitirNFContextProvider({ children }: AlertEmitirNFContextProviderProps) {
  const disclosure = useDisclosure();

  return (
    <AlertEmitirNFContextContext.Provider value={disclosure}>
      {children}
    </AlertEmitirNFContextContext.Provider>
  );
}

export const useAlertEmitirNFContext = () => useContext(AlertEmitirNFContextContext);