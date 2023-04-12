import { Checkbox, Flex, Input, Select, useColorMode } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FormContainer } from '../../../components/Form/FormContainer';
import { useFormContext } from 'react-hook-form';
import { EmissorService, IEmissor } from '../../../services/api/emissor/EmissorService';
import { useEstados } from '../../../hooks/useEstados';
import { useCidades } from '../../../hooks/useCidades';
import { userInfos } from '../../../utils/header';
import { EmpresaService } from '../../../services/api/empresas/EmpresaService';
import { ApiException } from '../../../services/api/ApiException';

interface IFormFields {
  isEditing: boolean
  active: boolean
  setActive: (value: boolean) => void
  id: number
}

export function FormEmissor({ isEditing, setActive, active, id }: IFormFields) {
  const methods = useFormContext<IEmissor>();
  
  const [selectedEstado, setSelectedEstado] = useState(methods.getValues('uf'));
  
  const { estados } = useEstados();
  const { cidades } = useCidades({ uf: selectedEstado });
  
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

  return (
    <Flex w='100%' justify='center' align='flex-start' direction='column'>
      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Razão' mr='3' width='70%'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('razao')}/>
        </FormContainer>
        <FormContainer label='CPF / CNPJ'  width='30%'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cnpjcpf')}/>
        </FormContainer>
      </Flex>

      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Nome Fantasia' width='50%' mr='3'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('fantasia')}/>
        </FormContainer>
        <FormContainer label='Inscrição Estadual'  width='25%' mr='3'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('ie')}/>
        </FormContainer>
        <FormContainer label='Inscrição Municipal'  width='25%'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('im')}/>
        </FormContainer>
      </Flex>

      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Endereço' width='45%' mr='3'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('endereco')}/>
        </FormContainer>
        <FormContainer label='Número'  width='20%' mr='3'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('numero')}/>
        </FormContainer>
        <FormContainer label='CNAE'  width='35%'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cnae')}/>
        </FormContainer>
      </Flex>

      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Complemento' width='35%' mr='3'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('complemento')}/>
        </FormContainer>
        <FormContainer label='Bairro'  width='35%' mr='3'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('bairro')}/>
        </FormContainer>
        <FormContainer label='Telefone'  width='30%'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('telefone')}/>
        </FormContainer>
      </Flex>

      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label="UF" width='15%' mr='3'>
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('uf')} onChange={(event) => setSelectedEstado(event.target.value)}>
            {estados.map((estado, index) => <option key={index} value={estado}>{estado}</option>)}
          </Select>
        </FormContainer>
        <FormContainer label="Cidade" width='55%' mr='3'>
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cidade')}>
            {cidades.map((cidade, index) => <option key={index} value={cidade.nome}>{cidade.nome}</option>)}
          </Select>
        </FormContainer>
        <FormContainer label='CEP' width='30%'>
          <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cep')}/>
        </FormContainer>
      </Flex>
      <FormContainer label='Regime Tributário'>
        <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('regime')}>
          <option value='1'>Simples Nacional</option>
          <option value='2'>Simples Nacional (excesso de sublimite de receita bruta)</option>
          <option value='3'>Regime Normal</option>
        </Select>
      </FormContainer>
      <FormContainer label='Status'>
        <Checkbox size='md' id="status" value={active ? 'Ativo' : 'Inativo'} onChange={() => setActive(!active)} isChecked={active } colorScheme="green" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
          {active ? 'Ativo' : 'Inativo'}
        </Checkbox>
      </FormContainer>
    </Flex>
  );
}
