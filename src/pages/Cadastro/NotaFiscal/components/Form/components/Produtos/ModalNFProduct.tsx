import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { FiCheck, FiSearch, FiSlash } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { useModalNFProduct } from '../../../../../../../Contexts/Modal/NotaFiscal/NFProductContext';
import { INFProduct } from '../../../../../../../services/api/notafiscal/NFProduct';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';

interface ModalNFProductProps {
  methods: UseFormReturn<INotaFiscal, any>
  produtos: INFProduct[]
}

export function ModalNFProduct({ methods, produtos }: ModalNFProductProps) {
  const { register, handleSubmit } = useForm<INotaFiscal>();
  const { isOpen, onClose } = useModalNFProduct();

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
      <form onSubmit={handleSubmit((data) => null)}>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex w="100%" justify="center" align="center" direction="column">
              <Text fontFamily="Poppins" fontSize="xl">Cadastro de Produto</Text>
              <Flex w="100%" justify="center" align="center">
              <FormContainer width='20%' label='Código'>
                <Input type="text" {...register('produtos')} />
              </FormContainer>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between" >
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} />{'Salvar'}</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={onClose} ><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}