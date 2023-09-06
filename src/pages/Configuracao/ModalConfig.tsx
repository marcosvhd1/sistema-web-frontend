import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../Contexts/EmissorProvider';
import { useModalConfig } from '../../Contexts/Modal/ConfigContext';
import { ApiException } from '../../services/api/ApiException';
import { ConfigService, IConfig } from '../../services/api/config/ConfigService';
import { userInfos } from '../../utils/header';
import { TabCertificado } from './components/TabCertificado';
import { TabEmail } from './components/TabEmail';
import { TabOutros } from './components/TabOutros';
import { TabToken } from './components/TabToken';
import { TabCFOP } from './components/CFOP/TabCFOP';
import { TabTabelaNCM } from './components/TabTabelaNCM';

export function ModalConfig() {
  const methods = useForm<IConfig>();

  const { isOpen, onClose } = useModalConfig();
  const { idEmissorSelecionado } = useEmissorContext();

  const [currentTab, setCurrentTab] = useState(0);
  const [autenticacao, setAutenticacao] = useState<boolean>(false);
  const [ssl, setSSL] = useState<boolean>(false);
  const [tls, setTLS] = useState<boolean>(false);
  
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const toast = useToast();

  useEffect(() => {
    loadData();
  }, [isOpen]);

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
  };

  const loadData = async () => {
    const response = await ConfigService.getByEmissor(idEmissorSelecionado, HEADERS);

    if (response != null) {
      methods.reset(response);
      
      if (isOpen === true) {
        setAutenticacao(methods.getValues('autenticacao'));
        setSSL(methods.getValues('ssl'));
        setTLS(methods.getValues('tls')); 
      } 
    }
  };

  const hasErrors = () => {
    const camposObrigatorios: any[] = ['serie_padrao'];

    for (const campo of camposObrigatorios) {
      if (methods.getValues(campo) === '') {
        let msg = '';

        switch (campo) {
        case 'serie_padrao':
          setCurrentTab(5);
          msg = 'Está faltando preencher a SÉRIE PADRÃO.';
          setTimeout(() => {
            methods.setFocus('serie_padrao');
          }, 100);
          break;
        }

        toast({
          position: 'top',
          description: msg,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return true;
      }
    }

    return false;
  };


  const handleSaveChanges = () => {
    if (hasErrors()) return; 

    const data = {
      'id_emissor': idEmissorSelecionado,
      'cert_base64': methods.getValues('cert_base64'),
      'cert_senha': methods.getValues('cert_senha'),
      'ambiente': methods.getValues('ambiente'),
      'tipo_imp': methods.getValues('tipo_imp'),
      'forma_emi': methods.getValues('forma_emi'),
      'finalidade': methods.getValues('finalidade'),
      'justif': methods.getValues('justif'),
      'id_nfce': methods.getValues('id_nfce'),
      'token_nfce': methods.getValues('token_nfce'),
      'serie_padrao': methods.getValues('serie_padrao'),
      'serie_padrao_nfce': methods.getValues('serie_padrao_nfce'),
      'aliq_aprov_icms': methods.getValues('aliq_aprov_icms'),
      'email_remetente': methods.getValues('email_remetente'),
      'email': methods.getValues('email'),
      'host': methods.getValues('host'),
      'usuario': methods.getValues('usuario'),
      'senha': methods.getValues('senha'),
      'porta': methods.getValues('porta'),
      'copia': methods.getValues('copia'),
      'assunto': methods.getValues('assunto'),
      'mensagem': methods.getValues('mensagem'),
      'autenticacao': autenticacao,
      'ssl': ssl,
      'tls': tls,
    };

    ConfigService.create(data, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          onClose();
        }
      });
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
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Configurações
          </ModalHeader>
          <ModalBody>
            <Tabs 
              variant='enclosed' 
              colorScheme="gray" 
              w="100%"
              index={currentTab}
              onChange={handleTabChange}
            >
              <TabList>
                <Tab>NFe</Tab>
                <Tab>NFCe</Tab>
                <Tab>Email</Tab>
                <Tab>CFOP</Tab>
                <Tab>Tabela NCM</Tab>
                <Tab>Outros</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TabCertificado />
                </TabPanel>
                <TabPanel>
                  <TabToken />
                </TabPanel>
                <TabPanel>
                  <TabEmail isOpen={isOpen} autenticacao={autenticacao} setAutenticacao={setAutenticacao} ssl={ssl} setSSL={setSSL} tls={tls} setTLS={setTLS}/>
                </TabPanel>
                <TabPanel>
                  <TabCFOP />
                </TabPanel>
                <TabPanel>
                  <TabTabelaNCM />
                </TabPanel>
                <TabPanel>
                  <TabOutros />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex w='100%' justify='space-between'>
              <Button onClick={handleSaveChanges} variant='solid' colorScheme="green">
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