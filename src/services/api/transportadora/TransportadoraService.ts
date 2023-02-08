import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface ITransportadora {
  id: number
  id_emissor: number
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
  antt: string
}

const getTransportadoraByFilter = async (currentPage: number, limitRegistros: number, filter: string, description: string, idEmissorSelecionado: number, HEADERS: any): Promise<ITransportadora[] | ApiException> => {
  try {
    return await Api().get(`/transportadoras?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}&id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const getTransportadoraToComboBox = async (idEmissorSelecionado: number, HEADERS: any): Promise<ITransportadora[] | ApiException> => {
  try {
    return await Api().get(`/transportadoras/comboBox?id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<ITransportadora, 'id' | 'nserv'>, HEADERS: any): Promise<ITransportadora | ApiException> => {
  try {
    const { data } = await Api().post<ITransportadora>('/transportadoras', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number | undefined, dataToUpdate: ITransportadora, idEmissorSelecionado: number, HEADERS: any): Promise<ITransportadora | ApiException> => {
  try {
    const { data } = await Api().put(`/transportadoras/${id}?id_emissor=${idEmissorSelecionado}`, dataToUpdate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number, idEmissorSelecionado: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/transportadoras/${id}?id_emissor=${idEmissorSelecionado}`, HEADERS);
    return undefined;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};

const getLastCod = async (idEmissorSelecionado: number, HEADERS: any) => {
  const response = await Api().get(`/transportadoras/max?id_emissor=${idEmissorSelecionado}`, HEADERS);
  const { max } = response.data[0];
  return max;
};

export const TransportadoraService = {
  getTransportadoraByFilter,
  getTransportadoraToComboBox,
  create,
  updateById,
  deleteById,
  getLastCod,
};
