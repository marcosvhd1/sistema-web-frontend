import { Button, Flex, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../Contexts/EmissorProvider';
import { useModalNFCCe } from '../../../../Contexts/Modal/NotaFiscal/Sefaz/NFCCeContext';
import { FormContainer } from '../../../../components/Form/FormContainer';
import { INotaFiscal } from '../../../../services/api/notafiscal/NotaFiscalService';
import { SefazService } from '../../../../services/api/sefaz/SefazService';
import { userInfos } from '../../../../utils/header';

interface ModalCCeProps {
  data: INotaFiscal;
  getNotas: (description: string) => void;
}

interface getCorrecao {
  seqEvento: number;
  correcao: string;
}

export function ModalCCe({ data, getNotas }: ModalCCeProps) {
  const { register, setValue, getValues, setFocus, reset } = useForm<getCorrecao>();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { colorMode } = useColorMode();
  const { isOpen, onClose } = useModalNFCCe();
  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const toast = useToast();

  useEffect(() => {
    if (isOpen === true) {
      setValue('seqEvento', 1);
      setTimeout(() => {
        setFocus('correcao');
      }, 100);
    }
  }, [isOpen]);

  const hasErrors = () => {
    if (getValues('seqEvento') < 1) {
      setTimeout(() => {
        setFocus('seqEvento');
      }, 100);
      toast({
        position: 'top',
        description: 'O sequencial do evento está inválido.',
        status: 'error',
        duration: 4000,
      });
      return true;
    } else if (getValues('correcao').length < 15) {
      setTimeout(() => {
        setFocus('correcao');
      }, 100);
      toast({
        position: 'top',
        description: 'A Correção precisa de no mínimo 15 caracteres.',
        status: 'error',
        duration: 4000,
      });
      return true;
    }

    return false;
  };

  const submitData = async () => {
    if (hasErrors()) return;

    setFormSubmitted(true);

    const seqEvento = getValues('seqEvento');
    const correcao = getValues('correcao');

    await SefazService.cce(seqEvento, data.id, correcao, idEmissorSelecionado, HEADERS).then((resp) => {
      if (resp.type == 'success') {
        getNotas('');
        handleClose();
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
    reset({correcao: '', seqEvento: 1});
    onClose();
  };

  const formatDate = (date: string) => {
    const aux = date.split('-');
    return `${aux[2]}/${aux[1]}/${aux[0]}`;
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
            <Text>Carta de Correção</Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex w='100%' justify='flex-start' align='center' direction='column'>
            <Flex w='100%' justify='space-between' align='center'>
              <FormContainer label='Número'>
                <Text>{data != null ? data.cod : ''}</Text>
              </FormContainer>
              <FormContainer label='Data de Emissão'>
                <Text>{data != null ? formatDate(`${data.data_emissao}`) : ''}</Text>
              </FormContainer>
            </Flex>
            <FormContainer label='Número do sequencial do evento'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="numer" {...register('seqEvento')}/>
            </FormContainer>
            <FormContainer label='Correção (min. 15 caracteres)'>
              <Textarea {...register('correcao')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}/>
            </FormContainer>
          </Flex> 
        </ModalBody>
        <ModalFooter>
          <Flex w='100%' justify='space-between' align='center'>
            <Button w='15%' variant='solid' colorScheme='blue' onClick={submitData} disabled={formSubmitted}><Icon as={FiCheck} mr={2} />Corrigir</Button>
            <Button w='15%' onClick={handleClose}><Icon as={FiSlash} mr={2} />Fechar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
