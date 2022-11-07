import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FiCheck, FiSlash } from "react-icons/fi";
import { useModalProduct } from "../../../../../Contexts/Modal/ProductContext";
import { ApiException } from "../../../../../services/api/ApiException";
import { IProduct, ProductService } from "../../../../../services/api/produtos/ProductService";
import { DadosFiscais } from "./DadosFiscais";
import { DadosPrincipais } from "./DadosPrincipais";

interface ModalProps {
  refreshPage: () => void
  isEditing: boolean
  id: number
  editCod: number
}

export function FormModal({ isEditing, id, refreshPage, editCod }: ModalProps) {
  const { isOpen, onClose } = useModalProduct();
  const methods = useFormContext<IProduct>();
  const { colorMode } = useColorMode()

  const clearForm = () => {
    onClose();
    methods.reset({
      descricao: "",
      referencia: "",
      codbarras: "",
      marca: "",
      grupo: "",
      preco: parseFloat(""),
      preco_trib: parseFloat(""),
      un: "",
      un_trib: "",
      status: "",
      anotacoes: "",
      cst_icms: parseFloat(""),
      aliquota_icms: parseFloat(""),
      base_icms: parseFloat(""),
      cst_ipi: parseFloat(""),
      aliquota_ipi: parseFloat(""),
      cst_cofins: parseFloat(""),
      aliquota_cofins: parseFloat(""),
      cst_pis: parseFloat(""),
      aliquota_pis: parseFloat(""),
      info_adicional: "",
      ncm: "",
      cest: "",
      cnpj_produtor: "",
      producao_propria: "",
      cfop: "",
      origem: "",
      peso_bruto: parseFloat(""),
      peso_liquido: parseFloat(""),
    })
  }

  const handleCreateNewProduct = (data: IProduct) => {
    ProductService.create(data)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message)
        } else {
          clearForm();
          refreshPage()
        }
      })
  }

  const handleUpdateProduct = (data: IProduct) => {
    ProductService.updateById(id, data)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          clearForm()
          refreshPage()
        }
      })
  }

  const submitData = (data: IProduct) => {
    console.log(data)
    if (isEditing)
      handleUpdateProduct(data)
    else
      handleCreateNewProduct(data);
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
          <ModalHeader>Cadastro de Produtos</ModalHeader>
          <ModalCloseButton onClick={() => clearForm()} />
          <ModalBody>
            <Tabs variant='enclosed' colorScheme="gray" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"}>
              <TabList>
                <Tab>1. Dados Principais</Tab>
                <Tab>2. Outros Dados / Fiscais</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <DadosPrincipais editCod={editCod} isEditing={isEditing} />
                </TabPanel>
                <TabPanel>
                  <DadosFiscais />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Flex w="100%" justify="space-between" >
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} />{isEditing ? "Editar" : "Cadastrar"}</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={onClose}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>

  )
}