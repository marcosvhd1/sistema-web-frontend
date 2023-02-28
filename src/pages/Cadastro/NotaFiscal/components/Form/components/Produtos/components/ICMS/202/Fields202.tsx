import { Flex, Input, Select } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../../../../components/Form/MoneyAddon';
import { PorcentAddon } from '../../../../../../../../../../components/Form/PorcentAddon';
import { INFProduct } from '../../../../../../../../../../services/api/notafiscal/NFProduct';

export function Fields202() {
  const { register } = useFormContext<INFProduct>();

  return (
    <Flex w="100%" justify="center" align="center" direction="column">
      <Flex w="100%" align='flex-start' justify='center' direction='column'>
        <FormContainer label='Origem'>
          <Select {...register('produto.origem')}>
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
          <Select {...register('mod_det_bc_icms_st')}>
            <option value='0'>Preço tab. ou máx. sugerido</option>
            <option value='1'>Lista Negativa (valor)</option>
            <option value='2'>Lista Positiva (valor)</option>
            <option value='3'>Lista Neutra (valor)</option>
            <option value='4'>Margem Valor Agreg. (%)</option>
            <option value='5'>Pauta (valor)</option>
          </Select>
        </FormContainer>
        <FormContainer label='Percentual margem de valor adic. ICMS ST'>
          <PorcentAddon>
            <Input type="number" {...register('p_margem_vlr_adc_icms_st')}/>
          </PorcentAddon>
        </FormContainer>
        <FormContainer label='Percentual de redução de base ICMS ST'>
          <PorcentAddon>
            <Input type="number" {...register('p_reducao_base_icms_st')} />
          </PorcentAddon>
        </FormContainer>
        <FormContainer label='Base de Cálculo ST'>
          <MoneyAddon>
            <Input type="number" {...register('base_icms_st')}/>
          </MoneyAddon>
        </FormContainer>
        <FormContainer label='Alíquota ICMS ST'>
          <PorcentAddon>
            <Input type="number" {...register('aliquota_icms_st')}/>
          </PorcentAddon>
        </FormContainer>
        <FormContainer label='Valor ICMS ST'>
          <MoneyAddon>
            <Input type="number" {...register('valor_icms_st')}/>
          </MoneyAddon>
        </FormContainer>
      </Flex>
      <Flex w="100%" justify="space-between" >
        <FormContainer label='EAN (Código de barras)' mr='3'>
          <Input type="number" {...register('ean')}/>
        </FormContainer>
        <FormContainer label='N° Pedido de Compra' mr='3'>
          <Input type="number" {...register('pedido_compra')}/>
        </FormContainer>
        <FormContainer label='Item'>
          <Input type="number" {...register('item')}/>
        </FormContainer>
      </Flex>
    </Flex>
  );
}
