import { Divider, Flex, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../../../../components/Form/FormContainer';
import { useEstados } from '../../../../../../../../hooks/useEstados';
import { INFProduct } from '../../../../../../../../services/api/notafiscal/NFProduct';

export function FormTabOutros() {
  const methods = useFormContext<INFProduct>();

  const { estados } = useEstados();
  const { colorMode } = useColorMode();

  return (
    <Flex w="100%" align="flex-start" justify="center">
      <Flex w="100%" direction="column" mr={5}>
        <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
          <Divider w="10%" />
          <Text w="max" ml={3}>Combustível</Text>
          <Divider mr={3} ml={3} />
        </Flex>
        <FormContainer label='Código Produto ANP'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('cod_anp_comb')} />
        </FormContainer>
        <FormContainer label='Descrição ANP'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('descricao_anp_comb')} />
        </FormContainer>
        <FormContainer label='CODIF'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('codif_comb')} />
        </FormContainer>
        <FormContainer label="UF Consumo">
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('uf_consumo_comb')}>
            {estados.map((estado, index) => <option key={index} value={estado}>{estado}</option>)}
          </Select>
        </FormContainer>
      </Flex>
      <Flex w="100%" direction="column" mr={5}>
        <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
          <Divider w="10%" />
          <Text w="max" ml={3}>Importação</Text>
          <Divider mr={3} ml={3} />
        </Flex>
        <FormContainer label='Número da Adição'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('n_adicao_imp')} />
        </FormContainer>
        <FormContainer label='Sequencial do Item'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('seq_item_imp')} />
        </FormContainer>
        <FormContainer label='Código Fabricante'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('fabricante_imp')} />
        </FormContainer>
      </Flex>
      <Flex w="100%" direction="column">
        <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
          <Divider w="10%" />
          <Text w="max" ml={3}>Exportação</Text>
          <Divider mr={3} ml={3} />
        </Flex>
        <FormContainer label='Número de Registro'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('registro_exp')} />
        </FormContainer>
        <FormContainer label='Chave de Acesso NFe Exportação'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('chave_exp')} />
        </FormContainer>
        <FormContainer label='Quantidade Item Exportado'>
          <Input maxLength={255} defaultValue={''} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('qtde_exp')} />
        </FormContainer>
      </Flex>
    </Flex>
  );
}
