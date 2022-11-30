import { Button, Flex, Icon, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFormContext, useForm } from 'react-hook-form';
import { FcPlus } from 'react-icons/fc';
import { FiCheck, FiEdit, FiSlash, FiTrash2 } from 'react-icons/fi';
import { DeleteAlertDialog } from '../../../../../components/Utils/DeleteAlertDialog';
import { useAlertProductGroupContext } from '../../../../../Contexts/AlertDialog/AlertProductGroupContext';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { useModalGroup } from '../../../../../Contexts/Modal/GroupConxtext';
import { ApiException } from '../../../../../services/api/ApiException';
import { GroupService, IGroup } from '../../../../../services/api/produtos/GroupService';

interface IGroupModal {
  isMarca: boolean
  header: any
}

export function GroupModal({ isMarca, header }: IGroupModal) {
  const {isOpen, onClose} = useModalGroup();
  const {isOpen: isAberto, onOpen, onClose: aoFechar} = useAlertProductGroupContext();
  const { idEmissorSelecionado } = useEmissorContext();
  const [id, setId] = useState<number>(0);
  const { colorMode } = useColorMode();
  const [data, setData] = useState<IGroup[]>([]);
  const methods = useForm<IGroup>();
  const toast = useToast();

  const clearForm = () => {
    onClose();
    methods.reset({
      descricao: ''
    });
  };

  const getDados = async () => {
    GroupService.getAll(idEmissorSelecionado, header)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
        }});
  };

  useEffect(() => {
    getDados();
  }, []);

  const submitData = async () => {
    const dataToCreate = {
      'id_emissor': idEmissorSelecionado,
      'descricao': methods.watch(('descricao')),
      'tipo': isMarca ? 'Marca' : 'Grupo'
    };
    if (dataToCreate.descricao.trim().length === 0) {
      toast({
        position: 'top',
        title: 'Erro ao cadastrar.',
        description: 'Descrição inválida',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      await GroupService.create(dataToCreate, header);
    }
  };

  const addGrupo = () => {
    submitData();
    getDados();
    methods.reset({
      descricao: ''
    });
  };

  const handleDeleteGroup = (groupId: number) => {
    GroupService.deleteData(groupId, idEmissorSelecionado, header)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: `${isMarca ? 'Marca' : 'Grupo'} excluído com sucesso.`,
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          getDados();
        }
      });
    aoFechar();
  };

  const handleOpenDialog = (id: number) => {
    onOpen();
    setId(id);
  };


  return (

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size='md'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isMarca ? 'Marcas' : 'Grupos'}
        </ModalHeader>
        <ModalCloseButton onClick={clearForm}/>
        <ModalBody>
          <TableContainer w="90%" >
            <Flex gap='3' align='center' mb='1rem'>
              <Input {...methods.register('descricao')} placeholder={isMarca ? 'Adicionar Marca' : 'Adicionar Grupo'} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}/>
              <IconButton onClick={addGrupo} variant='outline' fontSize="2xl" aria-label='Botao de adicionar grupo' icon={<FcPlus />}  _hover={{'filter': 'brightness(0.8)'}} transition='0.3s' />
            </Flex>
            <Table colorScheme='blackAlpha' size="sm" variant='simple' >
              <Thead bg="whiteAlpha.100">
                <Tr style={{'height': '2rem'}}>
                  {
                    isMarca
                      ?
                      <Th fontSize="0.7rem">Marca</Th>
                      :
                      <Th fontSize="0.7rem">Grupo</Th>
                  }
                  <Th style={{'textAlign': 'center'}} fontSize="0.7rem">Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                { isMarca
                  ?
                  data != undefined ? data.map((data) => (
                    <Tr key={data.id}>
                      {
                        data.tipo.toUpperCase() === 'MARCA'
                          ?
                          <>
                            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.descricao!}</Td>
                            <Td style={{ 'textAlign': 'center', 'width': '1rem' }}>
                              <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem">
                                <Icon color="orange.300" as={FiEdit} />
                              </Button>
                              <Button onClick={() => handleOpenDialog(data.id)} variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem">
                                <Icon as={FiTrash2} color="red.400" />
                              </Button>
                            </Td>
                          </>
                          :
                          <></>
                      }

                    </Tr>
                  )) : <></>
                  :
                  data != undefined ? data.map((data) => (
                    <Tr key={data.id}>
                      {
                        data.tipo.toUpperCase() === 'GRUPO'
                          ?
                          <>
                            <Td style={{ 'width': '1rem' }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.descricao}</Td>
                            <Td style={{ 'textAlign': 'center' }}>
                              <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem">
                                <Icon color="orange.300" as={FiEdit} />
                              </Button>
                              <Button onClick={() => handleOpenDialog(data.id)} variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem">
                                <Icon as={FiTrash2} color="red.400" />
                              </Button>
                            </Td>
                          </>
                          :
                          <></>
                      }

                    </Tr>
                  )) : <></>
                }
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Flex w="100%" justify="space-between" >
            <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} />Salvar</Button>
            <Button onClick={clearForm} colorScheme='red' variant="outline" mr={3}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
      <DeleteAlertDialog label={isMarca ? 'Marca' : 'Grupo'} deleteFunction={handleDeleteGroup} onClose={aoFechar} isOpen={isAberto} id={id}/>
    </Modal>
  );
}
