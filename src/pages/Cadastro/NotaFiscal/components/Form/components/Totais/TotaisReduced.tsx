import { Flex, Input, Text, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../components/Form/MoneyAddon';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';

export function TotaisReduced() {
  const { register } = useFormContext<INotaFiscal>();
  const { colorMode } = useColorMode();

  return (
    <Flex w="100%" justify="center" align="flex-start">
      {/* COLUNA 1 */}
      <Flex w="100%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Base Cálc. ICMS'>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('base_calc_icms')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total do ICMS' >
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_icms')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Base ICMS ST' >
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('base_icms_st')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total do ICMS ST'>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_icms_st')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>

      {/* COLUNA 2 */}
      <Flex w="100%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Total do Frete' >
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} {...register('total_frete')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Valor do Seguro' >
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} {...register('valor_seguro')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Outras Despesas' >
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} {...register('outras_despesas')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total IPI' >
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_ipi')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>

      {/* COLUNA 3 */}
      <Flex w="100%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Total Desconto'>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_desconto_nf')}/>
          </MoneyAddon>
        </FormContainer>
        <Flex direction="column" mt="2" w="100%">
          <Text fontSize="sm" fontWeight='medium' ><strong>Total Produtos</strong></Text>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_produtos')} />
          </MoneyAddon>
        </Flex>
        <Flex direction="column" mt="2" w="100%">
          <Text fontSize="sm" fontWeight='medium'><strong>Total da Nota</strong></Text>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_nota')}  />
          </MoneyAddon>
        </Flex>
      </Flex>
    </Flex>
  );
}
