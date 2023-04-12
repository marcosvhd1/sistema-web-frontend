import { Flex, Input, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../components/Form/FormContainer';

type EmailProps = {
  email1: string
  email2: string
}

export function Email() {
  const { register } = useFormContext<EmailProps>();
  const { colorMode } = useColorMode();

  return (
    <Flex direction="column" align="center" justify="center">
      <FormContainer label="E-mail 01">
        <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="email" {...register('email1')}/>
      </FormContainer>
      <FormContainer label="E-mail 02">
        <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="email" {...register('email2')}/>
      </FormContainer>
    </Flex>
  );
}