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
import { useEmissorContext } from '../../../../../../Contexts/EmissorProvider';
import { useModalNotaFiscal } from '../../../../../../Contexts/Modal/NotaFiscalContext';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';


interface ModalProps {
  cod: number
  isEditing: boolean
  id: number
  editCod: number
  header: any
}

export function FormModal({ isEditing, id, editCod, cod, header }: ModalProps) {
  const { isOpen, onClose } = useModalNotaFiscal();
  const methods = useFormContext<INotaFiscal>();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const { idEmissorSelecionado } = useEmissorContext();

  const clearForm = () => {
    onClose();
    methods.reset({
      
    });
  };


  const handleCreateNewNotaFiscal = async (data: INotaFiscal) => {
    // data.id_emissor = idEmissorSelecionado;
    // if (data.razao.trim().length === 0) {
    //   toast({
    //     position: 'top',
    //     title: 'Erro ao cadastrar.',
    //     description: 'Nome / Razão inválido',
    //     status: 'error',
    //     duration: 2000,
    //     isClosable: true,
    //   });
    // } else {
    //   NotaFiscalService.create(data, header)
    //     .then((result) => {
    //       if (result instanceof ApiException) {
    //         console.log(result.message);
    //       } else {
    //         clearForm();
    //         refreshPage('');
    //       }
    //     });
    // }
  };

  const handleUpdateNotaFiscal = (data: INotaFiscal) => {
    // NotaFiscalService.updateById(id, data, idEmissorSelecionado, header)
    //   .then((result) => {
    //     if (result instanceof ApiException) {
    //       console.log(result.message);
    //     } else {
    //       clearForm();
    //       refreshPage('');
    //     }
    //   });
  };

  const submitData = (data: INotaFiscal) => {
    if (isEditing)
      handleUpdateNotaFiscal(data);
    else
      handleCreateNewNotaFiscal(data);
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
          <ModalHeader>Cadastro de Nota Fiscal</ModalHeader>
          <ModalCloseButton onClick={() => clearForm()} />
          <ModalBody>
            <Tabs variant='enclosed' colorScheme="gray">
              <TabList>
                <Tab>Dados Principais</Tab>
                <Tab>Produtos</Tab>
                <Tab>Serviços</Tab>
                <Tab>Totais</Tab>
                <Tab>Formas de Pagamento</Tab>
                <Tab>Transporte</Tab>
                <Tab>Informações Adicionais</Tab>
                <Tab>Outros</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {/* <FormFields getCod={getCod} cod={cod} editCod={editCod} isEditing={isEditing}/> */}
                </TabPanel>
                <TabPanel>
                  <Textarea borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} h="37rem" placeholder='Informações adicionais...' {...methods.register('info_adicionais')} />
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
