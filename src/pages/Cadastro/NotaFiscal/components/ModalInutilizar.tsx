import { Button, Flex, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../Contexts/EmissorProvider';
import { useModalNFInutilizar } from '../../../../Contexts/Modal/NotaFiscal/Sefaz/NFInutilizarContext';
import { FormContainer } from '../../../../components/Form/FormContainer';
import { SefazService } from '../../../../services/api/sefaz/SefazService';
import { userInfos } from '../../../../utils/header';

interface getDados {
  numeroIni: number;
  numeroFin: number;
  description: string;
}

export function ModalInutilizar() {
  const { register, getValues, reset } = useForm<getDados>();

  const [response, setResponse ] = useState<string>('');

  const { colorMode } = useColorMode();
  const { isOpen, onClose } = useModalNFInutilizar();
  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const submitData = async () => {
    const numeroIni = getValues('numeroIni');
    const numeroFin = getValues('numeroFin');
    const description = getValues('description');

    await SefazService.inutilizar(numeroIni, numeroFin, description, idEmissorSelecionado, HEADERS).then((resp) => {
      setResponse(resp);
    });
  };

  const handleClose = () => {
    reset({});
    setResponse('');
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
      <ModalContent>
        <ModalHeader>
          <Flex w='100%' justify='flex-start' align='center'>
            <Text>Inutilizar Faixa</Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex w='100%' justify='flex-start' align='center' direction='column'>
            <Flex w='100%' justify='space-between' align='center'>
              <FormContainer label='Número Inicial' mr='3'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="numer" {...register('numeroIni')}/>
              </FormContainer>
              <FormContainer label='Número Final'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="numer" {...register('numeroFin')}/>
              </FormContainer>
            </Flex>
            <FormContainer label='Justificativa'>
              <Textarea {...register('description')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}/>
            </FormContainer>
            <FormContainer label='Retorno'>
              <Textarea readOnly value={response} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}/>
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
