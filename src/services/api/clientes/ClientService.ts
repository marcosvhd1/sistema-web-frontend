import { ApiException } from '../ApiException';
import { Api } from '../ApiConfig';

export interface IClient {
  id: number;
  cod: number;
  tipo: string;
  categoria: string;
  razao: string;
  fantasia: string;
  cnpjcpf: string;
  rg: string;
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
}

const getAll = async (): Promise<IClient[] | ApiException> => {
  try {
    const { data } = await Api().get('/clientes');
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const getClientsByFilter = async (currentPage: number, limitRegistros: number, filter: string, description: string): Promise<IClient[] | ApiException> => {
  try {
    return await Api().get(`/cadastro/clientes?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}`);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const getById = async (id: number): Promise<IClient | ApiException> => {
  try {
    const { data } = await Api().get(`/clientes/${id}`);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dataToCreate: Omit<IClient, 'id' | 'cod'>): Promise<IClient | ApiException> => {
  try {
    const { data } = await Api().post<IClient>('/clientes', dataToCreate);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dataToUpdate: IClient): Promise<IClient | ApiException> => {
  try {
    const { data } = await Api().put(`/clientes/${id}`, dataToUpdate);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/clientes/${id}`);
    return undefined;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};


const getLastCod = async () => {
  const response = await Api().get('/cod/clientes');
  const { max } = response.data.rows[0];
  return max;
};

export const ClientService = {
  getAll,
  getClientsByFilter,
  getById,
  create,
  updateById,
  deleteById,
  getLastCod
};