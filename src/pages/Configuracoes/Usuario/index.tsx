import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Td, Table, TableContainer, Tbody, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable } from '../../../components/Table/DataTable';
import { DeleteAlertDialog } from '../../../components/Utils/DeleteAlertDialog';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { useModalUser } from '../../../Contexts/Modal/UserContext';
import { ApiException } from '../../../services/api/ApiException';
import { IUsuario, UsuarioService } from '../../../services/api/usuarios/UsuarioService';
import { getDecrypted } from '../../../utils/crypto';
import { FormUser } from './FormUser';

export function ModalUser() {
  const { onClose, isOpen } = useModalUser();
  const { isOpen: isExcluirOpen, onOpen, onClose: onExcluirClose } = useDisclosure();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const toast = useToast();
  const [id, setId] = useState<number>(0);
  const [data, setData] = useState<IUsuario[]>([]);
  const [dataToUpdate, setDataToUpdate] = useState<IUsuario>();
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDeleteClient = async (userId: number) => {
    UsuarioService.deleteById(userId, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: 'Usuário excluido com sucesso.',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          getUsers();
        }
      });
    onExcluirClose();
  };

  const handleOpenDialog = (id: number) => {
    onOpen();
    setId(id);
  };

  const handleEditClient = (id: number) => {
    const userToUpdate = data.find((user) => user.id === id);
    if (userToUpdate) {
      setId(id);
      setDataToUpdate(userToUpdate);
      setIsEditing(true);
    }
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
              <TableContainer  w="90%" borderRadius={8} overflowY='auto' >
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
                          <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditClient(data.id!)}>
                            <Icon color="orange.300" as={FiEdit} />
                          </Button>
                          <Button variant="ghost" colorScheme="red" isDisabled={data.usuario_principal === 'Sim'} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleOpenDialog(data.id!)}>
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
              <FormUser id={id} isEditing={isEditing} dataToUpdate={dataToUpdate!} getUsers={getUsers} isDisabled={isDisabled} setIsDisabled={handleRegisterNewUser}/>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex justify='space-between' w='100%'>
            <Button variant='outline' colorScheme="green" onClick={handleRegisterNewUser}>Cadastrar</Button>
            <Button variant='outline' colorScheme="red" onClick={closeModal}>Cancelar</Button>
          </Flex>
        </ModalFooter>
        <DeleteAlertDialog id={id} label='Usuário' isOpen={isExcluirOpen} onClose={onExcluirClose} deleteFunction={handleDeleteClient}/>
      </ModalContent>
    </Modal>
  );
}
