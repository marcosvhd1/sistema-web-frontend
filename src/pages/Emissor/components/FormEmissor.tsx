import { Flex, Input, useColorMode } from '@chakra-ui/react';
import { FormContainer } from '../../../components/Form/FormContainer';
import { useFormContext } from 'react-hook-form';


export function FormEmissor() {
  const methods = useFormContext();
  const { colorMode } = useColorMode();

  return (
    <Flex w='100%' h='100%' direction='column'>
      <FormContainer label='Razão'>
        <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('razao')}/>
      </FormContainer>
      <FormContainer label='CPF / CNPJ'>
        <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cnpjcpf')}/>
      </FormContainer>
    </Flex>
  );
}
