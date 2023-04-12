import { Button, Divider, Flex, Icon, Input, Text, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../../../components/Form/MoneyAddon';
import { PorcentAddon } from '../../../../../../../../../components/Form/PorcentAddon';
import { useModalNFApoio } from '../../../../../../../../../Contexts/Modal/NotaFiscal/NFApoioContext';
import { INFProduct } from '../../../../../../../../../services/api/notafiscal/NFProduct';
import { ModalNFICMS } from './ModalNFICMS';

export function FormTabTributos() {
  const methods = useFormContext<INFProduct>();
  const [content, setContent] = useState<string>('');

  const { onOpen } = useModalNFApoio();
  const { colorMode } = useColorMode();

  const handleOpenModal = (index: number) => {
    switch (index) {
    case 1:
      setContent(`
      00 - Entrada com recuperação de crédito
      01 - Entrada tributada com alíquota zero
      02 - Entrada isenta
      03 - Entrada não-tributada
      04 - Entrada imune
      05 - Entrada com suspensão
      49 - Outras entradas

      50 - Saída tributada
      51 - Saída tributada com alíquota zero
      52 - Saída isenta
      53 - Saída não-tributada
      54 - Saída imune
      55 - Saída com suspensão
      99 - Outras Saídas
      `);
      break;

    case 2:
      setContent(`
      01 - Operação Tributável com Alíquota Básca
      02 - Operação Tributável com Alíquota Diferenciada
      03 - Operação Tributável com Alíquota por Unidade de Medida de Produto
      04 - Operação Tributável Monofásica – Revenda a Alíquota Zero
      05 - Operação Tributável por Substituição Tributária
      06 - Operação Tributável a Alíquota Zero
      07 - Operação Isenta da Contribuição
      08 - Operação sem Incidência da Contribuição
      09 - Operação com Suspensão da Contribuição
      49 - Outras Operações de Saída
      50 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Tributada no Mercado Interno
      51 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Não Tributada no Mercado Interno
      52 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita de Exportação
      53 - Operação com Direito a Crédito – Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno
      54 - Operação com Direito a Crédito – Vinculada a Receitas Tributadas no Mercado Interno e de Exportação
      55 - Operação com Direito a Crédito – Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação
      56 - Operação com Direito a Crédito – Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação
      60 - Crédito Presumido – Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno
      61 - Crédito Presumido – Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno
      62 - Crédito Presumido – Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação
      63 - Crédito Presumido – Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno
      64 - Crédito Presumido – Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação
      65 - Crédito Presumido – Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação
      66 - Crédito Presumido – Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação
      67 - Crédito Presumido – Outras Operações
      70 - Operação de Aquisição sem Direito a Crédito
      71 - Operação de Aquisição com Isenção
      72 - Operação de Aquisição com Suspensão
      73 - Operação de Aquisição a Alíquota Zero
      74 - Operação de Aquisição sem Incidência da Contribuição
      75 - Operação de Aquisição por Substituição Tributária
      98 - Outras Operações de Entrada
      99 - Outras Operações
      `);
      break;

    case 3:
      setContent(`
      01 - Operação Tributável com Alíquota Básca
      02 - Operação Tributável com Alíquota Diferenciada
      03 - Operação Tributável com Alíquota por Unidade de Medida de Produto
      04 - Operação Tributável Monofásica – Revenda a Alíquota Zero
      05 - Operação Tributável por Substituição Tributária
      06 - Operação Tributável a Alíquota Zero
      07 - Operação Isenta da Contribuição
      08 - Operação sem Incidência da Contribuição
      09 - Operação com Suspensão da Contribuição
      49 - Outras Operações de Saída
      50 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Tributada no Mercado Interno
      51 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Não Tributada no Mercado Interno
      52 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita de Exportação
      53 - Operação com Direito a Crédito – Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno
      54 - Operação com Direito a Crédito – Vinculada a Receitas Tributadas no Mercado Interno e de Exportação
      55 - Operação com Direito a Crédito – Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação
      56 - Operação com Direito a Crédito – Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação
      60 - Crédito Presumido – Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno
      61 - Crédito Presumido – Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno
      62 - Crédito Presumido – Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação
      63 - Crédito Presumido – Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno
      64 - Crédito Presumido – Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação
      65 - Crédito Presumido – Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação
      66 - Crédito Presumido – Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação
      67 - Crédito Presumido – Outras Operações
      70 - Operação de Aquisição sem Direito a Crédito
      71 - Operação de Aquisição com Isenção
      72 - Operação de Aquisição com Suspensão
      73 - Operação de Aquisição a Alíquota Zero
      74 - Operação de Aquisição sem Incidência da Contribuição
      75 - Operação de Aquisição por Substituição Tributária
      98 - Outras Operações de Entrada
      99 - Outras Operações
      `);
      break;
    }

    onOpen();
  };

  // IPI
  const onChangeAliqIPI = (e: React.ChangeEvent<HTMLInputElement>) => {
    const aliq = parseFloat(e.target.value.toString().replace('.', '').replace(',', '.'));
    const base = parseFloat(methods.watch('base_calc_ipi', 0).toString().replace('.', '').replace(',', '.'));
    if (aliq && base) methods.setValue('valor_ipi', parseFloat(((aliq * base) / 100).toFixed(2)));
  };

  const onChangeBaseIPI = (e: React.ChangeEvent<HTMLInputElement>) => {
    const base = parseFloat(e.target.value.toString().replace('.', '').replace(',', '.'));
    const aliq = parseFloat(methods.watch('produto.aliquota_ipi', 0).toString().replace('.', '').replace(',', '.'));
    if (aliq && base) methods.setValue('valor_ipi', parseFloat(((aliq * base) / 100).toFixed(2)));
  };

  // PIS
  const onChangeAliqPIS = (e: React.ChangeEvent<HTMLInputElement>) => {
    const aliq = parseFloat(e.target.value.toString().replace('.', '').replace(',', '.'));
    const base = parseFloat(methods.watch('base_calc_pis', 0).toString().replace('.', '').replace(',', '.'));
    if (aliq && base) methods.setValue('valor_pis', parseFloat(((aliq * base) / 100).toFixed(2)));
  };
  
  const onChangeBasePIS = (e: React.ChangeEvent<HTMLInputElement>) => {
    const base = parseFloat(e.target.value.toString().replace('.', '').replace(',', '.'));
    const aliq = parseFloat(methods.watch('produto.aliquota_pis', 0).toString().replace('.', '').replace(',', '.'));
    if (aliq && base) methods.setValue('valor_pis', parseFloat(((aliq * base) / 100).toFixed(2)));
  };

  // PIS
  const onChangeAliqCOFINS = (e: React.ChangeEvent<HTMLInputElement>) => {
    const aliq = parseFloat(e.target.value.toString().replace('.', '').replace(',', '.'));
    const base = parseFloat(methods.watch('base_calc_cofins', 0).toString().replace('.', '').replace(',', '.'));
    if (aliq && base) methods.setValue('valor_cofins', parseFloat(((aliq * base) / 100).toFixed(2)));
  };
  
  const onChangeBaseCOFINS = (e: React.ChangeEvent<HTMLInputElement>) => {
    const base = parseFloat(e.target.value.toString().replace('.', '').replace(',', '.'));
    const aliq = parseFloat(methods.watch('produto.aliquota_cofins', 0).toString().replace('.', '').replace(',', '.'));
    if (aliq && base) methods.setValue('valor_cofins', parseFloat(((aliq * base) / 100).toFixed(2)));
  };

  return (
    <Flex w="100%" justify="center" align="center" direction="column">
      <Flex w="100%" align="center" justify="flex-start">
        <Flex w="50%" align="center" justify="flex-start" direction="column" mr={10}>
          <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
            <Divider w="20%" />
            <Text w="max" mr={3} ml={3}>IPI</Text>
            <Divider />
          </Flex>
          <FormContainer label='CST'>
            <Flex>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' mr={3} {...methods.register('produto.cst_ipi')}/>
              <Button onClick={() => handleOpenModal(1)}><Icon as={FiSearch} /></Button>
            </Flex>
          </FormContainer>
          <FormContainer label='Alíquota IPI'>
            <PorcentAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('produto.aliquota_ipi')} onChange={onChangeAliqIPI}/>
            </PorcentAddon>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <MoneyAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('base_calc_ipi')} onChange={onChangeBaseIPI}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Valor IPI'>
            <MoneyAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('valor_ipi')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='CNPJ Produtor'>
            <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('cnpj_produtor')}/>
          </FormContainer>
        </Flex>
        <Flex w="50%" align="center" justify="flex-start" direction="column" mr={7}>
          <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
            <Divider w="20%" />
            <Text w="max" mr={3} ml={3}>II</Text>
            <Divider />
          </Flex>
          <FormContainer label='Base de Cálculo'>
            <MoneyAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('base_calc_ii')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Desp. aduaneiras'>
            <MoneyAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('desp_aduaneiras')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Valor IOF'>
            <MoneyAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('valor_iof')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Valor II'>
            <MoneyAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('valor_ii')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Hidden' hidden>
            <MoneyAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" readOnly />
            </MoneyAddon>
          </FormContainer>
        </Flex>
      </Flex>
      <Flex w="100%" align="center" justify="flex-start" mt={7}>
        <Flex w="50%" align="center" justify="flex-start" direction="column" mr={10}>
          <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
            <Divider w="20%" />
            <Text w="max" mr={3} ml={3}>PIS</Text>
            <Divider />
          </Flex>
          <FormContainer label='CST'>
            <Flex>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' mr={3} {...methods.register('produto.cst_pis')}/>
              <Button onClick={() => handleOpenModal(2)}><Icon as={FiSearch} /></Button>
            </Flex>
          </FormContainer>
          <FormContainer label='Alíquota PIS'>
            <PorcentAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('produto.aliquota_pis')} onChange={onChangeAliqPIS}/>
            </PorcentAddon>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <MoneyAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('base_calc_pis')} onChange={onChangeBasePIS}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Valor PIS'>
            <MoneyAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('valor_pis')}/>
            </MoneyAddon>
          </FormContainer>
        </Flex>
        <Flex w="50%" align="center" justify="flex-start" direction="column" mr={10}>
          <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
            <Divider w="20%" />
            <Text w="max" mr={3} ml={3}>COFINS</Text>
            <Divider />
          </Flex>
          <FormContainer label='CST'>
            <Flex>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' mr={3} {...methods.register('produto.cst_cofins')}/>
              <Button onClick={() => handleOpenModal(3)}><Icon as={FiSearch} /></Button>
            </Flex>
          </FormContainer>
          <FormContainer label='Alíquota COFINS'>
            <PorcentAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('produto.aliquota_cofins')} onChange={onChangeAliqCOFINS}/>
            </PorcentAddon>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <MoneyAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('base_calc_cofins')} onChange={onChangeBaseCOFINS}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Valor COFINS'>
            <MoneyAddon>
              <Input maxLength={255} defaultValue={0} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('valor_cofins')}/>
            </MoneyAddon>
          </FormContainer>
        </Flex>
      </Flex>
      <ModalNFICMS content={content} />
    </Flex>
  );
}
