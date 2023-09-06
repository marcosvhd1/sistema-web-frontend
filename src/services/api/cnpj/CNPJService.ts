import axios from 'axios';

const consultarCNPJ = async (cnpj: string): Promise<any> => {
  try {
    const { data } = await axios.get(`http://ws.hubdodesenvolvedor.com.br/v2/cnpj/?cnpj=${cnpj}&token=12842070dWqRMesbyI23185968`);
    return data;
  } catch (error) {
    return 'Erro ao buscar os registros.';
  }
};

const consultarCPF = async (cpf: string, datanasc: string): Promise<any> => {
  try {
    const { data } = await axios.get(`https://ws.hubdodesenvolvedor.com.br/v2/cpf/?cpf=${cpf}&data=${datanasc}&token=12842070dWqRMesbyI23185968`);
    return data;
  } catch (error) {
    return 'Erro ao buscar os registros.';
  }
};

export const ConsultaCNPJService = {
  consultarCNPJ,
  consultarCPF,
};
