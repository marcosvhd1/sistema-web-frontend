import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, Td, Tr, useToast } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';

import MainContent from '../../../components/MainContent';
import { DataTable } from '../../../components/Table/DataTable';
import { Pagination } from '../../../components/Table/Pagination';
import { DeleteAlertDialog } from '../../../components/Utils/DeleteAlertDialog';
import { FormModal } from './components/Form/FormModal';
import { SearchBox } from './components/SearchBox';

import { ApiException } from '../../../services/api/ApiException';
import { ClientService, IClient } from '../../../services/api/clientes/ClientService';

import { useAlertClientContext } from '../../../Contexts/AlertDialog/AlertClientContext';
import { useModalClient } from '../../../Contexts/Modal/ClientContext';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { getDecrypted } from '../../../utils/crypto';


export function Cliente() {
  const methods = useForm<IClient>();
  const [data, setData] = useState<IClient[]>([]);
  const [id, setId] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editCod, setEditCod] = useState<number>(1);
  const { onOpen, onClose, isOpen } = useAlertClientContext();
  const { onOpen: open } = useModalClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('razao');
  const [totalClients, setTotalClients] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const navigate = useNavigate();
  const toast = useToast();
  const { idEmissorSelecionado } = useEmissorContext();
  const [cod, setCod] = useState<number>(1);


  const LOCAL_DATA = getDecrypted(localStorage.getItem('user'));
  const TOKEN = LOCAL_DATA?.user.accessToken;

  const HEADERS = {
    headers: {
      'Authorization': TOKEN
    }
  };


  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
    getClientsByFilter('');
    console.log(pages);

  }, [currentPage, limitRegistros, totalClients]);


  useEffect(() => {
    getClientsByFilter('');
  }, [currentPage]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients]);



  const getLastCod = () => {
    ClientService.getLastCod(idEmissorSelecionado, HEADERS)
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

  const getClientsByFilter = async (description: string) => {
    ClientService.getClientsByFilter(currentPage, limitRegistros, filter, description, idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalClients(parseInt(result.headers['qtd']));
          return true;
        }
      });
  };

  const handleDeleteClient = (clientId: number) => {
    ClientService.deleteById(clientId, idEmissorSelecionado, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: 'Cliente excluido com sucesso.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        }
      });
    onClose();
    setTotalClients(totalClients - 1);
  };

  const handleOpenDialog = (id: number) => {
    onOpen();
    setId(id);
  };

  const handleEditClient = (id: number) => {
    const clientToUpdate = data.find((client) => client.id === id);
    if (clientToUpdate) {
      setId(id);
      setEditCod(clientToUpdate?.cod);
      methods.reset(clientToUpdate);
      open();
      setIsEditing(true);
    }
  };

  const headers: { key: string, label: string }[] = [
    { key: 'cod', label: 'Código' },
    { key: 'razao', label: 'Nome / Razão Social' },
    { key: 'fantasia', label: 'Nome Fantasia' },
    { key: 'cnpjcpf', label: 'CPF / CNPJ' },
    { key: 'bairro', label: 'Bairro' },
    { key: 'cidade', label: 'Cidade' },
    { key: 'uf', label: 'UF' },
    { key: 'categoria', label: 'Categoria' },
  ];

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox getCod={getLastCod} getClientsByFilter={getClientsByFilter} changeEdit={setIsEditing} stateFilter={setFilter}>
          <DataTable headers={headers} >
            {data !== undefined ? data.map((data) => (
              <Tr key={data.id}>
                <Td style={{ 'width': '1rem' }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.cod).slice(-4)}</Td>
                <Td style={{ 'width': '1rem' }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.razao}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.fantasia}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cnpjcpf}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.bairro}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cidade}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.uf}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.categoria}</Td>
                <Td style={{ 'textAlign': 'center' }}>
                  <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditClient(data.id)}>
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
        <FormModal getCod={getLastCod} header={HEADERS} refreshPage={getClientsByFilter} cod={cod} editCod={editCod} isEditing={isEditing} changeEdit={setIsEditing} id={id} />
        <DeleteAlertDialog label="Cliente" deleteFunction={handleDeleteClient} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
