import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface INFDuplicata {
  id?: number;
  id_nfe: number;
  numero: string,
  vencimento: string,
  valor: string,
}

const getNFDupliByNF = async (idNF: number, HEADERS: any): Promise<INFDuplicata[] | ApiException> => {
  try {
    return await Api().get(`/nf_duplicata?id_nfe=${idNF}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const createNFDupli = async (dataToCreate: Omit<INFDuplicata, 'id' | 'cod'>, HEADERS: any): Promise<INFDuplicata | ApiException> => {
  try {
    const { data } = await Api().post<INFDuplicata>('/nf_duplicata', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const deleteNFDupliById = async (id: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/nf_duplicata?id_nfe=${id}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};

export const NFDupliService = {
  getNFDupliByNF,
  createNFDupli,
  deleteNFDupliById,
};