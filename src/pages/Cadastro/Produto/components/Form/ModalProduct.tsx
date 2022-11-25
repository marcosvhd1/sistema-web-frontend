import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode, useToast } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { useModalProduct } from '../../../../../Contexts/Modal/ProductContext';
import { ApiException } from '../../../../../services/api/ApiException';
import { IProduct, ProductService } from '../../../../../services/api/produtos/ProductService';
import { DadosFiscais } from './DadosFiscais';
import { DadosPrincipais } from './DadosPrincipais';

interface ModalProps {
  refreshPage: (description: string) => void
  getCod: () => void
  cod: number
  isEditing: boolean
  id: number
  editCod: number
  header: any
}


export function FormModal({ isEditing, id, refreshPage, editCod, cod, header, getCod }: ModalProps) {
  const { isOpen, onClose } = useModalProduct();
  const methods = useFormContext<IProduct>();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { idEmissorSelecionado } = useEmissorContext();

  const clearForm = () => {
    onClose();
    methods.reset({
      descricao: '',
      referencia: '',
      codbarras: '',
      marca: '',
      grupo: '',
      preco: parseFloat(''),
      preco_trib: parseFloat(''),
      un: '',
      un_trib: '',
      status: '',
      anotacoes: '',
      cst_icms: parseFloat(''),
      aliquota_icms: parseFloat(''),
      base_icms: parseFloat(''),
      cst_ipi: parseFloat(''),
      aliquota_ipi: parseFloat(''),
      cst_cofins: parseFloat(''),
      aliquota_cofins: parseFloat(''),
      cst_pis: parseFloat(''),
      aliquota_pis: parseFloat(''),
      info_adicional: '',
      ncm: '',
      cest: '',
      cnpj_produtor: '',
      producao_propria: '',
      cfop: '',
      origem: '',
      peso_bruto: parseFloat(''),
      peso_liquido: parseFloat(''),
    });
  };

  const handleCreateNewProduct = (data: IProduct) => {
    data.id_emissor = idEmissorSelecionado;
    if (data.descricao.trim().length === 0) {
      toast({
        position: 'top',
        title: 'Erro ao cadastrar.',
        description: 'Descrição inválida',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      ProductService.create(data, header)
        .then((result) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            clearForm();
            refreshPage('');
          }
        });
    }
  };

  const handleUpdateProduct = (data: IProduct) => {
    ProductService.updateById(id, data, idEmissorSelecionado, header)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          clearForm();
          refreshPage('');
        }
      });
  };

  const submitData = (data: IProduct) => {
    if (isEditing)
      handleUpdateProduct(data);
    else
      handleCreateNewProduct(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size="5xl"
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>Cadastro de Produtos</ModalHeader>
          <ModalCloseButton onClick={() => clearForm()} />
          <ModalBody>
            <Tabs variant='enclosed' colorScheme="gray" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}>
              <TabList>
                <Tab>1. Dados Principais</Tab>
                <Tab>2. Outros Dados / Fiscais</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <DadosPrincipais getCod={getCod} cod={cod} editCod={editCod} isEditing={isEditing} />
                </TabPanel>
                <TabPanel>
                  <DadosFiscais />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Flex w="100%" justify="space-between" >
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} />{isEditing ? 'Editar' : 'Cadastrar'}</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={onClose}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>

  );
}
