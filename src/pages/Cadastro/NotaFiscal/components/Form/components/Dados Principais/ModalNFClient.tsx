import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Spinner, Text, Tr, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useEmissorContext } from '../../../../../../../Contexts/EmissorProvider';
import { useModalNFClient } from '../../../../../../../Contexts/Modal/NotaFiscal/NFClientContext';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { Pagination } from '../../../../../../../components/Table/Pagination';
import { TdCustom } from '../../../../../../../components/Table/TdCustom';
import { ApiException } from '../../../../../../../services/api/ApiException';
import { ClientService, IClient } from '../../../../../../../services/api/clientes/ClientService';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { userInfos } from '../../../../../../../utils/header';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';

export function ModalNFClient() {
  const methods = useFormContext<INotaFiscal>();
  const { register, getValues } = useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    handleChangeTotalPage();
  }, [currentPage, limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients]);

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
    setIsLoading(true);
    ClientService.getClientsByFilter(currentPage, limitRegistros, filter, description, 'cod', 'desc', idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalClients(parseInt(result.headers['qtd']));
        }

        setIsLoading(false);
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
      size='5xl'
    >
      <ModalOverlay />
      <ModalContent>
        <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column">
          <Flex w="95%" justify="center" align="center">
            <Text fontFamily="Poppins" fontSize="xl">Lista de Clientes</Text>
          </Flex>
          <Flex w="95%" m="4" align="center" justify="space-between">
            <Flex w="70%" justify="center" align="center" mr='3'>
              <Flex w="100%" justify="flex-start" align="center">
                <FormContainer label='Buscar por' width="35%" mr='3'>
                  <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => setFilter(e.target.value)}>
                    <option value='cod'>Código</option>
                    <option value='razao'>Nome/Razão Social</option>
                    <option value='fantasia'>Nome Fantasia</option>
                    <option value='cnpjcpf'>CPF/CNPJ</option>
                    <option value='cidade'>Cidade</option>
                    <option value='uf'>UF</option>
                    <option value='cep'>CEP</option>
                  </Select>
                </FormContainer>
                <FormContainer label='' width="65%" mt='7'>
                  <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." type="text" {...register('description')} />
                </FormContainer>
              </Flex>
            </Flex>
            <Flex w="30%" justify="flex-start" align="center">
              {
                isLoading ?
                  <Button w="25%" mt={7} variant="solid" colorScheme="blue">
                    <Spinner size='sm' /> 
                  </Button> :
                  <Button onClick={handleGetClientsByFilter} w="25%" mt={7} variant="solid" colorScheme="blue">
                    <Icon as={FiSearch} />
                  </Button>
              }
            </Flex>
          </Flex>
        </Flex>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <DataTable 
            mt="0" 
            width='100%' 
            trailing={false}
            headers={headers} 
          >
            {data !== undefined ? data.map((data) => (
              <Tr key={data.id} onClick={() => handleSetClient(data)} _hover={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.800' }} style={{'cursor': 'pointer'}}>
                <TdCustom>{data.cod}</TdCustom>
                <TdCustom style={{ 'width': '1rem' }}>{data.razao}</TdCustom>
                <TdCustom>{data.fantasia}</TdCustom>
                <TdCustom>{data.cnpjcpf}</TdCustom>
                <TdCustom>{data.bairro}</TdCustom>
                <TdCustom>{data.cidade}</TdCustom>
                <TdCustom>{data.uf}</TdCustom>
                <TdCustom>{data.categoria}</TdCustom>
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
