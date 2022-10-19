import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea } from "@chakra-ui/react";
import { FiCheck, FiSlash } from "react-icons/fi";
import { useModalClient } from "../../../../../Contexts/Modal/ClientContext";
import { FormFields } from "./FormFields";
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import axios from "axios";

export const newClientFormValidationSchema = zod.object({
  tipo: zod.string(),
  categoria: zod.string(),
  razao: zod.string(),
  fantasia: zod.string(),
  cnpjcpf: zod.string(),
  rg: zod.string(),
  ie: zod.string(),
  im: zod.string(),
  suframa: zod.string(),
  tipo_contribuinte: zod.string(),
  logradouro: zod.string(),
  numero: zod.string(),
  bairro: zod.string(),
  cep: zod.string(),
  uf: zod.string(),
  cidade: zod.string(),
  complemento: zod.string(),
  observacao: zod.string(),
  tipo_telefone1: zod.string(),
  tipo_telefone2: zod.string(),
  tipo_telefone3: zod.string(),
  telefone1: zod.string(),
  telefone2: zod.string(),
  telefone3: zod.string(),
  email1: zod.string(),
  email2: zod.string(),
  site: zod.string(),
})

type FormModalProps = zod.infer<typeof newClientFormValidationSchema>

interface ModalProps {
  closeModal: () => void
}

export function FormModal({closeModal}: ModalProps) {
  const { isOpen, onClose } = useModalClient();
  const methods = useForm<FormModalProps>({
    resolver: zodResolver(newClientFormValidationSchema),
  });

  async function handleCreateNewClient(data: FormModalProps) {
    await axios.post('http://192.168.15.121:3333/api/clientes', data).then( () => {
      onClose()
      closeModal()
    })
  }

  return (
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
        <form onSubmit={methods.handleSubmit(handleCreateNewClient)}>
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
                    <FormFields />
                  </TabPanel>
                  <TabPanel>
                    <Textarea h="37rem" placeholder='Observações...' {...methods.register('observacao')} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Flex w="100%" justify="space-between">
                <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} /> Cadastrar</Button>
                <Button colorScheme='red' variant="outline" mr={3} onClick={onClose}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </FormProvider>

  )
}
