import { Button, Flex, FormControl, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorMode } from '@chakra-ui/react';
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

  const verify = (value: any) => {
    if (value !== null && value !== undefined) {
      if (value.toString().length > 0) {
        return true;
      }
    }

    return false;
  };

  const onSubmit = () => {
    let qtd = 0;
    let valorUnit = 0;
    let valorTot = 0;
    let descP = 0;
    let descTot = 0;
    let pRedBICMS = 0;
    let valorICMS = 0;
    let pAliqCred = 0;
    let credICMSAprov = 0;
    let modDetBICMS = '';
    let modDetBICMSST = '';
    let pMargValorAdcICMSST = 0;
    let pRedBICMSST = 0;
    let bICMSST = 0;
    let aliqICMSST = 0;
    let valorICMSST = 0;
    let bRetAnt = 0;
    let icmsSTRetAnt = 0;
    let ean = '';
    let pedCompra = '';
    let item = '';
    let bIPI = 0;
    let valorIPI = 0;
    let cnpjP = '';
    let bII = 0;
    let despAd = 0;
    let valorIOF = 0;
    let valorII = 0;
    let bPIS = 0;
    let valorPIS = 0;
    let bCOFINS = 0;
    let valorCOFINS = 0;
    let IPIPDev = 0;
    let IPIValorDev = 0;
    let FCPb = 0;
    let FCPp = 0;
    let FCPvalor = 0;
    let FCPbST = 0;
    let FCPpST = 0;
    let FCPvalorST = 0;
    let partICMSb = 0;
    let partICMSAliqFCPUFDest = 0;
    let partICMSValorFCPUFDest = 0;
    let partICMSAliqIntICMSUFDest = 0;
    let partICMSAliqICMSInter = 0;
    let partICMSpPart = '';
    let partICMSvalorICMSUFDest = 0;
    let partICMSvalorICMSUFOri = 0;
    let codANP = '';
    let descANP = '';
    let ufCons = '';

    if (verify(methods.getValues('quantidade'))) {
      qtd = methods.getValues('quantidade');
    }

    if (verify(methods.getValues('valor_unitario'))) {
      valorUnit = parseFloat(methods.getValues('valor_unitario').toString());
    }

    if (verify(methods.getValues('valor_total'))) {
      valorTot = methods.getValues('valor_total');
    }

    if (verify(methods.getValues('desconto_p'))) {
      descP = methods.getValues('desconto_p');
    }

    if (verify(methods.getValues('desconto_total'))) {
      descTot = methods.getValues('desconto_total');
    }

    if (verify(methods.getValues('p_reducao_base_icms'))) {
      pRedBICMS = methods.getValues('p_reducao_base_icms');
    }

    if (verify(methods.getValues('valor_icms'))) {
      valorICMS = methods.getValues('valor_icms');
    }

    if (verify(methods.getValues('p_aliquota_credito'))) {
      pAliqCred = methods.getValues('p_aliquota_credito');
    }

    if (verify(methods.getValues('credito_icms_aproveitado'))) {
      credICMSAprov = methods.getValues('credito_icms_aproveitado');
    }

    if (verify(methods.getValues('mod_det_bc_icms'))) {
      modDetBICMS = methods.getValues('mod_det_bc_icms');
    }

    if (verify(methods.getValues('mod_det_bc_icms_st'))) {
      modDetBICMSST = methods.getValues('mod_det_bc_icms_st');
    }

    if (verify(methods.getValues('p_margem_vlr_adc_icms_st'))) {
      pMargValorAdcICMSST = methods.getValues('p_margem_vlr_adc_icms_st');
    }

    if (verify(methods.getValues('p_reducao_base_icms_st'))) {
      pRedBICMSST = methods.getValues('p_reducao_base_icms_st');
    }

    if (verify(methods.getValues('base_icms_st'))) {
      bICMSST = methods.getValues('base_icms_st');
    }

    if (verify(methods.getValues('aliquota_icms_st'))) {
      aliqICMSST = methods.getValues('aliquota_icms_st');
    }

    if (verify(methods.getValues('valor_icms_st'))) {
      valorICMSST = methods.getValues('valor_icms_st');
    }

    if (verify(methods.getValues('base_calc_retido_ant'))) {
      bRetAnt = methods.getValues('base_calc_retido_ant');
    }

    if (verify(methods.getValues('icms_st_retido_ant'))) {
      icmsSTRetAnt = methods.getValues('icms_st_retido_ant');
    }

    if (verify(methods.getValues('ean'))) {
      ean = methods.getValues('ean');
    }

    if (verify(methods.getValues('pedido_compra'))) {
      pedCompra = methods.getValues('pedido_compra');
    }

    if (verify(methods.getValues('item'))) {
      item = methods.getValues('item');
    }

    if (verify(methods.getValues('base_calc_ipi'))) {
      bIPI = methods.getValues('base_calc_ipi');
    }

    if (verify(methods.getValues('valor_ipi'))) {
      valorIPI = methods.getValues('valor_ipi');
    }

    if (verify(methods.getValues('cnpj_produtor'))) {
      cnpjP = methods.getValues('cnpj_produtor');
    }

    if (verify(methods.getValues('base_calc_ii'))) {
      bII = methods.getValues('base_calc_ii');
    }
    
    if (verify(methods.getValues('desp_aduaneiras'))) {
      despAd = methods.getValues('desp_aduaneiras');
    }
    
    if (verify(methods.getValues('valor_iof'))) {
      valorIOF = methods.getValues('valor_iof');
    }
    
    if (verify(methods.getValues('valor_ii'))) {
      valorII = methods.getValues('valor_ii');
    }
    
    if (verify(methods.getValues('base_calc_pis'))) {
      bPIS = methods.getValues('base_calc_pis');
    }
    
    if (verify(methods.getValues('valor_pis'))) {
      valorPIS = methods.getValues('valor_pis');
    }
    
    if (verify(methods.getValues('base_calc_cofins'))) {
      bCOFINS = methods.getValues('base_calc_cofins');
    }
    
    if (verify(methods.getValues('valor_cofins'))) {
      valorCOFINS = methods.getValues('valor_cofins');
    }
    
    if (verify(methods.getValues('ipi_p_devolvida'))) {
      IPIPDev = methods.getValues('ipi_p_devolvida');
    }
    
    if (verify(methods.getValues('ipi_vlr_devolvido'))) {
      IPIValorDev = methods.getValues('ipi_vlr_devolvido');
    }
    
    if (verify(methods.getValues('fcp_base_calc'))) {
      FCPb = methods.getValues('fcp_base_calc');
    }
    
    if (verify(methods.getValues('fcp_p'))) {
      FCPp = methods.getValues('fcp_p');
    }
    
    if (verify(methods.getValues('fcp_valor'))) {
      FCPvalor = methods.getValues('fcp_valor');
    }
    
    if (verify(methods.getValues('fcp_base_calc_st'))) {
      FCPbST = methods.getValues('fcp_base_calc_st');
    }
    
    if (verify(methods.getValues('fcp_p_st'))) {
      FCPpST = methods.getValues('fcp_p_st');
    }
    
    if (verify(methods.getValues('fcp_valor_st'))) {
      FCPvalorST = methods.getValues('fcp_valor_st');
    }
    
    if (verify(methods.getValues('partilha_icms_base_calc'))) {
      partICMSb = methods.getValues('partilha_icms_base_calc');
    }
    
    if (verify(methods.getValues('partilha_icms_aliquota_fcp_uf_dest'))) {
      partICMSAliqFCPUFDest = methods.getValues('partilha_icms_aliquota_fcp_uf_dest');
    }
    
    if (verify(methods.getValues('partilha_icms_valor_fcp_uf_dest'))) {
      partICMSValorFCPUFDest = methods.getValues('partilha_icms_valor_fcp_uf_dest');
    }
    
    if (verify(methods.getValues('partilha_icms_aliquota_interna_icms_uf_dest'))) {
      partICMSAliqIntICMSUFDest = methods.getValues('partilha_icms_aliquota_interna_icms_uf_dest');
    }
    
    if (verify(methods.getValues('partilha_icms_aliquota_icms_interestadual'))) {
      partICMSAliqICMSInter = methods.getValues('partilha_icms_aliquota_icms_interestadual');
    }
    
    if (verify(methods.getValues('partilha_icms_p_partilha'))) {
      partICMSpPart = methods.getValues('partilha_icms_p_partilha');
    }
    
    if (verify(methods.getValues('partilha_icms_valor_icms_uf_dest'))) {
      partICMSvalorICMSUFDest = methods.getValues('partilha_icms_valor_icms_uf_dest');
    }
    
    if (verify(methods.getValues('partilha_icms_valor_icms_uf_ori'))) {
      partICMSvalorICMSUFOri = methods.getValues('partilha_icms_valor_icms_uf_ori');
    }
    
    if (verify(methods.getValues('cod_anp'))) {
      codANP = methods.getValues('cod_anp');
    }
    
    if (verify(methods.getValues('descricao_anp'))) {
      descANP = methods.getValues('descricao_anp');
    }
    
    if (verify(methods.getValues('uf_consumo'))) {
      ufCons = methods.getValues('uf_consumo');
    }

    const data: INFProduct = {
      'id_nfe': 0,
      'produto': methods.getValues('produto'),
      'quantidade': qtd,
      'valor_unitario': valorUnit,
      'valor_total': valorTot,
      'desconto_p': descP,
      'desconto_total': descTot,
      'p_reducao_base_icms': pRedBICMS,
      'valor_icms': valorICMS,
      'p_aliquota_credito': pAliqCred,
      'credito_icms_aproveitado': credICMSAprov,
      'mod_det_bc_icms': modDetBICMS,
      'mod_det_bc_icms_st': modDetBICMSST,
      'p_margem_vlr_adc_icms_st': pMargValorAdcICMSST,
      'p_reducao_base_icms_st': pRedBICMSST,
      'base_icms_st': bICMSST,
      'aliquota_icms_st': aliqICMSST,
      'valor_icms_st': valorICMSST,
      'base_calc_retido_ant': bRetAnt,
      'icms_st_retido_ant': icmsSTRetAnt,
      'ean': ean,
      'pedido_compra': pedCompra,
      'item': item,
      'base_calc_ipi': bIPI,
      'valor_ipi': valorIPI,
      'cnpj_produtor': cnpjP,
      'base_calc_ii': bII,
      'desp_aduaneiras': despAd,
      'valor_iof': valorIOF,
      'valor_ii': valorII,
      'base_calc_pis': bPIS,
      'valor_pis': valorPIS,
      'base_calc_cofins': bCOFINS,
      'valor_cofins': valorCOFINS,
      'ipi_p_devolvida': IPIPDev,
      'ipi_vlr_devolvido': IPIValorDev,
      'fcp_base_calc': FCPb,
      'fcp_p': FCPp,
      'fcp_valor': FCPvalor,
      'fcp_base_calc_st': FCPbST,
      'fcp_p_st': FCPpST,
      'fcp_valor_st': FCPvalorST,
      'partilha_icms_base_calc': partICMSb,
      'partilha_icms_aliquota_fcp_uf_dest': partICMSAliqFCPUFDest,
      'partilha_icms_valor_fcp_uf_dest': partICMSValorFCPUFDest,
      'partilha_icms_aliquota_interna_icms_uf_dest': partICMSAliqIntICMSUFDest,
      'partilha_icms_aliquota_icms_interestadual': partICMSAliqICMSInter,
      'partilha_icms_p_partilha': partICMSpPart,
      'partilha_icms_valor_icms_uf_dest': partICMSvalorICMSUFDest,
      'partilha_icms_valor_icms_uf_ori': partICMSvalorICMSUFOri,
      'cod_anp': codANP,
      'descricao_anp': descANP,
      'uf_consumo': ufCons,
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
    const valorUnitario = parseFloat(methods.watch('valor_unitario', 0).toString());
    if (quantidade && valorUnitario) {
      methods.setValue('valor_total', parseFloat((quantidade * valorUnitario).toFixed(2)));
    }
  };

  const onChangeValorUnitario = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorUnitario = parseFloat(e.target.value.toString());
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
          <ModalHeader>
            <Flex w="100%" justify="center" align="center">
              <Text>Informações do Produto</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton onClick={onClose}/>
          <ModalBody>
            <FormControl>
              <Flex w="100%" justify="center" align="center" direction="column">
                <Flex w="100%" justify="space-between" align="center">
                  <FormContainer width='55%' label='Código de Barras' mr='3'>
                    <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('produto.codbarras')} />
                  </FormContainer>
                  <FormContainer width='25%' label='CFOP' mr='3'>
                    <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('produto.cfop')} />
                  </FormContainer>
                  <Button onClick={openModal} w="20%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue">
                    <Icon mr={2} as={FiSearch} />
                      Buscar
                  </Button>
                </Flex>
                <Flex w="100%" justify="center" align="center">
                  <FormContainer width='15%' label='Código' mr='3'>
                    <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('produto.nprod')} />
                  </FormContainer>
                  <FormContainer width='30%' label='Descrição' mr='3'>
                    <Input maxLength={500} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('produto.descricao')} />
                  </FormContainer>
                  <FormContainer width='15%' label='Quantidade' mr='3'>
                    <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('quantidade')} onChange={onChangeQuantidade} />
                  </FormContainer>
                  <FormContainer width='20%' label='Valor Unitário' mr='3'>
                    <MoneyAddon>
                      <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('valor_unitario')} onChange={onChangeValorUnitario} />
                    </MoneyAddon>
                  </FormContainer>
                  <FormContainer width='20%' label='Valor Total'>
                    <MoneyAddon>
                      <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" readOnly {...methods.register('valor_total')} />
                    </MoneyAddon>
                  </FormContainer>
                </Flex>
                <Flex w="100%" justify="center" align="center">
                  <FormContainer width='10%' label='UN' mr='3'>
                    <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('produto.un')} />
                  </FormContainer>
                  <FormContainer width='20%' label='NCM' mr='3'>
                    <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('produto.ncm')} />
                  </FormContainer>
                  <FormContainer width='20%' label='CEST' mr='3'>
                    <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('produto.cest')} />
                  </FormContainer>
                  <FormContainer width='25%' label='Desconto %' mr='3'>
                    <PorcentAddon>
                      <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('desconto_p')} onChange={onChangeDescontoP}/>
                    </PorcentAddon>
                  </FormContainer>
                  <FormContainer width='25%' label='Desconto R$'>
                    <MoneyAddon>
                      <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('desconto_total')} onChange={onChangeDescontoT}/>
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