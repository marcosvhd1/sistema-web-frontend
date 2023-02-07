import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface AlertNFServiceContextProviderProps {
  children: ReactNode;
}

type AlertNFServiceContextContextData = UseDisclosureReturn

const AlertNFServiceContextContext = createContext({} as AlertNFServiceContextContextData);

export function AlertNFServiceContextProvider({ children }: AlertNFServiceContextProviderProps) {
  const disclosure = useDisclosure();

  return (
    <AlertNFServiceContextContext.Provider value={disclosure}>
      {children}
    </AlertNFServiceContextContext.Provider>
  );
}

export const useAlertNFServiceContext = () => useContext(AlertNFServiceContextContext);