import { Button, Divider, Flex, Icon, Input, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../../components/Form/FormContainer';
import { MoneyAddon } from '../../../../../../../../components/Form/MoneyAddon';
import { PorcentAddon } from '../../../../../../../../components/Form/PorcentAddon';
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
            <PorcentAddon>
              <Input type='text' {...register('produto.aliquota_ipi')}/>
            </PorcentAddon>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <MoneyAddon>
              <Input type='text' {...register('base_calc_ipi')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Valor IPI'>
            <MoneyAddon>
              <Input type='text' {...register('valor_ipi')}/>
            </MoneyAddon>
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
            <MoneyAddon>
              <Input type='text' {...register('base_calc_ii')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Desp. aduaneiras'>
            <MoneyAddon>
              <Input type='text' {...register('desp_aduaneiras')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Valor IOF'>
            <MoneyAddon>
              <Input type='text' {...register('valor_iof')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Valor II'>
            <MoneyAddon>
              <Input type='text' {...register('valor_ii')}/>
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
              <Input type='text' mr={3} {...register('produto.cst_pis')}/>
              <Button type="submit"><Icon as={FiSearch} /></Button>
            </Flex>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <MoneyAddon>
              <Input type='text' {...register('base_calc_pis')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Alíquota PIS'>
            <PorcentAddon>
              <Input type='text' {...register('produto.aliquota_pis')}/>
            </PorcentAddon>
          </FormContainer>
          <FormContainer label='Valor PIS'>
            <MoneyAddon>
              <Input type='text' {...register('valor_pis')}/>
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
              <Input type='text' mr={3} {...register('produto.cst_cofins')}/>
              <Button type="submit"><Icon as={FiSearch} /></Button>
            </Flex>
          </FormContainer>
          <FormContainer label='Base de Cálculo'>
            <MoneyAddon>
              <Input type='text' {...register('base_calc_cofins')}/>
            </MoneyAddon>
          </FormContainer>
          <FormContainer label='Alíquota COFINS'>
            <PorcentAddon>
              <Input type='text' {...register('produto.aliquota_cofins')}/>
            </PorcentAddon>
          </FormContainer>
          <FormContainer label='Valor COFINS'>
            <MoneyAddon>
              <Input type='text' {...register('valor_cofins')}/>
            </MoneyAddon>
          </FormContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}
