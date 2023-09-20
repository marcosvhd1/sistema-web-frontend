import { Divider, Flex, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../../components/Form/FormContainer';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';

export function FormOutros() {
  const { register } = useFormContext<INotaFiscal>();
  const { colorMode } = useColorMode();

  return (
    <Flex w="100%" justify="center" align="center">

      {/* COLUNA 1 */}
      <Flex w="50%" justify="center" align="center" direction="column" mr={5}>
        <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
          <Divider w="20%" />
          <Text w="max" ml={5}>Tributos/ECF</Text>
          <Divider w="80%" ml={5} />
        </Flex>
        <FormContainer width='100%' label='Vlr. Aprox. dos Tributos (Fonte)'>
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w='40%' {...register('fonte_valor_aprox_tributos')}>
            <option value='0'>IBPT</option>
            <option value='1'>Própria</option>
          </Select>
        </FormContainer>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='65%' label='ECF Referenciado - N° ECF' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('ecf_referenciado')}/>
          </FormContainer>
          <FormContainer width='35%' label='N° COO'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('n_coo')}/>
          </FormContainer>
        </Flex>
        <FormContainer label='Chave de Acesso'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('chave_acesso')}/>
        </FormContainer>
      </Flex>

      {/* COLUNA 2 */}
      <Flex w="50%" justify="center" align="center" direction="column" alignSelf="flex-end">
        <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
          <Divider w="20%" />
          <Text w="max" ml={5}>Importação/Exportação</Text>
          <Divider w="80%" ml={5} />
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='20%' label='UF Emb.' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('uf_embarque')}/>
          </FormContainer>
          <FormContainer width='40%' label='Local de Embarque' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('local_embarque')}/>
          </FormContainer>
          <FormContainer width='40%' label='Local de Despacho'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('local_despacho')}/>
          </FormContainer>
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='25%' label='UF Saída' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('uf_saida')}/>
          </FormContainer>
          <FormContainer label='Local de Saída'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('local_saida')}/>
          </FormContainer>
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='65%' label='N° da DI' mr='3'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...register('num_di')}/>
          </FormContainer>
          <FormContainer width='35%' label='Data da DI'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="date" {...register('data_di')}/>
          </FormContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}
