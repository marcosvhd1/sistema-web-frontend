import { Button, Flex, Icon, Input } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../components/Form/FormContainer';

export function TabCertificado() {

  return (
    <Flex w='100%' justify='center' align='center' direction='column'>
      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='N° de série' mr='3'>
          <Input type='text' readOnly />
        </FormContainer>
        <Button mt={7} mr={7}>
          <Icon as={FiSearch} />
        </Button>
        <FormContainer width='30%' label='Validade'>
          <Input type='date' readOnly />
        </FormContainer>
      </Flex>
      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Ambiente de Destino' mr='3'>
          <Input type='text' />
        </FormContainer>
        <FormContainer label='Tipo de impressão DANFE'>
          <Input type='text' />
        </FormContainer>
      </Flex>
      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Forma de Emisão' mr='3'>
          <Input type='text' />
        </FormContainer>
        <FormContainer label='Finalidade de Emissão'>
          <Input type='text' />
        </FormContainer>
      </Flex>
    </Flex>
  );
}
