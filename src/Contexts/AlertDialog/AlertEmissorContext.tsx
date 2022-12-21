import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface AlertEmissorContextProviderProps {
  children: ReactNode;
}

type AlertEmissorContextContextData = UseDisclosureReturn

const AlertEmissorContextContext = createContext({} as AlertEmissorContextContextData);

export function AlertEmissorContextProvider({ children }: AlertEmissorContextProviderProps) {
  const disclosure = useDisclosure();

  return (
    <AlertEmissorContextContext.Provider value={disclosure}>
      {children}
    </AlertEmissorContextContext.Provider>
  );
}

export const useAlertEmissorContext = () => useContext(AlertEmissorContextContext);
