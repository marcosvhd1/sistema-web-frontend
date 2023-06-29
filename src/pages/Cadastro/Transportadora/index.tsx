import { Button, Icon, Tooltip, Tr, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAlertTransportadoraContext } from '../../../Contexts/AlertDialog/AlertTransportadoraContext';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { useModalTransportadora } from '../../../Contexts/Modal/TransportadoraContext';
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
  const [data, setData] = useState<ITransportadora[]>([]);
  const [id, setId] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCod, setEditCod] = useState<number>(1);
  const { onOpen, onClose, isOpen } = useAlertTransportadoraContext();
  const { onOpen: openEditModal } = useModalTransportadora();
  /// pagination and search by filter
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('cod');
  const [totalClients, setTotalClients] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState<number>(5);
  const [pages, setPages] = useState<number[]>([]);
  ///////////////////////////////////
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
  }, [currentPage, limitRegistros, totalClients]);

  useEffect(() => {
    getTransportadora('');
  }, [currentPage]);

  useEffect(() => {
    getTransportadora('');
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients, limitRegistros]);

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
    TransportadoraService.getTransportadoraByFilter(currentPage, limitRegistros, filter, description, idEmissorSelecionado, HEADERS)
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
            isClosable: true,
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
        <SearchBox getCod={getLastCod} getTransportadora={getTransportadora} changeEdit={setIsEditing} stateFilter={setFilter}>
          <DataTable headers={headers}>
            {data !== undefined ? data.map((data) => (
              <Tr onDoubleClick={() => handleEditTransportadora(data.id)} key={data.id}>
                <TdCustom style={{ width: '5%' }}>{data.cod}</TdCustom>
                <TdCustom>{data.razao}</TdCustom>
                <TdCustom>{data.cnpjcpf}</TdCustom>
                <TdCustom>{data.cidade}</TdCustom>
                <TdCustom>{data.uf}</TdCustom>
                <TdCustom style={{ 'textAlign': 'center' }}>
                  <Tooltip label='Editar' placement='auto-start' hasArrow bg="orange.300">
                    <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditTransportadora(data.id)}>
                      <Icon color="orange.300" as={FiEdit} />
                    </Button>
                  </Tooltip>
                  <Tooltip label='Excluir' placement='auto-start' hasArrow bg="red.400">
                    <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleOpenDialog(data.id)}>
                      <Icon as={FiTrash2} color="red.400" />
                    </Button>
                  </Tooltip>
                </TdCustom>
              </Tr>
            )) : ''}
          </DataTable>
          <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalClients} changeLimitRegister={setLimitRegistros}>
            <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalClients} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </SearchBox>
        <FormModal getCod={getLastCod} header={HEADERS} cod={cod} editCod={editCod} refreshPage={getTransportadora} id={id} isEditing={isEditing} />
        <DeleteAlertDialog label="Transportadora" deleteFunction={handleDeleteTransp} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
