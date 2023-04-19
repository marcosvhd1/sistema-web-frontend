import { Button, Icon, Tag, Td, Tr, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import MainContent from '../../components/MainContent';
import { DataTable } from '../../components/Table/DataTable';
import { Pagination } from '../../components/Table/Pagination';
import { IUsuario, UsuarioService } from '../../services/api/usuarios/UsuarioService';
import { userInfos } from '../../utils/header';
import { SearchBox } from './components/SearchBox';
import { ApiException } from '../../services/api/ApiException';
import { ModalUsuario } from './components/Modal/ModalUsuario';

const headers: { key: string, label: string }[] = [
  { key: 'emissor', label: 'Email' },
  { key: 'admin', label: 'Tipo' },
  { key: 'status', label: 'Status' },
];

export function Usuarios() {
  const methods = useForm<IUsuario>();
  const [data, setData] = useState<IUsuario[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  /// pagination and search by filter
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('email');
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState<number>(5);
  const [pages, setPages] = useState<number[]>([]);
  ///////////////////////////////////
  const [active, setActive] = useState<boolean>(true);
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

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox changeEdit={setIsEditing} setFilter={setFilter} getUsuarios={getUsuarios}>
          <DataTable headers={headers}>
            {data != undefined ? data.map((data) => (
              <Tr key={data.id}>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.email}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                  <Tag variant='outline' colorScheme={data.tipo_admin === 1 ? 'blue' : 'red'}>
                    {data.tipo_admin === 1 ? 'Admin' : 'Comum'}
                  </Tag>
                </Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                  <Tag variant='outline' colorScheme={data.status === 'Ativo' ? 'green' : 'red'}>
                    {data.status}
                  </Tag>
                </Td>
                <Td style={{ 'textAlign': 'center' }}>
                  <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => null}>
                    <Icon color="orange.300" as={FiEdit} />
                  </Button>
                  <Button variant="ghost" isDisabled={data.usuario_principal === 'Sim'} colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => null}>
                    <Icon as={FiTrash2} color="red.400" />
                  </Button>
                </Td>
              </Tr>
            )) : ''}
          </DataTable>
          <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalUsers} changeLimitRegister={setLimitRegistros}>
            <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalUsers} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </SearchBox>
      </MainContent>
      <ModalUsuario isEditing={isEditing} />
    </FormProvider>
  );
}
