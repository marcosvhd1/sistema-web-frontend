import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ApiException } from '../services/api/ApiException';
import { NotaFiscalService } from '../services/api/notafiscal/NotaFiscalService';
import { userInfos } from '../utils/header';
import { useEmissorContext } from './EmissorProvider';

type ContadorContextProps = {
  children: ReactNode
}

interface IContador {
  quantidadeRegistros: number;
  setQuantidadeRegistros: (quantidade: number) => void;
  getNFDigitacao: () => void;
}

const ContadorContext = createContext<IContador>({} as IContador);

export function ContadorProvider({ children }: ContadorContextProps) {
  const [quantidadeRegistros, setQuantidadeRegistros] = useState<number>(0);

  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    getNFDigitacao();
  }, [idEmissorSelecionado]);

  const getNFDigitacao = () => {
    NotaFiscalService.getNFDigitacao(idEmissorSelecionado, HEADERS).then((result) => {
      if (result instanceof ApiException)  console.log(result.message);
      else setQuantidadeRegistros(result[0].count);
    });
  };

  return (
    <ContadorContext.Provider value={{ quantidadeRegistros, setQuantidadeRegistros, getNFDigitacao }}>
      {children}
    </ContadorContext.Provider>
  );
}

export const useContadorContext = () => useContext(ContadorContext);