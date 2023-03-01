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
  fantasia: string
  cnpjcpf: string
  ie: string
  im: string
  endereco: string
  numero: string
  bairro: string
  complemento: string
  cnae: string
  telefone: string
  uf: string
  cidade: string
  cep: string
  regime: string
  status: string
}

export interface INewEmissor {
  cnpjcpf_principal: number
  razao: string
  fantasia: string
  cnpjcpf: string
  ie: string
  im: string
  endereco: string
  numero: string
  bairro: string
  complemento: string
  cnae: string
  telefone: string
  uf: string
  cidade: string
  cep: string
  regime: string
}

const getEmissores = async (idUser: number, HEADERS: any): Promise<IEmissor[] | ApiException> => {
  try {
    const { data } = await Api().get(`/emissores?id_usuario=${idUser}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const getAll = async (currentPage: number, limitRegistros: number, filter: string, description: string, idEmpresa: number, status: string, HEADERS: any): Promise<IEmissor[] | ApiException> => {
  try {
    return await Api().get(`/emissores/all?empresa=${idEmpresa}&page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}&status=${status}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const getEmissoresId = async (idUsuario: number, HEADERS: any): Promise<number[] | ApiException> => {
  try {
    const { data } = await Api().get(`/emissor/usuario?id_usuario=${idUsuario}`, HEADERS);
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
const update = async (id: number, dataToUpdate: IEmissor, HEADERS: any): Promise<IEmissor | ApiException> => {
  try {
    const { data } = await Api().patch(`/emissores/update/${id}`, dataToUpdate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const updateUltimoEmissorSelecionado = async (idUsuario: number, idEmissor: number, HEADERS: any) => {
  try {
    const { data } = await Api().patch(`/emissores/ultimo?id_usuario=${idUsuario}&id_emissor=${idEmissor}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const getUltimoEmissorSelecionadoByUser = async (HEADERS: any) => {
  const data = getDecrypted(localStorage.getItem('user'));
  const cnpjcpf = data.user.empresa;
  const email = data.user.email;

  try {
    const { data } = await Api().get(`/emissores/ultimo?cnpjcpf=${cnpjcpf}&email=${email}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};
const deleteById = async (id: number, HEADERS: any) => {
  const response = await Api().delete(`/emissores/${id}`, HEADERS);
  return response;
};

export const EmissorService = {
  getEmissores,
  getEmissoresId,
  getAll,
  updateUltimoEmissorSelecionado,
  getUltimoEmissorSelecionadoByUser,
  create,
  update,
  deleteById
};
