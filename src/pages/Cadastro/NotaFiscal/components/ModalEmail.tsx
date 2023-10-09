import { Button, Flex, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorMode, useToast } from '@chakra-ui/react';
import { FiMail, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../Contexts/EmissorProvider';
import { useModalEmail } from '../../../../Contexts/Modal/EmailContext';
import { FormContainer } from '../../../../components/Form/FormContainer';
import { userInfos } from '../../../../utils/header';
import { useForm } from 'react-hook-form';
import { EmailService } from '../../../../services/api/email/EmailService';

interface IEmail {
  destinatario: string[],
  destinatario_cc: string[],
  destinatario_cco: string[],
  assunto: string,
  mensagem: string,
}

export function ModalEmail() {
  const methods = useForm<IEmail>();
  const { colorMode } = useColorMode();
  const { isOpen, onClose } = useModalEmail();
  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const toast = useToast();

  const handleSendEmail = () => {
    const assunto = methods.getValues('assunto');
    const mensagem = methods.getValues('mensagem');
    const destinatario = methods.getValues('destinatario');
    const destinatario_cc = methods.getValues('destinatario_cc');
    const destinatario_cco = methods.getValues('destinatario_cco');

    EmailService.sendEmail(destinatario, destinatario_cc, destinatario_cco, assunto, mensagem, idEmissorSelecionado, HEADERS).then((response) => {
      console.log(response);
    });
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
        <ModalHeader>
          <Flex w='100%' justify='flex-start' align='center'>
            <Text>Enviar Email</Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex w='100%' justify='center' align='center' direction='column'>
            <FormContainer label='Destinatário'>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('destinatario')}/>
            </FormContainer>
            <FormContainer label='Assunto'>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('assunto')}/>
            </FormContainer>
            <FormContainer label='Mensagem'>
              <Textarea borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('mensagem')}/>
            </FormContainer>
          </Flex> 
        </ModalBody>
        <ModalFooter>
          <Flex w='100%' justify='space-between' align='center'>
            <Button w='15%' variant='solid' colorScheme='blue' onClick={handleSendEmail}><Icon as={FiMail} mr={2}/>Enviar</Button>
            <Button w='15%' onClick={onClose}><Icon as={FiSlash} mr={2}/>Fechar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}