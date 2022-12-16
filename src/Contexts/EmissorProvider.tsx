import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ApiException } from '../services/api/ApiException';
import { EmissorService, IEmissor } from '../services/api/emissor/EmissorService';
import { UsuarioService } from '../services/api/usuarios/UsuarioService';
import { getDecrypted, getEncrypted } from '../utils/crypto';
import { userInfos } from '../utils/header';

type EmissorProviderProps = {
  children: ReactNode
}

interface IEmissore {
  emissores: IEmissor[]
  userEmissores: IEmissor[]
  idEmissor: any
  idEmissorSelecionado: number
  getEmissores: () => void;
  getEmissoresByUser: (id: number) => void;
  getIdEmissoresByUser: () => void;
  getCredenciais: () => void;
  handleGetUserInfo: () => void;
  updateUltimoEmissorSelecionado: () => void;
  setIdEmissorSelecionado: (value: React.SetStateAction<number>) => void;
  setIdUsuarioSelecionado: (value: React.SetStateAction<number>) => void;
  setIdEmissor: (value: React.SetStateAction<any[]>) => void;
}

const EmissorContext = createContext({} as IEmissore);

export function EmissorProvider({children}: EmissorProviderProps) {
  const [emissores, setEmissores] = useState<IEmissor[]>([]);
  const [userEmissores, setUserEmissores] = useState<IEmissor[]>([]);
  const [idEmissor, setIdEmissor] = useState<number[]>([]);
  const [idEmissorSelecionado, setIdEmissorSelecionado] = useState<number>(0);
  const [idUsuarioSelecionado, setIdUsuarioSelecionado] = useState<number>(0);

  const userInfo = userInfos();

  const HEADERS = userInfo.header;

  const cnpjcpf = userInfo.infos?.empresa;

  const getEmissores = () => {
    UsuarioService.getUserMaster(cnpjcpf, HEADERS)
      .then((result) => {
        const idMaster = result[0].id;
        EmissorService.getEmissores(idMaster, HEADERS)
          .then((result) => {
            if (result instanceof ApiException) {
              console.log(result.message);
            } else {
              setEmissores(result);
            }
          });
      });
  };

  const getEmissoresByUser = (id: number) => {
    EmissorService.getEmissores(id ?? idUsuarioSelecionado, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setUserEmissores(result);
        }
      });
  };

  const getIdEmissoresByUser = async () => {
    EmissorService.getEmissoresId(idUsuarioSelecionado, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setIdEmissor(result);
        }
      });
  };

  const getCredenciais = () => {
    emissores.forEach(e => {
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
    EmissorService.getUltimoEmissorSelecionadoByUser(HEADERS)
      .then((result) => {
        setIdUsuarioSelecionado(result.idUsuario);
        setIdEmissorSelecionado(result.ultimoEmissorSelecionado);
      });
  };


  const updateUltimoEmissorSelecionado = () => {
    try {
      EmissorService.updateUltimoEmissorSelecionado(idUsuarioSelecionado, idEmissorSelecionado, HEADERS);
    } catch (error) {
      return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
    }

  };

  return (
    <EmissorContext.Provider value={{ emissores, userEmissores, idEmissorSelecionado, idEmissor, getEmissoresByUser, setIdEmissor, setIdEmissorSelecionado, setIdUsuarioSelecionado, getEmissores, getIdEmissoresByUser, handleGetUserInfo, updateUltimoEmissorSelecionado, getCredenciais }}>
      {children}
    </EmissorContext.Provider>
  );
}

export const useEmissorContext = () => useContext(EmissorContext);



















