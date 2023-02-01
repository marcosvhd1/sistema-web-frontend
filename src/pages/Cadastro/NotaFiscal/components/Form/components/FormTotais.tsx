import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { CgCalculator } from 'react-icons/cg';
import { FormContainer } from '../../../../../../components/Form/FormContainer';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';

export function FormTotais() {
  const { register } = useFormContext<INotaFiscal>();

  return (
    <Flex w="100%" justify="center" align="center">

      {/* COLUNA 1 */}
      <Flex w="25%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Base Cálc. ICMS'>
          <Input type="number" readOnly {...register('base_calc_icms')}/>
        </FormContainer>
        <FormContainer label='Total do ICMS' >
          <Input type="number" readOnly {...register('total_icms')}/>
        </FormContainer>
        <FormContainer label='Base ICMS ST' >
          <Input type="number" readOnly {...register('base_icms_st')}/>
        </FormContainer>
        <FormContainer label='Total do ICMS ST'>
          <Input type="number" readOnly {...register('total_icms_st')} />
        </FormContainer>
        <FormContainer label='Total do Frete' >
          <Input type="number" {...register('total_frete')}/>
        </FormContainer>
        <FormContainer label='Valor do Seguro' >
          <Input type="number" {...register('valor_seguro')}/>
        </FormContainer>
        <FormContainer label='Outras Despesas' >
          <Input type="number" {...register('outras_despesas')}/>
        </FormContainer>
        <FormContainer label='Total do II' >
          <Input type="number" readOnly {...register('total_ii')}/>
        </FormContainer>
        <FormContainer label='Total IPI' >
          <Input type="number" readOnly {...register('total_ipi')}/>
        </FormContainer>
        <FormContainer label='Total PIS' >
          <Input type="number" readOnly {...register('total_pis')}/>
        </FormContainer>
        <FormContainer label='Total COFINS' >
          <Input type="number" readOnly {...register('total_cofins')}/>
        </FormContainer>
      </Flex>

      {/* COLUNA 2 */}
      <Flex w="25%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Total Desconto' >
          <Input type="number" readOnly {...register('total_desconto')}/>
        </FormContainer>
        <Flex direction="column" mt="2" w="100%">
          <Text fontSize="sm" fontWeight='medium' ><strong>Total Produtos</strong></Text>
          <Input type="number" readOnly {...register('total_produtos')} />
        </Flex>
        <Flex direction="column" mt="2" w="100%">
          <Text fontSize="sm" fontWeight='medium'><strong>Total da Nota</strong></Text>
          <Input type="number" readOnly {...register('total_nota')}/>
        </Flex>
        <FormContainer label='Hidden' hidden>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Base Cálc. ISS'>
          <Input type="number" readOnly {...register('base_calc_iss')}/>
        </FormContainer>
        <FormContainer label='Total do ISS'>
          <Input type="number" readOnly {...register('total_iss')}/>
        </FormContainer>
        <FormContainer label='Total Serviços'>
          <Input type="number" readOnly {...register('total_servicos')}/>
        </FormContainer>
        <FormContainer label='Hidden' hidden>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Hidden' hidden>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Alíquota Crédito ICMS'>
          <Input type="number" readOnly {...register('aliquota_credito')}/>
        </FormContainer>
        <FormContainer label='Valor Crédito ICMS' >
          <Input type="number" readOnly {...register('valor_credito')}/>
        </FormContainer>
      </Flex>

      {/* COLUNA 3 */}
      <Flex w="25%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Retenção PIS'>
          <Input type="number" readOnly {...register('retencao_pis')}/>
        </FormContainer>
        <FormContainer label='Retenção COFINS'>
          <Input type="number" readOnly  {...register('retencao_cofins')}/>
        </FormContainer>
        <FormContainer label='Retenção CSLL' >
          <Input type="number" readOnly {...register('retencao_csll')}/>
        </FormContainer>
        <FormContainer label='Base Cálc. IRRF' >
          <Input type="number" readOnly {...register('base_calc_irrf')} />
        </FormContainer>
        <FormContainer label='Retenção IRRF' >
          <Input type="number" readOnly {...register('retencao_irrf')}/>
        </FormContainer>
        <FormContainer label='Base Prev. Social' >
          <Input type="number" readOnly {...register('base_prev_social')}/>
        </FormContainer>
        <FormContainer label='Ret. Prev. Social' >
          <Input type="number" readOnly {...register('ret_prov_social')}/>
        </FormContainer>
        <FormContainer label='Partilha ICMS Dest.'>
          <Input type="number" readOnly {...register('partilha_icms_dest')}/>
        </FormContainer>
        <FormContainer label='Partilha ICMS Rem.'>
          <Input type="number" readOnly {...register('partilha_icms_rem')}/>
        </FormContainer>
        <FormContainer label='FCP da UF Dest.'>
          <Input type="number" readOnly {...register('fcp_uf_dest')}/>
        </FormContainer>
        <FormContainer label='Total IPI Devolvido'>
          <Input type="number" readOnly {...register('total_ipi_devolvido')}/>
        </FormContainer>
      </Flex>

      {/* COLUNA 4 */}
      <Flex w="25%" justify="center" mt={7} align="center" direction="column" alignSelf='flex-start'>
        <Button w="100%" fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="red">
          <Icon mr={2} as={CgCalculator} />
          Recalcular
        </Button>
        <FormContainer label='Hidden' hidden>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total FCP'>
          <Input type="number" readOnly {...register('total_fcp')}/>
        </FormContainer>
        <FormContainer label='Total FCP ST'>
          <Input type="number" readOnly {...register('total_fcp_st')}/>
        </FormContainer>
      </Flex>
    </Flex>
  );
}
