import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface ICFOP {
  id: number;
  id_emissor: number;
  cfop_dentro: string;
  cfop_fora: string;
  natureza: string;
  info: string;
  calc_icms: boolean;
  calc_icms_st: boolean;
}

const get = async (idEmissor: number, HEADERS: any): Promise<ICFOP[] | ApiException> => {
  try {
    const { data } = await Api().get(`/cfops?id_emissor=${idEmissor}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<ICFOP, 'id' | 'cod'>, HEADERS: any): Promise<ICFOP | ApiException> => {
  try {
    const { data } = await Api().post<ICFOP>('/cfops', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const update = async (id: number, dataToUpdate: ICFOP, idEmissor: number, HEADERS: any): Promise<ICFOP | ApiException> => {
  try {
    const { data } = await Api().put(`/cfops/${id}?id_emissor=${idEmissor}`, dataToUpdate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const remove = async (id: number, idEmissor: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/cfops/${id}?id_emissor=${idEmissor}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};
  
export const ICFOPService = {
  get,
  create,
  update,
  remove
};