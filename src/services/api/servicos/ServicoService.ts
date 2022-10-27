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

const create = async (dataToCreate: Omit<IServico, 'id' | 'nserv'>): Promise<IServico | ApiException> => {
  try {
    const { data } = await Api().post<any>('/servicos', dataToCreate)
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
};

export const ServicoService = {
  getAll,
  create,
};