import { Button, Checkbox, Flex, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { useModalEmail } from '../../../../../Contexts/Modal/EmailContext';
import { FormContainer } from '../../../../../components/Form/FormContainer';
import { ApiException } from '../../../../../services/api/ApiException';
import { ClientService } from '../../../../../services/api/clientes/ClientService';
import { ConfigService } from '../../../../../services/api/config/ConfigService';
import { EmailService } from '../../../../../services/api/email/EmailService';
import { userInfos } from '../../../../../utils/header';
import { FormCopia } from './components/Copia/FormCopia';

interface ModalEmailProps {
  idNfe: number,
  idCliente: number,
}

interface IEmail {
  destinatario: string,
  assunto: string,
  mensagem: string,
}

export function ModalEmail({ idNfe, idCliente }: ModalEmailProps) {
  const methods = useForm<IEmail>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [copiaCC, setCopiaCC] = useState<string[]>([]);
  const [copiaCCO, setCopiaCCO] = useState<string[]>([]);

  const [enviaPDF, setEnviaPDF] = useState<boolean>(true);

  const { colorMode } = useColorMode();
  const { isOpen, onClose } = useModalEmail();
  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const toast = useToast();

  useEffect(() => {
    if (isOpen === true) {
      ConfigService.getByEmissor(idEmissorSelecionado, HEADERS).then((response) => {
        if (response != undefined) {
          methods.setValue('assunto', response.assunto);
          methods.setValue('mensagem', response.mensagem);
        }
      });
      
      ClientService.getClientsByFilter(1, 1, 'id', `${idCliente}`, 'id', 'desc', idEmissorSelecionado, HEADERS).then((response: any) => {
        if (response != undefined) {
          if (response instanceof ApiException) alert(response.message);
          else methods.setValue('destinatario', response.data[0].email1);
        }
      });
    }
  }, [isOpen]);

  const handleSendEmail = () => {
    setIsLoading(true);

    const assunto = methods.getValues('assunto');
    const mensagem = methods.getValues('mensagem');
    const destinatario = methods.getValues('destinatario');

    EmailService.sendEmail(destinatario, copiaCC, copiaCCO, assunto, mensagem, idNfe, enviaPDF, idEmissorSelecionado, HEADERS).then((response) => {
      toast({
        position: 'top',
        description: response.status === 201 ? 'Email enviado!' : 'Erro ao enviar email.',
        status: response.status === 201 ? 'info' : 'error',
        duration: 2000,
        isClosable: true,
      });

      setIsLoading(false);
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
          <Tabs
            variant="enclosed"
            colorScheme="gray"
            w="100%"
          >
            <TabList>
              <Tab>Informações</Tab>
              <Tab>Cópia</Tab>
              <Tab>Cópia Oculta</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
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
                  <Flex w='100%' mt={5}>
                    <Checkbox size='lg' mr='2' isChecked={enviaPDF} onChange={() => setEnviaPDF(!enviaPDF)} />
                    <Text cursor='pointer' onClick={() => setEnviaPDF(!enviaPDF)}>Enviar PDF</Text>
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel>
                <FormCopia copiaCC={copiaCC} setCopiaCC={setCopiaCC} />
              </TabPanel>
              <TabPanel>
                <FormCopia copiaCC={copiaCCO} setCopiaCC={setCopiaCCO} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Flex w='100%' justify='space-between' align='center'>
            {
              isLoading ? 
                <Button w='15%' variant='solid' colorScheme='blue'><Spinner size='sm' /> </Button> :
                <Button w='15%' variant='solid' colorScheme='blue' onClick={handleSendEmail}><Icon as={FiMail} mr={2}/>Enviar</Button>
            }
            <Button w='15%' onClick={onClose}><Icon as={FiSlash} mr={2}/>Fechar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}