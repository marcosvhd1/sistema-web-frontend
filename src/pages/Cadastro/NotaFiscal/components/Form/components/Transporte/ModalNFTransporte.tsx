import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Tr, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { FiCheck, FiChevronLeft, FiChevronRight, FiSearch, FiSlash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useEmissorContext } from '../../../../../../../Contexts/EmissorProvider';
import { useModalNFTransporte } from '../../../../../../../Contexts/Modal/NotaFiscal/NFTransporteContext';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { Pagination } from '../../../../../../../components/Table/Pagination';
import { TdCustom } from '../../../../../../../components/Table/TdCustom';
import { ApiException } from '../../../../../../../services/api/ApiException';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { ITransportadora, TransportadoraService } from '../../../../../../../services/api/transportadora/TransportadoraService';
import { userInfos } from '../../../../../../../utils/header';

export function ModalNFTransporte() {
  const methods = useFormContext<INotaFiscal>();
  const { register, handleSubmit, getValues } = useForm();

  const { idEmissorSelecionado } = useEmissorContext();
  const { isOpen, onClose } = useModalNFTransporte();
  const { colorMode } = useColorMode();

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

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (isOpen === true && event.key === 'Enter') handleGetTranspByFilter();
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen]);


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

  const handleGetTranspByFilter = async () => {
    const description= getValues('description');
    getTranspByFilter(description);
  };

  const handleSetTransp = async (data: ITransportadora) => {
    methods.setValue('id_transportadora', `${data.id}`);
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
      <ModalContent>
        <ModalHeader>
          <Flex w="100%" justify="center" align="center" direction="column">
            <Text>Listagem de Transportadoras</Text>
            <Flex w="100%" align="center" justify="flex-start"  mt={5}>
              <Text fontSize={16} mr={3}>Buscar por </Text>
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="25%" mr="3" onChange={(e) => setFilter(e.target.value)}>
                <option value='razao'>Razão Social</option>
                <option value='cnpjcpf'>CPF / CNPJ</option>
              </Select>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." w="40%" type="text" mr="3" {...register('description')}/>
              <Button onClick={handleGetTranspByFilter}><Icon as={FiSearch} /></Button>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <DataTable headers={headers} mt="0" width='100%' trailing={false}>
            {data !== undefined ? data.map((data) => (
              <Tr key={data.id} onClick={() => handleSetTransp(data)} _hover={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.800' }} style={{'cursor': 'pointer'}}>
                <TdCustom>{data.cod}</TdCustom>
                <TdCustom style={{ 'width': '1rem' }}>{data.razao}</TdCustom>
                <TdCustom>{data.cnpjcpf}</TdCustom>
                <TdCustom>{data.bairro}</TdCustom>
                <TdCustom>{data.cidade}</TdCustom>
                <TdCustom>{data.uf}</TdCustom>
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
    </Modal>
  );
}
