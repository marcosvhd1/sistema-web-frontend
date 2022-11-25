import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  useColorMode,
  useToast
} from '@chakra-ui/react';

import { useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';

import { FormFields } from './FormFields';

import { useModalClient } from '../../../../../Contexts/Modal/ClientContext';

import { ApiException } from '../../../../../services/api/ApiException';
import { ClientService } from '../../../../../services/api/clientes/ClientService';
import { IClient } from '../../../../../services/api/clientes/ClientService';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';

interface ModalProps {
  // changeEdit: (value: React.SetStateAction<any>) => void
  refreshPage: (description: string) => void
  getCod: () => void
  cod: number
  isEditing: boolean
  id: number
  editCod: number
  header: any
}

export function FormModal({ isEditing, id, editCod, cod, refreshPage, header, getCod }: ModalProps) {
  const { isOpen, onClose } = useModalClient();
  const methods = useFormContext<IClient>();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { idEmissorSelecionado } = useEmissorContext();

  // console.log('form Modal cod ' + cod);

  const clearForm = () => {
    onClose();
    methods.reset({
      razao: '',
      fantasia: '',
      bairro: '',
      categoria:'cliente',
      cep: '',
      cidade: '',
      cnpjcpf: '',
      complemento: '',
      email1: '',
      email2: '',
      ie: '',
      im: '',
      logradouro: '',
      numero: '',
      observacao: '',
      rg: '',
      site: '',
      suframa: '',
      telefone1: '',
      telefone2: '',
      telefone3: '',
      tipo:'j',
      tipo_contribuinte: '',
      tipo_telefone1: '',
      tipo_telefone2: '',
      tipo_telefone3: '',
      uf: '',
    });
  };

  const handleUpdateClient = (data: IClient) => {
    ClientService.updateById(id, data, idEmissorSelecionado, header)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          clearForm();
          refreshPage('');
        }
      });
  };

  const handleCreateNewClient = async (data: IClient) => {
    data.id_emissor = idEmissorSelecionado;
    if (data.razao.trim().length === 0) {
      toast({
        position: 'top',
        title: 'Erro ao cadastrar.',
        description: 'Nome / Razão inválido',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      ClientService.create(data, header)
        .then((result) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            clearForm();
            refreshPage('');
          }
        });
    }
  };

  const submitData = (data: IClient) => {
    if (isEditing)
      handleUpdateClient(data);
    else
      handleCreateNewClient(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size="5xl"
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>Cadastro Clientes / Fornecedores</ModalHeader>
          <ModalCloseButton onClick={() => clearForm()} />
          <ModalBody>
            <Tabs variant='enclosed' colorScheme="gray">
              <TabList>
                <Tab>1. Dados Principais</Tab>
                <Tab>2. Observações</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormFields getCod={getCod} cod={cod} editCod={editCod} isEditing={isEditing}/>
                </TabPanel>
                <TabPanel>
                  <Textarea borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} h="37rem" placeholder='Observações...' {...methods.register('observacao')} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} />{isEditing ? 'Editar' : 'Cadastrar'}</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={() => clearForm()}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
