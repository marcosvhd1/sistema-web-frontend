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
  const { register } = useFormContext<INFProduct>();
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
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' mr={3} {...register('produto.cst_ipi')}/>
              <Button onClick={() => handleOpenModal(1)}><Icon as={FiSearch} /></Button>
            </Flex>
          </FormContainer>
          <FormContainer label='Alíquota IPI'>
            <PorcentAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('produto.aliquota_ipi')}/>
            </PorcentAddon>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <MoneyAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('base_calc_ipi')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Valor IPI'>
            <MoneyAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('valor_ipi')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='CNPJ Produtor'>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('cnpj_produtor')}/>
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
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('base_calc_ii')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Desp. aduaneiras'>
            <MoneyAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('desp_aduaneiras')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Valor IOF'>
            <MoneyAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('valor_iof')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Valor II'>
            <MoneyAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('valor_ii')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Hidden' hidden>
            <MoneyAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" defaultValue={0} readOnly />
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
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' mr={3} {...register('produto.cst_pis')}/>
              <Button onClick={() => handleOpenModal(2)}><Icon as={FiSearch} /></Button>
            </Flex>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <MoneyAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('base_calc_pis')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Alíquota PIS'>
            <PorcentAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('produto.aliquota_pis')}/>
            </PorcentAddon>
          </FormContainer>
          <FormContainer label='Valor PIS'>
            <MoneyAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('valor_pis')}/>
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
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' mr={3} {...register('produto.cst_cofins')}/>
              <Button onClick={() => handleOpenModal(3)}><Icon as={FiSearch} /></Button>
            </Flex>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <MoneyAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('base_calc_cofins')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Alíquota COFINS'>
            <PorcentAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('produto.aliquota_cofins')}/>
            </PorcentAddon>
          </FormContainer>
          <FormContainer label='Valor COFINS'>
            <MoneyAddon>
              <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...register('valor_cofins')}/>
            </MoneyAddon>
          </FormContainer>
        </Flex>
      </Flex>
      <ModalNFICMS content={content} />
    </Flex>
  );
}
