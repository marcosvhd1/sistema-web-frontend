import { ApiException } from '../ApiException';
import { Api } from '../ApiConfig';

export interface IUsuario {
  id: number;
  id_empresa: number;
  email: string;
  password: string;
  tipo_admin: number;
  ultimo_emissor_selecionado?: number;
}

const getAll = async () => {
  try {
    const { data } = await Api().get('/token');
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};
const getAllUsers = async (cnpjcpf: string, headers: any) => {
  try {
    const { data } = await Api().get(`/usuarios?emp=${cnpjcpf}`, headers);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const getUserId = async (id: number, user: string, headers: any) => {
  try {
    const { data } = await Api().get(`/usuarios/new?id=${id}&user=${user}`, headers);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar o registro.');
  }
};
const create = async (dataToCreate: Omit<IUsuario, 'id'>, headers: any): Promise<IUsuario | ApiException> => {
  try {
    const { data } = await Api().post<IUsuario>('/usuarios', dataToCreate, headers);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

export const UsuarioService = {
  getAll,
  getAllUsers,
  getUserId,
  create
};
