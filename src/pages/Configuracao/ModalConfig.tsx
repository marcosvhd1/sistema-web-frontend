import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiCheck, FiSearch, FiSlash } from 'react-icons/fi';
import { FormContainer } from '../../components/Form/FormContainer';
import { useModalConfig } from '../../Contexts/Modal/ConfigContext';
import { IConfig } from '../../services/api/config/ConfigService';
import { TabCertificado } from './components/TabCertificado';
import { TabEmail } from './components/TabEmail';
import { TabOutros } from './components/TabOutros';
import { TabToken } from './components/TabToken';

export function ModalConfig() {
  const { isOpen, onClose } = useModalConfig();

  const methods = useForm<IConfig>();

  const handleSaveChanges = () => {
    const data = {
      'n_serie': methods.getValues('ambiente'),
      'validade': methods.getValues('forma_emi'),
    };

    console.log(data);
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
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant='enclosed' colorScheme="gray" w="100%">
              <TabList>
                <Tab>Certificado</Tab>
                <Tab>Token NFCe</Tab>
                <Tab>Email</Tab>
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
                  <TabEmail />
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