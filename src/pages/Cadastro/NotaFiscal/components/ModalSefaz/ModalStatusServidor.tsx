import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from '@chakra-ui/react';
import { useModalStatusServidor } from '../../../../../Contexts/Modal/NotaFiscal/Sefaz/StatusServidorContext';

interface ModalStatusServidorProps {
  content: string;
}

export function ModalStatusServidor({ content }: ModalStatusServidorProps) {
  const { isOpen, onClose } = useModalStatusServidor();
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size={{md: '3xl', lg: '4xl'}}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex w="100%" justify="flex-start" align="center">
            <Text>Status do Servidor</Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex w='100%' justify='center' align='center'>
            <Textarea value={content} readOnly/>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex w="100%" justify='flex-end' align='center'>
            <Button w='15%' variant='outline' colorScheme="blue" onClick={onClose}>OK</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
