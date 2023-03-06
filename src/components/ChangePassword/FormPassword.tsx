import { useEffect } from 'react';
import { Flex, FormControl, FormErrorMessage, Input, useColorMode } from '@chakra-ui/react';
import { FormContainer } from '../Form/FormContainer';
import { useFormContext } from 'react-hook-form';

interface IFormPassword {
  isInvalid: boolean
}


export function FormPassword({ isInvalid }: IFormPassword) {
  const methods = useFormContext();
  const { colorMode } = useColorMode();

  useEffect(() => {
    methods.setFocus('newPassword');
  }, []);

  return (
    <Flex w='100%' h='100%' direction='column' justify='space-around'>
      <FormControl isInvalid={isInvalid}>
        <FormContainer label='Nova Senha'>
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='password' autoComplete="new-password" isInvalid={isInvalid} {...methods.register('newPassword')} />
        </FormContainer>
        <FormContainer label='Confirmar Senha'>
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='password' autoComplete="new-password" isInvalid={isInvalid} {...methods.register('confirmationPassword')}/>
        </FormContainer>
        <FormErrorMessage>As senhas devem ser iguais!</FormErrorMessage>
      </FormControl>
    </Flex>
  );
}
