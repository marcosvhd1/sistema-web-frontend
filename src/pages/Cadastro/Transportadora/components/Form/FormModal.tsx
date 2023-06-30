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
import { useState } from 'react';

interface ModalProps {
  refreshPage: (description: string) => void
  getCod: () => void
  isEditing: boolean
  id: number
  cod: number
  editCod: number
  header: any
}

export function FormModal({ isEditing, id, refreshPage, editCod, cod, getCod, header }: ModalProps) {
  const methods = useFormContext<ITransportadora>();
  const toast = useToast();
  const { isOpen, onClose } = useModalTransportadora();
  const { idEmissorSelecionado } = useEmissorContext();

  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleCreateNewTransportadora = (data: ITransportadora) => {
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
      TransportadoraService.create(data, header)
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
            <FormFields getCod={getCod} cod={cod} editCod={editCod} isEditing={isEditing} id={id}/>
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
