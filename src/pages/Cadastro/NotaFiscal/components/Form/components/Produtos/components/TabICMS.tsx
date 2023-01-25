import { Button, Flex, Icon, Input, Select, Text } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../../components/Form/FormContainer';
import { INFProduct } from '../../../../../../../../services/api/notafiscal/NFProduct';

export function FormTabICMS() {
  const { register } = useFormContext<INFProduct>();

  return (
    <Flex w="100%" justify="center" align="center" direction="column">
      <Flex w="100%" align="center" justify="flex-start">
        <Text mr={3}>
          <strong>Situação Tributária (CST/CSOSN):</strong>
        </Text>
        <Select w="15%" mr={3} {...register('produto.cst_icms')}>
          <option value='00'>00</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
          <option value='40'>40</option>
          <option value='41'>41</option>
          <option value='50'>50</option>
          <option value='51'>51</option>
          <option value='60'>60</option>
          <option value='70'>70</option>
          <option value='90'>90</option>
        </Select>
        <Button type="submit"><Icon as={FiSearch} /></Button>
      </Flex>
      <Flex w="100%" align="center" justify="flex-start" direction="column">
        <Flex w="100%" align="center" justify="flex-start">
          <FormContainer label='Origem' mr='3'>
            <Select {...register('produto.cst_icms')}>
              <option value='0'>0 - Nacional, exceto as indicadas nos códigos 3 a 5</option>
              <option value='1'>1 - Estrangeira - Importação direta, exceto a indicada no código 6</option>
              <option value='2'>2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7</option>
              <option value='3'>3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40%</option>
              <option value='4'>4 - Nacional, cuja produção tenha sido feita em conformidade com os processos...</option>
              <option value='5'>5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%</option>
              <option value='6'>6 - Estrangeira - Importação direta, sem similar nacional, constante em lista de Resolução CAMEX</option>
              <option value='7'>7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista de Resolução CAMEX</option>
              <option value='8'>8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%</option>
            </Select>
          </FormContainer>
          <FormContainer label='Mod. determinação da BC ICMS ST'>
            <Select {...register('mod_det_bc_icms_st')}>
              <option value='0'>Preço tab. ou máx. sugerido</option>
              <option value='1'>Lista Negativa (valor)</option>
              <option value='2'>Lista Positiva (valor)</option>
              <option value='3'>Lista Neutra (valor)</option>
              <option value='4'>Margem Valor Agreg. (%)</option>
              <option value='5'>Pauta (valor)</option>
            </Select>
          </FormContainer>
        </Flex>
        <Flex w="100%" align="center" justify="flex-start">
          <FormContainer label='Alíquota ICMS' mr='3'>
            <Input type="text" {...register('produto.aliquota_icms')} />
          </FormContainer>
          <FormContainer label='Percentual margem de valor adic. ICMS ST'>
            <Input type="text" {...register('p_margem_vlr_adc_icms_st')}/>
          </FormContainer>
        </Flex>
        <Flex w="100%" align="center" justify="flex-start">
          <FormContainer label='Percentual de redução de base ICMS' mr='3'>
            <Input type="text" {...register('p_reducao_base_icms')} />
          </FormContainer>
          <FormContainer label='Percentual de redução de base ICMS ST'>
            <Input type="text" {...register('p_reducao_base_icms_st')}/>
          </FormContainer>
        </Flex>
        <Flex w="100%" align="center" justify="flex-start">
          <FormContainer label='Base de Cálculo' mr='3'>
            <Input type="text" {...register('produto.base_icms')} />
          </FormContainer>
          <FormContainer label='Base de Cálculo ST'>
            <Input type="text" {...register('base_icms_st')}/>
          </FormContainer>
        </Flex>
        <Flex w="100%" align="center" justify="flex-start">
          <FormContainer label='Valor ICMS' mr='3'>
            <Input type="text" {...register('valor_icms')} />
          </FormContainer>
          <FormContainer label='Alíquota ICMS ST'>
            <Input type="text" {...register('aliquota_icms_st')}/>
          </FormContainer>
        </Flex>
        <Flex w="100%" align="center" justify="flex-start">
          <FormContainer label='Alíquota aplicável de cálculo de crédito' mr='3'>
            <Input type="text" {...register('p_aliquota_credito')} />
          </FormContainer>
          <FormContainer label='Valor ICMS ST'>
            <Input type="text" {...register('valor_icms_st')}/>
          </FormContainer>
        </Flex>
        <Flex w="100%" align="center" justify="flex-start">
          <FormContainer label='Crédito ICMS que pode ser aproveitado' mr='3'>
            <Input type="text" {...register('credito_icms_aproveitado')} />
          </FormContainer>
          <FormContainer label='Base de Cálculo ST retido anteriormente'>
            <Input type="text" {...register('base_calc_retido_ant')}/>
          </FormContainer>
        </Flex>
        <Flex w="100%" align="center" justify="flex-start">
          <FormContainer label='Mod. determinação da BC ICMS' mr='3'>
            <Select {...register('mod_det_bc_icms_st')}>
              <option value='0'>Margem Valor Agreg. (%)</option>
              <option value='1'>Pauta (valor)</option>
              <option value='2'>Preço tab. ou máx. sugerido</option>
              <option value='3'>Valor operação</option>
            </Select>
          </FormContainer>
          <FormContainer label='ICMS ST retido anteriormente'>
            <Input type="text" {...register('icms_st_retido_ant')} />
          </FormContainer>
        </Flex>
        <Flex w="100%" justify="space-between" >
          <FormContainer label='EAN (Código de barras)' mr='3'>
            <Input type="text" {...register('ean')}/>
          </FormContainer>
          <FormContainer label='N° Pedido de Compra' mr='3'>
            <Input type="text" {...register('pedido_compra')}/>
          </FormContainer>
          <FormContainer label='Item'>
            <Input type="text" {...register('item')}/>
          </FormContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}
