import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Td, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable } from '../../../components/Table/DataTable';
import { useModalUser } from '../../../Contexts/Modal/UserContext';
import { ApiException } from '../../../services/api/ApiException';
import { IUsuario, UsuarioService } from '../../../services/api/usuarios/UsuarioService';
import { getDecrypted } from '../../../utils/crypto';
import { FormUser } from './FormUser';

export function ModalUser() {
  const { onClose, isOpen } = useModalUser();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [data, setData] = useState<IUsuario[]>([]);

  const headers: { key: string, label: string }[] = [
    { key: 'login', label: 'Login' },
  ];

  const LOCAL_DATA = getDecrypted(localStorage.getItem('user'));
  const TOKEN = LOCAL_DATA?.user.accessToken;
  const cnpjcpf = LOCAL_DATA.user.empresa;

  const HEADERS = {
    headers: {
      'Authorization': TOKEN
    }
  };

  const handleRegisterNewUser = () => {
    setIsDisabled(false);
  };

  const closeModal = () => {
    onClose();
    setIsDisabled(true);
  };

  const getUsers = async () => {
    const resultData = await UsuarioService.getAllUsers(cnpjcpf, HEADERS);
    setData(resultData);
  };

  useEffect(() => {
    getUsers();
  }, []);


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
        <ModalCloseButton onClick={closeModal}/>
        <ModalBody>
          <Flex w='100%' h='22rem' p='.5rem' justify='space-between' borderBottom='.1rem solid #e1e1e3'>
            <Flex w='50%' borderRight='.1rem solid #e1e1e3'>
              <TableContainer  w="90%" borderRadius={8} overflow='auto' >
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
                    {data != undefined ? data.map((data) => (
                      <Tr key={data.id}>
                        <Td style={{ 'width': '1rem' }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.email}</Td>

                        <Td style={{ 'textAlign': 'center' }}>
                          <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem">
                            <Icon color="orange.300" as={FiEdit} />
                          </Button>
                          <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem">
                            <Icon as={FiTrash2} color="red.400" />
                          </Button>
                        </Td>
                      </Tr>
                    )) : ''}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
            <Flex w='50%' justify='center'>
              <FormUser isDisabled={isDisabled} setIsDisabled={handleRegisterNewUser}/>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex justify='space-between' w='100%'>
            <Button variant='outline' colorScheme="green" onClick={handleRegisterNewUser}>Cadastrar</Button>
            <Button variant='outline' colorScheme="red" onClick={closeModal}>Cancelar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
