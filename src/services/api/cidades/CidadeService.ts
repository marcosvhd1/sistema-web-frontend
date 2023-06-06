import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface ICidade {
  nome: string;
  cod: string;
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

export const CidadeService = {
  getByUF,
};