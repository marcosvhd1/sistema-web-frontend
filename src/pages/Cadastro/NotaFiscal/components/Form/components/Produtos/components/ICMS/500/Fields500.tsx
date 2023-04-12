import { Button, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../../../../components/Form/MoneyAddon';
import { PorcentAddon } from '../../../../../../../../../../components/Form/PorcentAddon';
import { INFProduct } from '../../../../../../../../../../services/api/notafiscal/NFProduct';

export function Fields500() {
  const { register } = useFormContext<INFProduct>();
  const { colorMode } = useColorMode();

  return (
    <Flex w="100%" justify="center" align="center" direction="column">
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
      <FormContainer label='Base de Cálculo ST retido anteriormente'>
        <MoneyAddon>
          <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('base_calc_retido_ant')} />
        </MoneyAddon>
      </FormContainer>
      <FormContainer label='ICMS ST retido anteriormente'>
        <MoneyAddon>
          <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('icms_st_retido_ant')} />
        </MoneyAddon>
      </FormContainer>
      <Flex w="100%" justify="space-between" >
        <FormContainer label='EAN (Código de barras)' mr='3'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('ean')}/>
        </FormContainer>
        <FormContainer label='N° Pedido de Compra' mr='3'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('pedido_compra')}/>
        </FormContainer>
        <FormContainer label='Item'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...register('item')}/>
        </FormContainer>
      </Flex>
    </Flex>
  );
}
