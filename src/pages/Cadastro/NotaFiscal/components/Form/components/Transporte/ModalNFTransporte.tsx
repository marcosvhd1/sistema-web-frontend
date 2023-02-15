import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Td, Text, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FieldValues, useForm, useFormContext } from 'react-hook-form';
import { FiCheck, FiChevronLeft, FiChevronRight, FiSearch, FiSlash, FiUserCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { Pagination } from '../../../../../../../components/Table/Pagination';
import { useEmissorContext } from '../../../../../../../Contexts/EmissorProvider';
import { useModalNFClient } from '../../../../../../../Contexts/Modal/NotaFiscal/NFClientContext';
import { useModalNFTransporte } from '../../../../../../../Contexts/Modal/NotaFiscal/NFTransporteContext';
import { ApiException } from '../../../../../../../services/api/ApiException';
import { ClientService, IClient } from '../../../../../../../services/api/clientes/ClientService';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { ITransportadora, TransportadoraService } from '../../../../../../../services/api/transportadora/TransportadoraService';
import { userInfos } from '../../../../../../../utils/header';

export function ModalNFTransporte() {
  const methods = useFormContext<INotaFiscal>();
  const { register, handleSubmit } = useForm();

  const { idEmissorSelecionado } = useEmissorContext();
  const { isOpen, onClose } = useModalNFTransporte();

  const [data, setData] = useState<ITransportadora[]>([]);
  const [filter, setFilter] = useState<string>('razao');
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalTransp, setTotalTransp] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState(5);

  const navigate = useNavigate();
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const headers: { key: string, label: string }[] = [
    { key: 'action', label: 'Ação' },
    { key: 'cod', label: 'Código' },
    { key: 'razao', label: 'Nome / Razão Social' },
    { key: 'cnpjcpf', label: 'CPF / CNPJ' },
    { key: 'bairro', label: 'Bairro' },
    { key: 'cidade', label: 'Cidade' },
    { key: 'uf', label: 'UF' },
  ];

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalTransp]);

  useEffect(() => {
    getTranspByFilter('');
  }, [currentPage]);

  useEffect(() => {
    getTranspByFilter('');
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalTransp, limitRegistros]);

  const getTranspByFilter = (description: string) => {
    TransportadoraService.getTransportadoraByFilter(currentPage, limitRegistros, filter, description, idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalTransp(parseInt(result.headers['qtd']));
        }
      });
  };

  const handleGetTranspByFilter = async (data: FieldValues) => {
    const { description } = data;
    getTranspByFilter(description);
  };

  const handleSetTransp = async (data: ITransportadora) => {
    methods.setValue('transportadora', data);
    onClose();
  };

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalTransp / limitRegistros);
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
      <form onSubmit={handleSubmit((data) => handleGetTranspByFilter(data))}>
        <ModalContent>
          <ModalHeader>
            <Flex w="100%" justify="center" align="center" direction="column">
              <Text fontFamily="Poppins" fontSize="xl">Lista de Transportadoras</Text>
              <Flex w="100%" align="center" justify="flex-start"  mt={5}>
                <Text fontSize={16} mr={3}>Buscar por </Text>
                <Select w="25%" mr="3" onChange={(e) => setFilter(e.target.value)}>
                  <option value='razao'>Razão Social</option>
                  <option value='cnpjcpf'>CPF / CNPJ</option>
                </Select>
                <Input placeholder="Localizar..." w="40%" type="text" mr="3" {...register('description')}/>
                <Button type="submit"><Icon as={FiSearch} /></Button>
              </Flex>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DataTable headers={headers} mt="0" width='100%' trailing={false}>
              {data !== undefined ? data.map((data) => (
                <Tr key={data.id}>
                  <Td style={{ 'textAlign': 'center' }}>
                    <Button variant="ghost" colorScheme="green" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleSetTransp(data)}>
                      <Icon color="green.300" as={FiUserCheck} />
                    </Button>
                  </Td>
                  <Td style={{ 'width': '1rem' }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.cod).slice(-4)}</Td>
                  <Td style={{ 'width': '1rem' }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.razao}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cnpjcpf}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.bairro}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cidade}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.uf}</Td>
                </Tr>
              )) : ''}
            </DataTable>
            <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalTransp} changeLimitRegister={setLimitRegistros}>
              <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
              <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalTransp} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
            </Pagination>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between" >
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} />{'Salvar'}</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={onClose} ><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
