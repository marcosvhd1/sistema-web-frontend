import { Button, Flex, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorMode, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../Contexts/EmissorProvider';
import { useModalNFCancelar } from '../../../../Contexts/Modal/NotaFiscal/Sefaz/NFCancelarContext';
import { FormContainer } from '../../../../components/Form/FormContainer';
import { INotaFiscal } from '../../../../services/api/notafiscal/NotaFiscalService';
import { SefazService } from '../../../../services/api/sefaz/SefazService';
import { userInfos } from '../../../../utils/header';

interface ModalCancelarProps {
  data: INotaFiscal;
  getNotas: (description: string) => void;
}

interface getJustify {
  description: string;
}

export function ModalCancelar({ data, getNotas }: ModalCancelarProps) {
  const { register, getValues, reset } = useForm<getJustify>();

  const { colorMode } = useColorMode();
  const { isOpen, onClose } = useModalNFCancelar();
  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const toast = useToast();
  
  const submitData = async () => {
    const justify = getValues('description');

    await SefazService.cancelar(data.id, idEmissorSelecionado, justify, HEADERS).then((resp) => {
      if (resp.type == 'error') {
        toast({
          position: 'top',
          title: 'Erro',
          description: resp.message,
          status: 'error',
          duration: 10000,
          isClosable: true,
        }); 
      } else {
        handleClose();
        getNotas('');
        toast({
          position: 'top',
          title: 'Operação concluída.',
          description: resp.message,
          status: 'success',
          duration: 2000,
        });
      }
    });
  };

  const handleClose = () => {
    reset({description: ''});
    onClose();
    getNotas('');
  };

  const formatDate = (date: string) => {
    const aux = date.split('-');
    return `${aux[2]}/${aux[1]}/${aux[0]}`;
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
      <ModalContent>
        <ModalHeader>
          <Flex w='100%' justify='flex-start' align='center'>
            <Text>Cancelar Nota Fiscal</Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex w='100%' justify='flex-start' align='center' direction='column'>
            <Flex w='100%' justify='space-between' align='center'>
              <FormContainer label='Número'>
                <Text>{data != null ? data.cod : ''}</Text>
              </FormContainer>
              <FormContainer label='Data de Emissão'>
                <Text>{data != null ? formatDate(`${data.data_emissao}`) : ''}</Text>
              </FormContainer>
            </Flex>
            <FormContainer label='Justificativa'>
              <Textarea {...register('description')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}/>
            </FormContainer>
          </Flex> 
        </ModalBody>
        <ModalFooter>
          <Flex w='100%' justify='space-between' align='center'>
            <Button w='15%' variant='solid' colorScheme='blue' onClick={submitData}><Icon as={FiCheck} mr={1} />Enviar</Button>
            <Button w='15%' variant='outline' colorScheme='red' onClick={handleClose}><Icon as={FiSlash} mr={1} />Cancelar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
