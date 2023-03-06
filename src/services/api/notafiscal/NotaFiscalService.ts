import { IClient } from '../clientes/ClientService';
import { ITransportadora } from '../transportadora/TransportadoraService';
import { INFDuplicata } from './NFDuplicata';
import { INFFormaPagto } from './NFFormaPagto';
import { INFProduct } from './NFProduct';
import { INFService } from './NFService';

export interface INotaFiscal {
    id: number;
    id_emissor: number;
    cod: number;
    tipo: string;
    serie: number;
    natureza_operacao: string;
    cfop: string;
    forma_emissao: string;
    finalidade: string;
    status: string;
    modelo: number;
    consumidor_final: string;
    destinatario: IClient;
    data_emissao: Date;
    data_saida: Date;
    hora: Date;
    produtos: INFProduct[]; //colocar no back em NFProduto
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
    duplicata: INFDuplicata[]; //colocar no back em NFFPagto
    forma_pagto: INFFormaPagto[]; //colocar no back em NFFPagto
    modalidade_frete: string;
    transportadora: ITransportadora; //colocar no back em NFTransportadora
    quantidade_transporte: number;
    numero_transporte: number;
    especie_transporte: string;
    marca_transporte: string;
    peso_bruto: number;
    peso_liquido: number;
    info_adicionais: string;
    fonte_valor_aprox_tributos: string;
    nfe_referenciada: string;
    ecf_referenciado: string;
    n_coo: string;
    caminho_xml: string;
    chave_acesso: string;
    uf_embarque: string;
    local_embarque: string;
    local_despacho: string;
    uf_saida: string;
    local_saida: string;
    num_di: number;
    data_di: Date;
}

export const NotaFiscalService = {};