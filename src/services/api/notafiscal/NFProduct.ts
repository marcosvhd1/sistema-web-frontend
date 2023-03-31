import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';
import { IProduct } from '../produtos/ProductService';

export interface INFProduct {
  id?: number;
  id_nfe: number;
  produto: IProduct
  quantidade: number
  valor_unitario: number
  valor_total: number
  desconto_p: number
  desconto_total: number
  p_reducao_base_icms: number
  valor_icms: number
  p_aliquota_credito: number
  credito_icms_aproveitado: number
  mod_det_bc_icms: string
  mod_det_bc_icms_st: string
  p_margem_vlr_adc_icms_st: number
  p_reducao_base_icms_st: number
  base_icms_st: number
  aliquota_icms_st: number
  valor_icms_st: number
  base_calc_retido_ant: number
  icms_st_retido_ant: number
  ean: string
  pedido_compra: string
  item: string
  base_calc_ipi: number
  valor_ipi: number
  cnpj_produtor: string
  base_calc_ii: number
  desp_aduaneiras: number
  valor_iof: number
  valor_ii: number
  base_calc_pis: number
  valor_pis: number
  base_calc_cofins: number
  valor_cofins: number
  ipi_p_devolvida: number
  ipi_vlr_devolvido: number
  fcp_base_calc: number
  fcp_p: number
  fcp_valor: number
  fcp_base_calc_st: number
  fcp_p_st: number
  fcp_valor_st: number
  partilha_icms_base_calc: number
  partilha_icms_aliquota_fcp_uf_dest: number
  partilha_icms_valor_fcp_uf_dest: number
  partilha_icms_aliquota_interna_icms_uf_dest: number
  partilha_icms_aliquota_icms_interestadual: number
  partilha_icms_p_partilha: string
  partilha_icms_valor_icms_uf_dest: number
  partilha_icms_valor_icms_uf_ori: number
  cod_anp: string
  descricao_anp: string
  uf_consumo: string
}

const getNFProdByNF = async (idNF: number, HEADERS: any): Promise<INFProduct[] | ApiException> => {
  try {
    return await Api().get(`/nf_produtos?id_nfe=${idNF}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<INFProduct, 'id' | 'cod'>, HEADERS: any): Promise<INFProduct | ApiException> => {
  try {
    const { data } = await Api().post<INFProduct>('/nf_produtos', dataToCreate, HEADERS);
    
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const deleteNFProdByIDNF = async (idNf: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/nf_produtos?id_nfe=${idNf}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};

export const NFProdutoService = {
  create,
  getNFProdByNF,
  deleteNFProdByIDNF
};