import { Button, Flex, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Select, Text, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useModalNFFormaPagto } from '../../../../../../../Contexts/Modal/NotaFiscal/NFFormaPagtoContext';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../components/Form/MoneyAddon';
import { INFFormaPagto } from '../../../../../../../services/api/notafiscal/NFFormaPagto';

interface ModalNFFormaPagtoProps {
  isEditing: boolean
  addFormaPagto: (data: INFFormaPagto) => void
  editFormaPagto: (data: INFFormaPagto) => void
}

export function ModalNFFormaPagto({ isEditing, addFormaPagto, editFormaPagto }: ModalNFFormaPagtoProps) {
  const methods = useFormContext<INFFormaPagto>();

  const { isOpen, onClose } = useModalNFFormaPagto();
  const { colorMode } = useColorMode();

  const toast = useToast();

  useEffect(() => {
    if (isEditing === false) {
      methods.setValue('valor', '0');
      methods.setValue('bandeira', '');
      methods.setValue('observacao', '');
    }
  }, [isOpen === true]);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (isOpen === true && event.key === 'Enter') onSubmit();
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen]);


  const onSubmit = () => {
    let isCartao = false;
    let isOutros = false;

    const forma = methods.getValues('forma');
    const valor = methods.getValues('valor');
    const bandeira = methods.getValues('bandeira');
    const observacao = methods.getValues('observacao');

    if (forma == 'Cartão de Crédito' || forma == 'Cartão de Débito') isCartao = true;
    if (forma == 'Outros') isOutros = true;

    if (isCartao && bandeira === '') {
      toast({
        position: 'top',
        title: 'Erro',
        description: `Selecione uma bandeira para ${forma}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else if (isOutros && observacao === '') {
      toast({
        position: 'top',
        title: 'Erro',
        description: 'A forma de pagamento Outros precisa de uma observação',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      const data: INFFormaPagto = {
        'id_nfe': 0,
        'forma': methods.getValues('forma'),
        'valor': valor,
        'bandeira': methods.getValues('bandeira'),
        'observacao': methods.getValues('observacao'),
      };

      if (isEditing) editFormaPagto(data);
      else addFormaPagto(data);

      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior='inside'
      size='5xl'
    >
      <ModalOverlay />
      <ModalContent>
        <Flex w="95%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }}>
          <Text fontFamily="Poppins" fontSize="xl">Forma de Pagamento</Text>
        </Flex>
        <ModalBody>
          <Flex w='100%' justify='center' align='center' direction='column'>
            <FormContainer label='Forma de Pagamento'>
              <Select isRequired borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('forma')}>
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
                <Input isRequired maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('valor')} />
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
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('observacao')} />
            </FormContainer>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex w='100%' justify='space-between'>
            <Button onClick={onSubmit} variant='solid' colorScheme="green">
              <Icon as={FiCheck} mr={2} />
              Salvar
            </Button>
            <Button onClick={onClose}><Icon as={FiSlash} mr={2} />Fechar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
