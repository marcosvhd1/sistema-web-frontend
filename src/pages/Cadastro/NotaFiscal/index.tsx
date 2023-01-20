import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, Td, Tr } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';

import MainContent from '../../../components/MainContent';
import { DataTable } from '../../../components/Table/DataTable';
import { Pagination } from '../../../components/Table/Pagination';
import { INotaFiscal } from '../../../services/api/notafiscal/NotaFiscalService';
import { userInfos } from '../../../utils/header';
import { SearchBox } from './components/SearchBox';

export function NotaFiscal() {
  const methods = useForm<INotaFiscal>();
  const [data, setData] = useState<INotaFiscal[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('razao');
  const [totalNotas, setTotalNotas] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const navigate = useNavigate();
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalNotas]);

  useEffect(() => {
    getNotasFiscaisByFilter('');
  }, [currentPage]);

  useEffect(() => {
    getNotasFiscaisByFilter('');
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalNotas, limitRegistros]);

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalNotas / limitRegistros);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
  };

  const getNotasFiscaisByFilter = (description: string) => {null;};

  const handleDeleteNotaFiscal = (clientId: number) => {null;};

  const handleOpenDialog = (id: number) => {null;};

  const handleEditNotaFiscal = (id: number) => {null;};

  const headers: { key: string, label: string }[] = [
    { key: 'modelo', label: 'Modelo' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'data_emissao', label: 'Emissão' },
    { key: 'cod', label: 'Número' },
    { key: 'serie', label: 'Série' },
    { key: 'natureza_operacao', label: 'Natureza de Operação' },
    { key: 'destinatario', label: 'Destinatário' },
    { key: 'status', label: 'Status' },
    { key: 'total_nota', label: 'Valor Total' },
  ];

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox getNotasFiscaisByFilter={getNotasFiscaisByFilter} stateFilter={setFilter}>
          <DataTable headers={headers} >
            {data !== undefined ? data.map((data) => (
              <Tr key={data.id}>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.modelo}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.tipo}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.data_emissao.toString()}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.cod).slice(-4)}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.serie}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.natureza_operacao}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.destinatario.razao}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.status}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.total_nota}</Td>
                <Td style={{ 'textAlign': 'center' }}>
                  <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditNotaFiscal(data.id)}>
                    <Icon color="orange.300" as={FiEdit} />
                  </Button>
                  <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleOpenDialog(data.id)}>
                    <Icon as={FiTrash2} color="red.400" />
                  </Button>
                </Td>
              </Tr>
            )) : ''}
          </DataTable>
          <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalNotas} changeLimitRegister={setLimitRegistros}>
            <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalNotas} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </SearchBox>
      </MainContent>
    </FormProvider>
  );
}
