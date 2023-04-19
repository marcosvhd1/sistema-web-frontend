import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useColorMode } from '@chakra-ui/react';
import { useFormContext, FormProvider } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../components/Form/MoneyAddon';
import { useModalNFDuplicata } from '../../../../../../../Contexts/Modal/NotaFiscal/NFDuplicataContext';
import { INFDuplicata } from '../../../../../../../services/api/notafiscal/NFDuplicata';
import { useEffect } from 'react';

interface ModalNFDuplicataProps {
  addDuplicata: (data: INFDuplicata) => void
}

export function ModalNFDuplicata({ addDuplicata }: ModalNFDuplicataProps) {
  const methods = useFormContext<INFDuplicata>();

  const { isOpen, onClose } = useModalNFDuplicata();
  const { colorMode } = useColorMode();

  useEffect(() => {
    methods.setValue('valor', '0');
    methods.setValue('numero', '');
    methods.setValue('vencimento', '');
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
    const data: INFDuplicata = {
      'id_nfe': 0,
      'numero': methods.getValues('numero'),
      'valor': methods.getValues('valor'),
      'vencimento': methods.getValues('vencimento'),
    };

    addDuplicata(data);  
    
    onClose();
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
        size={{md: '4xl', lg: '5xl'}}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex w='100%' justify='center' align='center'>
              <Text>Forma de Pagamento</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex w='100%' justify='center' align='center'  direction='column'>
              <FormContainer label='Número'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('numero')} />
              </FormContainer>    
              <FormContainer label='Valor'>
                <MoneyAddon>
                  <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('valor')} />
                </MoneyAddon>
              </FormContainer>
              <FormContainer label='Vencimento'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="date" {...methods.register('vencimento')} />
              </FormContainer>    
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex w='100%' justify='space-between' >
              <Button variant='solid' colorScheme='green' onClick={onSubmit}><Icon as={FiCheck} mr={1} />Salvar</Button>
              <Button colorScheme='red' variant='outline' mr={3} onClick={onClose} ><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
}
