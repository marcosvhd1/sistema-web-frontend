import { ApiException } from '../ApiException';
import { Api } from '../ApiConfig';



const getAll = async () => {
  try {
    const { data } = await Api().get('/token');
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};


export const UsuarioService = {
  getAll
};