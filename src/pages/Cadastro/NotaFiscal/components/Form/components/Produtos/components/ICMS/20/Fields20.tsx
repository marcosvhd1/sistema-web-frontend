import { Button, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../../../../components/Form/MoneyAddon';
import { PorcentAddon } from '../../../../../../../../../../components/Form/PorcentAddon';
import { INFProduct } from '../../../../../../../../../../services/api/notafiscal/NFProduct';

export function Fields20() {
  const methods = useFormContext<INFProduct>();
  const { colorMode } = useColorMode();

  const onChangeAliq = (e: React.ChangeEvent<HTMLInputElement>) => {
    const aliq = parseFloat(e.target.value);
    const base = parseFloat(methods.watch('produto.base_icms', 0).toString());
    if (aliq && base) {
      methods.setValue('valor_icms', parseFloat(((aliq * base) / 100).toFixed(2)));
    }
  };

  const onChangeBase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const base = parseFloat(e.target.value);
    const aliq = methods.watch('produto.aliquota_icms', 0);
    if (aliq && base) {
      methods.setValue('valor_icms', parseFloat(((aliq * base) / 100).toFixed(2)));
    }
  };

  return (
    <Flex w="100%" justify="center" align="center" direction="column">
      <FormContainer label='Origem' mr='3'>
        <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('origem')}>
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
      <FormContainer label='Alíquota ICMS' mr='3'>
        <PorcentAddon>
          <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('produto.aliquota_icms')} onChange={onChangeAliq}/>
        </PorcentAddon>
      </FormContainer>
      <FormContainer label='Base de Cálculo' mr='3'>
        <MoneyAddon>
          <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('produto.base_icms')} onChange={onChangeBase}/>
        </MoneyAddon>
      </FormContainer>
      <FormContainer label='Valor ICMS' mr='3'>
        <MoneyAddon>
          <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" readOnly {...methods.register('valor_icms')} />
        </MoneyAddon>
      </FormContainer>
      <FormContainer label='Percentual de redução de base ICMS'>
        <PorcentAddon>
          <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('p_reducao_base_icms')} />
        </PorcentAddon>
      </FormContainer>
      <Flex w="100%" justify="space-between" >
        <FormContainer label='EAN (Código de barras)' mr='3'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('ean')}/>
        </FormContainer>
        <FormContainer label='N° Pedido de Compra' mr='3'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('pedido_compra')}/>
        </FormContainer>
        <FormContainer label='Item'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" {...methods.register('item')}/>
        </FormContainer>
      </Flex>
    </Flex>
  );
}
