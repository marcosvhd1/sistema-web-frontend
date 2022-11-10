import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface ITransportadora {
  id: number
  cod: number
  razao: string
  cnpjcpf: string
  ie: string
  rntrc: string
  logradouro: string
  numero: string
  bairro: string
  cep: string
  uf: string
  cidade: string
  complemento: string
  tipo_telefone1: string
  tipo_telefone2: string
  telefone1: string
  telefone2: string
  anotacoes: string
  placa: string
  uf_placa: string
}


const getAll = async (): Promise<ITransportadora[] | ApiException> => {
  try {
    const { data } = await Api().get('/transportadora');
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};


const getTransportadoraByFilter = async (currentPage: number, limitRegistros: number, filter: string, description: string): Promise<ITransportadora[] | ApiException> => {
  try {
    return await Api().get(`/cadastro/transportadora?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}`);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<ITransportadora, 'id' | 'nserv'>): Promise<ITransportadora | ApiException> => {
  try {
    const { data } = await Api().post<ITransportadora>('/transportadora', dataToCreate);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number | undefined, dataToUpdate: ITransportadora): Promise<ITransportadora | ApiException> => {
  try {
    const { data } = await Api().put(`/transportadora/${id}`, dataToUpdate);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/transportadora/${id}`);
    return undefined;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};

const getLastCod = async () => {
  const response = await Api().get('/cod/transportadora');
  const { max } = response.data.rows[0];
  return max;
};

export const TransportadoraService = {
  getAll,
  getTransportadoraByFilter,
  create,
  updateById,
  deleteById,
  getLastCod,
};
