import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FiCheck, FiSearch, FiSlash } from 'react-icons/fi';
import { FormContainer } from '../../components/Form/FormContainer';
import { useModalConfig } from '../../Contexts/Modal/ConfigContext';
import { TabCertificado } from './TabCertificado';

export function ModalConfig() {
  const { isOpen, onClose } = useModalConfig();

  return (
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
            </TabList>
            <TabPanels>
              <TabPanel>
                <TabCertificado />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Flex w='100%' justify='space-between' >
            <Button variant='solid' colorScheme='green' type='submit'><Icon as={FiCheck} mr={1} />Salvar</Button>
            <Button variant='outline' colorScheme='red' onClick={onClose} ><Icon as={FiSlash} mr={1} /> Cancelar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}