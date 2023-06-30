import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useModalNewEmissor } from '../../../Contexts/Modal/NewEmissorContext';
import { ApiException } from '../../../services/api/ApiException';
import { EmissorService, IEmissor, INewEmissor } from '../../../services/api/emissor/EmissorService';
import { userInfos } from '../../../utils/header';
import { FormEmissor } from './FormEmissor';

interface ModalProps {
  refreshPage: (description: string, status: string) => void
  isEditing: boolean
  active: boolean
  setActive: (value: boolean) => void
  seeActive: string
  setIsEditing: (value: boolean) => void
  id: number
}


export function ModalNewEmissor({isEditing, refreshPage, setActive, active, seeActive, setIsEditing, id }: ModalProps) {
  const { onClose, isOpen } = useModalNewEmissor();
  const methods = useFormContext<IEmissor>();
  const userInfo = userInfos();
  const toast = useToast();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const EMPRESA = userInfo.infos?.empresa;
  const HEADERS = userInfo.header;

  const clearForm = () => {
    onClose();
    methods.reset({
      razao: '',
      cnpjcpf: '',
      fantasia: '',
      ie: '',
      im: '',
      endereco: '',
      numero: '',
      cnae: '',
      complemento: '',
      bairro: '',
      telefone: '',
      uf: '',
      cidade: '',
      cep: '',
      regime: '',
    });
    setActive(true);
    setIsEditing(false);
    setFormSubmitted(false);
  };

  const handleCreateNewEmissor = (data: INewEmissor) => {
    const dataToCreate = {
      'cnpjcpf_principal': EMPRESA,
      'razao': data.razao,
      'fantasia': data.fantasia,
      'cnpjcpf': data.cnpjcpf,
      'ie': data.ie,
      'im': data.im,
      'endereco': data.endereco,
      'numero': data.numero,
      'bairro': data.bairro,
      'complemento': data.complemento,
      'cnae': data.cnae,
      'telefone': data.telefone,
      'uf': data.uf,
      'cidade': data.cidade,
      'cep': data.cep,
      'regime': data.regime,
      'status': 'Ativo'
    };
    if (data.razao.trim().length === 0 || data.cnpjcpf.trim().length === 0) {
      toast({
        position: 'top',
        title: 'Erro ao cadastrar.',
        description: 'Os campos são obrigatórios',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      EmissorService.create(dataToCreate, HEADERS)
        .then((result) => {
          if (result instanceof ApiException) console.log(result.message);
          else refreshPage('', seeActive);
        });
    }
  };

  const handleUpdateEmissor = (data: IEmissor) => {
    data.status = active ? 'Ativo' : 'Inativo';
    EmissorService.update(data.id, data, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) console.log(result.message);
        else refreshPage('', seeActive);
      });
  };

  const submitData = (data: any) => {
    setFormSubmitted(true);

    if (isEditing) handleUpdateEmissor(data);
    else handleCreateNewEmissor(data);
    
    clearForm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={clearForm}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size={{md: '4xl', lg: '5xl'}}
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>Cadastro Emissor</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <FormEmissor isEditing={isEditing} active={active} setActive={setActive} id={id}/>
          </ModalBody>
          <ModalFooter>
            <Flex justify='space-between' w='100%'>
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
