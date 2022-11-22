import { createContext, ReactNode, useContext, useState } from 'react';
import { ApiException } from '../services/api/ApiException';
import { EmissorService, IEmissor } from '../services/api/emissor/EmissorService';

type EmissorProviderProps = {
  children: ReactNode
}

interface IEmissore {
  emissor: any
  getEmissoresByUser: () => void;
}

const EmissorContext = createContext({} as IEmissore);

export function EmissorProvider({children}: EmissorProviderProps) {
  const [emissor, setEmissor] = useState<IEmissor[]>([]);

  //ta fixo o id
  const getEmissoresByUser = () => {
    EmissorService.getEmissores(1)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setEmissor(result);
        }
      });
  };

  return (
    <EmissorContext.Provider value={{ emissor, getEmissoresByUser }}>
      {children}
    </EmissorContext.Provider>
  );
}

export const useEmissorContext = () => useContext(EmissorContext);



















