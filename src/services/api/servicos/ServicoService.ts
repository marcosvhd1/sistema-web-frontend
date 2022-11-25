import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export type IServico = {
  id: number;
  id_emissor: number;
  nserv: number;
  descricao: string;
  un: string;
  preco: number;
  anotacoes: string;
  base_iss: number;
  aliquota_iss: number;
  situacao: string;
  item_lista: string;
  ncm: string;
};

const getServiceByFilter = async (currentPage: number, limitRegistros: number, filter: string, description: string, idEmissorSelecionado: number, HEADERS: any): Promise<IServico[] | ApiException> => {
  try {
    return await Api().get(`/servicos?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}&id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<IServico, 'id' | 'nserv'>, HEADERS: any): Promise<IServico | ApiException> => {
  try {
    const { data } = await Api().post<IServico>('/servicos', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dataToUpdate: IServico, idEmissorSelecionado: number, HEADERS: any): Promise<IServico | ApiException> => {
  try {
    const { data } = await Api().put(`/servicos/${id}?id_emissor=${idEmissorSelecionado}`, dataToUpdate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number, idEmissorSelecionado: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/servicos/${id}?id_emissor=${idEmissorSelecionado}`, HEADERS);
    return undefined;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};

const getLastCod = async (idEmissorSelecionado: number, HEADERS: any) => {
  const response = await Api().get(`/servicos/max?id_emissor=${idEmissorSelecionado}`, HEADERS);
  const { max } = response.data[0];
  return max;
};

export const ServicoService = {
  getServiceByFilter,
  create,
  updateById,
  deleteById,
  getLastCod,
};
