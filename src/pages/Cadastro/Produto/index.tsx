import { Button, Icon, Tag, Tr, useToast } from '@chakra-ui/react';
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
  const [data, setData] = useState<IProduct[]>([]);
  const [id, setId] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCod, setEditCod] = useState<number>(1);
  const { onOpen, onClose, isOpen } = useAlertProductContext();
  const { onOpen: openEditModal } = useModalProduct();
  /// pagination and search by filter
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('nprod');
  const [totalClients, setTotalClients] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState<number>(5);
  const [pages, setPages] = useState<number[]>([]);
  ///////////////////////////////////
  const navigate = useNavigate();
  const toast = useToast();
  const { idEmissorSelecionado } = useEmissorContext();
  const [cod, setCod] = useState<number>(1);
  const [marca, setMarca] = useState<string>('');
  const [grupo, setGrupo] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [seeActive, setSeeActive] = useState<string>('Ativo');

  const userInfo = userInfos();

  const HEADERS = userInfo.header;

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalClients]);

  useEffect(() => {
    getProduct('', seeActive);
  }, [currentPage]);

  useEffect(() => {
    getProduct('', seeActive);
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients, limitRegistros]);

  const getLastCod = () => {
    ProductService.getLastCod(idEmissorSelecionado, HEADERS)
      .then((result) => {
        if (isEditing) {
          setCod(editCod);
        } else {
          if (result === null) {
            setCod(1);
          } else {
            setCod(parseInt(result) + 1);
          }
        }
      });
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
    ProductService.getProductByFilter(currentPage, limitRegistros, filter, description, idEmissorSelecionado, status, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalClients(parseInt(result.headers['qtd']));
        }
      });
  };
  const getProductByGroup = (description: string, group: string, status: string) => {
    ProductService.getProductByGroup(currentPage, limitRegistros, filter, description, group, idEmissorSelecionado, status, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalClients(parseInt(result.headers['qtd']));
        }
      });
  };

  const handleDeleteProduct = (clientId: number) => {
    ProductService.deleteById(clientId, idEmissorSelecionado, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: 'Produto excluído com sucesso.',
            status: 'success',
            duration: 2000,
            isClosable: true,
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
      setEditCod(productToUpdate.nprod);
      setMarca(productToUpdate.marca);
      setGrupo(productToUpdate.grupo);
      methods.reset(productToUpdate);
      setIsEditing(true);
      setActive(productToUpdate.status === 'Ativo' ? true : false);
    }
  };

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox seeActive={seeActive} setSeeActive={setSeeActive} getProductByGroup={getProductByGroup} getCod={getLastCod} getProduct={getProduct} changeEdit={setIsEditing} setFilter={setFilter}>
          <DataTable headers={headers}>
            {data != undefined ? data.map((data) => (
              <Tr onDoubleClick={() => handleEditProduct(data.id)} key={data.id}>
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
        <FormModal seeActive={seeActive} active={active} setActive={setActive} marca={marca} grupo={grupo} getCod={getLastCod} header={HEADERS} editCod={editCod} cod={cod} refreshPage={getProduct} id={id} isEditing={isEditing} />
        <DeleteAlertDialog label="produto" deleteFunction={handleDeleteProduct} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
