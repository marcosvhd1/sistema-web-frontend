import { HEADERS } from '../../../pages/Inicio';
import { getDecrypted } from '../../../utils/crypto';
import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface IEmissorUsuario {
  id_emissor: number
  id_usuarios: number
}

export interface IEmissor {
  id: number
  razao: string
  cnpjcpf: string
}

export interface INewEmissor {
  cnpjcpf_principal: number
  razao: string
  cnpjcpf: string
}

const getEmissores = async (idUsuario: number): Promise<IEmissor[] | ApiException> => {
  try {
    const { data } = await Api().get(`/emissores?id_usuario=${idUsuario}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: INewEmissor, HEADERS: any): Promise<INewEmissor | ApiException> => {
  try {
    const { data } = await Api().post<INewEmissor>('/emissores', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const updateUltimoEmissorSelecionado = async (idUsuario: number, idEmissor: number) => {
  try {
    const { data } = await Api().patch(`/emissores/ultimo?id_usuario=${idUsuario}&id_emissor=${idEmissor}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const getUltimoEmissorSelecionadoByUser = async () => {
  const data = getDecrypted(localStorage.getItem('user'));
  const  cnpjcpf = data.user.empresa;
  const email = data.user.email;

  try {
    const { data } = await Api().get(`/emissores/ultimo?cnpjcpf=${cnpjcpf}&email=${email}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

export const EmissorService = {
  getEmissores,
  updateUltimoEmissorSelecionado,
  getUltimoEmissorSelecionadoByUser,
  create
};
