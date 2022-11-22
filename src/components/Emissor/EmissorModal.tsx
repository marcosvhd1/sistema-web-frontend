import { Button, Checkbox, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../Contexts/EmissorProvider';
import { useModalEmissor } from '../../Contexts/Modal/EmissorContext';

interface IEmissorProps {
  emissor: any
}

export function EmissorModal() {
  const { onClose, isOpen } = useModalEmissor();
  const { emissor } = useEmissorContext();


  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      scrollBehavior="inside"
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Selecionar Emissor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th style={{ 'width': '1rem' }}><Checkbox isReadOnly></Checkbox></Th>
                  <Th style={{ 'width': '1rem' }}>id</Th>
                  <Th>razão social</Th>
                  <Th>cnpj</Th>
                </Tr>
              </Thead>
              <Tbody>
                { emissor.map((data: any) => (
                  <Tr key={data.id}>
                    <Td style={{ 'width': '.1rem' }} ><Checkbox></Checkbox></Td>
                    <Td>{data.id}</Td>
                    <Td>2{data.razao}</Td>
                    <Td>1{data.cnpjcpf}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Flex w="100%" justify="space-between" >
            <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} />Salvar</Button>
            <Button colorScheme='red' variant="outline" mr={3} onClick={onClose}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
