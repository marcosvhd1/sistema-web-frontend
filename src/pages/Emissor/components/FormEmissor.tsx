import { Checkbox, Flex, Input, Select as ChakraSelect, useColorMode, Button, Icon } from '@chakra-ui/react';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../components/Form/FormContainer';
import { useCidades } from '../../../hooks/useCidades';
import { useEstados } from '../../../hooks/useEstados';
import { ApiException } from '../../../services/api/ApiException';
import { EmissorService, IEmissor } from '../../../services/api/emissor/EmissorService';
import { EmpresaService } from '../../../services/api/empresas/EmpresaService';
import { userInfos } from '../../../utils/header';
import { removePontuacaoCnpjCpf } from '../../../utils/formatarCnpjCpf';
import { ConsultaCNPJService } from '../../../services/api/cnpj/CNPJService';
import { FiSearch } from 'react-icons/fi';

interface IFormFields {
  isEditing: boolean
  active: boolean
  setActive: (value: boolean) => void
  id: number
}

export function FormEmissor({ isEditing, setActive, active, id }: IFormFields) {
  const methods = useFormContext<IEmissor>();
  
  const [selectedEstado, setSelectedEstado] = useState(methods.getValues('uf'));
  const [selectedCidade, setSelectedCidade] = useState(methods.getValues('cidade'));
  
  const { estados } = useEstados();
  const { cidadeOptions } = useCidades({ uf: selectedEstado });
  
  const { colorMode } = useColorMode();

  const userInfo = userInfos();

  const HEADERS = userInfo.header;
  const empresa = userInfo.infos?.empresa;

  useEffect(() => {
    EmpresaService.getId(empresa, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          const idEmpresa = result.data[0].id;
          EmissorService.getAll(1, 1, 'id', `${id}`, idEmpresa, 'Ativo', HEADERS)
            .then((result: any) => {
              if (result instanceof ApiException) {
                console.log(result.message);
              } else {
                if (result.data[0] !== undefined) methods.setValue('cidade', result.data[0].cidade);
              }
            });
        }
      });
  }, [id]);

  const onChangeCidade = (city: any) => {
    setSelectedCidade(city.value);
    methods.setValue('cidade', city.value);
  };

  const consultaCNPJ = () => {
    const cnpjcpf = removePontuacaoCnpjCpf(methods.getValues('cnpjcpf'));
    
    ConsultaCNPJService.consultarCNPJ(cnpjcpf).then((response) => {       
      if (response.return === 'OK') {
        methods.setValue('razao', response.result.nome);
        methods.setValue('fantasia', response.result.fantasia);
        methods.setValue('endereco', response.result.logradouro);
        methods.setValue('numero', response.result.numero);
        methods.setValue('cep', removePontuacaoCnpjCpf(response.result.cep));
        methods.setValue('bairro', response.result.bairro);
        methods.setValue('complemento', response.result.complemento);
        methods.setValue('telefone', response.result.telefone);
      }
    });
  };

  return (
    <Flex w='100%' justify='center' align='flex-start' direction='column'>
      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Razão Social' mr='3' width='65%'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('razao')}/>
        </FormContainer>
        <FormContainer label='CPF / CNPJ' mr='3' width='35%'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cnpjcpf')}/>
        </FormContainer>
        <Button mt={7} variant="solid" colorScheme="blue" onClick={consultaCNPJ}>
          <Icon as={FiSearch} />
        </Button>
      </Flex>

      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Nome Fantasia' width='50%' mr='3'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('fantasia')}/>
        </FormContainer>
        <FormContainer label='Inscrição Estadual'  width='25%' mr='3'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('ie')}/>
        </FormContainer>
        <FormContainer label='Inscrição Municipal'  width='25%'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('im')}/>
        </FormContainer>
      </Flex>

      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Endereço' width='45%' mr='3'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('endereco')}/>
        </FormContainer>
        <FormContainer label='Número'  width='20%' mr='3'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('numero')}/>
        </FormContainer>
        <FormContainer label='CNAE'  width='35%'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cnae')}/>
        </FormContainer>
      </Flex>

      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Complemento' width='35%' mr='3'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('complemento')}/>
        </FormContainer>
        <FormContainer label='Bairro'  width='35%' mr='3'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('bairro')}/>
        </FormContainer>
        <FormContainer label='Telefone'  width='30%'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('telefone')}/>
        </FormContainer>
      </Flex>

      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label="UF" width='15%' mr='3'>
          <ChakraSelect borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('uf')} onChange={(event) => setSelectedEstado(event.target.value)}>
            {estados.map((estado, index) => <option key={index} value={estado}>{estado}</option>)}
          </ChakraSelect>
        </FormContainer>
        <FormContainer label="Cidade" mr='3'>
          <Select placeholder=' ' options={cidadeOptions} defaultInputValue={selectedCidade} onChange={(event) => onChangeCidade(event)}/>
        </FormContainer>
        <FormContainer label='CEP' width='30%'>
          <Input maxLength={255} type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cep')}/>
        </FormContainer>
      </Flex>
      <FormContainer label='Regime Tributário'>
        <ChakraSelect borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('regime')}>
          <option value='1'>Simples Nacional</option>
          <option value='2'>Simples Nacional (excesso de sublimite de receita bruta)</option>
          <option value='3'>Regime Normal</option>
        </ChakraSelect>
      </FormContainer>
      <FormContainer label='Status'>
        <Checkbox size='md' id="status" value={active ? 'Ativo' : 'Inativo'} onChange={() => setActive(!active)} isChecked={active } colorScheme="green" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
          {active ? 'Ativo' : 'Inativo'}
        </Checkbox>
      </FormContainer>
    </Flex>
  );
}
