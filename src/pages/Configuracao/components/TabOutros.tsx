import { Flex, Input, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../components/Form/FormContainer';
import { IConfig } from '../../../services/api/config/ConfigService';

export function TabOutros() {
  const methods = useFormContext<IConfig>();
  const { colorMode } = useColorMode();

  return (
    <Flex w='100%' justify='center' align='flex-start'>
      <FormContainer label='Série Padrão' mr='3'>
        <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('serie_padrao')}/>
      </FormContainer>
      <FormContainer label='Aliq. de Aproveitamento de ICMS'>
        <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('aliq_aprov_icms')}/>
      </FormContainer>
    </Flex>
  );
}
