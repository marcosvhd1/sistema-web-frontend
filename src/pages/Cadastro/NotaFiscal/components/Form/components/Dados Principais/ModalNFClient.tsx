import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Td, Text, Tr, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FieldValues, useForm, useFormContext } from 'react-hook-form';
import { FiCheck, FiChevronLeft, FiChevronRight, FiSearch, FiSlash, FiUserCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { Pagination } from '../../../../../../../components/Table/Pagination';
import { useEmissorContext } from '../../../../../../../Contexts/EmissorProvider';
import { useModalNFClient } from '../../../../../../../Contexts/Modal/NotaFiscal/NFClientContext';
import { ApiException } from '../../../../../../../services/api/ApiException';
import { ClientService, IClient } from '../../../../../../../services/api/clientes/ClientService';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { userInfos } from '../../../../../../../utils/header';

export function ModalNFClient() {
  const methods = useFormContext<INotaFiscal>();
  const { register, handleSubmit, getValues } = useForm();

  const { idEmissorSelecionado } = useEmissorContext();
  const { isOpen, onClose } = useModalNFClient();
  const { colorMode } = useColorMode();

  const [data, setData] = useState<IClient[]>([]);
  const [filter, setFilter] = useState<string>('razao');
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalClients, setTotalClients] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState(5);

  const navigate = useNavigate();
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const headers: { key: string, label: string }[] = [
    { key: 'cod', label: 'Código' },
    { key: 'razao', label: 'Nome / Razão Social' },
    { key: 'fantasia', label: 'Nome Fantasia' },
    { key: 'cnpjcpf', label: 'CPF / CNPJ' },
    { key: 'bairro', label: 'Bairro' },
    { key: 'cidade', label: 'Cidade' },
    { key: 'uf', label: 'UF' },
    { key: 'categoria', label: 'Categoria' },
  ];

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalClients]);

  useEffect(() => {
    getClientsByFilter('');
  }, [currentPage]);

  useEffect(() => {
    getClientsByFilter('');
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients, limitRegistros]);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (isOpen === true && event.key === 'Enter') handleGetClientsByFilter();
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen]);

  const getClientsByFilter = (description: string) => {
    ClientService.getClientsByFilter(currentPage, limitRegistros, filter, description, idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalClients(parseInt(result.headers['qtd']));
        }
      });
  };

  const handleGetClientsByFilter = async () => {
    const description = getValues('description');
    getClientsByFilter(description);
  };

  const handleSetClient = async (data: IClient) => {
    methods.setValue('destinatario', data);

    onClose();
  };

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalClients / limitRegistros);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size={{md: '4xl', lg: '5xl'}}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex w="100%" justify="center" align="center" direction="column">
            <Text>Lista de Clientes / Fornecedores</Text>
            <Flex w="100%" align="center" justify="flex-start"  mt={5}>
              <Text fontSize={16} mr={3}>Buscar por </Text>
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="25%" mr="3" onChange={(e) => setFilter(e.target.value)}>
                <option value='razao'>Nome / Razão Social</option>
                <option value='fantasia'>Nome Fantasia</option>
                <option value='cnpjcpf'>CPF / CNPJ</option>
              </Select>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." w="40%" type="text" mr="3" {...register('description')}/>
              <Button onClick={handleGetClientsByFilter}><Icon as={FiSearch} /></Button>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <DataTable headers={headers} mt="0" width='100%' trailing={false}>
            {data !== undefined ? data.map((data) => (
              <Tr key={data.id} onClick={() => handleSetClient(data)} _hover={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.800' }} style={{'cursor': 'pointer'}}>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.cod).slice(-4)}</Td>
                <Td style={{ 'width': '1rem' }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.razao}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.fantasia}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cnpjcpf}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.bairro}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cidade}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.uf}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.categoria}</Td>
              </Tr>
            )) : ''}
          </DataTable>
          <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalClients} changeLimitRegister={setLimitRegistros}>
            <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalClients} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
