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
import { lpad, regex } from '../../../utils/formatarCnpjCpf';

export function Cliente() {
  const methods = useForm<IClient>();

  const [sortBy, setSortBy] = useState<keyof IClient | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [id, setId] = useState<number>(0);
  const [data, setData] = useState<IClient[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('cod');
  const [totalClients, setTotalClients] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const { onOpen: open } = useModalClient();
  const { onOpen, onClose, isOpen } = useAlertClientContext();
  const { idEmissorSelecionado } = useEmissorContext();
  const navigate = useNavigate();
  const toast = useToast();
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalClients]);

  useEffect(() => {
    getClientsByFilter('');
    handleChangeTotalPage();
  }, [currentPage, limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients]);

  const handleSort = (columnName: keyof IClient) => {
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
      ClientService.getLastCod(idEmissorSelecionado, HEADERS)
        .then((result) => {
          if (result === null) methods.setValue('cod', '0001');
          else {
            if (regex.test(result)) {
              methods.setValue('cod', lpad((parseInt(result) + 1).toString()));
            } else {
              methods.setValue('cod', '');
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

  const getClientsByFilter = (description: string) => {
    setIsLoading(true);
    ClientService.getClientsByFilter(currentPage, limitRegistros, filter, description, idEmissorSelecionado, HEADERS)
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
      open();
      methods.reset(clientToUpdate);
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
        <SearchBox isLoading={isLoading} getClientsByFilter={getClientsByFilter} changeEdit={setIsEditing} stateFilter={setFilter}>
          <DataTable 
            headers={headers} 
            sortBy={sortBy}
            sortOrder={sortOrder}
            onTap={handleSort}
          >
            {sortedData !== undefined ? sortedData.map((data) => (
              <Tr key={data.id}>
                <TdCustom style={{ width: '5%' }}>{data.cod}</TdCustom>
                <TdCustom>{data.razao}</TdCustom>
                <TdCustom>{data.cnpjcpf}</TdCustom>
                <TdCustom>{data.cidade}</TdCustom>
                <TdCustom>{data.uf}</TdCustom>
                <TdCustom style={{ 'textAlign': 'center' }}>
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
            <Button isDisabled={currentPage === 1} variant='ghost' size='sm' fontSize='2xl' width='4' onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalClients} variant='ghost' size='sm' fontSize='2xl' width='4' onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </SearchBox>
        <FormModal getCod={getLastCod} header={HEADERS} refreshPage={getClientsByFilter} isEditing={isEditing} id={id} />
        <DeleteAlertDialog label='cliente' deleteFunction={handleDeleteClient} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}