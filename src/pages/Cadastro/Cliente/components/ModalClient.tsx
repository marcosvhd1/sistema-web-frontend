import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FiCheck, FiSlash } from "react-icons/fi";
import { useModalClient } from "../../../../Contexts/Modal/ClientContext";
import { Form } from "./Form";

export function ModalClient() {
  const { isOpen, onClose } = useModalClient();
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        motionPreset='slideInBottom'
        isCentered
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro Clientes / Fornecedores</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant='enclosed' colorScheme="gray">
              <TabList>
                <Tab>1. Dados Principais</Tab>
                <Tab>2. Observações</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Form/>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Button variant='solid' colorScheme="green"><Icon as={FiCheck} mr={1} /> Cadastrar</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={onClose}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
