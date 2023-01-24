import { Flex, Input, Select, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from '../../../../../../../../components/Form/FormContainer';
import { useEstados } from '../../../../../../../../hooks/useEstados';
import { INFProduct } from '../../../../../../../../services/api/notafiscal/NFProduct';

export function FormTabOutros() {
  const { register } = useForm<INFProduct>();
  const { estados } = useEstados();
  const [ selectedEstado, setSelectedEstado ] = useState('');
  const { colorMode } = useColorMode();

  return (
    <Flex w="100%" justify="center" align="center">
      <FormContainer label='Código Produto ANP' width='40%' mr='3'>
        <Input type='text' {...register('cod_anp')}/>
      </FormContainer>
      <FormContainer label='Descrição ANP' width='40%' mr='3'>
        <Input type='text' {...register('descricao_anp')}/>
      </FormContainer>
      <FormContainer label='UF Consumo' width='20%'>
        <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('uf_consumo')} value={selectedEstado} onChange={(event) => setSelectedEstado(event.target.value)}>
          <option value={''}></option>
          {estados.map(estado => <option key={estado.id} value={estado.sigla}>{estado.sigla}</option>)}
        </Select>
      </FormContainer>
    </Flex>
  );
}
