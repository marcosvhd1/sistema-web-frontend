import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, Tr, useToast } from '@chakra-ui/react';
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
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { useModalClient } from '../../../Contexts/Modal/ClientContext';
import { ActionButton } from '../../../components/Form/ActionButton';
import { TdCustom } from '../../../components/Table/TdCustom';
import { userInfos } from '../../../utils/header';


export function Cliente() {
  const methods = useForm<IClient>();
  const [data, setData] = useState<IClient[]>([]);
  const [id, setId] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editCod, setEditCod] = useState<number>(1);
  const { onOpen, onClose, isOpen } = useAlertClientContext();
  const { onOpen: open } = useModalClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('cod');
  const [totalClients, setTotalClients] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const navigate = useNavigate();
  const toast = useToast();
  const { idEmissorSelecionado } = useEmissorContext();
  const [cod, setCod] = useState<number>(1);
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalClients]);

  useEffect(() => {
    getClientsByFilter('');
  }, [currentPage]);

  useEffect(() => {
    getClientsByFilter('');
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients, limitRegistros]);

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

  const getClientsByFilter = (description: string) => {
    ClientService.getClientsByFilter(currentPage, limitRegistros, filter, description, idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalClients(parseInt(result.headers['qtd']));
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
          getClientsByFilter('');
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
    { key: 'cnpjcpf', label: 'CPF / CNPJ' },
    { key: 'cidade', label: 'Cidade' },
    { key: 'uf', label: 'UF' },
  ];

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox getCod={getLastCod} getClientsByFilter={getClientsByFilter} changeEdit={setIsEditing} stateFilter={setFilter}>
          <DataTable headers={headers} >
            {data !== undefined ? data.map((data) => (
              <Tr key={data.id} onDoubleClick={() => handleEditClient(data.id)}>
                <TdCustom style={{ width: '5%' }}>{data.cod}</TdCustom>
                <TdCustom>{data.razao}</TdCustom>
                <TdCustom>{data.cnpjcpf}</TdCustom>
                <TdCustom>{data.cidade}</TdCustom>
                <TdCustom>{data.uf}</TdCustom>
                <TdCustom style={{ 'textAlign': 'center', 'maxWidth': '5rem' }}>
                  <ActionButton 
                    label='Editar'
                    colorScheme='orange'
                    action={() => handleEditClient(data.id)}
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
        <FormModal getCod={getLastCod} header={HEADERS} refreshPage={getClientsByFilter} cod={cod} editCod={editCod} isEditing={isEditing} id={id} />
        <DeleteAlertDialog label="cliente" deleteFunction={handleDeleteClient} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
