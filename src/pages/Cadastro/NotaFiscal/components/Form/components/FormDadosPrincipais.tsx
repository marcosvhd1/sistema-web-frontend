import { ReactNode } from 'react';
import { FiCheck, FiCheckCircle, FiEdit, FiPhoneIncoming, FiSearch } from 'react-icons/fi';
import { Button, Flex, Icon, Input, Select, Text, Link, Stack, InputGroup, InputLeftElement, Editable, InputRightElement } from '@chakra-ui/react';
import { FormContainer } from '../../../../../../components/Form/FormContainer';

export function FormDadosPrincipais() {
  return (
    <Flex w="100%" justify="center" align="center" direction="column" >
      {/* DADOS PRINCIPAIS */}
      <Flex w="100%" mr="4" ml='4' mt="2" align="center" justify="space-between">
        <FormContainer width='20%' label='Nº da NF'>
          <Input placeholder='00001' type="text"/>
        </FormContainer>
        <Button variant="ghost" colorScheme="orange" onClick={() => null} mt={7} ml={1} mr={3} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }}>
          <Icon color="orange.300" as={FiEdit} />
        </Button>
        <FormContainer width='15%' label='Série' mr='3'>
          <Input placeholder='1' type="text" />
        </FormContainer>
        <FormContainer width='65%' label='Natureza de Operação' mr='3'>
          <Select onChange={(e) => null}>
            <option value='razao'>Venda 5102</option>
            <option value='fantasia'>Compra 6204</option>
          </Select>
        </FormContainer>
        <FormContainer width='20%' label='CFOP'>
          <Input placeholder='5102' type="text" />
        </FormContainer>
        <Button variant="ghost" colorScheme="orange" onClick={() => null} mt={7} ml={1} mr={3} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }}>
          <Icon color="orange.300" as={FiCheckCircle} />
        </Button>
        <FormContainer width='35%' label='Status'>
          <Input placeholder='Em digitação' type="text" readOnly />
        </FormContainer>
      </Flex>

      {/* OUTRAS INFOS */}
      <Flex w="100%" mb="4" mr="4" ml="4" align="center" justify="space-between">
        <FormContainer width='35%' label='Tipo' mr='3'>
          <Select onChange={(e) => null}>
            <option value='0'>0 - Entrada</option>
            <option value='1'>1 - Saída</option>
          </Select>
        </FormContainer>
        <FormContainer width='40%' label='Forma de Emissão' mr='3'>
          <Select onChange={(e) => null}>
            <option value='normal'>Normal</option>
            <option value='contingencia'>Contingência</option>
          </Select>
        </FormContainer>
        <FormContainer width='40%' label='Finalidade' mr='3'>
          <Select onChange={(e) => null}>
            <option value='1'>1 - NF-e normal</option>
            <option value='2'>2 - NF-e complementar</option>
            <option value='3'>3 - NF-e de ajuste</option>
            <option value='4'>4 - Devolução/Retorno</option>
          </Select>
        </FormContainer>
        <FormContainer width='15%' label='Modelo' mr='3'>
          <Input placeholder='55' type="text" readOnly/>
        </FormContainer>
        <FormContainer width='30%' label='Consumidor Final'>
          <Select onChange={(e) => null}>
            <option value='0'>0 - Não</option>
            <option value='1'>1 - Sim</option>
          </Select>
        </FormContainer>
      </Flex>
    </Flex>
  );
}
