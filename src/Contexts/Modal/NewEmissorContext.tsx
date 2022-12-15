import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalNewEmissorProviderProps {
  children: ReactNode;
}

type ModalNewEmissorContextData = UseDisclosureReturn

const ModalNewEmissorContext = createContext({} as ModalNewEmissorContextData);

export function ModalNewEmissorProvider({ children }: ModalNewEmissorProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalNewEmissorContext.Provider value={disclosure}>
      {children}
    </ModalNewEmissorContext.Provider>
  );
}

export const useModalNewEmissor = () => useContext(ModalNewEmissorContext);
