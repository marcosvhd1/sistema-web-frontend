import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface AlertNFProductContextProviderProps {
  children: ReactNode;
}

type AlertNFProductContextContextData = UseDisclosureReturn

const AlertNFProductContextContext = createContext({} as AlertNFProductContextContextData);

export function AlertNFProductContextProvider({ children }: AlertNFProductContextProviderProps) {
  const disclosure = useDisclosure();

  return (
    <AlertNFProductContextContext.Provider value={disclosure}>
      {children}
    </AlertNFProductContextContext.Provider>
  );
}

export const useAlertNFProductContext = () => useContext(AlertNFProductContextContext);