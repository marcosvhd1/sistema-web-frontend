import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, Td, Tr, useToast } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';

import { SearchBox } from './components/SearchBox';
import { INotaFiscal } from '../../../services/api/notafiscal/NotaFiscalService';
import { useAlertNotaFiscalContext } from '../../../Contexts/AlertDialog/AlertNotaFiscalContext';
import { useModalNotaFiscal } from '../../../Contexts/Modal/NotaFiscalContext';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { userInfos } from '../../../utils/header';
import MainContent from '../../../components/MainContent';
import { DataTable } from '../../../components/Table/DataTable';
import { Pagination } from '../../../components/Table/Pagination';
import { DeleteAlertDialog } from '../../../components/Utils/DeleteAlertDialog';


export function NotaFiscal() {
  const methods = useForm<INotaFiscal>();
  const [data, setData] = useState<INotaFiscal[]>([]);
  const [id, setId] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editCod, setEditCod] = useState<number>(1);
  const { onOpen, onClose, isOpen } = useAlertNotaFiscalContext();
  const { onOpen: open } = useModalNotaFiscal();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('razao');
  const [totalNotas, setTotalNotas] = useState<number>(0);
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
  }, [currentPage, limitRegistros, totalNotas]);

  useEffect(() => {
    //getClientsByFilter('');
  }, [currentPage]);

  useEffect(() => {
    //getClientsByFilter('');
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalNotas, limitRegistros]);

  const getLastCod = () => {
    // NotaFiscalService.getLastCod(idEmissorSelecionado, HEADERS)
    //   .then((result) => {
    //     if (isEditing) {
    //       setCod(editCod);
    //     } else {
    //       if (result === null) {
    //         setCod(1);
    //       } else {
    //         setCod(parseInt(result) + 1);
    //       }
    //     }
    //   });
  };


  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalNotas / limitRegistros);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
  };

  const getNotasFiscaisByFilter = (description: string) => {
    // ClientService.getClientsByFilter(currentPage, limitRegistros, filter, description, idEmissorSelecionado, HEADERS)
    //   .then((result: any) => {
    //     if (result instanceof ApiException) {
    //       console.log(result.message);
    //     } else {
    //       setData(result.data);
    //       setTotalClients(parseInt(result.headers['qtd']));
    //     }
    //   });
  };

  const handleDeleteNotaFiscal = (clientId: number) => {
    // ClientService.deleteById(clientId, idEmissorSelecionado, HEADERS)
    //   .then((result) => {
    //     if (result instanceof ApiException) {
    //       alert(result.message);
    //     } else {
    //       toast({
    //         position: 'top',
    //         title: 'Operação concluída.',
    //         description: 'Cliente excluido com sucesso.',
    //         status: 'success',
    //         duration: 2000,
    //         isClosable: true,
    //       });
    //       getClientsByFilter('');
    //     }
    //   });
    // onClose();
    // setTotalClients(totalClients - 1);
  };

  const handleOpenDialog = (id: number) => {
    // onOpen();
    // setId(id);
  };

  const handleEditNotaFiscal = (id: number) => {
    // const clientToUpdate = data.find((client) => client.id === id);
    // if (clientToUpdate) {
    //   setId(id);
    //   setEditCod(clientToUpdate?.cod);
    //   methods.reset(clientToUpdate);
    //   open();
    //   setIsEditing(true);
    // }
  };

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
        <DeleteAlertDialog label="Nota Fiscal" deleteFunction={handleDeleteNotaFiscal} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
