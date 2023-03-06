import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useColorMode } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../components/Form/MoneyAddon';
import { useModalNFClient } from '../../../../../../../Contexts/Modal/NotaFiscal/NFClientContext';
import { useModalNFFormaPagto } from '../../../../../../../Contexts/Modal/NotaFiscal/NFFormaPagtoContext';
import { INFFormaPagto } from '../../../../../../../services/api/notafiscal/NFFormaPagto';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';

interface ModalNFFormaPagtoProps {
  addFormaPagto: (data: INFFormaPagto) => void
}

export function ModalNFFormaPagto({ addFormaPagto }: ModalNFFormaPagtoProps) {
  const methods = useFormContext<INFFormaPagto>();

  const { isOpen, onClose } = useModalNFFormaPagto();
  const { colorMode } = useColorMode();

  const onSubmit = (data: INFFormaPagto) => {
    addFormaPagto(data);  
    
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior='inside'
      size={{md: '4xl', lg: '5xl'}}
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
        <ModalContent>
          <ModalHeader>
            <Flex w='100%' justify='center' align='center'>
              <Text fontFamily='Poppins' fontSize='xl'>Forma de Pagamento</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex w='100%' justify='center' align='center'  direction='column'>
              <FormContainer label='Forma de Pagamento'>
                <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('forma')}>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Crédito Loja">Crédito Loja</option>
                  <option value="Vale Alimentação">Vale Alimentação</option>
                  <option value="Vale Refeição">Vale Refeição</option>
                  <option value="Vale Presente">Vale Presente</option>
                  <option value="Vale Combustível">Vale Combustível</option>
                  <option value="Boleto Bancário">Boleto Bancário</option>
                  <option value="Sem Pagamento">Sem Pagamento</option>
                  <option value="Outros">Outros</option>
                </Select>
              </FormContainer>    
              <FormContainer label='Valor'>
                <MoneyAddon>
                  <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('valor')} />
                </MoneyAddon>
              </FormContainer>    
              <FormContainer label='Bandeira'>
                <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('bandeira')}>
                  <option value=""></option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="American Express">American Express</option>
                  <option value="Sorocred">Sorocred</option>
                  <option value="Diners Club">Diners Club</option>
                  <option value="Elo">Elo</option>
                  <option value="Hipercard">Hipercard</option>
                  <option value="Aura">Aura</option>
                  <option value="Outros">Outros</option>
                </Select>
              </FormContainer>    
              <FormContainer label='Observação'>
                <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('observacao')} />
              </FormContainer>    
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex w='100%' justify='space-between' >
              <Button variant='solid' colorScheme='green' type='submit'><Icon as={FiCheck} mr={1} />Salvar</Button>
              <Button colorScheme='red' variant='outline' mr={3} onClick={onClose} ><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
