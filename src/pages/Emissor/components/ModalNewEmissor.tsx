import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useModalNewEmissor } from '../../../Contexts/Modal/NewEmissorContext';
import { ApiException } from '../../../services/api/ApiException';
import { EmissorService } from '../../../services/api/emissor/EmissorService';
import { getDecrypted } from '../../../utils/crypto';
import { FormEmissor } from './FormEmissor';


export function ModalNewEmisso() {
  const { onClose, isOpen } = useModalNewEmissor();
  const methods = useForm();

  const LOCAL_DATA = getDecrypted(localStorage.getItem('user'));
  const TOKEN = LOCAL_DATA?.user.accessToken;
  const EMPRESA = LOCAL_DATA?.user.empresa;

  const HEADERS = {
    headers: {
      'Authorization': TOKEN
    }
  };

  const submitData = (data: any) => {
    const dataToCreate = {
      'cnpjcpf_principal': EMPRESA,

      'razao': data.razao,

      'cnpjcpf': data.cnpjcpf
    };
    EmissorService.create(dataToCreate, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          console.log('foi');
        }
      });
  };



  return (
    <FormProvider {...methods} >
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        scrollBehavior={'inside'}
        motionPreset='slideInBottom'
        size='xl'
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={methods.handleSubmit(submitData)}>
            <ModalHeader>Cadastro Emissor</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <Flex w='100%' h='22rem' p='.5rem' justify='space-between' borderBottom='.1rem solid #e1e1e3'>
                <FormEmissor />
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Flex justify='space-between' w='100%'>
                <Button variant='outline' colorScheme="green" type='submit'>Cadastrar</Button>
                <Button variant='outline' colorScheme="red">Cancelar</Button>
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
}
