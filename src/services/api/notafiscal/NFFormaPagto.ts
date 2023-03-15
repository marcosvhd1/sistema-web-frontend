import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface INFFormaPagto {
  id?: number;
  id_nfe: number;
  forma: string,
  valor: string,
  bandeira: string,
  observacao: string,
}

const getNFPagtoByNF = async (idNF: number, HEADERS: any): Promise<INFFormaPagto[] | ApiException> => {
  try {
    return await Api().get(`/nf_pagto?id_nfe=${idNF}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const createNFPagto = async (dataToCreate: Omit<INFFormaPagto, 'id' | 'cod'>, HEADERS: any): Promise<INFFormaPagto | ApiException> => {
  try {
    const { data } = await Api().post<INFFormaPagto>('/nf_pagto', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const updateNFPagtoById = async (id: number, dataToUpdate: INFFormaPagto, HEADERS: any): Promise<INFFormaPagto | ApiException> => {
  try {
    const { data } = await Api().put(`/nf_pagto/${id}`, dataToUpdate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const deleteNFPagtoById = async (id: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/nf_pagto?id_nfe=${id}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};

export const NFPagtoService = {
  getNFPagtoByNF,
  createNFPagto,
  updateNFPagtoById,
  deleteNFPagtoById
};