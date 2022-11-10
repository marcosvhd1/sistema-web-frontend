import { ApiException } from '../ApiException';
import { Api } from '../ApiConfig';

export type IProduct = {
  id: number;
  nprod: number;
  descricao: string;
  referencia: string;
  codbarras: string;
  marca: string;
  grupo: string;
  preco: number;
  preco_trib: number;
  un: string;
  un_trib: string;
  status: string;
  anotacoes: string;
  cst_icms: number;
  aliquota_icms: number;
  base_icms: number;
  cst_ipi: number;
  aliquota_ipi: number;
  cst_cofins: number;
  aliquota_cofins: number;
  cst_pis: number;
  aliquota_pis: number;
  info_adicional: string;
  ncm: string;
  cest: string;
  cnpj_produtor: string;
  producao_propria: string;
  cfop: string;
  origem: string;
  peso_bruto: number;
  peso_liquido: number;
};


const getAll = async (): Promise<IProduct[] | ApiException> => {
  try {
    const { data } = await Api().get('/produtos');
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const getProductByFilter = async (currentPage: number, limitRegistros: number, filter: string, description: string): Promise<IProduct[] | ApiException> => {
  try {
    return await Api().get(`/cadastro/produtos?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}`);
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<IProduct, 'id' | 'cod'>): Promise<IProduct | ApiException> => {
  try {
    const { data } = await Api().post<IProduct>('/produtos', dataToCreate);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dataToUpdate: IProduct): Promise<IProduct | ApiException> => {
  try {
    const { data } = await Api().put(`/produtos/${id}`, dataToUpdate);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/produtos/${id}`);
    return undefined;
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao apagar o registro.');
  }
};


const getLastCod = async () => {
  const response = await Api().get('/cod/produtos');
  const { max } = response.data.rows[0];
  return max;
};

export const ProductService = {
  getAll,
  getProductByFilter,
  create,
  updateById,
  deleteById,
  getLastCod
};
