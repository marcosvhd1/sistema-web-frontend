import { IServico } from "../servicos/ServicoService";

export interface INFService {
  servico: IServico
  quantidade: number
  valor_unitario: number
  valor_total: number
  desconto_p: number
  desconto_total: number
  cfop: number
  ean: string
  valor_iss: number
  valor_iss_retido: number
  pis_cst: number
  pis_base_calc: number
  pis_aliquota: number
  pis_valor: number
  cofins_cst: number
  cofins_base_calc: number
  cofins_aliquota: number
  cofins_valor: number
}

export const NotaFiscalService = {};