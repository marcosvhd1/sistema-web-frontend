import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Text } from '@chakra-ui/react';
import { useModalNFApoioCST } from '../../../../../../../../../Contexts/Modal/NotaFiscal/NFApoioCSTContext';

interface ModalNFCSTProps {
  content: string;
}

export function ModalNFCST({ content }: ModalNFCSTProps) {
  const { isOpen, onClose } = useModalNFApoioCST();
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size={{md: '4xl', lg: '5xl'}}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex w='100%' justify='flex-start' align='center'>
            <Text whiteSpace='pre-line'>
              {content}
            </Text>
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
