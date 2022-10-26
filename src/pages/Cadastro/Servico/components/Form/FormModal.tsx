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
import { FiCheck, FiSlash } from "react-icons/fi";
import { FormFields } from './FormFields'
import { useModalService } from "../../../../../Contexts/Modal/ServiceContext";

export function FormModal() {
  const { isOpen, onClose } = useModalService();
  const methods = useFormContext();

  // const submitData = (data: FormModalProps) => {

  // }

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
      {/* <form onSubmit={methods.handleSubmit()}> */}
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
      {/* </form> */}
    </Modal>
  )
}