import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface ITabelaNCM {
  id: number;
  id_emissor: number;
  codigo: string;
  tipo: string;
  municipal: string;
  estadual: string;
  nacionalfederal: string;
  importadosfederal: string;
}

const create = async (dataToCreate: Omit<ITabelaNCM, 'id'>, HEADERS: any): Promise<ITabelaNCM | ApiException> => {
  try {
    const { data } = await Api().post<ITabelaNCM>('/tabelancm', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

export const NFProdutoService = {
  create,
};