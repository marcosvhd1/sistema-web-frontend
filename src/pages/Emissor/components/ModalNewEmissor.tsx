import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { useModalNewEmissor } from '../../../Contexts/Modal/NewEmissorContext';
import { ApiException } from '../../../services/api/ApiException';
import { EmissorService, IEmissor, INewEmissor } from '../../../services/api/emissor/EmissorService';
import { getDecrypted } from '../../../utils/crypto';
import { userInfos } from '../../../utils/header';
import { FormEmissor } from './FormEmissor';

interface ModalProps {
  refreshPage: (description: string, status: string) => void
  isEditing: boolean
  active: boolean
  setActive: (value: boolean) => void
  seeActive: string
  setIsEditing: (value: boolean) => void
}


export function ModalNewEmissor({isEditing, refreshPage, setActive, active, seeActive, setIsEditing }: ModalProps) {
  const { onClose, isOpen } = useModalNewEmissor();
  const methods = useFormContext<IEmissor>();
  const userInfo = userInfos();
  const toast = useToast();

  const EMPRESA = userInfo.infos?.empresa;
  const HEADERS = userInfo.header;

  const clearForm = () => {
    onClose();
    methods.reset({
      razao: '',
      cnpjcpf: '',
      status: ''
    });
    setActive(true);
    setIsEditing(false);
  };

  const handleCreateNewEmissor = (data: INewEmissor) => {
    const dataToCreate = {
      'cnpjcpf_principal': EMPRESA,
      'razao': data.razao,
      'cnpjcpf': data.cnpjcpf,
      'status': 'Ativo'
    };
    if (data.razao.trim().length === 0 || data.cnpjcpf.trim().length === 0) {
      toast({
        position: 'top',
        title: 'Erro ao cadastrar.',
        description: 'Os campos são obrigatórios',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      EmissorService.create(dataToCreate, HEADERS)
        .then((result) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            clearForm();
            refreshPage('', seeActive);
          }
        });
    }
  };

  const handleUpdateEmissor = (data: IEmissor) => {
    data.status = active ? 'Ativo' : 'Inativo';
    EmissorService.update(data.id, data, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          clearForm();
          refreshPage('', seeActive);
        }
      });
  };

  const submitData = (data: any) => {
    if (isEditing) {
      handleUpdateEmissor(data);
    } else {
      handleCreateNewEmissor(data);
    }
  };

  return (
    <Modal
      isCentered
      onClose={clearForm}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      scrollBehavior={'inside'}
      motionPreset='slideInBottom'
      size='md'
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={methods.handleSubmit(submitData)}>
          <ModalHeader>Cadastro Emissor</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Flex w='100%' h='13srem' p='.5rem' justify='space-between' borderBottom='.1rem solid #e1e1e3'>
              <FormEmissor isEditing={isEditing} active={active} setActive={setActive} />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex justify='space-between' w='100%'>
              <Button variant='outline' colorScheme="green" type='submit'>{isEditing ? 'Editar' : 'Cadastrar'}</Button>
              <Button variant='outline' colorScheme="red">Cancelar</Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
