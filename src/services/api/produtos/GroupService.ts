import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export type IGroup = {
  id: number;
  id_emissor: number;
  descricao: string;
  tipo: string;
}

const getAll = async (idEmissorSelecionado: number, HEADERS: any): Promise<IGroup[] | ApiException> => {
  try {
    return await Api().get(`/grupos?id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<IGroup, 'id'>, HEADERS: any) => {
  try {
    return await Api().post('/grupos', dataToCreate, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao criar o registro.');
  }
};

const update = async (id: number, dataToUpdate: IGroup, idEmissorSelecionado: number, HEADERS: any): Promise<IGroup | ApiException> => {
  try {
    return await Api().put(`/grupos/${id}?id_emissor=${idEmissorSelecionado}`, dataToUpdate, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao atualizar o registro.');
  }
};

const deleteData = async (id: number, idEmissorSelecionado: number, HEADERS: any): Promise<IGroup | ApiException> => {
  try {
    return await Api().delete(`/grupos/${id}?id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao apagar o registro.');
  }
};

export const GroupService = {
  getAll,
  create,
  update,
  deleteData
};
