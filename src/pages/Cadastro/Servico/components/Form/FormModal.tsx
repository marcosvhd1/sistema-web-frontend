import { useFormContext } from "react-hook-form";
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
  Text,
  Textarea
} from "@chakra-ui/react";
import { IServico, ServicoService } from "../../../../../services/api/servicos/ServicoService";
import { FiCheck, FiSlash } from "react-icons/fi";
import { FormFields } from './FormFields'
import { useModalService } from "../../../../../Contexts/Modal/ServiceContext";
import { ApiException } from "../../../../../services/api/ApiException";

export function FormModal() {
  const { isOpen, onClose } = useModalService();
  const methods = useFormContext<IServico>();

  const submitData = (data: IServico) => {
    console.log(data)
    ServicoService.create(data)
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message)
        } else {
          console.log('deu certo')
        }
      })
    // console.log(data)
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
              <Button colorScheme='red' variant="outline" mr={3} onClick={() => { }}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}