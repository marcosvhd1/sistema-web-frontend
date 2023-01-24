import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiCheck, FiSearch, FiSlash } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { useModalNFProduct } from '../../../../../../../Contexts/Modal/NotaFiscal/NFProductContext';
import { useModalNFSearchProduct } from '../../../../../../../Contexts/Modal/NotaFiscal/NFProductSearchContext';
import { INFProduct } from '../../../../../../../services/api/notafiscal/NFProduct';
import { FormTabDevolucao } from './components/TabDevolucao';
import { FormTabICMS } from './components/TabICMS';
import { FormTabInfoAdicional } from './components/TabInfoAdicional';
import { FormTabOutros } from './components/TabOutros';
import { FormTabTributos } from './components/TabTributos';
import { ModalNFSearchProduct } from './ModalNFSearchProduct';

interface ModalNFProductProps {
  addProduct: (data: INFProduct) => void
}

export function ModalNFProduct({ addProduct }: ModalNFProductProps) {
  const { isOpen, onClose } = useModalNFProduct();
  const { onOpen } = useModalNFSearchProduct();
  const methods = useForm<INFProduct>();

  const onSubmit = (data: INFProduct) => {
    addProduct(data);
    methods.reset({
      produto: {},
    });
    onClose();
  };

  const openModal = () => {
    onOpen();
  };

  return (
    <FormProvider {...methods}>
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
        <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Flex w="100%" justify="center" align="center" direction="column">
                <Text fontFamily="Poppins" fontSize="xl">Cadastro de Produto</Text>
                <Flex w="100%" justify="space-between" align="center">
                  <FormContainer width='55%' label='Código de Barras' mr='3'>
                    <Input type="text" {...methods.register('produto.codbarras')} />
                  </FormContainer>
                  <FormContainer width='25%' label='CFOP' mr='3'>
                    <Input type="text" {...methods.register('produto.cfop')} />
                  </FormContainer>
                  <Button onClick={openModal} w="20%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue">
                    <Icon mr={2} as={FiSearch} />
                    Buscar
                  </Button>
                </Flex>
                <Flex w="100%" justify="center" align="center">
                  <FormContainer width='15%' label='Código' mr='3'>
                    <Input type="text" {...methods.register('produto.nprod')} />
                  </FormContainer>
                  <FormContainer width='30%' label='Descrição' mr='3'>
                    <Input type="text" {...methods.register('produto.descricao')} />
                  </FormContainer>
                  <FormContainer width='15%' label='Quantidade' mr='3'>
                    <Input type="text" {...methods.register('quantidade')} />
                  </FormContainer>
                  <FormContainer width='20%' label='Valor Unitário' mr='3'>
                    <Input type="text" {...methods.register('valor_unitario')} />
                  </FormContainer>
                  <FormContainer width='20%' label='Valor Total'>
                    <Input type="text" {...methods.register('valor_total')} />
                  </FormContainer>
                </Flex>
                <Flex w="100%" justify="center" align="center">
                  <FormContainer width='10%' label='UN' mr='3'>
                    <Input type="text" {...methods.register('produto.un')} />
                  </FormContainer>
                  <FormContainer width='20%' label='NCM' mr='3'>
                    <Input type="text" {...methods.register('produto.ncm')} />
                  </FormContainer>
                  <FormContainer width='20%' label='CEST' mr='3'>
                    <Input type="text" {...methods.register('produto.cest')} />
                  </FormContainer>
                  <FormContainer width='25%' label='Desconto %' mr='3'>
                    <Input type="text" {...methods.register('desconto_p')} />
                  </FormContainer>
                  <FormContainer width='25%' label='Desconto Total'>
                    <Input type="text" {...methods.register('desconto_total')} />
                  </FormContainer>
                </Flex>
                <Tabs variant='enclosed' colorScheme="gray" w="100%" mt={3}>
                  <TabList>
                    <Tab>ICMS</Tab>
                    <Tab>IPI / II / PIS / COFINS</Tab>
                    <Tab>Devolução IPI / Partilha ICMS / FCP</Tab>
                    <Tab>Outros</Tab>
                    <Tab>Informações Adicionais</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <FormTabICMS />
                    </TabPanel>
                    <TabPanel>
                      <FormTabTributos />
                    </TabPanel>
                    <TabPanel>
                      <FormTabDevolucao />
                    </TabPanel>
                    <TabPanel>
                      <FormTabOutros />
                    </TabPanel>
                    <TabPanel>
                      <FormTabInfoAdicional />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Flex w="100%" justify="space-between" >
                <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} />Salvar</Button>
                <Button colorScheme='red' variant="outline" mr={3} onClick={onClose} ><Icon as={FiSlash} mr={1} /> Cancelar</Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <ModalNFSearchProduct methods={methods} />
    </FormProvider>
  );
}