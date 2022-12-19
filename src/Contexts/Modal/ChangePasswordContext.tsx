import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

interface ModalChangePasswordProviderProps {
  children: ReactNode;
}

type ModalChangePasswordContextData = UseDisclosureReturn

const ModalChangePasswordContext = createContext({} as ModalChangePasswordContextData);

export function ModalChangePasswordProvider({ children }: ModalChangePasswordProviderProps) {
  const disclosure = useDisclosure();

  return (
    <ModalChangePasswordContext.Provider value={disclosure}>
      {children}
    </ModalChangePasswordContext.Provider>
  );
}

export const useModalChangePassword = () => useContext(ModalChangePasswordContext);
