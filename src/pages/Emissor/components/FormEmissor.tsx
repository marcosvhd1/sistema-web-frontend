import { Checkbox, Flex, Input, useColorMode } from '@chakra-ui/react';
import { FormContainer } from '../../../components/Form/FormContainer';
import { useFormContext } from 'react-hook-form';
import { IEmissor } from '../../../services/api/emissor/EmissorService';

interface IFormFields {
  isEditing: boolean
  active: boolean
  setActive: (value: boolean) => void
}

export function FormEmissor({ isEditing, setActive, active }: IFormFields) {
  const methods = useFormContext<IEmissor>();
  const { colorMode } = useColorMode();

  return (
    <Flex w='100%' h='100%' direction='column'>
      <FormContainer label='Razão'>
        <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('razao')}/>
      </FormContainer>
      <FormContainer label='CPF / CNPJ'>
        <Input type='text' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('cnpjcpf')}/>
      </FormContainer>
      <FormContainer label='Status'>
        <Checkbox size='md' id="status" value={active ? 'Ativo' : 'Inativo'} onChange={() => setActive(!active)} isChecked={active } colorScheme="green" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
          {active ? 'Ativo' : 'Inativo'}
        </Checkbox>
      </FormContainer>
    </Flex>
  );
}
