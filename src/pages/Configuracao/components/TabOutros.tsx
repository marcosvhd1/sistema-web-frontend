import { Flex, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../components/Form/FormContainer';
import { IConfig } from '../../../services/api/config/ConfigService';

export function TabOutros() {
  const methods = useFormContext<IConfig>();

  return (
    <Flex w='100%' justify='center' align='flex-start'>
      <FormContainer label='Série Padrão' mr='3'>
        <Input type='text' {...methods.register('serie_padrao')}/>
      </FormContainer>
      <FormContainer label='Aliq. de Aproveitamento de ICMS'>
        <Input type='text' {...methods.register('aliq_aprov_icms')}/>
      </FormContainer>
    </Flex>
  );
}
