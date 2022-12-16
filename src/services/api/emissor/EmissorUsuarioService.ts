import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

interface IEmissorUsuario {
  id: number;
  id_usuario: number;
  id_emissor: number;
}

const deleteById = async (id: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/emissor/usuario/${id}`, HEADERS);

  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar os registros.');
  }
};

const create = async (dataToCreate: Omit<IEmissorUsuario, 'id'>, HEADERS: any) : Promise<IEmissorUsuario | ApiException> => {
  try {
    const { data } = await Api().post<IEmissorUsuario>('/emissor/usuario', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

export const EmissorUsuarioService = {
  create,
  deleteById
};
