import { Flex, Input, Select as ChakraSelect, useColorMode } from '@chakra-ui/react';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../components/Form/FormContainer';
import { useCidades } from '../../../../../hooks/useCidades';
import { useEstados } from '../../../../../hooks/useEstados';
import { ClientService, IClient } from '../../../../../services/api/clientes/ClientService';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { userInfos } from '../../../../../utils/header';
import { ApiException } from '../../../../../services/api/ApiException';

interface AdressProps {
  id: number;
}

export function Adress({ id }: AdressProps) {
  const methods = useFormContext<IClient>();

  const [selectedEstado, setSelectedEstado] = useState(methods.getValues('uf'));
  const [selectedCidade, setSelectedCidade] = useState(methods.getValues('cidade'));
  
  const { estados } = useEstados();
  const { colorMode } = useColorMode();
  const { cidadeOptions } = useCidades({ uf: selectedEstado });

  const { idEmissorSelecionado } = useEmissorContext();
  
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    ClientService.getClientsByFilter(1, 1, 'id', `${id}`, idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          if (result.data[0] !== undefined) methods.setValue('cidade', result.data[0].cidade);
        }
      });
  }, [id]);

  const onChangeCidade = (city: any) => {
    setSelectedCidade(city.value);
    methods.setValue('cidade', city.value);
  };

  return (
    <Flex>
      <Flex w="50%" direction="column">
        <Flex justify="space-between">
          <FormContainer label="Rua" width="21.5rem">
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="rua" type="text" {...methods.register('logradouro')} width="21.5rem"/>
          </FormContainer>
          <FormContainer label="N°" width="6rem">
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="numero" type="text" {...methods.register('numero')} width="6rem"/>
          </FormContainer>
        </Flex>
        <Flex justify="space-between">
          <FormContainer label="Bairro" width="17.5rem">
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="bairro" type="text" {...methods.register('bairro')} width="17.5rem"/>
          </FormContainer>
          <FormContainer label="CEP" width="10rem">
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="cep" type="number" w="10rem" {...methods.register('cep')}/>
          </FormContainer>
        </Flex>
      </Flex>
      <Flex direction="column" w="50%"  ml="6">
        <Flex justify="center">
          <FormContainer label="UF" width='30%' mr='3'>
            <ChakraSelect borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('uf')} onChange={(event) => setSelectedEstado(event.target.value)}>
              {estados.map((estado, index) => <option key={index} value={estado}>{estado}</option>)}
            </ChakraSelect>
          </FormContainer>
          <FormContainer label="Cidade">
            <Select placeholder=' ' options={cidadeOptions} defaultInputValue={selectedCidade} onChange={(event) => onChangeCidade(event)}/>
          </FormContainer>
        </Flex>
        <FormContainer label="Complemento">
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="complemento" {...methods.register('complemento')}/>
        </FormContainer>
      </Flex>
    </Flex>
  );
}