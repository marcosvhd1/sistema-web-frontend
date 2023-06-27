import { Badge, Button, Icon, Tag, Td, Tr, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import MainContent from '../../../components/MainContent';
import { DataTable } from '../../../components/Table/DataTable';
import { Pagination } from '../../../components/Table/Pagination';
import { DeleteAlertDialog } from '../../../components/Utils/DeleteAlertDialog';
import { useAlertProductContext } from '../../../Contexts/AlertDialog/AlertProductContext';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { useModalProduct } from '../../../Contexts/Modal/ProductContext';
import { ApiException } from '../../../services/api/ApiException';
import { IProduct, ProductService } from '../../../services/api/produtos/ProductService';
import { getDecrypted } from '../../../utils/crypto';
import { userInfos } from '../../../utils/header';
import { FormModal } from './components/Form/ModalProduct';
import { SearchBox } from './components/SearchBox';
import formatMoney from '../../../utils/formatarValor';

const headers: { key: string, label: string }[] = [
  { key: 'id', label: 'Código' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'preco', label: 'Preço' },
  { key: 'referencia', label: 'Referência' },
  { key: 'marca', label: 'Marca' },
  { key: 'grupo', label: 'Grupo' },
  { key: 'un', label: 'UN' },
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
  const [filter, setFilter] = useState<string>('descricao');
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
                <Td style={{ 'width': '1rem' }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.nprod).slice(-4)}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.descricao}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{'R$ ' + formatMoney(data.preco)}</Td>
                <Td style={{ 'width': '1rem' }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.referencia}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.marca}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.grupo}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.un}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                  <Tag variant='outline' colorScheme={data.status === 'Ativo' ? 'green' : 'red'}>
                    {data.status}
                  </Tag>
                </Td>
                <Td style={{ 'textAlign': 'center' }}>
                  <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditProduct(data.id)}>
                    <Icon color="orange.300" as={FiEdit} />
                  </Button>
                  <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleOpenDialog(data.id)}>
                    <Icon as={FiTrash2} color="red.400" />
                  </Button>
                </Td>
              </Tr>
            )) : ''}
          </DataTable>
          <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalClients} changeLimitRegister={setLimitRegistros}>
            <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalClients} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </SearchBox>
        <FormModal seeActive={seeActive} active={active} setActive={setActive} marca={marca} grupo={grupo} getCod={getLastCod} header={HEADERS} editCod={editCod} cod={cod} refreshPage={getProduct} id={id} isEditing={isEditing} />
        <DeleteAlertDialog label="Produto" deleteFunction={handleDeleteProduct} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
