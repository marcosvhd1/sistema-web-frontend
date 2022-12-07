import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useModalUser } from '../../../Contexts/Modal/UserContext';

export function ModalUser() {
  const { onClose, isOpen } = useModalUser();

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset='slideInBottom'
      size='4xl'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Usuários</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <h1>teste</h1>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
