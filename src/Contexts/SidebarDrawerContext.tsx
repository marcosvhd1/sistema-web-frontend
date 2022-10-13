import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";


interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn


const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);


export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure()
  const location = useLocation()

  useEffect(() => {
    disclosure.onClose()
  }, [location])
  
  
  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)