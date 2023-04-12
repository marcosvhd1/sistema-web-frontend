import { Flex, Input, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../components/Form/FormContainer';
import { IConfig } from '../../../services/api/config/ConfigService';

export function TabToken() {
  const methods = useFormContext<IConfig>();
  const { colorMode } = useColorMode();

  return (
    <Flex w='100%' justify='center' align='flex-start'>
      <FormContainer label='ID' width='15%' mr='3'>
        <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('id_nfce')}/>
      </FormContainer>
      <FormContainer label='Token'>
        <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('token_nfce')}/>
      </FormContainer>
    </Flex>
  );
}
