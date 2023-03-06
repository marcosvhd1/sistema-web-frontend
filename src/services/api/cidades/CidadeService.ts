import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface ICidade {
  nome: string;
  uf: string;
}

const getByUF = async (uf: string, HEADERS: any): Promise<ICidade[] | null> => {
  try {
    const { data } = await Api().get(`/cidades?uf=${uf}`, HEADERS);
    return data;
  } catch (error) {
    return null;
  }
};

const create = async (dataToCreate: Omit<ICidade, 'id'>, HEADERS: any): Promise<ICidade | ApiException> => {
  try {
    const { data } = await Api().post<ICidade>('/cidades', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

export const CidadeService = {
  create,
  getByUF,
};