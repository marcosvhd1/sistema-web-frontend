import { Button, Center, Checkbox, Flex, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Text, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaThList } from 'react-icons/fa';
import { FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { useModalNFRelatorio } from '../../../../../Contexts/Modal/NotaFiscal/NFRelatorioContext';
import { FormContainer } from '../../../../../components/Form/FormContainer';
import { RelatoriosService } from '../../../../../services/api/relatorios/Relatorios';
import { userInfos } from '../../../../../utils/header';
import { PDFRelatorio } from './PDFRelatorio';
import { INotaFiscal } from '../../../../../services/api/notafiscal/NotaFiscalService';

interface DadosRelatorio {
  cliente: string,
  cfop: string,
  dataIni: string,
  dataFim: string,
}

export function ModalRelatorio() {
  const methods = useForm<DadosRelatorio>();

  const [estilo, setEstilo] = useState<string>('1');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPDF, setShowPDF] = useState<boolean>(false);

  const [modelo55, setModelo55] = useState<boolean>(true);
  const [modelo65, setModelo65] = useState<boolean>(false);

  const [entrada, setEntrada] = useState<boolean>(false);
  const [saida, setSaida] = useState<boolean>(true);
  
  const [enviada, setEnviada] = useState<boolean>(true);
  const [digitacao, setDigitacao] = useState<boolean>(false);
  const [cancelada, setCancelada] = useState<boolean>(false);
  const [inutilizada, setInutilizada] = useState<boolean>(false);

  const [data, setData] = useState<INotaFiscal[]>([]);

  const { colorMode } = useColorMode();
  const { isOpen, onClose } = useModalNFRelatorio();
  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const handleGetData = () => {
    setIsLoading(true);

    const cliente = methods.getValues('cliente');
    const cfop = methods.getValues('cfop');
    const dataIni = methods.getValues('dataIni');
    const dataFim = methods.getValues('dataFim');

    RelatoriosService.gerencial(cliente, cfop, dataIni, dataFim, modelo55, modelo65, entrada, saida, enviada, digitacao, cancelada, inutilizada, estilo, idEmissorSelecionado, HEADERS)
      .then((response) => {
        setData(response);
        setIsLoading(false);
      });
  };

  const handleOnSubmit = () => {
    setShowPDF(true);
    handleGetData();
  };

  const handleOnClose = () => {
    if (showPDF) setShowPDF(false);
    else onClose();
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
        {
          showPDF ? 
            null :
            <ModalHeader >
              <Flex w='100%' justify='flex-start' align='center'>
                <Text>Relatório Gerencial</Text>
              </Flex>
            </ModalHeader>
        }
        <ModalBody p={showPDF ? 0 : ''}>
          {
            showPDF ? 
              <Flex h='80vh' w='100%'>
                {
                  isLoading ?
                    <Center w='100%'>
                      <Spinner size='lg' /> 
                    </Center> :
                    <PDFRelatorio data={data} estilo={estilo} /> 
                }
              </Flex>
              :
              <Flex w='100%' justify='center' align='center' direction='column'>
                <Flex w='100%' justify='center' align='center'>
                  <FormContainer label='Cliente'>
                    <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cliente')}/>
                  </FormContainer>
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
                <FormContainer label='Estilo'>
                  <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} value={estilo} onChange={(e) => setEstilo(e.target.value)} >
                    <option value="1">Relatório Gerencial Modelo 1</option>
                    <option value="2">Relatório Gerencial Modelo 2</option>
                  </Select>
                </FormContainer>
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
                        <Checkbox size='lg' mr='2' isChecked={saida} onChange={() => setSaida(!saida)} />
                        <Text onClick={() => setSaida(!saida)}>Notas de Saída</Text>
                      </Flex>
                      <Flex cursor='pointer'>
                        <Checkbox size='lg' mr='2' isChecked={entrada} onChange={() => setEntrada(!entrada)} />
                        <Text onClick={() => setEntrada(!entrada)}>Notas de Entrada</Text>
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
          }
        </ModalBody>
        <ModalFooter bgColor={showPDF ? '#525659' : ''}>
          <Flex w='100%' justify='space-between' align='center'>
            <Button w='15%' variant='solid' colorScheme='green' onClick={handleOnSubmit} visibility={showPDF ? 'hidden' : 'visible'}><Icon as={FaThList} mr={2} />Gerar</Button>
            <Button w='15%' onClick={handleOnClose}><Icon as={FiSlash} mr={2} />Fechar</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}