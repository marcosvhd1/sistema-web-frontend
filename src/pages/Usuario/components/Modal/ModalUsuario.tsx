import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Checkbox, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { IEmissor } from '../../../../services/api/emissor/EmissorService';
import { IUsuario } from '../../../../services/api/usuarios/UsuarioService';
import { useModalUser } from '../../../../Contexts/Modal/UserContext';
import { FormContainer } from '../../../../components/Form/FormContainer';

interface ModalUsuarioProps {
  isEditing: boolean;
}

export function ModalUsuario({ isEditing }: ModalUsuarioProps) {
  const methods = useFormContext<IUsuario>();
  
  const [emissores, setEmissores] = useState<IEmissor[]>();
  
  const { onClose, isOpen } = useModalUser();
  const { colorMode } = useColorMode();

  const clearForm = () => {
    methods.reset({});
    onClose();
  };

  const submitData = (data: IUsuario) => {
    console.log(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={clearForm}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size={{md: '4xl', lg: '5xl'}}
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>Cadastro de Usuário</ModalHeader>
          <ModalCloseButton onClick={clearForm} />
          <ModalBody>
            <Flex width="100%" justify="center" align="center" direction="column">
              <FormContainer label='Login'>
                <Input type='text' {...methods.register('email')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}/>
              </FormContainer>
              <FormContainer label='Senha'>
                <Input type='password' {...methods.register('password')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}/>
              </FormContainer>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex justify='space-between' w='100%'>
              <Button variant='solid' colorScheme="green" type='submit'><Icon as={FiCheck} mr={1} />{isEditing ? 'Editar' : 'Cadastrar'}</Button>
              <Button variant='outline' colorScheme="red" onClick={clearForm}><Icon as={FiSlash} mr={1} />Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
