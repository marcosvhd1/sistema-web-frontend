import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Td, Table, TableContainer, Tbody, Th, Thead, Tr, useDisclosure, useToast, Tag } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable } from '../../components/Table/DataTable';
import { DeleteAlertDialog } from '../../components/Utils/DeleteAlertDialog';
import { useEmissorContext } from '../../Contexts/EmissorProvider';
import { useModalUser } from '../../Contexts/Modal/UserContext';
import { ApiException } from '../../services/api/ApiException';
import { IUsuario, UsuarioService } from '../../services/api/usuarios/UsuarioService';
import { getDecrypted } from '../../utils/crypto';
import { FormUser } from './FormUser';
import { useForm, FormProvider } from 'react-hook-form';
import { EmissorService, IEmissor } from '../../services/api/emissor/EmissorService';
import { userInfos } from '../../utils/header';

export function ModalUser() {
  const { onClose, isOpen } = useModalUser();
  const { isOpen: isExcluirOpen, onOpen, onClose: onExcluirClose } = useDisclosure();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const toast = useToast();
  const [id, setId] = useState<number>(0);
  const [data, setData] = useState<IUsuario[]>([]);
  const [dataToUpdate, setDataToUpdate] = useState<IUsuario>();
  const [isEditing, setIsEditing] = useState(false);
  const [isPrincipal, setIsPrincipal] = useState(false);
  const [active, setActive] = useState<boolean>(true);
  const { setIdEmissor, setIdUsuarioSelecionado, getIdEmissoresByUser} = useEmissorContext();
  const methods = useForm();

  const headers: { key: string, label: string }[] = [
    { key: 'login', label: 'Login' },
    { key: 'status', label: 'Status' },
  ];

  const userInfo = userInfos();
  const idUser = userInfo.infos?.idUser;
  const permissao = userInfo.infos?.permissao;
  const cnpjcpf = userInfo.infos?.empresa;
  const HEADERS = userInfo.header;


  const handleRegisterNewUser = () => {
    setIsDisabled(false);
    setIsEditing(false);
    setIdEmissor([]);
  };

  const closeModal = () => {
    onClose();
    setIsDisabled(true);
    setDataToUpdate({
      email: '',
      password: '',
    });
  };

  const getUsers = async () => {
    const resultData = await UsuarioService.getAllUsers(cnpjcpf, HEADERS);
    setData(resultData);
  };

  const handleDeleteClient = async (userId: number) => {
    UsuarioService.deleteById(userId, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
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
      setIsDisabled(false);
      setIsPrincipal(userToUpdate.usuario_principal == 'Sim' ? true : false);
      setActive(userToUpdate.status === 'Ativo');
      setIdUsuarioSelecionado(id);
      getIdEmissoresByUser();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <Modal
      isCentered
      onClose={closeModal}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      scrollBehavior={'inside'}
      motionPreset='slideInBottom'
      size='2xl'
    >
      <ModalOverlay />
      <FormProvider {...methods}>
        <ModalContent>
          <ModalHeader>Usuários</ModalHeader>
          <ModalCloseButton onClick={closeModal}/>
          <ModalBody>
            <Flex w='100%' h='22rem' p='.5rem' justify='space-between' borderBottom='.1rem solid #e1e1e3'>
              <Flex w='55%' borderRight='.1rem solid #e1e1e3'>
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
                          <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} >
                            <Tag variant='outline' colorScheme={data.status === 'Ativo' ? 'green' : 'red'}>
                              {data.status}
                            </Tag>
                          </Td>
                          <Td style={{ 'textAlign': 'center' }}>
                            <Button variant="ghost" colorScheme="orange" isDisabled={permissao === 0 && data.id !== idUser} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditClient(data.id!)}>
                              <Icon color="orange.300" as={FiEdit} />
                            </Button>
                            <Button variant="ghost" colorScheme="red" isDisabled={data.usuario_principal === 'Sim' || permissao === 0 && data.id !== idUser} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleOpenDialog(data.id!)}>
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
                <FormUser setActive={setActive} active={active} setIsEditing={setIsEditing} id={id} setIdEmissor={setIdEmissor} isEditing={isEditing} dataToUpdate={dataToUpdate!} getUsers={getUsers} isDisabled={isDisabled} isPrincipal={isPrincipal}/>
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
      </FormProvider>
    </Modal>
  );
}
