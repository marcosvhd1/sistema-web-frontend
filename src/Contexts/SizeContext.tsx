import { createContext, ReactNode } from "react";
import { useMediaQuery } from "@chakra-ui/react";

interface SizeType {
  smSize: boolean[];
  mdSize: boolean[];
}

interface SizeProviderProps {
  children: ReactNode;
}


export const SizeContext = createContext({} as SizeType);

export function SizeProvider({ children }: SizeProviderProps) {
  const sizes = {
    smSize: useMediaQuery('(min-width: 1100px)'),
    mdSize: useMediaQuery('(max-width: 1366px)')
  }

  return (
    <SizeContext.Provider value={sizes}>
      {children}
    </SizeContext.Provider>
  )
}