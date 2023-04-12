import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface INFReferenciada {
  id?: number;
  id_nfe: number;
  descricao: string,
}

const getNFRefByNF = async (idNF: number, HEADERS: any): Promise<INFReferenciada[] | ApiException> => {
  try {
    return await Api().get(`/nf_referenciada?id_nfe=${idNF}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const createNFRef = async (dataToCreate: Omit<INFReferenciada, 'id' | 'cod'>, HEADERS: any): Promise<INFReferenciada | ApiException> => {
  try {
    const { data } = await Api().post<INFReferenciada>('/nf_referenciada', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const deleteNFRefById = async (id: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/nf_referenciada?id_nfe=${id}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};

export const NFRefService = {
  getNFRefByNF,
  createNFRef,
  deleteNFRefById
};