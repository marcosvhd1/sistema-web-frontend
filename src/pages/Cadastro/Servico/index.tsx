import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ServicoService } from '../../../services/api/servicos/ServicoService';

import { Button, Icon, Td, Tr, useToast } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import MainContent from '../../../components/MainContent';
import { DataTable } from '../../../components/Table/DataTable';
import { Pagination } from '../../../components/Table/Pagination';
import { DeleteAlertDialog } from '../../../components/Utils/DeleteAlertDialog';
import { useAlertServiceContext } from '../../../Contexts/AlertDialog/AlertServiceContext';
import { useModalService } from '../../../Contexts/Modal/ServiceContext';
import { ApiException } from '../../../services/api/ApiException';
import { IServico } from '../../../services/api/servicos/ServicoService';
import { FormModal } from './components/Form/FormModal';
import { SearchBox } from './components/SearchBox';

const headers: { key: string, label: string }[] = [
  { key: 'cod', label: 'Código' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'un', label: 'UN' },
  { key: 'preco', label: 'Preço' },
  { key: 'ncm', label: 'NCM' },
];

export function Servico() {
  const methods = useForm<IServico>();
  const [data, setData] = useState<IServico[]>([]);
  const [id, setId] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCod, setEditCod] = useState<number>(1);
  const { onOpen, onClose, isOpen } = useAlertServiceContext();
  const { onOpen: openEditModal } = useModalService();
  /// pagination and search by filter
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('descricao');
  const [description, setDescription] = useState<string>('');
  const [totalClients, setTotalClients] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState<number>(5);
  const [pages, setPages] = useState<number[]>([]);
  ///////////////////////////////////
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getService();
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, description, limitRegistros, totalClients]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients]);


  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalClients / limitRegistros);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
  };

  const getService = () => {
    ServicoService.getServiceByFilter(currentPage, limitRegistros, filter, description)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalClients(parseInt(result.headers['qtd']));
        }
      });
  };

  const handleDeleteService = (clientId: number) => {
    ServicoService.deleteById(clientId)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: 'Serviço excluído com sucesso.',
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

  const handleEditService = (id: number) => {
    const serviceToUpdate = data.find((service) => service.id === id);
    if (serviceToUpdate) {
      setId(id);
      openEditModal();
      setEditCod(serviceToUpdate.nserv);
      methods.reset(serviceToUpdate);
      setIsEditing(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox stateDescription={setDescription} changeEdit={setIsEditing} stateFilter={setFilter}>
          <DataTable headers={headers}>
            {data !== undefined ? data.map((data) => (
              <Tr key={data.id}>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.nserv).slice(-4)}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.descricao}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.un}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.preco ? 'R$ ' + (data.preco).toString().replace('.', ',') : ''}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.ncm}</Td>
                <Td style={{ 'textAlign': 'center' }}>
                  <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditService(data.id)}>
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
            <Button isDisabled={currentPage === pages.length || data.length === 0} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </SearchBox>
        <FormModal editCod={editCod} refreshPage={getService} id={id} isEditing={isEditing} />
        <DeleteAlertDialog label="Serviço" deleteFunction={handleDeleteService} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
