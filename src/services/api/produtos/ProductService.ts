import { ApiException } from '../ApiException';
import { Api } from '../ApiConfig';
import { HEADERS } from '../../../Routes/MainRoute';

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

// const LOCAL_DATA = JSON.parse(localStorage.getItem('user')!);
// const TOKEN = LOCAL_DATA.user?.accessToken;

// const HEADERS = {
//   headers: {
//     'Authorization': TOKEN
//   }
// };

const getAll = async (): Promise<IProduct[] | ApiException> => {
  try {
    const { data } = await Api().get('/produtos', HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message || 'Erro ao buscar os registros.');
  }
};

const getProductByFilter = async (currentPage: number, limitRegistros: number, filter: string, description: string): Promise<IProduct[] | ApiException> => {
  try {
    return await Api().get(`/produtos/filter?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao buscar os registros.');
  }
};

const create = async (dataToCreate: Omit<IProduct, 'id' | 'cod'>): Promise<IProduct | ApiException> => {
  try {
    const { data } = await Api().post<IProduct>('/produtos', dataToCreate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dataToUpdate: IProduct): Promise<IProduct | ApiException> => {
  try {
    const { data } = await Api().put(`/produtos/${id}`, dataToUpdate, HEADERS);
    return data;
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/produtos/${id}`, HEADERS);
  } catch (error) {
    return new ApiException((error as ApiException).message|| 'Erro ao apagar o registro.');
  }
};


const getLastCod = async () => {
  const response = await Api().get('/produtos/maxnprod', HEADERS);
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
