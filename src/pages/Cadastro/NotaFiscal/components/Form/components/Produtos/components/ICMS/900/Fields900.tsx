import { Flex, Input, Select, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../../../../components/Form/MoneyAddon';
import { PorcentAddon } from '../../../../../../../../../../components/Form/PorcentAddon';
import { INFProduct } from '../../../../../../../../../../services/api/notafiscal/NFProduct';

export function Fields900() {
  const { register } = useFormContext<INFProduct>();
  const { colorMode } = useColorMode();

  return (
    <Flex w="100%" align="center" justify="flex-start" direction="column">
      <Flex w="100%" align="center" justify="flex-start">
        <FormContainer label='Origem' mr='3'>
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('produto.origem')}>
            <option value="0">0 - Nacional, exceto as indicadas nos códigos 3 a 5</option>
            <option value="1">1 - Estrangeira - Importação direta, exceto a indicada no código 6</option>
            <option value="2">2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7</option>
            <option value="3">3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40%</option>
            <option value="4">4 - Nacional, cuja produção tenha sido feita em conformidade com os processos...</option>
            <option value="5">5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%</option>
            <option value="6">6 - Estrangeira - Importação direta, sem similar nacional, constante em lista de Resolução CAMEX</option>
            <option value="7">7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista de Resolução CAMEX e gás natural</option>
            <option value="8">8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%</option>
          </Select>
        </FormContainer>
        <FormContainer label='Mod. determinação da BC ICMS ST'>
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('mod_det_bc_icms_st')}>
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
        <FormContainer label='Percentual margem de valor adic. ICMS ST' mr='3'>
          <PorcentAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('p_margem_vlr_adc_icms_st')}/>
          </PorcentAddon>
        </FormContainer>
        <FormContainer label='Percentual de redução de base ICMS'>
          <PorcentAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('p_reducao_base_icms')} />
          </PorcentAddon>
        </FormContainer>
      </Flex>
      <Flex w="100%" align="center" justify="flex-start">
        <FormContainer label='Alíquota ICMS' mr='3'>
          <PorcentAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('produto.aliquota_icms')} />
          </PorcentAddon>
        </FormContainer>
        <FormContainer label='Percentual de redução de base ICMS ST'>
          <PorcentAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('p_reducao_base_icms_st')}/>
          </PorcentAddon>
        </FormContainer>
      </Flex>
      <Flex w="100%" align="center" justify="flex-start">
        <FormContainer label='Base de Cálculo' mr='3'>
          <MoneyAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('produto.base_icms')} />
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Base de Cálculo ST'>
          <MoneyAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('base_icms_st')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>
      <Flex w="100%" align="center" justify="flex-start">
        <FormContainer label='Valor ICMS' mr='3'>
          <MoneyAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" readOnly {...register('valor_icms')} />
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Alíquota ICMS ST'>
          <PorcentAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('aliquota_icms_st')}/>
          </PorcentAddon>
        </FormContainer>
      </Flex>
      <Flex w="100%" align="center" justify="flex-start">
        <FormContainer label='Alíquota aplicável de cálculo de crédito' mr='3'>
          <PorcentAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('p_aliquota_credito')} />
          </PorcentAddon>
        </FormContainer>
        <FormContainer label='Valor ICMS ST'>
          <MoneyAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('valor_icms_st')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>
      <Flex w="100%" align="center" justify="flex-start">
        <FormContainer label='Crédito ICMS que pode ser aproveitado' mr='3'>
          <MoneyAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('credito_icms_aproveitado')} />
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Base de Cálculo ST retido anteriormente'>
          <MoneyAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('base_calc_retido_ant')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>
      <Flex w="100%" align="center" justify="flex-start">
        <FormContainer label='Mod. determinação da BC ICMS' mr='3'>
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('mod_det_bc_icms_st')}>
            <option value='0'>Margem Valor Agreg. (%)</option>
            <option value='1'>Pauta (valor)</option>
            <option value='2'>Preço tab. ou máx. sugerido</option>
            <option value='3'>Valor operação</option>
          </Select>
        </FormContainer>
        <FormContainer label='ICMS ST retido anteriormente'>
          <MoneyAddon>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('icms_st_retido_ant')} />
          </MoneyAddon>
        </FormContainer>
      </Flex>
      <Flex w="100%" justify="space-between" >
        <FormContainer label='EAN (Código de barras)' mr='3'>
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('ean')}/>
        </FormContainer>
        <FormContainer label='N° Pedido de Compra' mr='3'>
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('pedido_compra')}/>
        </FormContainer>
        <FormContainer label='Item'>
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('item')}/>
        </FormContainer>
      </Flex>
    </Flex>
  );
}
