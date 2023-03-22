import { Button, Flex, FormControl, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FiCheck, FiSearch, FiSlash } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../components/Form/MoneyAddon';
import { PorcentAddon } from '../../../../../../../components/Form/PorcentAddon';
import { useModalNFProduct } from '../../../../../../../Contexts/Modal/NotaFiscal/NFProductContext';
import { useModalNFSearchProduct } from '../../../../../../../Contexts/Modal/NotaFiscal/NFProductSearchContext';
import { INFProduct } from '../../../../../../../services/api/notafiscal/NFProduct';
import { FormTabICMS } from './components/ICMS/TabICMS';
import { FormTabDevolucao } from './components/TabDevolucao';
import { FormTabInfoAdicional } from './components/TabInfoAdicional';
import { FormTabOutros } from './components/TabOutros';
import { FormTabTributos } from './components/Tributos/TabTributos';
import { ModalNFSearchProduct } from './ModalNFSearchProduct';

interface ModalNFProductProps {
  addProduct: (data: INFProduct) => void
  editProduct: (data: INFProduct, index: number) => void
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  isEditing: boolean
  index: number
}

export function ModalNFProduct({ addProduct, editProduct, setIsEditing, isEditing, index }: ModalNFProductProps) {
  const { isOpen, onClose } = useModalNFProduct();
  const { onOpen } = useModalNFSearchProduct();
  const methods = useFormContext<INFProduct>();
  const { colorMode } = useColorMode();

  const onSubmit = () => {
    const data: INFProduct = {
      'id_nfe': 0,
      'produto': methods.getValues('produto'),
      'quantidade': methods.getValues('quantidade'),
      'valor_unitario': methods.getValues('valor_unitario'),
      'valor_total': methods.getValues('valor_total'),
      'desconto_p': methods.getValues('desconto_p'),
      'desconto_total': methods.getValues('desconto_total'),
      'p_reducao_base_icms': methods.getValues('p_reducao_base_icms'),
      'valor_icms': methods.getValues('valor_icms'),
      'p_aliquota_credito': methods.getValues('p_aliquota_credito'),
      'credito_icms_aproveitado': methods.getValues('credito_icms_aproveitado'),
      'mod_det_bc_icms': methods.getValues('mod_det_bc_icms'),
      'mod_det_bc_icms_st': methods.getValues('mod_det_bc_icms_st'),
      'p_margem_vlr_adc_icms_st': methods.getValues('p_margem_vlr_adc_icms_st'),
      'p_reducao_base_icms_st': methods.getValues('p_reducao_base_icms_st'),
      'base_icms_st': methods.getValues('base_icms_st'),
      'aliquota_icms_st': methods.getValues('aliquota_icms_st'),
      'valor_icms_st': methods.getValues('valor_icms_st'),
      'base_calc_retido_ant': methods.getValues('base_calc_retido_ant'),
      'icms_st_retido_ant': methods.getValues('icms_st_retido_ant'),
      'ean': methods.getValues('ean'),
      'pedido_compra': methods.getValues('pedido_compra'),
      'item': methods.getValues('item'),
      'base_calc_ipi': methods.getValues('base_calc_ipi'),
      'valor_ipi': methods.getValues('valor_ipi'),
      'cnpj_produtor': methods.getValues('cnpj_produtor'),
      'base_calc_ii': methods.getValues('base_calc_ii'),
      'desp_aduaneiras': methods.getValues('desp_aduaneiras'),
      'valor_iof': methods.getValues('valor_iof'),
      'valor_ii': methods.getValues('valor_ii'),
      'base_calc_pis': methods.getValues('base_calc_pis'),
      'valor_pis': methods.getValues('valor_pis'),
      'base_calc_cofins': methods.getValues('base_calc_cofins'),
      'valor_cofins': methods.getValues('valor_cofins'),
      'ipi_p_devolvida': methods.getValues('ipi_p_devolvida'),
      'ipi_vlr_devolvido': methods.getValues('ipi_vlr_devolvido'),
      'fcp_base_calc': methods.getValues('fcp_base_calc'),
      'fcp_p': methods.getValues('fcp_p'),
      'fcp_valor': methods.getValues('fcp_valor'),
      'fcp_base_calc_st': methods.getValues('fcp_base_calc_st'),
      'fcp_p_st': methods.getValues('fcp_p_st'),
      'fcp_valor_st': methods.getValues('fcp_valor_st'),
      'partilha_icms_base_calc': methods.getValues('partilha_icms_base_calc'),
      'partilha_icms_aliquota_fcp_uf_dest': methods.getValues('partilha_icms_aliquota_fcp_uf_dest'),
      'partilha_icms_valor_fcp_uf_dest': methods.getValues('partilha_icms_valor_fcp_uf_dest'),
      'partilha_icms_aliquota_interna_icms_uf_dest': methods.getValues('partilha_icms_aliquota_interna_icms_uf_dest'),
      'partilha_icms_aliquota_icms_interestadual': methods.getValues('partilha_icms_aliquota_icms_interestadual'),
      'partilha_icms_p_partilha': methods.getValues('partilha_icms_p_partilha'),
      'partilha_icms_valor_icms_uf_dest': methods.getValues('partilha_icms_valor_icms_uf_dest'),
      'partilha_icms_valor_icms_uf_ori': methods.getValues('partilha_icms_valor_icms_uf_ori'),
      'cod_anp': methods.getValues('cod_anp'),
      'descricao_anp': methods.getValues('descricao_anp'),
      'uf_consumo': methods.getValues('uf_consumo'),
    };

    if (isEditing) {
      editProduct(data, index);
      setIsEditing(false);
    } else {
      addProduct(data);  
    }
    
    onClose();
  };

  const openModal = () => {
    onOpen();
  };

  const onChangeQuantidade = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantidade = parseFloat(e.target.value);
    const valorUnitario = parseFloat(methods.watch('valor_unitario', 0).toString().replace(',', '.'));
    if (quantidade && valorUnitario) {
      methods.setValue('valor_total', parseFloat((quantidade * valorUnitario).toFixed(2)));
    }
  };

  const onChangeValorUnitario = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorUnitario = parseFloat(e.target.value.toString().replace(',', '.'));
    const quantidade = methods.watch('quantidade', 0);
    if (quantidade && valorUnitario) {
      methods.setValue('valor_total', parseFloat((quantidade * valorUnitario).toFixed(2)));
    }
  };

  const onChangeDescontoP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const descP = parseFloat(e.target.value);
    const quantidade = methods.getValues('quantidade');
    const valorUnitario = methods.getValues('valor_unitario');
    const valorTot = quantidade * valorUnitario;

    const value = (valorTot * descP) / 100;
  
    if (descP > 0) {
      methods.setValue('desconto_total', parseFloat(value.toFixed(2)));
    } else {
      methods.setValue('desconto_p', 0);
      methods.setValue('desconto_total', 0);
    }
  };

  const onChangeDescontoT = (e: React.ChangeEvent<HTMLInputElement>) => {
    const descT = parseFloat(e.target.value);
    const quantidade = methods.getValues('quantidade');
    const valorUnitario = methods.getValues('valor_unitario');
    const valorTot = quantidade * valorUnitario;

    const value = (descT / valorTot) * 100;
    
    if (descT > 0) {
      methods.setValue('desconto_p', parseFloat(value.toFixed(2)));
      methods.setValue('desconto_total', parseFloat(descT.toFixed(2)));
    } else {
      methods.setValue('desconto_p', 0);
      methods.setValue('desconto_total', 0);
    }
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
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Flex w="100%" justify="center" align="center" direction="column">
                <Text fontFamily="Poppins" fontSize="xl">Cadastro de Produto</Text>
                <Flex w="100%" justify="space-between" align="center">
                  <FormContainer width='55%' label='Código de Barras' mr='3'>
                    <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('produto.codbarras')} />
                  </FormContainer>
                  <FormContainer width='25%' label='CFOP' mr='3'>
                    <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('produto.cfop')} />
                  </FormContainer>
                  <Button onClick={openModal} w="20%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue">
                    <Icon mr={2} as={FiSearch} />
                      Buscar
                  </Button>
                </Flex>
                <Flex w="100%" justify="center" align="center">
                  <FormContainer width='15%' label='Código' mr='3'>
                    <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('produto.nprod')} />
                  </FormContainer>
                  <FormContainer width='30%' label='Descrição' mr='3'>
                    <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('produto.descricao')} />
                  </FormContainer>
                  <FormContainer width='15%' label='Quantidade' mr='3'>
                    <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('quantidade')} onChange={onChangeQuantidade} />
                  </FormContainer>
                  <FormContainer width='20%' label='Valor Unitário' mr='3'>
                    <MoneyAddon>
                      <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('valor_unitario')} onChange={onChangeValorUnitario} />
                    </MoneyAddon>
                  </FormContainer>
                  <FormContainer width='20%' label='Valor Total'>
                    <MoneyAddon>
                      <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" readOnly {...methods.register('valor_total')} />
                    </MoneyAddon>
                  </FormContainer>
                </Flex>
                <Flex w="100%" justify="center" align="center">
                  <FormContainer width='10%' label='UN' mr='3'>
                    <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('produto.un')} />
                  </FormContainer>
                  <FormContainer width='20%' label='NCM' mr='3'>
                    <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('produto.ncm')} />
                  </FormContainer>
                  <FormContainer width='20%' label='CEST' mr='3'>
                    <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('produto.cest')} />
                  </FormContainer>
                  <FormContainer width='25%' label='Desconto %' mr='3'>
                    <PorcentAddon>
                      <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('desconto_p')} onChange={onChangeDescontoP}/>
                    </PorcentAddon>
                  </FormContainer>
                  <FormContainer width='25%' label='Desconto R$'>
                    <MoneyAddon>
                      <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('desconto_total')} onChange={onChangeDescontoT}/>
                    </MoneyAddon>
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
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between" >
              <Button variant='solid' colorScheme="green" onClick={onSubmit}><Icon as={FiCheck} mr={1} />Salvar</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={onClose} ><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ModalNFSearchProduct methods={methods} />
    </FormProvider>
  );
}