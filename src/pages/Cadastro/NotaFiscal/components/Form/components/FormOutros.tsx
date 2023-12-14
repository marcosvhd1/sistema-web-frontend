import { Flex, Input, Select, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../../components/Form/FormContainer';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';

export function FormOutros() {
  const { register } = useFormContext<INotaFiscal>();
  const { colorMode } = useColorMode();

  return (
    <Flex w="100%" justify="center" align="center">
      <FormContainer label='Vlr. Aprox. dos Tributos (Fonte)' mr='3'>
        <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('fonte_valor_aprox_tributos')}>
          <option value='0'>IBPT</option>
          <option value='1'>Própria</option>
        </Select>
      </FormContainer>
      <FormContainer label='N° ECF' mr='3'>
        <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('ecf_referenciado')} />
      </FormContainer>
      <FormContainer label='N° COO' mr='3'>
        <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('n_coo')} />
      </FormContainer>
      <FormContainer label='Chave de Acesso'>
        <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('chave_acesso')} />
      </FormContainer>
    </Flex>
  );
}