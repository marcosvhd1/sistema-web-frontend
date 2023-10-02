import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

const gerencial = async (
  cliente: string, 
  cfop: string, 
  dataIni: string, 
  dataFim: string, 
  modelo55: boolean,
  modelo65: boolean,
  tipo1: boolean,
  tipo2: boolean,
  enviada: boolean,
  digitacao: boolean,
  cancelada: boolean,
  inutilizada: boolean,
  idEmissor: number,
  HEADERS: any
): Promise<any | ApiException> => {
  try {
    const { data } =  await Api().get(
      `/relatorios/gerencial?
      cliente=${cliente}
      cfop=${cfop}
      dataIni=${dataIni}
      dataFim=${dataFim}
      modelo55=${modelo55}
      modelo65=${modelo65}
      tipo1=${tipo1}
      tipo2=${tipo2}
      enviada=${enviada}
      digitacao=${digitacao}
      cancelada=${cancelada}
      inutilizada=${inutilizada}
      id_emissor=${idEmissor}`, 
      HEADERS
    );
    
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

export const RelatoriosService = {
  gerencial
};