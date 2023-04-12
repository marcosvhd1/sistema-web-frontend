import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Td, Text, Tr, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { FiCheck, FiChevronLeft, FiChevronRight, FiSearch, FiSlash } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { Pagination } from '../../../../../../../components/Table/Pagination';
import { useEmissorContext } from '../../../../../../../Contexts/EmissorProvider';
import { useModalNFSearchService } from '../../../../../../../Contexts/Modal/NotaFiscal/NFServiceSearchContext';
import { ApiException } from '../../../../../../../services/api/ApiException';
import { INFService } from '../../../../../../../services/api/notafiscal/NFService';
import { IServico, ServicoService } from '../../../../../../../services/api/servicos/ServicoService';
import { userInfos } from '../../../../../../../utils/header';

interface ModalNFSearchServiceProps {
  methods: UseFormReturn<INFService, any>
}

interface getServiceProps {
  description: string;
}

export function ModalNFSearchService({ methods }: ModalNFSearchServiceProps) {
  const { idEmissorSelecionado } = useEmissorContext();
  const { isOpen, onClose } = useModalNFSearchService();
  const { register, handleSubmit } = useForm<getServiceProps>();
  const { colorMode } = useColorMode();

  const [data, setData] = useState<IServico[]>([]);
  const [filter, setFilter] = useState<string>('descricao');
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalServicos, setTotalServicos] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState(5);

  const navigate = useNavigate();
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const headers: { key: string, label: string }[] = [
    { key: 'acao', label: 'Ação' },
    { key: 'cod', label: 'Código' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'un', label: 'UN' },
    { key: 'preco', label: 'Preço' },
    { key: 'ncm', label: 'NCM' },
  ];

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalServicos]);

  useEffect(() => {
    getServicesByFilter('');
  }, [currentPage]);

  useEffect(() => {
    getServicesByFilter('');
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalServicos, limitRegistros]);

  const getServicesByFilter = (description: string) => {
    ServicoService.getServiceByFilter(currentPage, limitRegistros, filter, description, idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalServicos(parseInt(result.headers['qtd']));
        }
      });
  };

  const handleGetServicesByFilter = async (data: FieldValues) => {
    const { description } = data;
    getServicesByFilter(description);
  };

  const handleSetService = async (data: IServico) => {
    methods.setValue('servico', data);

    methods.setValue('valor_unitario', methods.getValues('servico.preco'));
    methods.setValue('quantidade', 1);
    methods.setValue('valor_total', methods.getValues('valor_unitario') * methods.getValues('quantidade'));

    onClose();
  };

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalServicos / limitRegistros);
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
      size={{ md: '4xl', lg: '5xl' }}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit((data) => handleGetServicesByFilter(data))}>
        <ModalContent>
          <ModalHeader>
            <Flex w="100%" justify="center" align="center" direction="column">
              <Text fontFamily="Poppins" fontSize="xl">Lista de Serviços</Text>
              <Flex w="100%" align="center" justify="flex-start" mt={5}>
                <Text fontSize={16} mr={3}>Buscar por </Text>
                <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="20%" mr="3" onChange={(e) => setFilter(e.target.value)}>
                  <option value='descricao'>Descrição</option>
                  <option value='nserv'>Código</option>
                  <option value='ncm'>NCM</option>
                </Select>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." w="40%" type="text" mr="3" {...register('description')} />
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
                    <Button variant="ghost" colorScheme="green" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleSetService(data)}>
                      <Icon color="green.300" as={MdAdd} />
                    </Button>
                  </Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.nserv).slice(-4)}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.descricao}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.un}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.preco ? 'R$ ' + (data.preco).toString().replace('.', ',') : ''}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.ncm}</Td>
                </Tr>
              )) : ''}
            </DataTable>
            <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalServicos} changeLimitRegister={setLimitRegistros}>
              <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
              <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalServicos} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
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
