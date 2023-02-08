import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Flex, Input, Select, useColorMode } from '@chakra-ui/react';
import { useEstados } from '../../../../../hooks/useEstados';
import { useCidades } from '../../../../../hooks/useCidades';
import { FormContainer } from '../../../../../components/Form/FormContainer';
import { IClient } from '../../../../../services/api/clientes/ClientService';


export function Adress() {
  const { register } = useFormContext<IClient>();
  const [selectedEstado, setSelectedEstado] = useState('');
  const { estados } = useEstados();
  const { cidades } = useCidades({ uf: selectedEstado });
  const { colorMode } = useColorMode();


  return (
    <Flex>
      <Flex w="50%" direction="column">
        <Flex justify="space-between">
          <FormContainer label="Rua" width="21.5rem">
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="rua" type="text" {...register('logradouro')} width="21.5rem"/>
          </FormContainer>
          <FormContainer label="N°" width="6rem">
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="numero" type="text" {...register('numero')} width="6rem"/>
          </FormContainer>
        </Flex>
        <Flex justify="space-between">
          <FormContainer label="Bairro" width="17.5rem">
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="bairro" type="text" {...register('bairro')} width="17.5rem"/>
          </FormContainer>
          <FormContainer label="CEP" width="10rem">
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="cep" type="number" w="10rem" {...register('cep')}/>
          </FormContainer>
        </Flex>
      </Flex>
      <Flex direction="column" w="50%"  ml="6">
        <Flex justify="space-between">
          <FormContainer label="UF" width="5rem">
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('uf')} w="5rem" value={selectedEstado} onChange={(event) => setSelectedEstado(event.target.value)}>
              <option value={''}></option>
              {estados.map(estado => <option key={estado.id} value={estado.sigla}>{estado.sigla}</option>)}
            </Select>
          </FormContainer>
          <FormContainer label="Cidade" width="22.5rem">
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('cidade')} w="22.5rem">
              {cidades.map(cidade => <option key={cidade.nome} value={cidade.nome}>{cidade.nome}</option>)}
            </Select>
          </FormContainer>
        </Flex>
        <FormContainer label="Complemento">
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="complemento" {...register('complemento')}/>
        </FormContainer>
      </Flex>
    </Flex>
  );
}