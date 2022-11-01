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
import { useModalTransportadora } from "../../../../../Contexts/Modal/TransportadoraContext";
import { ApiException } from "../../../../../services/api/ApiException";
import { IServico } from "../../../../../services/api/servicos/ServicoService";
import { ITransportadora, TransportadoraService } from "../../../../../services/api/transportadora/TransportadoraService";
import { FormFields } from "./FormFields";

interface ModalProps {
  // changeEdit: (value: React.SetStateAction<any>) => void;
  refreshPage: () => void
  isEditing: boolean
  id: number
  editCod: number
}

export function FormModal({ isEditing, id, refreshPage, editCod }: ModalProps) {
  const { isOpen, onClose } = useModalTransportadora();
  const methods = useFormContext<ITransportadora>();

  const clearForm = () => {
    onClose()
    methods.reset({
      razao: "",
      cnpjcpf: "",
      ie: "",
      rntrc: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cep: "",
      uf: "",
      cidade: "",
      complemento: "",
      tipo_telefone1: "",
      tipo_telefone2: "",
      telefone1: "",
      telefone2: "",
      anotacoes: "",
      placa: "",
      uf_placa: "",
    })

  }

  const handleCreateNewTransportadora = (data: ITransportadora) => {
    TransportadoraService.create(data)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message)
        } else {
          clearForm()
          refreshPage()
        }
      })

  }

  const handleUpdateTransportadora = (data: ITransportadora) => {
    TransportadoraService.updateById(id, data)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          clearForm()
          refreshPage()
        }
      })
  }

  const submitData = (data: ITransportadora) => {
    if (isEditing)
      handleUpdateTransportadora(data)
    else
      handleCreateNewTransportadora(data);
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
          <ModalHeader>Cadastro de Transportadora</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormFields editCod={editCod} isEditing={isEditing} />
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} /> {isEditing ? "Editar" : "Cadastrar"}</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={() => clearForm()}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}