import { Button, Divider, Flex, Icon, Input, Select, Text } from '@chakra-ui/react';
import { useForm, useFormContext } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../../components/Form/FormContainer';
import { INFProduct } from '../../../../../../../../services/api/notafiscal/NFProduct';

export function FormTabTributos() {
  const { register } = useFormContext<INFProduct>();

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
              <Input type='text' mr={3} {...register('produto.cst_ipi')}/>
              <Button type="submit"><Icon as={FiSearch} /></Button>
            </Flex>
          </FormContainer>
          <FormContainer label='Alíquota IPI'>
            <Input type='text' {...register('produto.aliquota_ipi')}/>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <Input type='text' {...register('base_calc_ipi')}/>
          </FormContainer>
          <FormContainer label='CNPJ Produtor'>
            <Input type='text' {...register('cnpj_produtor')}/>
          </FormContainer>
        </Flex>
        <Flex w="50%" align="center" justify="flex-start" direction="column" mr={7}>
          <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
            <Divider w="20%" />
            <Text w="max" mr={3} ml={3}>II</Text>
            <Divider />
          </Flex>
          <FormContainer label='Base de Cálculo'>
            <Input type='text' {...register('base_calc_ii')}/>
          </FormContainer>
          <FormContainer label='Desp. aduaneiras'>
            <Input type='text' {...register('desp_aduaneiras')}/>
          </FormContainer>
          <FormContainer label='Valor IOF'>
            <Input type='text' {...register('valor_iof')}/>
          </FormContainer>
          <FormContainer label='Valor II'>
            <Input type='text' {...register('valor_ii')}/>
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
              <Input type='text' mr={3} {...register('produto.cst_pis')}/>
              <Button type="submit"><Icon as={FiSearch} /></Button>
            </Flex>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <Input type='text' {...register('base_calc_pis')}/>
          </FormContainer>
          <FormContainer label='Alíquota PIS'>
            <Input type='text' {...register('produto.aliquota_pis')}/>
          </FormContainer>
          <FormContainer label='Valor PIS'>
            <Input type='text' {...register('valor_pis')}/>
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
              <Input type='text' mr={3} {...register('produto.cst_cofins')}/>
              <Button type="submit"><Icon as={FiSearch} /></Button>
            </Flex>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <Input type='text' {...register('base_calc_cofins')}/>
          </FormContainer>
          <FormContainer label='Alíquota COFINS'>
            <Input type='text' {...register('produto.aliquota_cofins')}/>
          </FormContainer>
          <FormContainer label='Valor COFINS'>
            <Input type='text' {...register('valor_cofins')}/>
          </FormContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}
