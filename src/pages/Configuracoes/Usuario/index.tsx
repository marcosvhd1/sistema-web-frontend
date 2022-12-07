import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Td, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable } from '../../../components/Table/DataTable';
import { useModalUser } from '../../../Contexts/Modal/UserContext';
import { FormUser } from './FormUser';

export function ModalUser() {
  const { onClose, isOpen } = useModalUser();

  const headers: { key: string, label: string }[] = [
    { key: 'login', label: 'Login' },
  ];

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      scrollBehavior={'inside'}
      motionPreset='slideInBottom'
      size='xl'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Usuários</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex w='100%' h='22rem' p='.5rem' justify='space-between' borderBottom='.1rem solid #e1e1e3'>
            <Flex w='50%' borderRight='.1rem solid #e1e1e3'>
              <TableContainer  w="90%" borderRadius={8} >
                <Table size="sm" variant='simple' >
                  <Thead bg="whiteAlpha.100">
                    <Tr style={{'height': '2rem'}}>
                      {headers.map((row) => {
                        return (<Th fontSize="0.7rem"  key={row.key}>{row.label}</Th>);
                      })}
                      <Th style={{'textAlign': 'center', 'width': '1rem' }} fontSize="0.7rem">Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Td>ADMIN</Td>
                    <Td style={{ 'textAlign': 'center' }}>
                      <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem">
                        <Icon color="orange.300" as={FiEdit} />
                      </Button>
                      <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem">
                        <Icon as={FiTrash2} color="red.400" />
                      </Button>
                    </Td>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
            <Flex w='50%' justify='center'>
              <FormUser />
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex justify='space-between' w='100%'>
            <Button variant='outline' colorScheme="green" type="submit">Cadastrar</Button>
            <Button variant='outline' colorScheme="red">Cancelar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
