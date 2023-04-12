import { Flex, Input, Select, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../../../../components/Form/FormContainer';
import { useEstados } from '../../../../../../../../hooks/useEstados';
import { INFProduct } from '../../../../../../../../services/api/notafiscal/NFProduct';

export function FormTabOutros() {
  const { register } = useFormContext<INFProduct>();

  const { estados } = useEstados();
  const { colorMode } = useColorMode();

  return (
    <Flex w="100%" justify="center" align="center">
      <FormContainer label='Código Produto ANP' width='40%' mr='3'>
        <Input defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('cod_anp')}/>
      </FormContainer>
      <FormContainer label='Descrição ANP' width='40%' mr='3'>
        <Input defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('descricao_anp')}/>
      </FormContainer>
      <FormContainer label="UF Consumo" width='20%'>
        <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('uf_consumo')}>
          {estados.map((estado, index) => <option key={index} value={estado}>{estado}</option>)}
        </Select>
      </FormContainer>
    </Flex>
  );
}
