import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalServiceProviderProps {
  children: ReactNode;
}

type ModalServiceContextData = UseDisclosureReturn

const ModalServiceContext = createContext({} as ModalServiceContextData);

export function ModalServiceProvider({ children }: ModalServiceProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalServiceContext.Provider value={disclosure}>
      {children}
    </ModalServiceContext.Provider>
  );
}

export const useModalService = () => useContext(ModalServiceContext);