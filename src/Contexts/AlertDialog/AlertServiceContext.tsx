import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";

interface AlertServiceContextProviderProps {
  children: ReactNode;
}

type AlertServiceContextContextData = UseDisclosureReturn

const AlertServiceContextContext = createContext({} as AlertServiceContextContextData)

export function AlertServiceContextProvider({ children }: AlertServiceContextProviderProps) {
  const disclosure = useDisclosure()

  return (
    <AlertServiceContextContext.Provider value={disclosure}>
      {children}
    </AlertServiceContextContext.Provider>
  )
}

export const useAlertServiceContext = () => useContext(AlertServiceContextContext)