import { Button, Icon, Tag, Tr, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAlertEmissorContext } from '../../Contexts/AlertDialog/AlertEmissorContext';
import { useModalNewEmissor } from '../../Contexts/Modal/NewEmissorContext';
import { ActionButton } from '../../components/Form/ActionButton';
import MainContent from '../../components/MainContent';
import { DataTable } from '../../components/Table/DataTable';
import { Pagination } from '../../components/Table/Pagination';
import { TdCustom } from '../../components/Table/TdCustom';
import { DeleteAlertDialog } from '../../components/Utils/DeleteAlertDialog';
import { ApiException } from '../../services/api/ApiException';
import { EmissorService, IEmissor } from '../../services/api/emissor/EmissorService';
import { EmpresaService } from '../../services/api/empresas/EmpresaService';
import { userInfos } from '../../utils/header';
import { ModalNewEmissor } from './components/ModalNewEmissor';
import { SearchBox } from './components/SearchBox';

const headers: { key: string, label: string }[] = [
  { key: 'razao', label: 'Razão Social' },
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
                <TdCustom>{data.razao}</TdCustom>
                <TdCustom>{data.cnpjcpf}</TdCustom>
                <TdCustom>
                  <Tag variant='outline' colorScheme={data.status === 'Ativo' ? 'green' : 'red'}>
                    {data.status}
                  </Tag>
                </TdCustom>
                <TdCustom style={{ 'textAlign': 'center' }}>
                  <ActionButton 
                    label='Editar'
                    colorScheme='orange'
                    action={() => handleEditEmissor(data.id)}
                    icon={FiEdit}
                  />
                  <ActionButton 
                    label='Excluir'
                    colorScheme='red'
                    action={() => handleOpenDialog(data.id)}
                    icon={FiTrash2}
                    disabled={totalClients <= 1}
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
        <ModalNewEmissor seeActive={seeActive} active={active} setActive={setActive} refreshPage={getEmissores} isEditing={isEditing} setIsEditing={setIsEditing} id={id}/>
        <DeleteAlertDialog label="Emissor" deleteFunction={handleDeleteEmissor} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
