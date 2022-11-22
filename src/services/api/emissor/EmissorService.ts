import { HEADERS } from '../../../Routes/Route';
import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface IEmissorUsuario {
  id_emissor: number
  id_usuarios: number
}

export interface IEmissor {
  id: number
  razao: string
  cnpjcpf: string
}

const getEmissores = async (idUsuario: number): Promise<IEmissor[] | ApiException> => {
  try {
    const { data } = await Api().get(`/emissor?id_usuario=${idUsuario}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};


export const EmissorService = {
  getEmissores
};
