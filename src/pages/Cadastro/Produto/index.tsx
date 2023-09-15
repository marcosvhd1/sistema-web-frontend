import { Button, Center, Icon, Spinner, Tag, Tr, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAlertProductContext } from '../../../Contexts/AlertDialog/AlertProductContext';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { useModalProduct } from '../../../Contexts/Modal/ProductContext';
import { ActionButton } from '../../../components/Form/ActionButton';
import MainContent from '../../../components/MainContent';
import { DataTable } from '../../../components/Table/DataTable';
import { Pagination } from '../../../components/Table/Pagination';
import { TdCustom } from '../../../components/Table/TdCustom';
import { DeleteAlertDialog } from '../../../components/Utils/DeleteAlertDialog';
import { ApiException } from '../../../services/api/ApiException';
import { IProduct, ProductService } from '../../../services/api/produtos/ProductService';
import formatMoney from '../../../utils/formatarValor';
import { userInfos } from '../../../utils/header';
import { FormModal } from './components/Form/ModalProduct';
import { SearchBox } from './components/SearchBox';
import { lpad, regex } from '../../../utils/formatarCnpjCpf';

const headers: { key: string, label: string }[] = [
  { key: 'id', label: 'Código' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'preco', label: 'Preço' },
  { key: 'marca', label: 'Marca' },
  { key: 'grupo', label: 'Grupo' },
  { key: 'status', label: 'Status' }
];

export function Produto() {
  const methods = useForm<IProduct>();

  const [sortBy, setSortBy] = useState<keyof IProduct | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [id, setId] = useState<number>(0);
  const [data, setData] = useState<IProduct[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(true);
  const [seeActive, setSeeActive] = useState<string>('Ativo');
  const [filter, setFilter] = useState<string>('nprod');
  const [filterGrupo, setFilterGrupo] = useState<string>('');
  const [filterMarca, setFilterMarca] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalClients, setTotalClients] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState<number>(5);
  const [pages, setPages] = useState<number[]>([]);
  const navigate = useNavigate();
  const toast = useToast();
  const { onOpen: openEditModal } = useModalProduct();
  const { idEmissorSelecionado } = useEmissorContext();
  const { onOpen, onClose, isOpen } = useAlertProductContext();

  const userInfo = userInfos();

  const HEADERS = userInfo.header;

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalClients]);

  useEffect(() => {
    getProduct('', seeActive);
    handleChangeTotalPage();
  }, [currentPage, limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients]);

  const handleSort = (columnName: keyof IProduct) => {
    if (columnName === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy) {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    }
    return 0;
  });

  const getLastCod = () => {
    if (isEditing === false) {
      ProductService.getLastCod(idEmissorSelecionado, HEADERS)
        .then((result) => {
          if (result === null) methods.setValue('nprod', '0001');
          else {
            if (regex.test(result)) {
              methods.setValue('nprod', lpad((parseInt(result) + 1).toString()));
            } else {
              methods.setValue('nprod', '');
            }
          }
        });
    }
  };

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalClients / limitRegistros);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
  };

  const getProduct = (description: string, status: string) => {
    setIsLoading(true);
    ProductService.getProductByFilter(currentPage, limitRegistros, filter, description, filterGrupo, filterMarca, idEmissorSelecionado, status, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalClients(parseInt(result.headers['qtd']));
        }

        setIsLoading(false);
      });
  };

  const handleDeleteProduct = (clientId: number) => {
    ProductService.deleteById(clientId, idEmissorSelecionado, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          toast({
            position: 'top',
            description: 'Erro ao excluir produto.',
            status: 'error',
            duration: 2000,
          });
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: 'Produto excluído com sucesso.',
            status: 'success',
            duration: 2000,
          });
          getProduct('', seeActive);
        }
      });
    onClose();
    setTotalClients(totalClients - 1);
  };

  const handleOpenDialog = (id: number) => {
    onOpen();
    setId(id);
  };

  const handleEditProduct = async (id: number) => {
    const productToUpdate = data.find((product) => product.id === id);
    if (productToUpdate) {
      setId(id);
      openEditModal();
      methods.reset(productToUpdate);
      setIsEditing(true);
      setActive(productToUpdate.status === 'Ativo' ? true : false);
    }
  };

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox 
          isLoading={isLoading}
          seeActive={seeActive} 
          setSeeActive={setSeeActive} 
          getProduct={getProduct} 
          changeEdit={setIsEditing} 
          setFilter={setFilter}
          setFilterGrupo={setFilterGrupo}
          setFilterMarca={setFilterMarca}
        >
          
          <DataTable 
            headers={headers} 
            sortBy={sortBy}
            sortOrder={sortOrder}
            onTap={handleSort}
          >
            {sortedData != undefined ? sortedData.map((data) => (
              <Tr key={data.id}>
                <TdCustom style={{ width: '5%' }}>{data.nprod}</TdCustom>
                <TdCustom>{data.descricao}</TdCustom>
                <TdCustom>{'R$ ' + formatMoney(data.preco)}</TdCustom>
                <TdCustom style={{ width: '10%' }}>{data.marca}</TdCustom>
                <TdCustom style={{ width: '10%' }}>{data.grupo}</TdCustom>
                <TdCustom>
                  <Tag variant='outline' colorScheme={data.status === 'Ativo' ? 'green' : 'red'}>
                    {data.status}
                  </Tag>
                </TdCustom>
                <TdCustom style={{ 'textAlign': 'center' }}>
                  <ActionButton 
                    label='Editar'
                    colorScheme='orange'
                    action={() => handleEditProduct(data.id)}
                    icon={FiEdit}
                  />
                  <ActionButton 
                    label='Excluir'
                    colorScheme='red'
                    action={() => handleOpenDialog(data.id)}
                    icon={FiTrash2}
                  />
                </TdCustom>
              </Tr>
            )) : ''}
          </DataTable>
          <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalClients} changeLimitRegister={setLimitRegistros}>
            <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalClients} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </SearchBox>
        <FormModal seeActive={seeActive} active={active} setActive={setActive} getCod={getLastCod} header={HEADERS} refreshPage={getProduct} id={id} isEditing={isEditing} />
        <DeleteAlertDialog label="produto" deleteFunction={handleDeleteProduct} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
