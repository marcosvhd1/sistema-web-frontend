import { Divider, Flex, Input, Stack, Select as ChakraSelect, Text, Textarea, useColorMode } from '@chakra-ui/react';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../components/Form/FormContainer';
import { ITransportadora, TransportadoraService } from '../../../../../services/api/transportadora/TransportadoraService';
import { useEstados } from '../../../../../hooks/useEstados';
import { useCidades } from '../../../../../hooks/useCidades';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { userInfos } from '../../../../../utils/header';
import { ApiException } from '../../../../../services/api/ApiException';

interface IFormFields {
  id: number
  editCod: number
  isEditing: boolean
  getCod: () => void
  cod: number
}

export function FormFields({ id, editCod, isEditing, cod, getCod }:IFormFields) {
  const { register, setFocus, getValues, setValue } = useFormContext<ITransportadora>();
  const { colorMode } = useColorMode();

  const [selectedEstado, setSelectedEstado] = useState(getValues('uf'));
  const [selectedCidade, setSelectedCidade] = useState(getValues('cidade'));
  
  const { estados } = useEstados();
  const { cidadeOptions } = useCidades({ uf: selectedEstado });

  const { idEmissorSelecionado } = useEmissorContext();
  
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    getCod();
    setFocus('cod');
    setTimeout(() => {
      setFocus('razao');
    }, 100);
  }, []);

  useEffect(() => {
    TransportadoraService.getTransportadoraByFilter(1, 1, 'id', `${id}`, idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          if (result.data[0] !== undefined) setValue('cidade', result.data[0].cidade);
        }
      });
  }, [id]);

  const onChangeCidade = (city: any) => {
    setSelectedCidade(city.value);
    setValue('cidade', city.value);
  };

  return (
    <Flex h="40rem" direction="column" justify="space-between">
      <Flex w="100%" >
        {/*lado A */}
        <Flex direction="column" w="65%">
          <Flex gap={3} w="100%" justify="space-between">
            <FormContainer label="Código">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="id" type="text" isReadOnly value={(`0000${isEditing ? editCod : cod}`).slice(-4)} {...register('cod')} />
            </FormContainer>
            <FormContainer label="UF Placa">
              <ChakraSelect borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('uf_placa')}>
                {estados.map((estado, index) => <option key={index} value={estado}>{estado}</option>)}
              </ChakraSelect>
            </FormContainer>
            <FormContainer label="Placa">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="ie" type="text" {...register('placa')} />
            </FormContainer>
          </Flex>
          <Flex direction="column">
            <FormContainer label="Razão Social" >
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="nome" type="text" {...register('razao')} />
            </FormContainer>
          </Flex>
        </Flex>
        {/*lado B */}
        <Flex direction="column" w="35%" ml="6">
          <FormContainer label="CNPJ">
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="cnpjcpf" type="text" {...register('cnpjcpf')} />
          </FormContainer>
          <Flex>
            <FormContainer label="Inscrição Estadual (IE)" mr='3' width='60%'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="ie" type="number" {...register('ie')} />
            </FormContainer>
            <FormContainer label="RNTRC" width='40%'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('rntrc')} />
            </FormContainer>
          </Flex>
        </Flex>
      </Flex>

      {/*Área Contatos*/}
      <Stack>
        <Text fontSize="xl">Contato</Text>
        <Divider />
        <Flex w="100%" gap={3}>
          <FormContainer label="Tipo">
            <ChakraSelect borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('tipo_telefone1')}>
              <option>Celular</option>
              <option>Comercial</option>
              <option>Residencial</option>
            </ChakraSelect>
          </FormContainer>
          <FormContainer label="Número" mr='7'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="tel" {...register('telefone1')} />
          </FormContainer>
          <FormContainer label="Tipo">
            <ChakraSelect borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('tipo_telefone2')}>
              <option>Celular</option>
              <option>Comercial</option>
              <option>Residencial</option>
            </ChakraSelect>
          </FormContainer>
          <FormContainer label="Número">
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="tel" {...register('telefone2')} />
          </FormContainer>
        </Flex>
      </Stack>

      {/*Área Endereço*/}
      <Stack>
        <Text fontSize="xl" >Endereço</Text>
        <Divider />
        <Flex>
          <Flex w="50%" direction="column">
            <Flex justify="space-between">
              <FormContainer label="Rua" width='70%' mr='3'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="rua" type="text" {...register('logradouro')}/>
              </FormContainer>
              <FormContainer label="N°" width='30%'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="numero" type="text" {...register('numero')}/>
              </FormContainer>
            </Flex>
            <Flex justify="space-between">
              <FormContainer label="Bairro" mr='3'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="bairro" type="text" {...register('bairro')}/>
              </FormContainer>
              <FormContainer label="CEP">
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="cep" type="number" {...register('cep')}/>
              </FormContainer>
            </Flex>
          </Flex>
          <Flex direction="column" w="50%"  ml="6">
            <Flex justify="space-between">
              <FormContainer label="UF" width='30%' mr='3'>
                <ChakraSelect borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('uf')} onChange={(event) => setSelectedEstado(event.target.value)}>
                  {estados.map((estado, index) => <option key={index} value={estado}>{estado}</option>)}
                </ChakraSelect>
              </FormContainer>
              <FormContainer label="Cidade">
                <Select placeholder=' ' options={cidadeOptions} defaultInputValue={selectedCidade} onChange={(event) => onChangeCidade(event)}/>
              </FormContainer>
            </Flex>
            <FormContainer label="Complemento">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="complemento" {...register('complemento')}/>
            </FormContainer>
          </Flex>
        </Flex>
      </Stack>
      <FormContainer label="Anotações Gerais">
        <Textarea maxLength={5000} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder='Observações...' {...register('anotacoes')} />
      </FormContainer>
    </Flex>
  );
}
