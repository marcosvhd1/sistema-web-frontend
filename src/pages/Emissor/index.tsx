import { useEffect, useState } from 'react';
import { Button, Checkbox, Flex, Icon, Tag, Td, Text, Tr, useToast } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';
import MainContent from '../../components/MainContent';
import { DataTable } from '../../components/Table/DataTable';
import { ModalNewEmissorProvider, useModalNewEmissor } from '../../Contexts/Modal/NewEmissorContext';
import { ModalNewEmissor } from './components/ModalNewEmissor';
import { SearchBox } from './components/SearchBox';
import { EmissorService, IEmissor } from '../../services/api/emissor/EmissorService';
import { userInfos } from '../../utils/header';
import { EmpresaService } from '../../services/api/empresas/EmpresaService';
import { ApiException } from '../../services/api/ApiException';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../components/Table/Pagination';
import { useModalEmissor } from '../../Contexts/Modal/EmissorContext';
import { useAlertEmissorContext } from '../../Contexts/AlertDialog/AlertEmissorContext';
import { DeleteAlertDialog } from '../../components/Utils/DeleteAlertDialog';

const headers: { key: string, label: string }[] = [
  { key: 'emissor', label: 'Emissor' },
  { key: 'cnpj', label: 'CNPJ' },
  { key: 'status', label: 'Status' },
];

export function Emissor() {
  const [data, setData] = useState<IEmissor[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { onOpen: openEditModal  } = useModalNewEmissor();
  const { onOpen, onClose, isOpen } = useAlertEmissorContext();
  /// pagination and search by filter
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('razao');
  const [totalClients, setTotalClients] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState<number>(5);
  const [pages, setPages] = useState<number[]>([]);
  ///////////////////////////////////
  const [active, setActive] = useState<boolean>(true);
  const [seeActive, setSeeActive] = useState<string>('Ativo');
  const [id, setId] = useState<number>(0);
  const userInfo = userInfos();
  const methods = useForm<IEmissor>();
  const navigate = useNavigate();
  const toast = useToast();

  const HEADERS = userInfo.header;
  const empresa = userInfo.infos?.empresa;

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalClients]);

  useEffect(() => {
    getEmissores('', seeActive);
  }, [currentPage]);

  useEffect(() => {
    getEmissores('', seeActive);
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients, limitRegistros]);

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalClients / limitRegistros);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
  };

  const getEmissores = (description: string, status: string) => {
    EmpresaService.getId(empresa, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          const idEmpresa = result.data[0].id;
          EmissorService.getAll(currentPage, limitRegistros, filter, description, idEmpresa, status, HEADERS)
            .then((result: any) => {
              if (result instanceof ApiException) {
                console.log(result.message);
              } else {
                setData(result.data);
                setTotalClients(parseInt(result.headers['qtd']));
              }
            });
        }
      });
  };

  const handleEditEmissor = async (id: number) => {
    const emissorToUpdate = data.find((emissor) => emissor.id === id);
    if (emissorToUpdate) {
      setId(id);
      openEditModal();
      methods.reset(emissorToUpdate);
      setIsEditing(true);
      setActive(emissorToUpdate.status === 'Ativo' ? true : false);
    }
  };
  
  const handleDeleteEmissor = async (emissorId: number) => {
    const FK_ERROR = '23503';
    const response = await EmissorService.deleteById(emissorId, HEADERS);

    if (response.data.code === FK_ERROR) {
      toast({
        position: 'top',
        title: 'Operação não permitida.',
        description: 'Existem registros vinculados a esse emissor.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        position: 'top',
        title: 'Operação concluída.',
        description: 'Emissor excluído com sucesso.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      getEmissores('', seeActive);
      setTotalClients(totalClients - 1);
    }
    onClose();
  };

  const handleOpenDialog = (id: number) => {
    onOpen();
    setId(id);
  };

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox changeEdit={setIsEditing} setFilter={setFilter} seeActive={seeActive} setSeeActive={setSeeActive} getEmissores={getEmissores}>
          <DataTable headers={headers} >
            {data != undefined ? data.map((data) => (
              <Tr key={data.id}>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.razao}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cnpjcpf}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                  <Tag variant='outline' colorScheme={data.status === 'Ativo' ? 'green' : 'red'}>
                    {data.status}
                  </Tag>
                </Td>
                <Td style={{ 'textAlign': 'center' }}>
                  <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditEmissor(data.id)}>
                    <Icon color="orange.300" as={FiEdit} />
                  </Button>
                  <Button variant="ghost" isDisabled={totalClients <= 1} colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleOpenDialog(data.id)}>
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
        <ModalNewEmissor seeActive={seeActive} active={active} setActive={setActive} refreshPage={getEmissores} isEditing={isEditing} setIsEditing={setIsEditing} id={id}/>
        <DeleteAlertDialog label="Emissor" deleteFunction={handleDeleteEmissor} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
