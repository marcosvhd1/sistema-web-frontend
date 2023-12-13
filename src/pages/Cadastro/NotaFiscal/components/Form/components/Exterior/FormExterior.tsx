import { Divider, Flex, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';

export function FormExterior() {
  const methods = useFormContext<INotaFiscal>();

  const { colorMode } = useColorMode();

  return (
    <Flex w="100%" align="center" justify="center">
      <Flex w="50%" direction="column" mr={5}>
        <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
          <Divider w="10%" />
          <Text w="max" ml={3}>Exportação</Text>
          <Divider mr={3} ml={3} />
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='20%' label='UF Emb.' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('uf_embarque')} />
          </FormContainer>
          <FormContainer width='40%' label='Local de Embarque' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('local_embarque')} />
          </FormContainer>
          <FormContainer width='40%' label='Local de Despacho'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('local_despacho')} />
          </FormContainer>
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='20%' label='UF Saída' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('uf_saida')} />
          </FormContainer>
          <FormContainer width='80%' label='Local de Saída'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('local_saida')} />
          </FormContainer>
        </Flex>
      </Flex>
      <Flex w="50%" direction="column">
        <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
          <Divider w="10%" />
          <Text w="max" ml={3}>Importação</Text>
          <Divider mr={3} ml={3} />
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='35%' label='N° da DI' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('num_di')} />
          </FormContainer>
          <FormContainer width='35%' label='Data da DI' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="date" {...methods.register('data_di')} />
          </FormContainer>
          <FormContainer width='30%' label='Transporte'>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('transporte')}>
              <option value='1'>Marítima</option>
              <option value='2'>Fluvial</option>
              <option value='3'>Lacustre</option>
              <option value='4'>Aérea</option>
              <option value='5'>Postal</option>
              <option value='6'>Ferroviária</option>
              <option value='7'>Rodoviária</option>
              <option value='8'>Conduto/Rede Transmissão</option>
              <option value='9'>Meios Próprios</option>
              <option value='10'>Entrada/Saída Ficta</option>
              <option value='11'>Courier</option>
              <option value='12'>HandCarry</option>
            </Select>
          </FormContainer>
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='20%' label='UF Desemb.' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('uf_desembaraco')} />
          </FormContainer>
          <FormContainer width='40%' label='Local Desembaraço' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('local_desembaraco')} />
          </FormContainer>
          <FormContainer width='40%' label='Data Desembarço'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="date" {...methods.register('data_desembaraco')} />
          </FormContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}
