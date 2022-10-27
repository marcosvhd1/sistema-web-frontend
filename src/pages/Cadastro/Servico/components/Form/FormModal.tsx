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
  ModalOverlay
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FiCheck, FiSlash } from "react-icons/fi";
import { useModalService } from "../../../../../Contexts/Modal/ServiceContext";
import { ApiException } from "../../../../../services/api/ApiException";
import { IServico, ServicoService } from "../../../../../services/api/servicos/ServicoService";
import { FormFields } from './FormFields';

export function FormModal() {
  const { isOpen, onClose } = useModalService();
  const methods = useFormContext<IServico>();

  const clearForm = () => {
    onClose();
    methods.reset({
      descricao: "",
      un: "",
      preco: parseFloat(""),
      anotacoes: "",
      base_iss: parseFloat(""),
      aliquota_iss: parseFloat(""),
      situacao: "",
      item_lista: "",
      ncm: "",
    })
  }

  const handleCreateNewService = (data: IServico) => {
    ServicoService.create(data)
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message)
        } else {
          clearForm();
        }
      })
  }

  const submitData = (data: IServico) => {
    handleCreateNewService(data);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size="xl"
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>Cadastro de Serviço</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormFields />
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} /> Cadastrar</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={() => {clearForm()}}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}