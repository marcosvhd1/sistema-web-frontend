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
  ModalOverlay
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useModalService } from '../../../../../Contexts/Modal/ServiceContext';
import { ApiException } from '../../../../../services/api/ApiException';
import { IServico, ServicoService } from '../../../../../services/api/servicos/ServicoService';
import { FormFields } from './FormFields';

interface ModalProps {
  // changeEdit: (value: React.SetStateAction<any>) => void;
  refreshPage: () => void
  isEditing: boolean
  id: number
  editCod: number
}

export function FormModal({ isEditing, id, refreshPage, editCod }: ModalProps) {
  const { isOpen, onClose } = useModalService();
  const methods = useFormContext<IServico>();

  const clearForm = () => {
    onClose();
    methods.reset({
      descricao: '',
      un: '',
      preco:parseFloat(''),
      anotacoes: '',
      base_iss: parseFloat(''),
      aliquota_iss: parseFloat(''),
      situacao: '',
      item_lista: '',
      ncm: '',
    });
  };

  const handleCreateNewService = (data: IServico) => {
    ServicoService.create(data)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          clearForm();
          refreshPage();
        }
      });
  };

  const handleUpdateService = (data: IServico) => {
    ServicoService.updateById(id, data)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          clearForm();
          refreshPage();
        }
      });
  };

  const submitData = (data: IServico) => {
    if (isEditing)
      handleUpdateService(data);
    else
      handleCreateNewService(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size="xl"
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>Cadastro de Serviço</ModalHeader>
          <ModalCloseButton onClick={() => { clearForm(); }} />
          <ModalBody>
            <FormFields editCod={editCod} isEditing={isEditing} />
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} /> {isEditing ? 'Editar' : 'Cadastrar'}</Button>
              <Button colorScheme='red' variant="outline" mr={3} onClick={() => { clearForm(); }}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}