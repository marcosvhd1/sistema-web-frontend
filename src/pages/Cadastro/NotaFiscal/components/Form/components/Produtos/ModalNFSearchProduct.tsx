import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Tag, Text, Tr, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useEmissorContext } from '../../../../../../../Contexts/EmissorProvider';
import { useModalNFSearchProduct } from '../../../../../../../Contexts/Modal/NotaFiscal/NFProductSearchContext';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { Pagination } from '../../../../../../../components/Table/Pagination';
import { TdCustom } from '../../../../../../../components/Table/TdCustom';
import { ApiException } from '../../../../../../../services/api/ApiException';
import { INFProduct } from '../../../../../../../services/api/notafiscal/NFProduct';
import { IProduct, ProductService } from '../../../../../../../services/api/produtos/ProductService';
import formatMoney from '../../../../../../../utils/formatarValor';
import { userInfos } from '../../../../../../../utils/header';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';

interface ModalNFSearchProductProps {
  methods: UseFormReturn<INFProduct, any>
}

interface getProductProps {
  description: string;
  group: string
}

export function ModalNFSearchProduct({ methods }: ModalNFSearchProductProps) {
  const { idEmissorSelecionado } = useEmissorContext();
  const { isOpen, onClose } = useModalNFSearchProduct();
  const { register, getValues } = useForm<getProductProps>();
  const { colorMode } = useColorMode();

  const [data, setData] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<string>('nprod');
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState(5);

  const navigate = useNavigate();
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const headers: { key: string, label: string }[] = [
    { key: 'id', label: 'Código' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'preco', label: 'Preço' },
    { key: 'marca', label: 'Marca' },
    { key: 'un', label: 'UN' },
    { key: 'ncm', label: 'NCM' },
    { key: 'status', label: 'Status' }
  ];

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalProducts]);

  useEffect(() => {
    getProductsByFilter('');
  }, [currentPage]);

  useEffect(() => {
    getProductsByFilter('');
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalProducts, limitRegistros]);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (isOpen === true && event.key === 'Enter') handleGetProductsByFilter();
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen]);


  const getProductsByFilter = (description: string) => {
    ProductService.getProductByFilter(currentPage, limitRegistros, filter, description, '', '',idEmissorSelecionado, 'Ativo', HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
          setTotalProducts(parseInt(result.headers['qtd']));
        }
      });
  };

  const handleGetProductsByFilter = async () => {
    const description = getValues('description');
    getProductsByFilter(description);
  };

  const handleSetProduct = async (data: IProduct) => {
    methods.setValue('produto', data);

    methods.setValue('valor_unitario', methods.getValues('produto.preco'));
    methods.setValue('quantidade', 1);
    methods.setValue('valor_total', methods.getValues('valor_unitario') * methods.getValues('quantidade'));

    if (data.base_icms > 0) {
      const base = (data.preco * data.base_icms) / 100;
      methods.setValue('produto.base_icms', base); 

      if (data.aliquota_icms > 0) {
        const valorICMS = parseFloat(((base * data.aliquota_icms) / 100).toFixed(2));
        methods.setValue('valor_icms', valorICMS);
      }
    }

    onClose();
  };

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalProducts / limitRegistros);
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
            <Text fontFamily="Poppins" fontSize="xl">Lista de Produtos</Text>
          </Flex>
          <Flex w="95%" m="4" align="center" justify="space-between">
            <Flex w="70%" justify="center" align="center" mr='3'>
              <Flex w="100%" justify="flex-start" align="center">
                <FormContainer label='Buscar por' width="35%" mr='3'>
                  <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => setFilter(e.target.value)}>
                    <option value='nprod'>Código</option>
                    <option value='descricao'>Descrição</option>
                    <option value='referencia'>Referência</option>
                    <option value='marca'>Marca</option>
                    <option value='ncm'>NCM</option>
                  </Select>
                </FormContainer>
                <FormContainer label='' width="65%" mt='7'>
                  <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." type="text" {...register('description')} />
                </FormContainer>
              </Flex>
            </Flex>
            <Flex w="30%" justify="flex-start" align="center">
              <Button onClick={handleGetProductsByFilter} w="25%" mt={7} variant="solid" colorScheme="blue">
                <Icon as={FiSearch} />
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <DataTable headers={headers} mt="0" width='100%' trailing={false}>
            {data !== undefined ? data.map((data) => (
              <Tr key={data.id} onClick={() => handleSetProduct(data)} _hover={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.800' }} style={{'cursor': 'pointer'}}>
                <TdCustom style={{ 'width': '1rem' }}>{data.nprod}</TdCustom>
                <TdCustom>{data.descricao}</TdCustom>
                <TdCustom>{data.preco ? 'R$ ' + formatMoney(data.preco) : ''}</TdCustom>
                <TdCustom>{data.marca}</TdCustom>
                <TdCustom>{data.un}</TdCustom>
                <TdCustom>{data.ncm}</TdCustom>
                <TdCustom>
                  <Tag variant='outline' colorScheme={data.status === 'Ativo' ? 'green' : 'red'}>
                    {data.status}
                  </Tag>
                </TdCustom>
              </Tr>
            )) : ''}
          </DataTable>
          <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalProducts} changeLimitRegister={setLimitRegistros}>
            <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalProducts} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
