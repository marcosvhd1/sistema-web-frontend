import { Button, Flex, FormControl, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea } from "@chakra-ui/react";
import { FiCheck, FiSlash } from "react-icons/fi";
import { useModalClient } from "../../../../../Contexts/Modal/ClientContext";
import { Form } from "./Form";
import { useForm, FormProvider } from "react-hook-form"


export function ModalClient() {
  const { isOpen, onClose } = useModalClient();
  const methods = useForm();

  function handleCreateNewClient(data: any) {
    console.log(data)
  }

  return (
    <FormControl onSubmit={methods.handleSubmit((data) => console.log(data))}>
      <FormProvider {...methods}>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
          motionPreset='slideInBottom'
          isCentered
          scrollBehavior="inside"
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

                    <Form />

                  </TabPanel>
                  <TabPanel>
                    <Textarea h="37rem" placeholder='Observações...' />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Flex w="100%" justify="space-between">
                <Input type="submit" ></Input>
                <Button colorScheme='red' variant="outline" mr={3} onClick={onClose}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </FormProvider>
    </FormControl>
  )
}
