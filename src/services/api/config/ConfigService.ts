
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

export const ConfigService = {};
