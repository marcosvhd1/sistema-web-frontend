import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useColorMode, useToast } from '@chakra-ui/react';
import { useFormContext, FormProvider } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../components/Form/MoneyAddon';
import { useModalNFDuplicata } from '../../../../../../../Contexts/Modal/NotaFiscal/NFDuplicataContext';
import { INFDuplicata } from '../../../../../../../services/api/notafiscal/NFDuplicata';
import { useEffect } from 'react';

interface ModalNFDuplicataProps {
  isEditing: boolean
  addDuplicata: (data: INFDuplicata) => void
  editDuplicata: (data: INFDuplicata) => void
}

export function ModalNFDuplicata({ isEditing, addDuplicata, editDuplicata }: ModalNFDuplicataProps) {
  const methods = useFormContext<INFDuplicata>();

  const { isOpen, onClose } = useModalNFDuplicata();
  const { colorMode } = useColorMode();

  const toast = useToast();

  useEffect(() => {
    if (isEditing === false) {
      methods.setValue('valor', '0');
      methods.setValue('numero', '');
      methods.setValue('vencimento', new Date().toISOString().split('T')[0]);
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
    const numero = methods.getValues('numero');
    const valor = methods.getValues('valor');

    if (numero != '' && valor != '0') {
      const data: INFDuplicata = {
        'id_nfe': 0,
        'numero': numero,
        'valor': valor,
        'vencimento': methods.getValues('vencimento'),
      };

      if (isEditing) editDuplicata(data);
      else addDuplicata(data);  
      
      onClose();
    } else {
      toast({
        position: 'top',
        title: 'Erro',
        description: 'Os campos Número e Valor são obrigatórios',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
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
        scrollBehavior='inside'
        size='5xl'
      >
        <ModalOverlay />
        <ModalContent>
          <Flex w="95%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }}>
            <Text fontFamily="Poppins" fontSize="xl">Duplicata</Text>
          </Flex>
          <ModalBody>
            <Flex w='100%' justify='center' align='center'  direction='column'>
              <FormContainer label='Número'>
                <Input isRequired maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('numero')} />
              </FormContainer>    
              <FormContainer label='Valor'>
                <MoneyAddon>
                  <Input isRequired maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('valor')} />
                </MoneyAddon>
              </FormContainer>
              <FormContainer label='Vencimento'>
                <Input isRequired maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="date" {...methods.register('vencimento')} defaultValue={new Date().toISOString().split('T')[0]}/>
              </FormContainer>    
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex w='100%' justify='space-between'>
              <Button onClick={onSubmit} variant='solid' colorScheme="green">
                <Icon as={FiCheck} mr={2} />
                Salvar
              </Button>
              <Button onClick={onClose}><Icon as={FiSlash} mr={2}/>Fechar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
}
