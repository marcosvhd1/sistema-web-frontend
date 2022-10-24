import { ApiException } from "../ApiException";
import { Api } from "../ApiConfig"

export interface IClient {
  id?: number;
  cod?: number;
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

interface IPage {
  currentPage?: number
  limit?: number
}

const getAll = async (): Promise<IClient[] | ApiException> => {
  try {
    const { data } = await Api().get(`/clientes`)
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os registros.')
  }
};
const getAllPerPage = async ({ currentPage, limit }: IPage): Promise<IClient[] | ApiException> => {
  try {
    const { data } = await Api().get(`/clientes?page=${currentPage}&limit=${limit}`)
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os registros.')
  }
};

const getById = async (id: number): Promise<IClient | ApiException> => {
  try {
    const { data } = await Api().get(`/clientes/${id}`)
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao consultar o registro.')
  }
};

const create = async (dataToCreate: Omit<IClient, 'id' | 'cod'>): Promise<IClient | ApiException> => {
  try {
    const { data } = await Api().post<any>('/clientes', dataToCreate)
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
};

const updateById = async (id: number, dataToUpdate: IClient): Promise<IClient | ApiException> => {
  try {
    const { data } = await Api().put(`/clientes/${id}`, dataToUpdate)
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao atualizar o registro.')
  }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/clientes/${id}`)
    return undefined;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao apagar o registro.')
  }
};

export const ClientService = {
  getAll,
  getAllPerPage,
  getById,
  create,
  updateById,
  deleteById
}