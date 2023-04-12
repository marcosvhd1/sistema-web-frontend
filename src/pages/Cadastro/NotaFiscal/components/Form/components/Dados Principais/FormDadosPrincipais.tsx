import { Button, Divider, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { FiCheckCircle, FiEdit, FiSearch } from 'react-icons/fi';
import { useModalNFClient } from '../../../../../../../Contexts/Modal/NotaFiscal/NFClientContext';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { INotaFiscal, NotaFiscalService } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { ModalNFClient } from './ModalNFClient';
import { userInfos } from '../../../../../../../utils/header';
import { useEmissorContext } from '../../../../../../../Contexts/EmissorProvider';
import { ICFOP } from '../../../../../../../services/api/cfop/CFOPService';

interface FormDadosPrincipaisProps {
  isEditing: boolean,
  cfops: ICFOP[]
}

export function FormDadosPrincipais({ isEditing, cfops }: FormDadosPrincipaisProps) {
  const methods = useFormContext<INotaFiscal>();

  const { onOpen } = useModalNFClient();
  const { colorMode } = useColorMode();
  const { idEmissorSelecionado } = useEmissorContext();

  const [block, setBlock] = useState<boolean>(true);

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const handleBlockInputCod = () => {
    setBlock(!block);

    if (block) methods.setFocus('cod');
  };

  const getCod = async () => {
    if (!isEditing) {
      const respose = await NotaFiscalService.getLastCod(idEmissorSelecionado, HEADERS);

      const newNumber = parseInt(respose) + 1;

      if (respose !== null) methods.setValue('cod', (`0000${newNumber}`).slice(-4));
      else methods.setValue('cod', '0001');
    }
  };

  useEffect(() => {
    getCod();
  }, [isEditing]);

  const onChangeNatureza = (data: any) => {
    const cfop = cfops.find((cfop) => cfop.natureza === data.target.value);
    if (cfop !== undefined) methods.setValue('cfop', cfop.cfop_dentro ?? '');
  };

  return (
    <FormProvider {...methods}>
      <Flex w="100%" justify="center" align="center" direction="column" >
        {/* DADOS PRINCIPAIS */}
        <Flex w="100%" mr="4" ml='4' align="center" justify="space-between">
          <FormContainer width='20%' label='Nº da NF'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly={block} {...methods.register('cod')} />
          </FormContainer>
          <Button variant="ghost" colorScheme="orange" onClick={handleBlockInputCod} mt={7} ml={1} mr={3} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }}>
            <Icon color="orange" as={FiEdit} />
          </Button>

          <FormContainer width='15%' label='Série' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('serie')} />
          </FormContainer>

          <FormContainer width='65%' label='Natureza de Operação' mr='3'>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('natureza_operacao')} onChange={(data) => onChangeNatureza(data)}>
              {cfops.map((data) => (<option key={data.id} value={data.natureza}>{data.natureza}</option>))}
            </Select>
          </FormContainer>

          <FormContainer width='20%' label='CFOP' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('cfop')} />
          </FormContainer>
          {/* <Button variant="ghost" colorScheme="green" onClick={() => null} mt={7} ml={1} mr={3} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }}>
            <Icon color="green" as={FiCheckCircle} />
          </Button> */}

          <FormContainer width='35%' label='Status'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" defaultValue={'Em digitação'} readOnly {...methods.register('status')} />
          </FormContainer>
        </Flex>
        {/* OUTRAS INFOS */}
        <Flex w="100%" mb="4" mr="4" ml="4" align="center" justify="space-between">

          <FormContainer width='35%' label='Tipo' mr='3'>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('tipo')}>
              <option value='0'>0 - Entrada</option>
              <option value='1'>1 - Saída</option>
            </Select>
          </FormContainer>
          <FormContainer width='40%' label='Forma de Emissão' mr='3'>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('forma_emissao')}>
              <option value='normal'>Normal</option>
              <option value='contingencia'>Contingência</option>
              <option value='contingencia_scan'>Contingência com SCAN</option>
              <option value='contingencia_dpec'>Contingência via DPEC</option>
              <option value='contingencia_fsda'>Contingência FSDA</option>
              <option value='contingencia_svc_an'>Contingência SVC-AN</option>
              <option value='contingencia_svc_rs'>Contingência SVC-RS</option>
              <option value='contingencia_offline'>Contingência Offline</option>
            </Select>
          </FormContainer>
          <FormContainer width='40%' label='Finalidade' mr='3'>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('finalidade')}>
              <option value='1'>1 - NF-e normal</option>
              <option value='2'>2 - NF-e complementar</option>
              <option value='3'>3 - NF-e de ajuste</option>
              <option value='4'>4 - Devolução/Retorno</option>
            </Select>
          </FormContainer>

          <FormContainer width='15%' label='Modelo' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" defaultValue={55} readOnly {...methods.register('modelo')} />
          </FormContainer>

          <FormContainer width='30%' label='Consumidor Final' >
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('consumidor_final')}>
              <option value='0'>0 - Não</option>
              <option value='1'>1 - Sim</option>
            </Select>
          </FormContainer>
        </Flex>
        {/* DADOS DESTINATARIO */}
        <Flex w="100%" align="center" justify="space-between">
          {/* DESTINATARIO */}
          <Flex w="100%" direction="column" mr='5'>
            <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap" mb={2} mt={2}>
              <Divider w="20%" />
              <Text w="max" mr={3} ml={3}>Dados do Destinatário / Remetente</Text>
              <Divider />
            </Flex>
            <Flex align="center" justify="space-between">

              <FormContainer width="20%" label='* Cód' mr='3'>
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

              <FormContainer width="30%" label='* Cidade' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.cidade')}/>
              </FormContainer>

              <FormContainer width="15%" label='* UF' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.uf')}/>
              </FormContainer>

              <FormContainer width="25%" label='Telefone' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.telefone1')}/>
              </FormContainer>

              <FormContainer width="30%" label='Inscrição Estadual' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.ie')}/>
              </FormContainer>

            </Flex>
            <Flex align="center" justify="space-between">

              <FormContainer width="35%" label='Complemento' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.complemento')}/>
              </FormContainer>

              <FormContainer width="25%" label='SUFRAMA' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.suframa')}/>
              </FormContainer>

              <FormContainer width="25%" label='País' mr='3' >
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('destinatario.pais')}/>
              </FormContainer>

              <Button onClick={onOpen} w="20%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue">
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
