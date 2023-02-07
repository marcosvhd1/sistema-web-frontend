import { Button, Divider, Flex, FormControl, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { FiCheck, FiSearch, FiSlash } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { useModalNFService } from '../../../../../../../Contexts/Modal/NotaFiscal/NFServiceContext';
import { useModalNFSearchService } from '../../../../../../../Contexts/Modal/NotaFiscal/NFServiceSearchContext';
import { INFService } from '../../../../../../../services/api/notafiscal/NFService';
import { ModalNFSearchService } from './ModalNFSearchService';

interface ModalNFServProps {
  addServ: (data: INFService) => void
  editServ: (data: INFService, index: number) => void
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  isEditing: boolean
  index: number
}

export function ModalNFService({ addServ, editServ, setIsEditing, isEditing, index }: ModalNFServProps) {
  const { isOpen, onClose } = useModalNFService();
  const { onOpen } = useModalNFSearchService();
  const methods = useFormContext<INFService>();

  const onSubmit = (data: INFService) => {
    if (isEditing) {
      editServ(data, index);
      setIsEditing(false);
    } else {
      addServ(data);  
    }
    
    onClose();
  };

  const openModal = () => {
    onOpen();
  };

  const onChangeQuantidade = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantidade = parseFloat(e.target.value);
    const valorUnitario = methods.watch('valor_unitario', 0);
    if (quantidade && valorUnitario) {
      methods.setValue('valor_total', (quantidade * valorUnitario));
    }
  };

  const onChangeValorUnitario = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorUnitario = parseFloat(e.target.value);
    const quantidade = methods.watch('quantidade', 0);
    if (quantidade && valorUnitario) {
      methods.setValue('valor_total', (quantidade * valorUnitario));
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
        <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <Flex w="100%" justify="center" align="center" direction="column">
                  <Text fontFamily="Poppins" fontSize="xl">Cadastro de Serviço</Text>
                  <Flex w="100%" justify="center" align="center">
                    <FormContainer width='15%' label='Código' mr='3'>
                      <Input type="text" {...methods.register('servico.nserv')} />
                    </FormContainer>
                    <FormContainer width='30%' label='Descrição' mr='3'>
                      <Input type="text" {...methods.register('servico.descricao')} />
                    </FormContainer>
                    <FormContainer width='15%' label='Quantidade' mr='3'>
                      <Input type="text" {...methods.register('quantidade')} onChange={onChangeQuantidade} />
                    </FormContainer>
                    <FormContainer width='20%' label='Valor Unitário' mr='3'>
                      <Input type="text" {...methods.register('valor_unitario')} onChange={onChangeValorUnitario} />
                    </FormContainer>
                    <FormContainer width='20%' label='Valor Total'>
                      <Input type="text" readOnly {...methods.register('valor_total')} />
                    </FormContainer>
                  </Flex>
                  <Flex w="100%" justify="center" align="center">
                    <FormContainer width='15%' label='UN' mr='3'>
                      <Input type="text" {...methods.register('servico.un')} />
                    </FormContainer>
                    <FormContainer width='25%' label='NCM' mr='3'>
                      <Input type="text" {...methods.register('servico.ncm')} />
                    </FormContainer>
                    <FormContainer width='30%' label='Desconto %' mr='3'>
                      <Input type="text" {...methods.register('desconto_p')} onChange={onChangeDescontoP}/>
                    </FormContainer>
                    <FormContainer width='30%' label='Desconto R$'>
                      <Input type="text" {...methods.register('desconto_total')} onChange={onChangeDescontoT}/>
                    </FormContainer>
                  </Flex>
                  <Flex w="100%" justify="center" align="center">
                    <FormContainer width='20%' label='Item Lista Serviço' mr='3'>
                      <Input type="text" {...methods.register('servico.item_lista')} />
                    </FormContainer>
                    <FormContainer width='20%' label='CFOP' mr='3'>
                      <Input type="text" {...methods.register('cfop')} />
                    </FormContainer>
                    <FormContainer width='40%' label='EAN (Código de Barras)' mr='3'>
                      <Input type="text" {...methods.register('ean')} />
                    </FormContainer>
                    <Button onClick={openModal} w="20%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue">
                      <Icon mr={2} as={FiSearch} />
                      Buscar
                    </Button>
                  </Flex>
                  <Flex w="100%" justify="center" align="flex-start" mt={3}>
                    <Flex w="50%" justify="flex-start" align="flex-start" direction="column" mr={3}>
                      <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
                        <Divider w="20%" />
                        <Text w="max" mr={3} ml={3}>ISS</Text>
                        <Divider />
                      </Flex>
                      <FormContainer label="Situação Tributária">
                        <Select {...methods.register('servico.situacao')}>
                          <option value='Normal'>Normal</option>
                          <option value='retida'>Retida</option>
                          <option value='substituta'>Substituta</option>
                          <option value='isenta'>Isenta</option>
                        </Select>
                      </FormContainer>
                      <FormContainer label='Alíquota'>
                        <Input type="text" {...methods.register('servico.aliquota_iss')} />
                      </FormContainer>
                      <FormContainer label='Base de Cálculo'>
                        <Input type="text" {...methods.register('servico.base_iss')} />
                      </FormContainer>
                      <FormContainer label='Valor da Base de Cálculo'>
                        <Input type="text" />
                      </FormContainer>
                      <FormContainer label='Valor ISS'>
                        <Input type="text" {...methods.register('valor_iss')} />
                      </FormContainer>
                      <FormContainer label='Valor ISS Retido'>
                        <Input type="text" {...methods.register('valor_iss_retido')} />
                      </FormContainer>
                    </Flex>
                    <Flex w="50%" justify="center" align="center" direction="column">
                      <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
                        <Divider w="20%" />
                        <Text w="max" mr={3} ml={3}>Informações Adicionais</Text>
                        <Divider />
                      </Flex>
                      <Textarea mt={3} alignSelf="flex-start" placeholder='Informações adicionais...' {...methods.register('servico.anotacoes')} />
                    </Flex>
                  </Flex>
                  <Flex w="100%" justify="center" align="flex-start" mt={3}>
                    <Flex w="50%" justify="flex-start" align="flex-start" direction="column" mr={3}>
                      <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
                        <Divider w="20%" />
                        <Text w="max" mr={3} ml={3}>PIS</Text>
                        <Divider />
                      </Flex>
                      <FormContainer label='CST'>
                        <Input type="text" {...methods.register('pis_cst')} />
                      </FormContainer>
                      <FormContainer label='Base de Cálculo'>
                        <Input type="text" {...methods.register('pis_base_calc')} />
                      </FormContainer>
                      <FormContainer label='Alíquota'>
                        <Input type="text" {...methods.register('pis_aliquota')} />
                      </FormContainer>
                      <FormContainer label='Valor'>
                        <Input type="text" {...methods.register('pis_valor')} />
                      </FormContainer>
                    </Flex>
                    <Flex w="50%" justify="flex-start" align="flex-start" direction="column">
                      <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
                        <Divider w="20%" />
                        <Text w="max" mr={3} ml={3}>COFINS</Text>
                        <Divider />
                      </Flex>
                      <FormContainer label='CST'>
                        <Input type="text" {...methods.register('cofins_cst')} />
                      </FormContainer>
                      <FormContainer label='Base de Cálculo'>
                        <Input type="text" {...methods.register('cofins_base_calc')} />
                      </FormContainer>
                      <FormContainer label='Alíquota'>
                        <Input type="text" {...methods.register('cofins_aliquota')} />
                      </FormContainer>
                      <FormContainer label='Valor'>
                        <Input type="text" {...methods.register('cofins_valor')} />
                      </FormContainer>
                    </Flex>
                  </Flex>
                </Flex>
              </FormControl>
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
      <ModalNFSearchService methods={methods} />
    </FormProvider>
  );
}