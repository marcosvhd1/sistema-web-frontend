import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { FiCheck, FiSlash } from "react-icons/fi";
import { useModalProduct } from "../../../../Contexts/Modal/ProductContext";

export function ModalProduct() {
  const { isOpen, onClose } = useModalProduct();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} motionPreset='slideInBottom' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Produto</Text>
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