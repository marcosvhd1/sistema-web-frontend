import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

const getId = async (cnpjcpf: string, headers: any): Promise<number | ApiException> => {
  try {
    return await Api().get(`/empresas?cnpjcpf=${cnpjcpf}`, headers);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar o registro.');
  }
};

export const EmpresaService = {
  getId
};
