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

const create = async (dataToCreate: Omit<ITabelaNCM[], 'id'>, idEmissor: number, HEADERS: any) => {
  try {
    await Api().post<ITabelaNCM>(`/tabelancm?id_emissor=${idEmissor}`, dataToCreate, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

export const TabelaNCMService = {
  create,
};