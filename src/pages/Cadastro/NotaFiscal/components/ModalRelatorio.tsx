import { Button, Checkbox, Flex, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaThList } from 'react-icons/fa';
import { FiSearch, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../Contexts/EmissorProvider';
import { useModalNFRelatorio } from '../../../../Contexts/Modal/NotaFiscal/NFRelatorioContext';
import { FormContainer } from '../../../../components/Form/FormContainer';
import { RelatoriosService } from '../../../../services/api/relatorios/Relatorios';
import { userInfos } from '../../../../utils/header';

interface DadosRelatorio {
  cliente: string,
  cfop: string,
  dataIni: string,
  dataFim: string,
}

export function ModalRelatorio() {
  const methods = useForm<DadosRelatorio>();

  const [modelo55, setModelo55] = useState<boolean>(true);
  const [modelo65, setModelo65] = useState<boolean>(false);

  const [tipo1, setTipo1] = useState<boolean>(true);
  const [tipo2, setTipo2] = useState<boolean>(false);
  
  const [enviada, setEnviada] = useState<boolean>(true);
  const [digitacao, setDigitacao] = useState<boolean>(false);
  const [cancelada, setCancelada] = useState<boolean>(false);
  const [inutilizada, setInutilizada] = useState<boolean>(false);

  const { colorMode } = useColorMode();
  const { isOpen, onClose } = useModalNFRelatorio();
  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const handleGerar = () => {
    RelatoriosService.gerencial(
      methods.getValues('cliente'),
      methods.getValues('cfop'),
      methods.getValues('dataIni'),
      methods.getValues('dataFim'),
      modelo55,
      modelo65,
      tipo1,
      tipo2,
      enviada,
      digitacao,
      cancelada,
      inutilizada,
      idEmissorSelecionado, 
      HEADERS
    ).then((response) => {
      console.log(response);
    });
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
      <form onSubmit={methods.handleSubmit(handleGerar)}>
        <ModalContent>
          <ModalHeader>
            <Flex w='100%' justify='flex-start' align='center'>
              <Text>Relatório Gerencial</Text>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Flex w='100%' justify='center' align='center' direction='column'>
              <Flex w='100%' justify='center' align='center'>
                <FormContainer label='Cliente' mr='3'>
                  <Input type='text' readOnly borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cliente')}/>
                </FormContainer>
                <Button w="15%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue">
                  <Icon mr={2} as={FiSearch} />
                    Buscar
                </Button>
              </Flex>
              <Flex w='100%' justify='center' align='center'>
                <FormContainer label='CFOP' mr='3'>
                  <Input type='text' maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cfop')}/>
                </FormContainer>
                <FormContainer label='Data Inicio' mr='3'>
                  <Input type="date" maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('dataIni')}/>
                </FormContainer>
                <FormContainer label='Data Fim'>
                  <Input type="date" maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('dataFim')}/>
                </FormContainer>
              </Flex>
              <Flex w='100%' justify='center' align='center'>
                <FormContainer label='Modelo' width='15%'>
                  <Flex w='100%' justify='flex-start' align='center'>
                    <Flex cursor='pointer' mr={3}>
                      <Checkbox size='lg' mr='2' isChecked={modelo55} onChange={() => setModelo55(!modelo55)} />
                      <Text onClick={() => setModelo55(!modelo55)}>55</Text>
                    </Flex>
                    <Flex cursor='pointer'>
                      <Checkbox size='lg' mr='2' isChecked={modelo65} onChange={() => setModelo65(!modelo65)} />
                      <Text onClick={() => setModelo65(!modelo65)}>65</Text>
                    </Flex>
                  </Flex>
                </FormContainer>
                <FormContainer label='Tipo' width='35%'>
                  <Flex w='100%' justify='flex-start' align='center'>
                    <Flex cursor='pointer' mr={3}>
                      <Checkbox size='lg' mr='2' isChecked={tipo1} onChange={() => setTipo1(!tipo1)} />
                      <Text onClick={() => setTipo1(!tipo1)}>Notas de Saída</Text>
                    </Flex>
                    <Flex cursor='pointer'>
                      <Checkbox size='lg' mr='2' isChecked={tipo2} onChange={() => setTipo2(!tipo2)} />
                      <Text onClick={() => setTipo2(!tipo2)}>Notas de Entrada</Text>
                    </Flex>
                  </Flex>
                </FormContainer>
                <FormContainer label='Status' width='50%'>
                  <Flex w='100%' justify='flex-start' align='center'>
                    <Flex cursor='pointer' mr={3}>
                      <Checkbox size='lg' mr='2' isChecked={enviada} onChange={() => setEnviada(!enviada)} />
                      <Text onClick={() => setEnviada(!enviada)}>Enviada</Text>
                    </Flex>
                    <Flex cursor='pointer' mr={3}>
                      <Checkbox size='lg' mr='2' isChecked={digitacao} onChange={() => setDigitacao(!digitacao)} />
                      <Text onClick={() => setDigitacao(!digitacao)}>Em Digitação</Text>
                    </Flex>
                    <Flex cursor='pointer' mr={3}>
                      <Checkbox size='lg' mr='2' isChecked={cancelada} onChange={() => setCancelada(!cancelada)} />
                      <Text onClick={() => setCancelada(!cancelada)}>Cancelada</Text>
                    </Flex>
                    <Flex cursor='pointer'>
                      <Checkbox size='lg' mr='2' isChecked={inutilizada} onChange={() => setInutilizada(!inutilizada)} />
                      <Text onClick={() => setInutilizada(!inutilizada)}>Inutilizada</Text>
                    </Flex>
                  </Flex>
                </FormContainer>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex w='100%' justify='space-between' align='center'>
              <Button type='submit' w='10%' variant='solid' colorScheme='green'><Icon as={FaThList} mr={2} />Gerar</Button>
              <Button w='10%' onClick={onClose}><Icon as={FiSlash} mr={2} />Fechar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}