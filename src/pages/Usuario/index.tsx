import { Button, Icon, Tag, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useEmissorContext } from '../../Contexts/EmissorProvider';
import { useModalUser } from '../../Contexts/Modal/UserContext';
import { ActionButton } from '../../components/Form/ActionButton';
import MainContent from '../../components/MainContent';
import { DataTable } from '../../components/Table/DataTable';
import { Pagination } from '../../components/Table/Pagination';
import { TdCustom } from '../../components/Table/TdCustom';
import { DeleteAlertDialog } from '../../components/Utils/DeleteAlertDialog';
import { ApiException } from '../../services/api/ApiException';
import { IUsuario, UsuarioService } from '../../services/api/usuarios/UsuarioService';
import { userInfos } from '../../utils/header';
import { ModalUsuario } from './components/Modal/ModalUsuario';
import { SearchBox } from './components/SearchBox';

const headers: { key: string, label: string }[] = [
  { key: 'login', label: 'Login' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'status', label: 'Status' },
];

export function Usuarios() {
  const methods = useForm<IUsuario>();
  const [data, setData] = useState<IUsuario[]>([]);
  const [admin, setAdmin] = useState<boolean>(false);
  const [ativo, setAtivo] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { onOpen: openModal } = useModalUser();
  const { isOpen: isExcluirOpen, onOpen, onClose: onExcluirClose } = useDisclosure();
  const { setIdEmissor, setIdUsuarioSelecionado, getIdEmissoresByUser} = useEmissorContext();
  /// pagination and search by filter
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('email');
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState<number>(5);
  const [pages, setPages] = useState<number[]>([]);
  ///////////////////////////////////
  const [id, setId] = useState<number>(0);
  const userInfo = userInfos();
  const navigate = useNavigate();
  const toast = useToast();

  const HEADERS = userInfo.header;
  const empresa = userInfo.infos?.empresa;

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalUsers]);

  useEffect(() => {
    getUsuarios('');
  }, [currentPage]);

  useEffect(() => {
    getUsuarios('');
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalUsers, limitRegistros]);

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalUsers / limitRegistros);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
  };
  
  const handleOpenDialog = (id: number) => {
    onOpen();
    setId(id);
  };

  const getUsuarios = async (description: string) => {
    UsuarioService.getAllUsers(empresa, filter, description, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalUsers(parseInt(result.headers['qtd']));
        }
      });
  };

  const handleEditUser = async (id: number) => {
    const userToUpdate = data.find((user) => user.id === id);
    if (userToUpdate) {
      setId(id);
      openModal();
      methods.reset(userToUpdate);
      setIsEditing(true);
      setAdmin(userToUpdate.tipo_admin === 1 ? true : false);
      setAtivo(userToUpdate.status === 'Ativo' ? true : false);
      setIdUsuarioSelecionado(id);
      getIdEmissoresByUser();
    }
  };

  const handleDeleteUser = async (userId: number) => {
    UsuarioService.deleteById(userId, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: 'Usuário excluido com sucesso.',
            status: 'success',
            duration: 2000,
          });
          getUsuarios('');
          onExcluirClose();
        }
      });
  };

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox changeEdit={setIsEditing} setFilter={setFilter} getUsuarios={getUsuarios}>
          <DataTable headers={headers}>
            {data != undefined ? data.map((data) => (
              <Tr key={data.id}>
                <TdCustom>{data.email}</TdCustom>
                <TdCustom>
                  <Tag variant='outline' colorScheme={data.tipo_admin === 1 ? 'blue' : 'red'}>
                    {data.tipo_admin === 1 ? 'Admin' : 'Normal'}
                  </Tag>
                </TdCustom>
                <TdCustom>
                  <Tag variant='outline' colorScheme={data.status === 'Ativo' ? 'green' : 'red'}>
                    {data.status}
                  </Tag>
                </TdCustom>
                <TdCustom style={{ 'textAlign': 'center' }}>
                  <ActionButton 
                    label='Editar'
                    colorScheme='orange'
                    action={() => handleEditUser(data.id!)}
                    icon={FiEdit}
                  />
                  <ActionButton 
                    label='Excluir'
                    colorScheme='red'
                    action={() => handleOpenDialog(data.id!)}
                    disabled={data.usuario_principal === 'Sim'}
                    icon={FiTrash2}
                  />
                </TdCustom>
              </Tr>
            )) : ''}
          </DataTable>
          <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalUsers} changeLimitRegister={setLimitRegistros}>
            <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalUsers} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </SearchBox>
      </MainContent>
      <ModalUsuario id={id} isEditing={isEditing} setIsEditing={setIsEditing} admin={admin} setAdmin={setAdmin} ativo={ativo} setAtivo={setAtivo} getUsuarios={getUsuarios} />
      <DeleteAlertDialog id={id} label='Usuário' isOpen={isExcluirOpen} onClose={onExcluirClose} deleteFunction={handleDeleteUser}/>
    </FormProvider>
  );
}
