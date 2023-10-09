import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalEmailProviderProps {
  children: ReactNode;
}

type ModalEmailContextData = UseDisclosureReturn

const ModalEmailContext = createContext({} as ModalEmailContextData);

export function ModalEmailProvider({ children }: ModalEmailProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalEmailContext.Provider value={disclosure}>
      {children}
    </ModalEmailContext.Provider>
  );
}

export const useModalEmail = () => useContext(ModalEmailContext);