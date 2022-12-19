import { useEffect } from 'react';
import { Flex, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { FormContainer } from '../Form/FormContainer';
import { useFormContext } from 'react-hook-form';

interface IFormPassword {
  isInvalid: boolean
}


export function FormPassword({ isInvalid }: IFormPassword) {
  const methods = useFormContext();

  useEffect(() => {
    methods.setFocus('newPassword');
  }, []);

  return (
    <Flex w='100%' h='100%' direction='column' justify='space-around'>
      <FormControl isInvalid={isInvalid}>
        <FormContainer label='Nova Senha'>
          <Input type='password' autoComplete="new-password" isInvalid={isInvalid} {...methods.register('newPassword')} />
        </FormContainer>
        <FormContainer label='Confirmar Senha'>
          <Input type='password' autoComplete="new-password" isInvalid={isInvalid} {...methods.register('confirmationPassword')}/>
        </FormContainer>
        <FormErrorMessage>As senhas devem ser iguais!</FormErrorMessage>
      </FormControl>
    </Flex>
  );
}
