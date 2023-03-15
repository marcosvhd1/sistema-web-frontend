import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import { Button, Icon, Td, Tr, useToast } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from 'react-icons/fi';

import MainContent from '../../../components/MainContent';
import { DataTable } from '../../../components/Table/DataTable';
import { Pagination } from '../../../components/Table/Pagination';
import { INotaFiscal } from '../../../services/api/notafiscal/NotaFiscalService';
import { userInfos } from '../../../utils/header';
import { SearchBox } from './components/SearchBox';
import { NotaFiscalService } from '../../../services/api/notafiscal/NotaFiscalService';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { ApiException } from '../../../services/api/ApiException';
import { useModalNotaFiscal } from '../../../Contexts/Modal/NotaFiscal/NotaFiscalContext';
import { ModalNotaFiscal } from './components/Form/FormIndex';
import { ClientService } from '../../../services/api/clientes/ClientService';
import { IClient } from '../../../services/api/clientes/ClientService';
import { TransportadoraService } from '../../../services/api/transportadora/TransportadoraService';
import { NFPagtoService } from '../../../services/api/notafiscal/NFFormaPagto';

export function NotaFiscal() {
  const methods = useForm<INotaFiscal>();

  const [data, setData] = useState<INotaFiscal[]>([]);
  const [filter, setFilter] = useState<string>('nome_destinatario');
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNotas, setTotalNotas] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  
  const { idEmissorSelecionado } = useEmissorContext();
  const { onOpen } = useModalNotaFiscal();
  
  const navigate = useNavigate();
  const toast = useToast();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalNotas]);

  useEffect(() => {
    getNF('');
  }, [currentPage]);

  useEffect(() => {
    getNF('');
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

  const getNF = (description: string) => {
    NotaFiscalService.getNFByFilter(currentPage, limitRegistros, filter, description, idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalNotas(parseInt(result.headers['qtd']));
        }
      });
  };

  const handleEditNF = async (idNf: number) => {
    const nfToUpdate = data.find((prod) => prod.id === idNf);

    if (nfToUpdate) {
      methods.reset(nfToUpdate);

      await ClientService.getClientsByFilter(currentPage, limitRegistros, 'id', nfToUpdate.id_destinatario, idEmissorSelecionado, HEADERS)
        .then((result: any) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            methods.setValue('destinatario', (result.data[0]));
          }
        });

      await TransportadoraService.getTransportadoraByFilter(currentPage, limitRegistros, 'id', nfToUpdate.id_transportadora, idEmissorSelecionado, HEADERS)
        .then((result: any) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            methods.setValue('transportadora', (result.data[0]));
          }
        });

      await NFPagtoService.getNFPagtoByNF(idNf, HEADERS)
        .then((result: any) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            methods.setValue('forma_pagto', result.data);
          }
        });

      onOpen();
      setIsEditing(true);
      setId(idNf);
    }
  };

  const handleDeleteNF = (nfId: number) => {
    NotaFiscalService.deleteById(nfId, idEmissorSelecionado, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: 'Nota excluída com sucesso.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          getNF('');
          setTotalNotas(totalNotas - 1);
        }
      });
  };

  const headers: { key: string, label: string }[] = [
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
        <SearchBox getNotasFiscaisByFilter={getNF} stateFilter={setFilter}>
          <DataTable headers={headers}>
            {data !== undefined ? data.map((data) => (
              <Tr key={data.id}>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.data_emissao.toString()}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.cod).slice(-4)}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.serie}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.natureza_operacao}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.nome_destinatario}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.status}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.total_nota}</Td>
                <Td style={{ 'textAlign': 'center' }}>
                  <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditNF(data.id)}>
                    <Icon color="orange.300" as={FiEdit} />
                  </Button>
                  <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleDeleteNF(data.id)}>
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
        <ModalNotaFiscal isEditing={isEditing} setIsEditing={setIsEditing} id={id} getNF={getNF}/>
      </MainContent>
    </FormProvider>
  );
}
