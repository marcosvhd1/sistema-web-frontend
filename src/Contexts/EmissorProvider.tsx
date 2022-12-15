import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ApiException } from '../services/api/ApiException';
import { EmissorService, IEmissor } from '../services/api/emissor/EmissorService';
import { getEncrypted } from '../utils/crypto';

type EmissorProviderProps = {
  children: ReactNode
}

interface IEmissore {
  emissor: any
  idEmissor: any
  idEmissorSelecionado: number
  getEmissoresByUser: () => void;
  getIdEmissoresByUser: () => void;
  getCredenciais: () => void;
  handleGetUserInfo: () => void;
  updateUltimoEmissorSelecionado: () => void;
  setIdEmissorSelecionado: (value: React.SetStateAction<number>) => void;
  setIdUsuarioSelecionado: (value: React.SetStateAction<number>) => void;
}

const EmissorContext = createContext({} as IEmissore);

export function EmissorProvider({children}: EmissorProviderProps) {
  const [emissor, setEmissor] = useState<IEmissor[]>([]);
  const [idEmissor, setIdEmissor] = useState<number[] | ApiException>([]);
  const [idEmissorSelecionado, setIdEmissorSelecionado] = useState<number>(0);
  const [idUsuarioSelecionado, setIdUsuarioSelecionado] = useState<number>(0);

  const getEmissoresByUser = () => {
    EmissorService.getEmissores()
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setEmissor(result);
        }
      });
  };

  const getIdEmissoresByUser = async () => {
    const result = await EmissorService.getEmissoresId(idUsuarioSelecionado);
    setIdEmissor(result);
    // setIdEmissor(idEmissores);
    // const idEmi: number[] = [];
    // getEmissoresByUser();
    // emissor.forEach((emi: IEmissor) => {
    //   idEmi.push(emi.id);
    // });
    // setIdEmissor(idEmi);
  };

  const getCredenciais = () => {
    emissor.forEach(e => {
      if (e.id === idEmissorSelecionado) {
        const dados = {
          'cnpjcpf': e.cnpjcpf,
          'razao': e.razao
        };
        localStorage.setItem('emissor', getEncrypted(dados));
      }
    });
  };

  const handleGetUserInfo = () => {
    EmissorService.getUltimoEmissorSelecionadoByUser()
      .then((result) => {
        setIdUsuarioSelecionado(result.idUsuario);
        setIdEmissorSelecionado(result.ultimoEmissorSelecionado);
      });
  };


  const updateUltimoEmissorSelecionado = () => {
    try {
      EmissorService.updateUltimoEmissorSelecionado(idUsuarioSelecionado, idEmissorSelecionado);
    } catch (error) {
      return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
    }

  };

  return (
    <EmissorContext.Provider value={{ emissor, idEmissorSelecionado,idEmissor, setIdEmissorSelecionado, setIdUsuarioSelecionado, getEmissoresByUser, getIdEmissoresByUser, handleGetUserInfo, updateUltimoEmissorSelecionado, getCredenciais }}>
      {children}
    </EmissorContext.Provider>
  );
}

export const useEmissorContext = () => useContext(EmissorContext);



















