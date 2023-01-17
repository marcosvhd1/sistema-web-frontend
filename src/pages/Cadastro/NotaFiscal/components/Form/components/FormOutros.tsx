import { Button, Divider, Flex, Icon, Input, Select, Text } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../../../../../components/Form/FormContainer';

export function FormOutros() {
  return (
    <Flex w="100%" justify="center" align="center">

      {/* COLUNA 1 */}
      <Flex w="50%" justify="center" align="center" direction="column" mr={5}>
        <FormContainer width='100%' label='Vlr. Aprox. dos Tributos (Fonte)'>
          <Select w='40%' onChange={(e) => null}>
            <option value='0'>IBPT</option>
            <option value='1'>Própria</option>
          </Select>
        </FormContainer>
        <FormContainer label='NFe Referenciada - Chave de Acesso'>
          <Input type="text" />
        </FormContainer>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='65%' label='ECF Referenciado - N° ECF' mr='3'>
            <Input type="text" />
          </FormContainer>
          <FormContainer width='35%' label='N° COO'>
            <Input type="text" />
          </FormContainer>
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer label='Caminho do XML' mr='3'>
            <Input type="text" />
          </FormContainer>
          <Button w="25%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="outline" colorScheme="blue"><Icon mr={2} as={FiSearch} />Localizar</Button>
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer label='Chave de Acesso' mr='3'>
            <Input type="text" />
          </FormContainer>
          <Button w="25%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="outline" colorScheme="blue">Preencher</Button>
        </Flex>
      </Flex>

      {/* COLUNA 2 */}
      <Flex w="50%" justify="center" align="center" direction="column" alignSelf="flex-end">
        <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap" mb={2} mt={2}>
          <Divider w="20%" />
          <Text w="max" mr={3} ml={3}>Importação / Exportação</Text>
          <Divider />
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='20%' label='UF Emb.' mr='3'>
            <Input type="text" />
          </FormContainer>
          <FormContainer width='40%' label='Local de Embarque' mr='3'>
            <Input type="text" />
          </FormContainer>
          <FormContainer width='40%' label='Local de Despacho'>
            <Input type="text" />
          </FormContainer>
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='25%' label='UF Saída' mr='3'>
            <Input type="text" />
          </FormContainer>
          <FormContainer label='Local de Saída'>
            <Input type="text" />
          </FormContainer>
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='65%' label='N° da DI' mr='3'>
            <Input type="text" />
          </FormContainer>
          <FormContainer width='35%' label='Data da DI'>
            <Input type="date" />
          </FormContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}
