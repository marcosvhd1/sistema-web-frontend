import { Button, Flex, Icon, Input, Text, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CgDetailsMore } from 'react-icons/cg';
import { FormContainer } from '../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../components/Form/MoneyAddon';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';

interface FormTotaisProps {
  calcTotal: () => void;
}

export function FormTotais({ calcTotal }: FormTotaisProps) {
  const { register } = useFormContext<INotaFiscal>();
  const [details, setDetails] = useState<boolean>(true);
  const { colorMode } = useColorMode();

  const handleChangeDetails = () => {
    setDetails(!details);
    calcTotal();
  };

  return (
    <Flex w="100%" justify="center" align="center">

      {/* COLUNA 1 */}
      <Flex w="30%" justify="center" align="center" direction="column" mr={3}>
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
        <FormContainer label='Total do II' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_ii')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total PIS' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_pis')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total COFINS' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_cofins')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>

      {/* COLUNA 2 */}
      <Flex w="30%" justify="center" align="center" direction="column" mr={3}>
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
        <FormContainer label='Hidden' hidden>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly />
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total FCP' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_fcp')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total FCP ST' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_fcp_st')}/>
          </MoneyAddon>
        </FormContainer>
        {/* <FormContainer label='Base Cálc. ISS'>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('base_calc_iss')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total do ISS'>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_iss')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total Serviços'>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_servicos')}/>
          </MoneyAddon>
        </FormContainer> */}
        <FormContainer label='Hidden' hidden>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly />
        </FormContainer>
        <FormContainer label='Hidden' hidden>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly />
        </FormContainer>
        <FormContainer label='Hidden' hidden>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly />
        </FormContainer>
        <FormContainer label='Alíquota Crédito ICMS' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('aliquota_credito')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Valor Crédito ICMS' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('valor_credito')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>

      {/* COLUNA 3 */}
      <Flex w="30%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Retenção PIS' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('retencao_pis')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Retenção COFINS' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly  {...register('retencao_cofins')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Retenção CSLL' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('retencao_csll')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Base Cálc. IRRF' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('base_calc_irrf')} />
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Retenção IRRF' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('retencao_irrf')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Base Prev. Social' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('base_prev_social')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Ret. Prev. Social' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('ret_prov_social')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Partilha ICMS Dest.' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('partilha_icms_dest')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Partilha ICMS Rem.' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('partilha_icms_rem')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='FCP da UF Dest.' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('fcp_uf_dest')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Total IPI Devolvido' hidden={details}>
          <MoneyAddon>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly {...register('total_ipi_devolvido')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>

      {/* COLUNA 4 */}
      <Flex w="10%" justify="center" mt={7} align="center" direction="column" alignSelf='flex-start'>
        <Button w="100%" fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue" onClick={handleChangeDetails}>
          <Icon mr={2} as={CgDetailsMore} />
          Detalhes
        </Button>      
      </Flex>
    </Flex>
  );
}
