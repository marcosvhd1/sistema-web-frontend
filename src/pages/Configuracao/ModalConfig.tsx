import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
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

export function ModalConfig() {
  const methods = useForm<IConfig>();

  const { isOpen, onClose } = useModalConfig();
  const { idEmissorSelecionado } = useEmissorContext();

  const [autenticacao, setAutenticacao] = useState<boolean>(false);
  const [ssl, setSSL] = useState<boolean>(false);
  const [tls, setTLS] = useState<boolean>(false);
  
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    loadData();
  }, [isOpen]);

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

  const handleSaveChanges = () => {
    const data = {
      'id_emissor': idEmissorSelecionado,
      'n_serie': methods.getValues('n_serie'),
      'validade': methods.getValues('validade'),
      'ambiente': methods.getValues('ambiente'),
      'tipo_imp': methods.getValues('tipo_imp'),
      'forma_emi': methods.getValues('forma_emi'),
      'finalidade': methods.getValues('finalidade'),
      'id_nfce': methods.getValues('id_nfce'),
      'token_nfce': methods.getValues('token_nfce'),
      'serie_padrao': methods.getValues('serie_padrao'),
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
        size={{md: '3xl', lg: '4xl'}}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Configurações
          </ModalHeader>
          <ModalBody>
            <Tabs variant='enclosed' colorScheme="gray" w="100%">
              <TabList>
                <Tab>Certificado</Tab>
                <Tab>Token NFCe</Tab>
                <Tab>Email</Tab>
                <Tab>CFOP</Tab>
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
                  <TabOutros />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex w='100%' justify='space-between' >
              <Button variant='solid' colorScheme='green' onClick={handleSaveChanges}><Icon as={FiCheck} mr={1} />Salvar</Button>
              <Button variant='outline' colorScheme='red' onClick={onClose} ><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormProvider>
  );
}