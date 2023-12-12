import { Button, Divider, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { FiEdit2, FiSearch, FiShare } from 'react-icons/fi';
import { useModalNFClient } from '../../../../../../../Contexts/Modal/NotaFiscal/NFClientContext';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { ICFOP } from '../../../../../../../services/api/cfop/CFOPService';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { ModalNFClient } from './ModalNFClient';

interface FormDadosPrincipaisProps {
  cfops: ICFOP[],
  shareCFOP: () => void;
  model: string;
}

export function FormDadosPrincipais({ cfops, shareCFOP, model }: FormDadosPrincipaisProps) {
  const methods = useFormContext<INotaFiscal>();

  const [codBlock, setCodBlock] = useState<boolean>(true);

  const { onOpen } = useModalNFClient();
  const { colorMode } = useColorMode();

  const handleBlockCod = () => {
    setCodBlock(!codBlock);
  };

  const onChangeNatureza = (data: any) => {
    const cfop = cfops.find((cfop) => cfop.natureza === data.target.value);
    if (cfop !== undefined) methods.setValue('cfop', cfop.cfop_dentro ?? '');
  };

  return (
    <FormProvider {...methods}>
      <Flex w="100%" justify="center" align="center" direction="column" >
        {/* DADOS PRINCIPAIS */}
        <Flex w="100%" mr="4" ml='4' align="center" justify="space-between">
          <FormContainer width='15%' label='N° da nota'>
            <Input disabled={codBlock} maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('cod')} />
          </FormContainer>

          <Button onClick={handleBlockCod} variant="ghost" colorScheme="orange" mt={7} ml={2} mr={2}>
            <Icon as={FiEdit2} />
          </Button>

          <FormContainer width='10%' label='Série' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('serie')} />
          </FormContainer>

          <FormContainer width='50%' label='Natureza de Operação' mr='3'>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('natureza_operacao')} onChange={(data) => onChangeNatureza(data)}>
              {cfops.map((data) => (<option key={data.id} value={data.natureza}>{data.natureza}</option>))}
            </Select>
          </FormContainer>

          <FormContainer width='20%' label='CFOP'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('cfop')} />
          </FormContainer>

          <Button onClick={shareCFOP} variant="ghost" colorScheme="green" mt={7} ml={2}>
            <Icon as={FiShare} />
          </Button>
        </Flex>
        {/* OUTRAS INFOS */}
        <Flex w="100%" mb="4" mr="4" ml="4" align="center" justify="space-between">

          <FormContainer width='25%' label='Tipo' mr='3'>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('tipo')}>
              <option value='1'>Saída</option>
              <option value='0'>Entrada</option>
            </Select>
          </FormContainer>
          <FormContainer width='25%' label='Finalidade' mr='3'>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('finalidade')}>
              <option value='1'>NFe normal</option>
              <option value='2'>NFe complementar</option>
              <option value='3'>NFe de ajuste</option>
              <option value='4'>Devolução/Retorno</option>
            </Select>
          </FormContainer>
          <FormContainer width='20%' label='Status' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" defaultValue={'Em digitação'} readOnly {...methods.register('status')} />
          </FormContainer>
          <FormContainer width='15%' label='Modelo' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly value={model} />
          </FormContainer>
          <FormContainer width='15%' label='Consumidor Final'>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('consumidor_final')} defaultValue={ model == '55' ? 0 : 1}>
              <option value='0'>Não</option>
              <option value='1'>Sim</option>
            </Select>
          </FormContainer>
        </Flex>
        {/* DADOS DESTINATARIO */}
        <Flex w="100%" align="center" justify="space-between">
          {/* DESTINATARIO */}
          <Flex w="100%" direction="column" mr='5'>
            <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap" mb={2} mt={2}>
              <Divider w="20%" />
              <Text w="max" mr={3} ml={3}>{ model == '55' ? 'Dados do Destinatário / Remetente' : 'Consumidor (Opcional)'}</Text>
              <Divider />
            </Flex>
            <Flex align="center" justify="space-between">

              <FormContainer width="20%" label='* Código' mr='3'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.cod')}/>
              </FormContainer>

              <FormContainer width="55%" label='* Nome / Razão Social' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.razao')}/>
              </FormContainer>

              <FormContainer width="25%" label='* CPF / CNPJ' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.cnpjcpf')}/>
              </FormContainer>

            </Flex>
            <Flex align="center" justify="space-between">
              
              <FormContainer width="40%" label='* Endereço' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.logradouro')}/>
              </FormContainer>

              <FormContainer width="15%" label='* Nº' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.numero')}/>
              </FormContainer>

              <FormContainer width="20%" label='* Bairro' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.bairro')}/>
              </FormContainer>

              <FormContainer width="25%" label='* CEP' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.cep')}/>
              </FormContainer>

            </Flex>
            <Flex align="center" justify="space-between">

              <FormContainer width="40%" label='* Cidade' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.cidade')}/>
              </FormContainer>

              <FormContainer width="15%" label='* UF' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.uf')}/>
              </FormContainer>

              <FormContainer width="20%" label='Telefone' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.telefone1')}/>
              </FormContainer>

              <FormContainer width="25%" label='* Inscrição Estadual' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.ie')}/>
              </FormContainer>

            </Flex>
            <Flex align="center" justify="space-between">

              <FormContainer width="40%" label='Complemento' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.complemento')}/>
              </FormContainer>

              <FormContainer width="15%" label='SUFRAMA' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.suframa')}/>
              </FormContainer>

              <FormContainer width="20%" label='País' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.pais')}/>
              </FormContainer>

              <Button onClick={onOpen} w="25%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue">
                <Icon mr={2} as={FiSearch} />
                Buscar
              </Button>
            </Flex>
          </Flex>
          <Flex w="25%" align="center" justify="space-between" direction="column" alignSelf="flex-start">
            <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap" mb={2} mt={2}>
              <Divider w="20%" />
              <Text w="max" mr={3} ml={3}>Data / Hora</Text>
              <Divider />
            </Flex>

            <FormContainer label='Data Emissão' >
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="date" {...methods.register('data_emissao')} defaultValue={new Date().toISOString().split('T')[0]} />
            </FormContainer>

            <FormContainer label='Data Saída' >
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="date" {...methods.register('data_saida')} defaultValue={new Date().toISOString().split('T')[0]}/>
            </FormContainer>

            <FormContainer label='Hora Saída' >
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="time" {...methods.register('hora')} defaultValue={`${new Date().toLocaleTimeString().split(':')[0]}:${new Date().toLocaleTimeString().split(':')[1]}`}/>
            </FormContainer>

          </Flex>
        </Flex>
        <ModalNFClient />
      </Flex>
    </FormProvider>
  );
}
