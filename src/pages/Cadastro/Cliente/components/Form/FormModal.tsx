import { 
  Button, 
  Flex, 
  Icon, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Tab, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tabs, 
  Textarea, 
  useColorMode
} from "@chakra-ui/react";
import * as zod from "zod";
import { useFormContext } from "react-hook-form";
import { FiCheck, FiSlash } from "react-icons/fi";

import { FormFields } from "./FormFields";

import { useModalClient } from "../../../../../Contexts/Modal/ClientContext";

import { ApiException } from "../../../../../services/api/ApiException";
import { ClientService } from "../../../../../services/api/clientes/ClientService";

const newClientFormValidationSchema = zod.object({
  id: zod.number(),
  cod: zod.number(),
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
  changeEdit: (value: React.SetStateAction<any>) => void;
  refreshPage: () => void
  isEditing: boolean
  id: number
  editCod: number
}

export function FormModal({ isEditing, id, editCod, refreshPage }: ModalProps) {
  const { isOpen, onClose } = useModalClient();
  const methods = useFormContext<FormModalProps>();
  const { colorMode } = useColorMode()

  const clearForm = () => {
    onClose()
    methods.reset({
      razao: '',
      fantasia: '',
      bairro: '',
      categoria:"cliente",
      cep: '',
      cidade: '',
      cnpjcpf: '',
      complemento: '',
      email1: '',
      email2: '',
      ie: '',
      im: '',
      logradouro: '',
      numero: '',
      observacao: '',
      rg: '',
      site: '',
      suframa: '',
      telefone1: '',
      telefone2: '',
      telefone3: '',
      tipo:"j",
      tipo_contribuinte: '',
      tipo_telefone1: '',
      tipo_telefone2: '',
      tipo_telefone3: '',
      uf: '',
    })
  }

  const handleUpdateClient = (data: FormModalProps) => {
    ClientService.updateById(id, data)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message)
        } else {
          clearForm()
        }
      })
  }
  
  const handleCreateNewClient = async (data: FormModalProps) => {
    ClientService.create(data)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message)
        } else {
          clearForm()
          refreshPage()
        }
      })
  }

  const submitData = (data: FormModalProps) => {
    if (isEditing)
      handleUpdateClient(data)
    else
      handleCreateNewClient(data)
  }

  return (
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
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>Cadastro Clientes / Fornecedores</ModalHeader>
          <ModalCloseButton onClick={() => clearForm()} />
          <ModalBody>
            <Tabs variant='enclosed' colorScheme="gray">
              <TabList>
                <Tab>1. Dados Principais</Tab>
                <Tab>2. Observações</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormFields editCod={editCod} isEditing={isEditing}/>
                </TabPanel>
                <TabPanel>
                  <Textarea borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} h="37rem" placeholder='Observações...' {...methods.register('observacao')} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} />{isEditing ? "Editar" : "Cadastrar"}</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={() => clearForm()}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
