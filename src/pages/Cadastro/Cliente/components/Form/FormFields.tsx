import { Button, Divider, Flex, Icon, Input, Select, Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { FormContainer } from '../../../../../components/Form/FormContainer';
import { Adress } from './Adress';
import { Contact } from './Contact';

import { useColorMode } from '@chakra-ui/react';
import moment from 'moment';
import { FiSearch } from 'react-icons/fi';
import { IClient } from '../../../../../services/api/clientes/ClientService';
import { ConsultaCNPJService } from '../../../../../services/api/cnpj/CNPJService';
import { formatCnpjCpf, formatarData, removePontuacaoCnpjCpf } from '../../../../../utils/formatarCnpjCpf';
import { validaCpfCnpj } from '../../../../../utils/validaCnpjCpf';

interface IFormFields {
  id: number
  getCod: () => void
  setIErequired: (value: boolean) => void
}

export function FormFields({ id, getCod, setIErequired }: IFormFields) {
  const methods = useFormContext<IClient>();
  const { colorMode } = useColorMode();

  useEffect(() => {
    getCod();
    methods.setFocus('razao');
  }, []);

  const validarCampo = () => {
    const data = methods.getValues('cnpjcpf');
    const formatado = formatCnpjCpf(data);
    if (validaCpfCnpj(formatado)) {
      methods.setValue('cnpjcpf', formatado);
    }
  };

  const IERequired = (value: any) => {
    if (value == '1') setIErequired(true);
    else setIErequired(false);
  };

  const consultaCNPJ = () => {
    const cnpjcpf = removePontuacaoCnpjCpf(methods.getValues('cnpjcpf'));
    
    if (cnpjcpf.length === 14) {
      ConsultaCNPJService.consultarCNPJ(cnpjcpf).then((response) => {       
        if (response.return === 'OK') {
          methods.setValue('razao', response.result.nome);
          methods.setValue('fantasia', response.result.fantasia);
          methods.setValue('logradouro', response.result.logradouro);
          methods.setValue('numero', response.result.numero);
          methods.setValue('cep', removePontuacaoCnpjCpf(response.result.cep));
          methods.setValue('bairro', response.result.bairro);
          methods.setValue('complemento', response.result.complemento);
          methods.setValue('email1', response.result.email);
          methods.setValue('telefone1', response.result.telefone);
        }
      });
    } else {
      const datanasc = formatarData(methods.getValues('datanasc'));

      ConsultaCNPJService.consultarCPF(cnpjcpf, datanasc).then((response) => {
        if (response.return === 'OK') {
          methods.setValue('razao', response.result.nome_da_pf);
        }
      });
    }
  };

  return (
    <Flex h="40rem" direction="column" justify="space-between">
      <Flex w="100%" >
        {/*lado A */}
        <Flex direction="column" w="50%">
          <Flex w="100%" justify="space-between">
            <FormContainer label="Código" width="5rem">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="id" type="text" w="5rem" {...methods.register('cod')} />
            </FormContainer>
            <FormContainer label="Tipo" width="4rem">
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}  w="4rem" {...methods.register('tipo')}>
                <option value='f'>F</option>
                <option value='j'>J</option>
              </Select>
            </FormContainer>
            <FormContainer label="Categoria" width="9rem">
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}  {...methods.register('categoria')}>
                <option value='cliente'>Cliente</option>
                <option value='fornecedor'>Fornecedor</option>
                <option value='outro'>Outro</option>
              </Select>
            </FormContainer>
            <FormContainer width="8rem" label="Alterado" >
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="cadastrado" type="text" w="8rem" isReadOnly value={moment().format('DD/MM/YYYY')} />
            </FormContainer>
          </Flex>
          <Flex direction="column">
            <FormContainer label="Nome / Razão Social">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="nome" type="text" {...methods.register('razao')} />
            </FormContainer>
            <FormContainer label="Nome Fantasia">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="fantasia" type="text" {...methods.register('fantasia')} />
            </FormContainer>
          </Flex>
        </Flex>

        {/*lado B */}
        <Flex direction="column" w="50%" ml="6">
          <Flex>
            <FormContainer label="CPF / CNPJ" mr="3">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="cnpjcpf" type="text" {...methods.register('cnpjcpf', {
                onBlur: (event) => validarCampo()
              })} />
            </FormContainer>
            <Button mt={7} variant="solid" colorScheme="blue" onClick={consultaCNPJ}>
              <Icon as={FiSearch} />
            </Button>
          </Flex>
          <Flex>
            <FormContainer label="RG" mr='3'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="rg" type="text" w="14rem" {...methods.register('rg')} />
            </FormContainer>
            <FormContainer label='Data Nascimento' >
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="date" w="14rem" {...methods.register('datanasc')} defaultValue={new Date().toISOString().split('T')[0]} />
            </FormContainer>
          </Flex>
          <Flex>
            <FormContainer label="Inscrição Estadual (IE)">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="ie" type="number" w="14rem" {...methods.register('ie')} mr="3" />
            </FormContainer>
            <FormContainer label="Inscrição Municipal">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="im" type="number" w="14rem" {...methods.register('im')} />
            </FormContainer>
          </Flex>
          <Flex>
            <FormContainer label="Suframa">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="suframa" type="text" w="14rem" {...methods.register('suframa')} mr="3" />
            </FormContainer>
            <FormContainer label="Tipo de Contribuinte">
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}  w="14rem" {...methods.register('tipo_contribuinte')} onChange={(event) => IERequired(event.target.value)}>
                <option value='1'>Contribuinte ICMS</option>
                <option value='2'>Contribuinte ISENTO</option>
                <option value='9'>Não Contribuinte</option>
              </Select>
            </FormContainer>
          </Flex>
        </Flex>
      </Flex>

      {/*Área Contatos*/}
      <Stack mt="5">
        <Text fontSize="xl">Contato</Text>
        <Divider />
        <Contact />
      </Stack>

      {/*Área Endereço*/}
      <Stack mt="5">
        <Text fontSize="xl" >Endereço</Text>
        <Divider />
        <Adress id={id}/>
      </Stack>
    </Flex>
  );
}
