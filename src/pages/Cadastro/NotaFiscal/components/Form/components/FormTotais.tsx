import { ReactNode } from 'react';
import { FiCheck, FiCheckCircle, FiEdit, FiPhoneIncoming, FiSearch } from 'react-icons/fi';
import { CgCalculator } from 'react-icons/cg';
import { Button, Flex, Icon, Input, Select, Text, Link, Stack, InputGroup, InputLeftElement, Editable, InputRightElement, Divider } from '@chakra-ui/react';
import { FormContainer } from '../../../../../../components/Form/FormContainer';

export function FormTotais() {
  return (
    <Flex w="100%" justify="center" align="center">

      {/* COLUNA 1 */}
      <Flex w="25%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Base Cálc. ICMS'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total do ICMS'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Base ICMS ST'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total do ICMS ST'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total do Frete'>
          <Input type="number" />
        </FormContainer>
        <FormContainer label='Valor do Seguro'>
          <Input type="number" />
        </FormContainer>
        <FormContainer label='Outras Despesas'>
          <Input type="number" />
        </FormContainer>
        <FormContainer label='Total do II'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total IPI'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total PIS'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total COFINS'>
          <Input type="number" readOnly />
        </FormContainer>
      </Flex>

      {/* COLUNA 2 */}
      <Flex w="25%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Total Desconto'>
          <Input type="number" readOnly />
        </FormContainer>
        <Flex direction="column" mt="2" w="100%">
          <Text fontSize="sm" fontWeight='medium'><strong>Total Produtos</strong></Text>
          <Input type="number" readOnly />
        </Flex>
        <Flex direction="column" mt="2" w="100%">
          <Text fontSize="sm" fontWeight='medium'><strong>Total da Nota</strong></Text>
          <Input type="number" readOnly />
        </Flex>
        <FormContainer label='Hidden' hidden>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Base Cálc. ISS'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total do ISS'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total Serviços'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Hidden' hidden>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Hidden' hidden>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Alíquota Crédito ICMS'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Valor Crédito ICMS'>
          <Input type="number" readOnly />
        </FormContainer>
      </Flex>

      {/* COLUNA 3 */}
      <Flex w="25%" justify="center" align="center" direction="column" mr={3}>
        <FormContainer label='Retenção PIS'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Retenção COFINS'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Retenção CSLL'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Base Cálc. IRRF'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Retenção IRRF'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Base Prev. Social'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Ret. Prev. Social'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Partilha ICMS Dest.'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Partilha ICMS Rem.'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='FCP da UF Dest.'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total IPI Devolvido'>
          <Input type="number" readOnly />
        </FormContainer>
      </Flex>

      {/* COLUNA 4 */}
      <Flex w="25%" justify="center" mt={7} align="center" direction="column" alignSelf='flex-start'>
        <Button w="100%" fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="red">
          <Icon mr={2} as={CgCalculator} />
          Recalcular
        </Button>
        <FormContainer label='Hidden' hidden>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total FCP'>
          <Input type="number" readOnly />
        </FormContainer>
        <FormContainer label='Total FCP ST'>
          <Input type="number" readOnly />
        </FormContainer>
      </Flex>
    </Flex>
  );
}
