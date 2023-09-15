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
  useToast
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { useModalTransportadora } from '../../../../../Contexts/Modal/TransportadoraContext';
import { ApiException } from '../../../../../services/api/ApiException';
import { ITransportadora, TransportadoraService } from '../../../../../services/api/transportadora/TransportadoraService';
import { FormFields } from './FormFields';
import { useEffect, useState } from 'react';

interface ModalProps {
  refreshPage: (description: string) => void
  getCod: () => void
  isEditing: boolean
  id: number
  header: any
}

export function FormModal({ isEditing, id, refreshPage, getCod, header }: ModalProps) {
  const methods = useFormContext<ITransportadora>();
  const toast = useToast();
  const { isOpen, onClose } = useModalTransportadora();
  const { idEmissorSelecionado } = useEmissorContext();

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen && !isEditing) getCod();
  }, [isOpen]);

  const clearForm = () => {
    onClose();
    methods.reset({
      razao: '',
      cnpjcpf: '',
      ie: '',
      rntrc: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cep: '',
      uf: '',
      cidade: '',
      complemento: '',
      tipo_telefone1: '',
      tipo_telefone2: '',
      telefone1: '',
      telefone2: '',
      anotacoes: '',
      placa: '',
      uf_placa: '',
    });
    setFormSubmitted(false);
  };

  const hasErrors = () => {
    const camposObrigatorios: any[] = ['cod', 'razao', 'cnpjcpf', 'logradouro', 'numero', 'bairro', 'cep', 'uf', 'cidade', 'ie'];
    
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
          msg = 'Está faltando preencher o CNPJ.';
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
        case camposObrigatorios[9]: 
          msg = 'Está faltando preencher a INSCRIÇÃO ESTADUAL.';
          methods.setFocus(camposObrigatorios[9]);
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

    return false;
  };

  const handleCreateNewTransportadora = (data: ITransportadora) => {
    data.id_emissor = idEmissorSelecionado;
    TransportadoraService.create(data, header)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          clearForm();
          refreshPage('');
        }
      });
  };

  const handleUpdateTransportadora = (data: ITransportadora) => {
    TransportadoraService.updateById(id, data, idEmissorSelecionado, header)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          clearForm();
          refreshPage('');
        }
      });
  };

  const submitData = (data: ITransportadora) => {
    if (hasErrors()) return;
    
    setFormSubmitted(true);

    if (isEditing) handleUpdateTransportadora(data);
    else handleCreateNewTransportadora(data);
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
          <ModalHeader>Cadastro de Transportadora</ModalHeader>
          <ModalBody>
            <FormFields 
              id={id}
            />
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
