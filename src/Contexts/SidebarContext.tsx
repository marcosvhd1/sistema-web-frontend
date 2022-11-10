import { createContext, ReactNode, useState } from 'react';

interface SidebarStatusType {
  navSize: string;
  changeNavSize: () => void
}

interface SidebarProviderProps {
  children: ReactNode;
}
export const SidebarContext = createContext({} as SidebarStatusType);

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [navSize, SetNavSize] = useState('large');
  
  function changeNavSize() {
    if (navSize == 'small')
      SetNavSize('large');
    else
      SetNavSize('small');
  }

  return (
    <SidebarContext.Provider value={{ navSize, changeNavSize}}>
      {children}
    </SidebarContext.Provider>
  );
}