import { Divider, Flex, Input, Select, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../../../../components/Form/FormContainer';
import { INFProduct } from '../../../../../../../../services/api/notafiscal/NFProduct';

export function FormTabDevolucao() {
  const { register } = useFormContext<INFProduct>();

  return (
    <Flex w="100%" justify="center" align="center">
      <Flex w="50%" align="center" justify="center" direction="column" mr={10}>
        <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
          <Divider w="20%" />
          <Text w="max" mr={3} ml={3}>IPI</Text>
          <Divider />
        </Flex>
        <FormContainer label='% Devolvida'>
          <Input type='text' {...register('ipi_p_devolvida')}/>
        </FormContainer>
        <FormContainer label='R$ Devolvida'>
          <Input type='text' {...register('ipi_vlr_devolvido')}/>
        </FormContainer>
        <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap" mt={3}>
          <Divider w="20%" />
          <Text w="max" mr={3} ml={3}>FCP</Text>
          <Divider />
        </Flex>
        <FormContainer label='Base de Cálculo'>
          <Input type='text' {...register('fcp_base_calc')}/>
        </FormContainer>
        <FormContainer label='% FCP'>
          <Input type='text' {...register('fcp_p')}/>
        </FormContainer>
        <FormContainer label='Valor FCP'>
          <Input type='text' {...register('fcp_valor')}/>
        </FormContainer>
        <FormContainer label='Base de Cálculo ST'>
          <Input type='text' {...register('fcp_base_calc_st')}/>
        </FormContainer>
        <FormContainer label='% FCP ST'>
          <Input type='text' {...register('fcp_p_st')}/>
        </FormContainer>
        <FormContainer label='Valor FCP ST'>
          <Input type='text' {...register('fcp_valor_st')}/>
        </FormContainer>
      </Flex>
      <Flex w="50%" align="center" justify="center" direction="column">
        <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
          <Divider w="20%" />
          <Text w="max" mr={3} ml={3}>Partilha de ICMS</Text>
          <Divider />
        </Flex>
        <FormContainer label='Base de cálculo da UF de destino'>
          <Input type='text' {...register('partilha_icms_base_calc')}/>
        </FormContainer>
        <FormContainer label='Alíquota FCP da UF de destino'>
          <Input type='text' {...register('partilha_icms_aliquota_fcp_uf_dest')}/>
        </FormContainer>
        <FormContainer label='Valor FCP na UF de destino'>
          <Input type='text' {...register('partilha_icms_valor_fcp_uf_dest')}/>
        </FormContainer>
        <FormContainer label='Alíquota interna ICMS da UF de destino'>
          <Input type='text' {...register('partilha_icms_aliquota_interna_icms_uf_dest')}/>
        </FormContainer>
        <FormContainer label='Alíquota ICMS interestadual'>
          <Select {...register('partilha_icms_aliquota_icms_interestadual')}>
            <option value='0'></option>
            <option value='4'>4,00%</option>
            <option value='7'>7,00%</option>
            <option value='12'>12,00%</option>
          </Select>
        </FormContainer>
        <FormContainer label='Percentual da partilha'>
          <Select {...register('partilha_icms_p_partilha')}>
            <option value='0'></option>
            <option value='100'>100% destino e 0% origem (2019)</option>
            <option value='80'>80% destino e 20% origem (2018)</option>
            <option value='60'>60% destino e 40% origem (2017)</option>
            <option value='40'>40% destino e 60% origem (2016)</option>
          </Select>
        </FormContainer>
        <FormContainer label='Valor do ICMS da UF de destino'>
          <Input type='text' {...register('partilha_icms_valor_icms_uf_dest')}/>
        </FormContainer>
        <FormContainer label='Valor do ICMS da UF de origem'>
          <Input type='text' {...register('partilha_icms_valor_icms_uf_ori')}/>
        </FormContainer>
      </Flex>
    </Flex>
  );
}
