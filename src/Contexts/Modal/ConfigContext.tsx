import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalConfigProviderProps {
  children: ReactNode;
}

type ModalConfigContextData = UseDisclosureReturn

const ModalConfigContext = createContext({} as ModalConfigContextData);

export function ModalConfigProvider({ children }: ModalConfigProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalConfigContext.Provider value={disclosure}>
      {children}
    </ModalConfigContext.Provider>
  );
}

export const useModalConfig = () => useContext(ModalConfigContext);