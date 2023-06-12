import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text } from '@chakra-ui/react';
import { useModalRetornoSefaz } from '../../../../Contexts/Modal/NotaFiscal/Sefaz/RetornoSefazContext';

interface ModalRetornoProps {
  loading: boolean;
  content: any;
}

export function ModalRetorno({loading, content}: ModalRetornoProps) {
  const { isOpen, onClose } = useModalRetornoSefaz();

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
        <ModalHeader>
          <Flex w="100%" justify="flex-start" align="center">
            <Text>Retorno de solicitação</Text>
          </Flex>
        </ModalHeader>
        <ModalBody p={7}>
          {
            loading ? 
              <Flex w='100%' justify='center' align='center'>
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                /> 
              </Flex>
              :
              <Flex w='100%' justify='flex-start' align='center'>
                <Text whiteSpace='pre-line'>
                  {`${content}`}
                </Text>
              </Flex>
          }
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
