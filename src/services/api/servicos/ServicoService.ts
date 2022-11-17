import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';
import { HEADERS } from '../../../Routes/MainRoute';

export type IServico = {
  id: number;
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

// const LOCAL_DATA = JSON.parse(localStorage.getItem('user')!);
// const TOKEN = LOCAL_DATA.user?.accessToken;

// const HEADERS = {
//   headers: {
//     'Authorization': TOKEN
//   }
// };

const getAll = async (): Promise<IServico[] | ApiException> => {
  try {
    const { data } = await Api().get('/servicos', HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const getServiceByFilter = async (currentPage: number, limitRegistros: number, filter: string, description: string): Promise<IServico[] | ApiException> => {
  try {
    return await Api().get(`/servicos/filter?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<IServico, 'id' | 'nserv'>): Promise<IServico | ApiException> => {
  try {
    const { data } = await Api().post<IServico>('/servicos', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dataToUpdate: IServico): Promise<IServico | ApiException> => {
  try {
    const { data } = await Api().put(`/servicos/${id}`, dataToUpdate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/servicos/${id}`, HEADERS);
    return undefined;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};

const getLastCod = async () => {
  const response = await Api().get('/servicos/maxnserv', HEADERS);
  const { max } = response.data.rows[0];
  return max;
};

export const ServicoService = {
  getAll,
  getServiceByFilter,
  create,
  updateById,
  deleteById,
  getLastCod,
};
