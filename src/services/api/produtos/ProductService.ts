import { Api } from '../ApiConfig';
import { ApiException } from '../ApiException';

export type IProduct = {
  id: number;
  id_emissor: number;
  nprod: string;
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
  cst_icms: string;
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

const getProductByFilter = async (currentPage: number, limitRegistros: number, filter: string, description: string, group: string, marca: string, idEmissorSelecionado: number, status: string, HEADERS: any): Promise<IProduct[] | ApiException> => {
  try {
    return await Api().get(`/produtos?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}&group=${group}&marca=${marca}&id_emissor=${idEmissorSelecionado}&status=${status}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const getProductByID = async (idProd: number, HEADERS: any): Promise<IProduct | ApiException> => {
  try {
    const { data } = await Api().get(`/produtos/${idProd}`, HEADERS);
    return data[0];
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<IProduct, 'id'>, HEADERS: any): Promise<IProduct | ApiException> => {
  try {
    const { data } = await Api().post<IProduct>('/produtos', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dataToUpdate: IProduct, idEmissorSelecionado: number, HEADERS: any): Promise<IProduct | ApiException> => {
  try {
    const { data } = await Api().put(`/produtos/${id}?id_emissor=${idEmissorSelecionado}`, dataToUpdate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number, idEmissorSelecionado: number, HEADERS: any): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/produtos/${id}?id_emissor=${idEmissorSelecionado}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao apagar o registro.');
  }
};


const getLastCod = async (idEmissorSelecionado: number, HEADERS: any) => {
  const response = await Api().get(`/produtos/max?id_emissor=${idEmissorSelecionado}`, HEADERS);
  const { max } = response.data[0];
  return max;
};

export const ProductService = {
  getProductByFilter,
  getProductByID,
  create,
  updateById,
  deleteById,
  getLastCod
};
