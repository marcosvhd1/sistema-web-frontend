import { IProduct } from "../produtos/ProductService";

export interface INFProduct {
  produto: IProduct
  quantidade: number
  valor_unitario: number
  valor_total: number
  desconto_p: number
  desconto_total: number
}

export const NotaFiscalService = {};