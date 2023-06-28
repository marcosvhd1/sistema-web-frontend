import { Button, Checkbox, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useModalCFOP } from '../../../../Contexts/Modal/CFOPContext';
import { ICFOP } from '../../../../services/api/cfop/CFOPService';
import { FormContainer } from '../../../../components/Form/FormContainer';
import { useState, useEffect } from 'react';

interface ModalCFOPProps {
  addCFOP: (data: ICFOP) => void;
  editCFOP: (data: ICFOP) => void;
  isEditing: boolean;
}

export function ModalCFOP({ addCFOP, editCFOP, isEditing }: ModalCFOPProps) {
  const methods = useFormContext<ICFOP>();

  const [icms, setIcms] = useState<boolean>(false);
  const [icmsST, setIcmsST] = useState<boolean>(false);

  const { isOpen, onClose } = useModalCFOP();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (isOpen === true && isEditing === true) {
      setIcms(methods.getValues('calc_icms'));
      setIcmsST(methods.getValues('calc_icms_st'));
    } else if (isOpen === true && isEditing === false) {
      setIcms(false);
      setIcmsST(false);
    }
  }, [isOpen]);

  const submitData = (data: ICFOP) => {
    data.calc_icms = icms;
    data.calc_icms_st = icmsST;

    if (isEditing) editCFOP(data);
    else addCFOP(data);
    
    onClose();
  };

  const handleChangeIcms = () => {
    setIcms(!icms);
  };

  const handleChangeIcmsST = () => {
    setIcmsST(!icmsST);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior='inside'
      size={{md: '4xl', lg: '5xl'}}
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>
            <Flex w='100%' justify='center' align='center'>
              <Text fontFamily='Poppins' fontSize='xl'>Cadastro de CFOP</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex w='100%' justify='center' align='center' direction='column'>
              <Flex w='100%' justify='center' align='center'>
                <Flex w='100%' justify='flex-start' align='center'>
                  <FormContainer label='CFOP Dentro do estado' width='40%' mr='3'>
                    <Input isRequired maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('cfop_dentro')} />
                  </FormContainer>
                  <FormContainer label='CFOP Fora do estado' width='40%'>
                    <Input isRequired maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('cfop_fora')} />
                  </FormContainer>
                </Flex>
                <Flex w='100%' justify='center' align='center' mt={7}>
                  <Checkbox size='lg' mr='2' isChecked={icms} onChange={handleChangeIcms}/>
                  <Text onClick={handleChangeIcms} mr={10}>Calcular ICMS</Text>
                  <Checkbox size='lg' mr='2' isChecked={icmsST} onChange={handleChangeIcmsST}/>
                  <Text onClick={handleChangeIcmsST}>Calcular ICMS ST</Text>
                </Flex>
              </Flex>
              <FormContainer label='Natureza de Operação' mr='3'>
                <Input isRequired maxLength={300} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('natureza')} />
              </FormContainer>
              <FormContainer label='Informações Complementares' mr='3'>
                <Textarea maxLength={5000} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('info')} />
              </FormContainer>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex w='100%' justify='space-between' >
              <Button variant='solid' colorScheme='green' type='submit'><Icon as={FiCheck} mr={1} />Salvar</Button>
              <Button colorScheme='red' variant='outline' mr={3} onClick={onClose} ><Icon as={FiSlash} mr={1} /> Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
