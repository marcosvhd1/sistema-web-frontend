import { Button, Checkbox, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useEmissorContext } from '../../Contexts/EmissorProvider';
import { useModalEmissor } from '../../Contexts/Modal/EmissorContext';
import { userInfos } from '../../utils/header';
import { useContadorContext } from '../../Contexts/ContadorContext';

export function EmissorModal() {
  const { onClose, isOpen } = useModalEmissor();
  const toast = useToast();
  const { setIdEmissorSelecionado, userEmissores, idEmissorSelecionado, handleGetUserInfo, updateUltimoEmissorSelecionado, getCredenciais, getEmissoresByUser } = useEmissorContext();
  const navigate = useNavigate();

  const { getNFDigitacao } = useContadorContext();

  const userInfo = userInfos();

  const idUser = userInfo.infos?.idUser;

  const handleSaveEmissor = () => {
    if (idEmissorSelecionado === null || idEmissorSelecionado === 0) {
      toast({
        position: 'top',
        title: 'Erro',
        description: 'Selecione um emissor.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      getCredenciais();
      updateUltimoEmissorSelecionado();
      navigate('/app');
      onClose();
      getNFDigitacao();
    }
  };

  const closeModal = () => {
    onClose();
    getCredenciais();
  };

  useEffect(() => {
    handleGetUserInfo();
    getEmissoresByUser(idUser);
    getCredenciais();
  }, []);


  return (
    <Modal
      isCentered
      onClose={closeModal}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      scrollBehavior="inside"
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Selecionar Emissor</ModalHeader>
        <ModalBody>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>razão social</Th>
                  <Th>cnpj / cpf</Th>
                  <Th>status</Th>
                </Tr>
              </Thead>
              <Tbody>
                { userEmissores.map((data: any) => (
                  <Tr key={data.id}>
                    <Td style={{ 'width': '.1rem' }} >
                      <Checkbox
                        isChecked={data.id === idEmissorSelecionado}
                        isDisabled={data.status === 'Inativo'}
                        onChange={() => setIdEmissorSelecionado(data.id)}
                        id={data.id}
                      >
                      </Checkbox>
                    </Td>
                    <Td>{data.razao}</Td>
                    <Td>{data.cnpjcpf}</Td>
                    <Td style={{ 'textAlign': 'center' }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                      <Tag variant='outline' colorScheme={data.status === 'Ativo' ? 'green' : 'red'}>
                        {data.status}
                      </Tag>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Flex w="100%" justify="flex-start" >
            <Button variant='solid' colorScheme="green" onClick={handleSaveEmissor}><Icon as={FiCheck} mr={1} />Selecionar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
