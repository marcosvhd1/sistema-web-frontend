import { Button, Center, Icon, Spinner, Tr, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAlertTransportadoraContext } from '../../../Contexts/AlertDialog/AlertTransportadoraContext';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { useModalTransportadora } from '../../../Contexts/Modal/TransportadoraContext';
import { ActionButton } from '../../../components/Form/ActionButton';
import MainContent from '../../../components/MainContent';
import { DataTable } from '../../../components/Table/DataTable';
import { Pagination } from '../../../components/Table/Pagination';
import { TdCustom } from '../../../components/Table/TdCustom';
import { DeleteAlertDialog } from '../../../components/Utils/DeleteAlertDialog';
import { ApiException } from '../../../services/api/ApiException';
import { ITransportadora, TransportadoraService } from '../../../services/api/transportadora/TransportadoraService';
import { getDecrypted } from '../../../utils/crypto';
import { FormModal } from './components/Form/FormModal';
import { SearchBox } from './components/SearchBox';

const headers: { key: string, label: string }[] = [
  { key: 'cod', label: 'Código' },
  { key: 'razao', label: 'Razão Social' },
  { key: 'cnpjcpf', label: 'CNPJ' },
  { key: 'cidade', label: 'Cidade' },
  { key: 'uf', label: 'UF' },
];

export function Transportadora() {
  const methods = useForm<ITransportadora>();

  const [sortBy, setSortBy] = useState<keyof ITransportadora | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [id, setId] = useState<number>(0);
  const [data, setData] = useState<ITransportadora[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('cod');
  const [totalClients, setTotalClients] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState<number>(5);
  const [pages, setPages] = useState<number[]>([]);
  const { onOpen, onClose, isOpen } = useAlertTransportadoraContext();
  const { onOpen: openEditModal } = useModalTransportadora();
  const { idEmissorSelecionado } = useEmissorContext();
  const toast = useToast();
  const navigate = useNavigate();
  const [editCod, setEditCod] = useState<number>(1);
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
  }, [currentPage, limitRegistros, totalClients]);

  useEffect(() => {
    getTransportadora('');
    handleChangeTotalPage();
  }, [currentPage, limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients]);

  const handleSort = (columnName: keyof ITransportadora) => {
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
    TransportadoraService.getLastCod(idEmissorSelecionado, HEADERS)
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

  const getTransportadora = (description: string) => {
    setIsLoading(true);
    TransportadoraService.getTransportadoraByFilter(currentPage, limitRegistros, filter, description, idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalClients(parseInt(result.headers['qtd']));
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 700);
      });
  };

  const handleDeleteTransp = (transportadoraId: number) => {
    TransportadoraService.deleteById(transportadoraId, idEmissorSelecionado, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: 'Transportadora excluída com sucesso.',
            status: 'success',
            duration: 2000,
          });
          getTransportadora('');
        }
      });
    onClose();
    setTotalClients(totalClients - 1);
  };

  const handleOpenDialog = (id2: number) => {
    onOpen();
    setId(id2);
  };

  const handleEditTransportadora = (id: number) => {
    const transportadoraToUpdate = data.find((transportadora) => transportadora.id === id);
    if (transportadoraToUpdate) {
      setId(id);
      openEditModal();
      setEditCod(transportadoraToUpdate.cod);
      methods.reset(transportadoraToUpdate);
      setIsEditing(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox isLoading={isLoading} getCod={getLastCod} getTransportadora={getTransportadora} changeEdit={setIsEditing} stateFilter={setFilter}>
          {
            isLoading ?
              <Center h='40vh'>
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='lg'
                />
              </Center> :
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
                        action={() => handleEditTransportadora(data.id)}
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
          }
          <Pagination visible={!isLoading} currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalClients} changeLimitRegister={setLimitRegistros}>
            <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalClients} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </SearchBox>
        <FormModal getCod={getLastCod} header={HEADERS} cod={cod} editCod={editCod} refreshPage={getTransportadora} id={id} isEditing={isEditing} />
        <DeleteAlertDialog label="transportadora" deleteFunction={handleDeleteTransp} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
