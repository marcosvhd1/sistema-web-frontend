import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

export type IServico = {
  id?: number;
  nserv?: number;
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

const getAll = async (): Promise<IServico[] | ApiException> => {
  try {
    const { data } = await Api().get('/servicos');
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os registros.');
  }
};

const getServiceByFilter = async (currentPage: number, limitRegistros: number, filter: string, description: string): Promise<IServico[] | ApiException> => {
  try {
    return await Api().get(`/cadastro/servicos?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}`)
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os registros.');
  }
}

const create = async (dataToCreate: Omit<IServico, 'id' | 'nserv'>): Promise<IServico | ApiException> => {
  try {
    const { data } = await Api().post<any>('/servicos', dataToCreate)
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
};

const updateById = async (id: number, dataToUpdate: IServico): Promise<IServico | ApiException> => {
  try {
    const { data } = await Api().put(`/servicos/${id}`, dataToUpdate)
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao atualizar o registro.')
  }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/servicos/${id}`)
    return undefined;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao apagar o registro.')
  }
};

const getLastCod = async () => {
  const response = await Api().get('/cod/servicos')
  const { max } = response.data.rows[0];
  return max
}

export const ServicoService = {
  getAll,
  getServiceByFilter,
  create,
  updateById,
  deleteById,
  getLastCod,
};