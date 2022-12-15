import { Flex, Input } from '@chakra-ui/react';
import { FormContainer } from '../../../components/Form/FormContainer';
import { useFormContext } from 'react-hook-form';


export function FormEmissor() {
  const methods = useFormContext();

  return (
    <Flex w='100%' h='100%' direction='column'>
      <FormContainer label='Razão'>
        <Input type='text' {...methods.register('razao')}/>
      </FormContainer>
      <FormContainer label='CPF / CNPJ'>
        <Input type='text'{...methods.register('cnpjcpf')}/>
      </FormContainer>
    </Flex>
  );
}
