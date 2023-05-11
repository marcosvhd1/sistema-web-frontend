import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

const status_servidor = async (idEmissor: number, HEADERS: any): Promise<any | ApiException> => {
  try {
    const { data } =  await Api().get(`/sefaz/status_servidor?id_emissor=${idEmissor}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

export const SefazService = {
  status_servidor,
};