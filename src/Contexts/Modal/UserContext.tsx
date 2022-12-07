import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalUserProviderProps {
  children: ReactNode;
}

type ModalUserContextData = UseDisclosureReturn

const ModalUserContext = createContext({} as ModalUserContextData);

export function ModalUserProvider({ children }: ModalUserProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalUserContext.Provider value={disclosure}>
      {children}
    </ModalUserContext.Provider>
  );
}

export const useModalUser = () => useContext(ModalUserContext);
