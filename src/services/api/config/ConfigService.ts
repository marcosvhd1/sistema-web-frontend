import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export interface IConfig {
  id: number;
  id_emissor: number;
  n_serie: string;
  validade: string;
  ambiente: string;
  tipo_imp: string;
  forma_emi: string;
  finalidade: string;
  id_nfce: string;
  token_nfce: string;
  serie_padrao: string;
  aliq_aprov_icms: string;
  email_remetente: string;
  email: string;
  host: string;
  usuario: string;
  senha: string;
  porta: string;
  copia: string;
  assunto: string;
  mensagem: string;
  autenticacao: boolean
  ssl: boolean;
  tls: boolean;
}

const create = async (dataToCreate: Omit<IConfig, 'id'>, HEADERS: any): Promise<IConfig | ApiException> => {
  try {
    const { data } = await Api().post<IConfig>('/config', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const getByEmissor = async (idEmissorSelecionado: number, HEADERS: any): Promise<IConfig | null > => {
  try {
    const { data } = await Api().get(`/config?id_emissor=${idEmissorSelecionado}`, HEADERS);
    return data;
  } catch (error) {
    return null;
  }
};

export const ConfigService = {
  create,
  getByEmissor,
};
