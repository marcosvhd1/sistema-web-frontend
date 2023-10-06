import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

const gerencial = async (cliente: string, cfop: string, dataIni: string, dataFim: string, modelo55: boolean, modelo65: boolean, entrada: boolean, saida: boolean, enviada: boolean, digitacao: boolean, cancelada: boolean, inutilizada: boolean, estilo: string, idEmissor: number, HEADERS: any): Promise<any | ApiException> => {
  try {
    const { data } = await Api().get(`/relatorios?cliente=${cliente}&cfop=${cfop}&dataIni=${dataIni}&dataFim=${dataFim}&modelo55=${modelo55}&modelo65=${modelo65}&entrada=${entrada}&saida=${saida}&enviada=${enviada}&digitacao=${digitacao}&cancelada=${cancelada}&inutilizada=${inutilizada}&estilo=${estilo}&id_emissor=${idEmissor}`, HEADERS);
    
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

export const RelatoriosService = {
  gerencial
};