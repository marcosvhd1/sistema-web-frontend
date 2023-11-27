import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

const preview = async (idNfe: number, idEmissor: number, modelo: string, HEADERS: any): Promise<any | ApiException> => {
  try {
    const { data } =  await Api().get(`/sefaz/preview?id_nfe=${idNfe}&id_emissor=${idEmissor}&model=${modelo}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const emitir = async (idNfe: number, idEmissor: number, model: string, HEADERS: any): Promise<any | ApiException> => {
  try {
    const { data } =  await Api().get(`/sefaz/emitir?id_nfe=${idNfe}&model=${model}&id_emissor=${idEmissor}`, HEADERS);
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

const inutilizar = async (serie: string, numeroIni: string, numeroFin: string, justificativa: string, idEmissor: number, HEADERS: any): Promise<any | ApiException> => {
  try {
    const { data } =  await Api().get(`/sefaz/inutilizar?serie=${serie}&numero_inicial=${numeroIni}&numero_final=${numeroFin}&justificativa=${justificativa}&id_emissor=${idEmissor}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const cce = async (seqEvento: number, idNfe: number, correcao: string, idEmissor: number, HEADERS: any): Promise<any | ApiException> => {
  try {
    const { data } =  await Api().get(`/sefaz/cce?seq_evento=${seqEvento}&id_nfe=${idNfe}&correcao=${correcao}&id_emissor=${idEmissor}`, HEADERS);
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
  preview,
  emitir,
  cancelar,
  inutilizar,
  cce,
  status_servidor,
};