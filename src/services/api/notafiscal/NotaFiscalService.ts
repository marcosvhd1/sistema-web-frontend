import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';
import { IClient } from '../clientes/ClientService';
import { ITransportadora } from '../transportadora/TransportadoraService';
import { INFDuplicata } from './NFDuplicata';
import { INFFormaPagto } from './NFFormaPagto';
import { INFProduct } from './NFProduct';
import { INFReferenciada } from './NFReferenciada';
import { INFService } from './NFService';

export interface INotaFiscal {
    id: number;
    id_emissor: number;
    cod: string;
    tipo: string;
    serie: number;
    natureza_operacao: string;
    cfop: string;
    finalidade: string;
    status: string;
    modelo: number;
    consumidor_final: string;
    destinatario: IClient;
    id_destinatario: string;
    nome_destinatario: string;
    data_emissao: Date;
    data_saida: Date;
    hora: Date;
    produtos: INFProduct[];
    competencia: Date;
    servicos: INFService[];
    base_calc_icms: number;
    total_icms: number;
    base_icms_st: number;
    total_icms_st: number;
    total_frete: number;
    valor_seguro: number;
    outras_despesas: number;
    total_ii: number;
    total_ipi: number;
    total_pis: number;
    total_cofins: number;
    total_desconto_produtos: number;
    total_desconto_servicos: number;
    total_desconto_nf: number;
    total_produtos: number;
    total_nota: number;
    base_calc_iss: number;
    total_iss: number;
    total_servicos: number;
    aliquota_credito: number;
    valor_credito: number;
    retencao_pis: number;
    retencao_cofins: number;
    retencao_csll: number;
    base_calc_irrf: number;
    retencao_irrf: number;
    base_prev_social: number;
    ret_prov_social: number;
    partilha_icms_dest: number;
    partilha_icms_rem: number;
    fcp_uf_dest: number;
    total_ipi_devolvido: number;
    total_fcp: number;
    total_fcp_st: number;
    presenca_comprador: string;
    ind_intermed: string;
    cnpj_intermed: string;
    id_intermed: string;
    duplicata: INFDuplicata[];
    forma_pagto: INFFormaPagto[];
    chaves_ref: INFReferenciada[];
    modalidade_frete: string;
    id_transportadora: string;
    transportadora: ITransportadora;
    quantidade_transporte: number;
    numero_transporte: number;
    especie_transporte: string;
    marca_transporte: string;
    peso_bruto: number;
    peso_liquido: number;
    info_adicionais: string;
    fonte_valor_aprox_tributos: string;
    ecf_referenciado: string;
    n_coo: string;
    caminho_xml: string;
    caminho_pdf: string;
    caminho_pdf_cce: string;
    chave_acesso: string;
    uf_embarque: string;
    local_embarque: string;
    local_despacho: string;
    uf_saida: string;
    local_saida: string;
    num_di: number;
    data_di: Date;
    transporte: string;
    uf_desembaraco: string;
    local_desembaraco: string;
    data_desembaraco: Date;
    tp_intermed: string;
}

const getNFByFilter = async (currentPage: number, limitRegistros: number, filter: string, filterStatus: string, filterDate: string, description: string, orderBy: string, orderDirection: string,dataIni: string, dataFinal: string, idEmissorSelecionado: number, HEADERS: any): Promise<INotaFiscal[] | ApiException> => {
  try {
    return await Api().get(`/notas?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}&orderBy=${orderBy}&orderDirection=${orderDirection}&filter_status=${filterStatus}&filter_date=${filterDate}&data_inicial=${dataIni}&data_final=${dataFinal}&id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const getNFDigitacao = async (idEmissorSelecionado: number, HEADERS: any): Promise<any | ApiException> => {
  try {
    const { data } = await Api().get(`/notas/count?id_emissor=${idEmissorSelecionado}`, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<INotaFiscal, 'id' | 'cod'>, HEADERS: any): Promise<INotaFiscal | ApiException> => {
  try {
    const { data } = await Api().post<INotaFiscal>('/notas', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dataToUpdate: INotaFiscal, HEADERS: any): Promise<INotaFiscal | ApiException> => {
  try {
    const { data } = await Api().put(`/notas/${id}`, dataToUpdate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number, idEmissorSelecionado: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/notas/${id}?id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};

const duplicar = async (id: number, idEmissorSelecionado: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().get(`/notas/${id}?id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao duplicar o registro.');
  }
};

const getLastCod = async (idEmissorSelecionado: number, serie: number, HEADERS: any) => {
  const response = await Api().get(`/notas/max?id_emissor=${idEmissorSelecionado}&serie=${serie}`, HEADERS);
  const { max } = response.data[0];
  return max;
};

export const NotaFiscalService = {
  getNFDigitacao,
  getNFByFilter,
  updateById,
  deleteById,
  getLastCod,
  duplicar,
  create,
};