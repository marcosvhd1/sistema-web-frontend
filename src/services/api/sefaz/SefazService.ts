import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

const emitir = async (idNfe: number, idEmissor: number, HEADERS: any): Promise<any | ApiException> => {
  try {
    const { data } =  await Api().get(`/sefaz/emitir?id_nfe=${idNfe}&id_emissor=${idEmissor}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const cancelar = async (idNfe: number, idEmissor: number, justificativa: string, HEADERS: any): Promise<any | ApiException> => {
  try {
    const { data } =  await Api().get(`/sefaz/cancelar?id_nfe=${idNfe}&id_emissor=${idEmissor}&justificativa=${justificativa}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const inutilizar = async (numeroIni: number, numeroFin: number, justificativa: string, idEmissor: number, HEADERS: any): Promise<any | ApiException> => {
  try {
    const { data } =  await Api().get(`/sefaz/inutilizar?numero_inicial=${numeroIni}&numero_final=${numeroFin}&justificativa=${justificativa}&id_emissor=${idEmissor}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const status_servidor = async (idEmissor: number, HEADERS: any): Promise<any | ApiException> => {
  try {
    const { data } =  await Api().get(`/sefaz/status_servidor?id_emissor=${idEmissor}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

export const SefazService = {
  emitir,
  cancelar,
  inutilizar,
  status_servidor,
};