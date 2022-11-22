import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalEmissorProviderProps {
  children: ReactNode;
}

type ModalEmissorContextData = UseDisclosureReturn

const ModalEmissorContext = createContext({} as ModalEmissorContextData);

export function ModalEmissorProvider({ children }: ModalEmissorProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalEmissorContext.Provider value={disclosure}>
      {children}
    </ModalEmissorContext.Provider>
  );
}

export const useModalEmissor = () => useContext(ModalEmissorContext);
