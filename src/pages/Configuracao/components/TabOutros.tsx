import { Flex, Input, Textarea, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../components/Form/FormContainer';
import { IConfig } from '../../../services/api/config/ConfigService';

export function TabOutros() {
  const methods = useFormContext<IConfig>();
  const { colorMode } = useColorMode();

  return (
    <Flex w='100%' justify='center' align='flex-start' direction="column">
      <Flex w='100%' justify='center' align='center' >
        <FormContainer label='Série Padrão NFe' mr='3'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('serie_padrao')}/>
        </FormContainer>
        <FormContainer label='Série Padrão NFCe' mr='3'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('serie_padrao_nfce')}/>
        </FormContainer>
        <FormContainer label='Aliq. de Aproveitamento de ICMS'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('aliq_aprov_icms')}/>
        </FormContainer>
      </Flex>
      <Flex w='100%' justify='center' align='center' >
        <FormContainer label='Justificativa Contingência'>
          <Textarea maxLength={5000} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('justif')} />
        </FormContainer>
      </Flex>
    </Flex>
  );
}
