import { Button, Checkbox, Flex, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tag, Tbody, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useContadorContext } from '../../Contexts/ContadorContext';
import { useEmissorContext } from '../../Contexts/EmissorProvider';
import { useModalEmissor } from '../../Contexts/Modal/EmissorContext';
import { userInfos } from '../../utils/header';
import { TdCustom } from '../Table/TdCustom';

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
                    <TdCustom style={{ 'width': '.1rem' }} >
                      <Checkbox
                        isChecked={data.id === idEmissorSelecionado}
                        isDisabled={data.status === 'Inativo'}
                        onChange={() => setIdEmissorSelecionado(data.id)}
                        id={data.id}
                      >
                      </Checkbox>
                    </TdCustom>
                    <TdCustom>{data.razao}</TdCustom>
                    <TdCustom>{data.cnpjcpf}</TdCustom>
                    <TdCustom style={{ 'textAlign': 'center' }}>
                      <Tag variant='outline' colorScheme={data.status === 'Ativo' ? 'green' : 'red'}>
                        {data.status}
                      </Tag>
                    </TdCustom>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Flex w="100%" justify="space-between">
            <Button onClick={handleSaveEmissor} variant='solid' colorScheme="green">
              <Icon as={FiCheck} mr={2} />
                Salvar
            </Button>
            <Button onClick={closeModal} disabled={idEmissorSelecionado === undefined}><Icon as={FiSlash} mr={2}/>Fechar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
