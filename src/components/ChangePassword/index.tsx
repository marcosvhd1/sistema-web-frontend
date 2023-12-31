import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useModalChangePassword } from '../../Contexts/Modal/ChangePasswordContext';
import { UsuarioService } from '../../services/api/usuarios/UsuarioService';
import { userInfos } from '../../utils/header';
import { FormPassword } from './FormPassword';

interface IPassword {
  newPassword: string;
  confirmationPassword: string;
}

export function ChangePasswordModal() {
  const [ differentPassword, setDifferentPassword ] = useState<boolean>(false);
  const methods = useForm<IPassword>();
  const { isOpen, onClose } = useModalChangePassword();
  const userInfo = userInfos();
  const toast = useToast();

  const closeModal = () => {
    methods.reset({
      newPassword: '',
      confirmationPassword: ''
    });
    onClose();
  };

  const submitData = async (data: IPassword) => {
    const { newPassword, confirmationPassword } = data;
    setDifferentPassword(newPassword !== confirmationPassword);

    if (newPassword === confirmationPassword) {
      const HEADERS = userInfo.header;
      const userId = userInfo.infos?.idUser;
      const login = userInfo.infos?.email;
      try {
        const dataToUpdate = {
          id: userId,
          email: login,
          password: newPassword,
        };
        UsuarioService.updateById(userId, dataToUpdate, HEADERS);
        toast({
          position: 'top',
          title: 'Operação concluída.',
          description: 'Senha alterada com sucesso.',
          status: 'success',
          duration: 2000,
        });
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal
      isCentered
      onClose={closeModal}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      scrollBehavior={'inside'}
      motionPreset='slideInBottom'
      size='md'
    >
      <ModalOverlay />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitData)}>
          <ModalContent>
            <ModalHeader>Alterar Senha</ModalHeader>
            <ModalCloseButton onClick={closeModal} />
            <ModalBody>
              <Flex w='100%' h='10rem' p='.5rem' justify='space-between' >
                <FormPassword isInvalid={differentPassword} />
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Flex justify='space-between' w='100%'>
                <Button type="submit" variant='solid' colorScheme="green">
                  <Icon as={FiCheck} mr={2} />
                  Salvar
                </Button>
                <Button onClick={closeModal}><Icon as={FiSlash} mr={2}/>Fechar</Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </form>
      </FormProvider>
    </Modal>
  );
}
