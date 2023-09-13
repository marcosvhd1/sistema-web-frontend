import { Button, Flex, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../Contexts/EmissorProvider';
import { useModalNFInutilizar } from '../../../../Contexts/Modal/NotaFiscal/Sefaz/NFInutilizarContext';
import { FormContainer } from '../../../../components/Form/FormContainer';
import { SefazService } from '../../../../services/api/sefaz/SefazService';
import { userInfos } from '../../../../utils/header';
import { ConfigService } from '../../../../services/api/config/ConfigService';

interface ModalInutilizarProps {
  getNotas: (description: string) => void;
}

interface getDados {
  serie: string;
  numeroIni: string;
  numeroFin: string;
  description: string;
}

export function ModalInutilizar({ getNotas }: ModalInutilizarProps) {
  const { register, getValues, reset, setFocus, setValue } = useForm<getDados>();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { colorMode } = useColorMode();
  const { isOpen, onClose } = useModalNFInutilizar();
  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      ConfigService.getByEmissor(idEmissorSelecionado, HEADERS).then((result) => {
        if (result !== null && result !== undefined) {
          if (result.serie_padrao.length > 0) setValue('serie', result.serie_padrao);
        }
      });
    }
  }, [isOpen]);

  const hasErrors = () => {
    const camposObrigatorios: any[] = ['numeroIni', 'numeroFin', 'description', 'serie'];

    for (const campo of camposObrigatorios) {
      if (getValues(campo) === '') {
        let msg = '';

        switch (campo) {
        case camposObrigatorios[0]: 
          msg = 'Está faltando preencher a Faixa Inicial.';
          setTimeout(() => {
            setFocus(camposObrigatorios[0]);
          }, 100);
          break;
        case camposObrigatorios[1]: 
          msg = 'Está faltando preencher a Faixa Final.';
          setTimeout(() => {
            setFocus(camposObrigatorios[1]);
          }, 100);
          break;
        case camposObrigatorios[3]: 
          msg = 'Está faltando preencher a Série.';
          setTimeout(() => {
            setFocus(camposObrigatorios[3]);
          }, 100);
          break;
        }

        toast({
          position: 'top',
          description: msg,
          status: 'error',
          duration: 4000,
        });

        return true;
      } else if (getValues('description').length < 15) {
        setTimeout(() => {
          setFocus('description');
        }, 100);

        toast({
          position: 'top',
          description: 'A Justificativa precisa de no mínimo 15 caracteres.',
          status: 'error',
          duration: 4000,
        });

        return true;
      }
    }

    return false;
  };

  const submitData = async () => {
    if (hasErrors()) return;

    setFormSubmitted(true);

    const serie = getValues('serie');
    const numeroIni = getValues('numeroIni');
    const numeroFin = getValues('numeroFin');
    const description = getValues('description');

    await SefazService.inutilizar(serie, numeroIni, numeroFin, description, idEmissorSelecionado, HEADERS).then((resp) => {
      if (resp.type == 'success') {
        handleClose();
        getNotas('');
        toast({
          position: 'top',
          title: 'Operação concluída.',
          description: resp.message,
          status: 'success',
          duration: 2000,
        });
      } else {
        toast({
          position: 'top',
          title: 'Erro',
          description: resp.message ?? 'Não foi possível comunicar com o servidor.',
          status: 'error',
          duration: 10000,
          isClosable: true,
        }); 
      }
    });

    setFormSubmitted(false);
  };

  const handleClose = () => {
    reset({
      description: '',
      numeroFin: '',
      numeroIni: '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior='inside'
      size='5xl'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex w='100%' justify='flex-start' align='center'>
            <Text>Inutilizar Faixa</Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex w='100%' justify='flex-start' align='center' direction='column'>
            <Flex w='100%' justify='space-between' align='center'>
              <FormContainer label='Série' width='30%' mr='3'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('serie')}/>
              </FormContainer>
              <FormContainer label='Faixa Inicial' mr='3'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('numeroIni')}/>
              </FormContainer>
              <FormContainer label='Faixa Final'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('numeroFin')}/>
              </FormContainer>
            </Flex>
            <FormContainer label='Justificativa (min. 15 caracteres)'>
              <Textarea {...register('description')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}/>
            </FormContainer>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex w='100%' justify='space-between' align='center'>
            <Button w='15%' variant='solid' colorScheme='red' onClick={submitData} disabled={formSubmitted}><Icon as={FiCheck} mr={2} />Inutilizar</Button>
            <Button w='15%' onClick={handleClose}><Icon as={FiSlash} mr={2} />Fechar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
