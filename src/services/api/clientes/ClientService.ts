import { ApiException } from '../ApiException';
import { Api } from '../ApiConfig';

export interface IClient {
  id: number;
  id_emissor: number;
  cod: string;
  tipo: string;
  categoria: string;
  razao: string;
  fantasia: string;
  cnpjcpf: string;
  rg: string;
  datanasc: string;
  ie: string;
  im: string;
  suframa: string;
  tipo_contribuinte: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  uf: string;
  cidade: string;
  complemento: string;
  observacao: string;
  tipo_telefone1: string;
  tipo_telefone2: string;
  tipo_telefone3: string;
  telefone1: string;
  telefone2: string;
  telefone3: string;
  email1: string;
  email2: string;
  site: string;
  pais: string;
}

const getClientsByFilter = async (currentPage: number, limitRegistros: number, filter: string, description: string, idEmissorSelecionado: number, HEADERS: any): Promise<IClient[] | ApiException> => {
  try {
    return await Api().get(`/clientes?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}&id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<IClient, 'id'>, HEADERS: any): Promise<IClient | ApiException> => {
  try {
    const { data } = await Api().post<IClient>('/clientes', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dataToUpdate: IClient, idEmissorSelecionado: number, HEADERS: any): Promise<IClient | ApiException> => {
  try {
    const { data } = await Api().put(`/clientes/${id}`, dataToUpdate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number, idEmissorSelecionado: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/clientes/${id}?id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};


const getLastCod = async (idEmissorSelecionado: number, HEADERS: any) => {
  const response = await Api().get(`/clientes/max?id_emissor=${idEmissorSelecionado}`, HEADERS);
  const { max } = response.data[0];
  return max;
};

export const ClientService = {
  getClientsByFilter,
  create,
  updateById,
  deleteById,
  getLastCod
};
