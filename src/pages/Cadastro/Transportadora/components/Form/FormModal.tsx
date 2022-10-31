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
import { IServico } from "../../../../../services/api/servicos/ServicoService";
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
  const methods = useFormContext<IServico>();

  const clearForm = () => {

  }

  const handleCreateNewService = (data: IServico) => {

  }

  const handleUpdateService = (data: IServico) => {

  }

  const submitData = (data: IServico) => {
    if (isEditing)
      handleUpdateService(data)
    else
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
        <ModalContent>
          <ModalHeader>Cadastro de Transportadora</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormFields/>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} /> {isEditing ? "Editar" : "Cadastrar"}</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={() => { clearForm() }}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
    </Modal>
  )
}