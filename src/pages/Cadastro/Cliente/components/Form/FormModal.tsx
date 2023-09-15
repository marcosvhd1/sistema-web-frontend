import { Button, Flex, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea, useColorMode, useToast } from '@chakra-ui/react';
import { useState } from 'react';

import { useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';

import { FormFields } from './FormFields';

import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { useModalClient } from '../../../../../Contexts/Modal/ClientContext';
import { ApiException } from '../../../../../services/api/ApiException';
import { ClientService, IClient } from '../../../../../services/api/clientes/ClientService';

interface ModalProps {
  refreshPage: (description: string) => void
  getCod: () => void
  isEditing: boolean
  id: number
  header: any
}

export function FormModal({ isEditing, id, refreshPage, header, getCod }: ModalProps) {
  const methods = useFormContext<IClient>();
  const toast = useToast();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [IErequired, setIErequired] = useState<boolean>(false);

  const { isOpen, onClose } = useModalClient();
  const { colorMode } = useColorMode();
  const { idEmissorSelecionado } = useEmissorContext();

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
    setFormSubmitted(false);
  };

  const hasErrors = () => {
    const camposObrigatorios: any[] = ['cod', 'razao', 'cnpjcpf', 'logradouro', 'numero', 'bairro', 'cep', 'uf', 'cidade'];
    
    for (const campo of camposObrigatorios) {
      if (methods.getValues(campo) === '') {
        let msg = '';
        switch (campo) {
        case camposObrigatorios[0]: 
          msg = 'Está faltando preencher o CÓDIGO.';
          methods.setFocus(camposObrigatorios[0]);
          break;
        case camposObrigatorios[1]: 
          msg = 'Está faltando preencher a RAZÃO SOCIAL.';
          methods.setFocus(camposObrigatorios[1]);
          break;
        case camposObrigatorios[2]: 
          msg = 'Está faltando preencher o CPF / CNPJ.';
          methods.setFocus(camposObrigatorios[2]);
          break;
        case camposObrigatorios[3]: 
          msg = 'Está faltando preencher a RUA.';
          methods.setFocus(camposObrigatorios[3]);
          break;
        case camposObrigatorios[4]: 
          msg = 'Está faltando preencher o NÚMERO.';
          methods.setFocus(camposObrigatorios[4]);
          break;
        case camposObrigatorios[5]: 
          msg = 'Está faltando preencher o BAIRRO.';
          methods.setFocus(camposObrigatorios[5]);
          break;
        case camposObrigatorios[6]: 
          msg = 'Está faltando preencher o CEP.';
          methods.setFocus(camposObrigatorios[6]);
          break;
        case camposObrigatorios[7]: 
          msg = 'Está faltando selecionar a UF.';
          methods.setFocus(camposObrigatorios[7]);
          break;
        case camposObrigatorios[8]: 
          msg = 'Está faltando selecionar a CIDADE.';
          methods.setFocus(camposObrigatorios[8]);
          break;
        }

        toast({
          position: 'top',
          description: msg,
          status: 'error',
          duration: 4000,
        });
        return true;
      }
    }

    if(IErequired && methods.getValues('ie') === '') {
      toast({
        position: 'top',
        description: 'Está faltando preencher a INSCRIÇÃO ESTADUAL.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      methods.setFocus('ie');
      return true;
    }

    return false;
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

  const submitData = (data: IClient) => {
    if (hasErrors()) return;

    setFormSubmitted(true);
    
    if (isEditing) handleUpdateClient(data);
    else handleCreateNewClient(data);
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
          <ModalBody>
            <Tabs 
              variant="enclosed"
              colorScheme="gray"
              w="100%"
            >
              <TabList>
                <Tab>1. Dados Principais</Tab>
                <Tab>2. Observações</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormFields 
                    getCod={getCod} 
                    id={id}
                    setIErequired={setIErequired}
                  />
                </TabPanel>
                <TabPanel>
                  <Textarea maxLength={5000} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} h="37rem" placeholder='Observações...' {...methods.register('observacao')} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Button type="submit" variant='solid' colorScheme="green" disabled={formSubmitted}>
                <Icon as={FiCheck} mr={2} />
                Salvar
              </Button>
              <Button onClick={clearForm}><Icon as={FiSlash} mr={2}/>Fechar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
