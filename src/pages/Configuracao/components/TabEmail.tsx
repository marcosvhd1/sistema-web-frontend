import { Checkbox, Flex, Input, Text, Textarea, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../components/Form/FormContainer';
import { IConfig } from '../../../services/api/config/ConfigService';

interface TabEmailProps {
  isOpen: boolean;
  autenticacao: boolean;
  setAutenticacao: (value: boolean) => void;
}

export function TabEmail({ autenticacao, setAutenticacao }: TabEmailProps) {
  const methods = useFormContext<IConfig>();
  const { colorMode } = useColorMode();

  const handleChangeAutenticacao = () => {
    setAutenticacao(!autenticacao);
  };

  return (
    <Flex w='100%' justify='center' align='flex-start'>
      <Flex w='100%' justify='center' align='flex-start' direction='column' mr={5}>
        <FormContainer label='Remetente'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('email_remetente')} />
        </FormContainer>
        <FormContainer label='Email'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='email' {...methods.register('email')}/>
        </FormContainer>
        <FormContainer label='Host (SMTP)'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('host')}/>
        </FormContainer>
        <FormContainer label='Porta'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='number' {...methods.register('porta')}/>
        </FormContainer>
        <FormContainer label='Usuário'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('usuario')}/>
        </FormContainer>
        <FormContainer label='Senha'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='password' {...methods.register('senha')}/>
        </FormContainer>
      </Flex>
      <Flex w='100%' justify='flex-start' align='center' direction='column'>
        <FormContainer label='Copia para'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('copia')}/>
        </FormContainer>
        <FormContainer label='Assunto Padrão'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='email' {...methods.register('assunto')}/>
        </FormContainer>
        <FormContainer label='Mensagem Padrão'>
          <Textarea borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('mensagem')} />
        </FormContainer>
        <Flex w='100%' mt={5}>
          <Checkbox size='lg' mr='2' isChecked={autenticacao} onChange={handleChangeAutenticacao} />
          <Text onClick={handleChangeAutenticacao}>Meu servidor SMTP requer autenticação</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
