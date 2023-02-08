import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { CgCalculator } from 'react-icons/cg';
import { FormContainer } from '../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../components/Form/MoneyAddon';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';

interface FormTotaisProps {
  recalcular: () => void;
}

export function FormTotais({ recalcular }: FormTotaisProps) {
  const { register } = useFormContext<INotaFiscal>();

  return (
    <Flex w="100%" justify="center" align="center">

      {/* COLUNA 1 */}
      <Flex w="25%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Base Cálc. ICMS'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('base_calc_icms')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total do ICMS' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_icms')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Base ICMS ST' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('base_icms_st')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total do ICMS ST'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_icms_st')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total do Frete' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} {...register('total_frete')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Valor do Seguro' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} {...register('valor_seguro')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Outras Despesas' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} {...register('outras_despesas')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total do II' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_ii')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total IPI' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_ipi')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total PIS' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_pis')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total COFINS' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_cofins')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>

      {/* COLUNA 2 */}
      <Flex w="25%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Total Desconto'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_desconto_nf')}/>
          </MoneyAddon>
        </FormContainer>
        <Flex direction="column" mt="2" w="100%">
          <Text fontSize="sm" fontWeight='medium' ><strong>Total Produtos</strong></Text>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_produtos')} />
          </MoneyAddon>
        </Flex>
        <Flex direction="column" mt="2" w="100%">
          <Text fontSize="sm" fontWeight='medium'><strong>Total da Nota</strong></Text>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_nota')}  />
          </MoneyAddon>
        </Flex>
        <FormContainer label='Hidden' hidden>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly />
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Base Cálc. ISS'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('base_calc_iss')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total do ISS'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_iss')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total Serviços'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_servicos')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Hidden' hidden>
          <Input type="number" defaultValue={0} readOnly />
        </FormContainer>
        <FormContainer label='Hidden' hidden>
          <Input type="number" defaultValue={0} readOnly />
        </FormContainer>
        <FormContainer label='Alíquota Crédito ICMS'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('aliquota_credito')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Valor Crédito ICMS'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('valor_credito')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>

      {/* COLUNA 3 */}
      <Flex w="25%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Retenção PIS'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('retencao_pis')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Retenção COFINS'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly  {...register('retencao_cofins')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Retenção CSLL' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('retencao_csll')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Base Cálc. IRRF' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('base_calc_irrf')} />
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Retenção IRRF' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('retencao_irrf')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Base Prev. Social' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('base_prev_social')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Ret. Prev. Social' >
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('ret_prov_social')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Partilha ICMS Dest.'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('partilha_icms_dest')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Partilha ICMS Rem.'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('partilha_icms_rem')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='FCP da UF Dest.'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('fcp_uf_dest')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total IPI Devolvido'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_ipi_devolvido')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>

      {/* COLUNA 4 */}
      <Flex w="25%" justify="center" mt={7} align="center" direction="column" alignSelf='flex-start'>
        <Button w="100%" fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="red" onClick={recalcular}>
          <Icon mr={2} as={CgCalculator} />
          Recalcular
        </Button>
        <FormContainer label='Hidden' hidden>
          <Input type="number" defaultValue={0} readOnly />
        </FormContainer>
        <FormContainer label='Total FCP'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_fcp')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total FCP ST'>
          <MoneyAddon>
            <Input type="number" defaultValue={0} readOnly {...register('total_fcp_st')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>
    </Flex>
  );
}
