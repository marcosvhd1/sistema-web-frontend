import { Checkbox, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../components/Form/FormContainer';
import { IConfig } from '../../../services/api/config/ConfigService';

export function TabEmail() {
  const methods = useFormContext<IConfig>();

  const [autenticacao, setAutenticacao] = useState<boolean>(false);
  const [ssl, setSSL] = useState<boolean>(false);
  const [tls, setTLS] = useState<boolean>(false);

  const handleChangeAutenticacao = () => {
    setAutenticacao(!autenticacao);
  };

  const handleChangeSSL = () => {
    setSSL(!ssl);
  };

  const handleChangeTLS = () => {
    setTLS(!tls);
  };

  return (
    <Flex w='100%' justify='center' align='flex-start'>
      <Flex w='100%' justify='center' align='flex-start' direction='column' mr={5}>
        <FormContainer label='Nome Remetente'>
          <Input type='text' {...methods.register('email_remetente')} />
        </FormContainer>
        <FormContainer label='Email'>
          <Input type='email' {...methods.register('email')}/>
        </FormContainer>
        <FormContainer label='Host (SMTP)'>
          <Input type='text' {...methods.register('host')}/>
        </FormContainer>
        <FormContainer label='Usuário'>
          <Input type='text' {...methods.register('usuario')}/>
        </FormContainer>
        <FormContainer label='Senha'>
          <Input type='password' {...methods.register('senha')}/>
        </FormContainer>
        <FormContainer label='Porta'>
          <Input type='number' {...methods.register('porta')}/>
        </FormContainer>
        <Flex w='100%' mt={5}>
          <Checkbox size='lg' mr='2' isChecked={autenticacao} onChange={handleChangeAutenticacao} />
          <Text onClick={handleChangeAutenticacao}>Meu servidor SMTP requer autenticação</Text>
        </Flex>
        <Flex w='100%' mt={5} visibility={autenticacao ? 'visible' : 'hidden'}>
          <Checkbox size='lg' mr='2' isChecked={ssl} onChange={handleChangeSSL}/>
          <Text onClick={handleChangeSSL} mr={5}>SSL</Text>
          <Checkbox size='lg' mr='2' isChecked={tls} onChange={handleChangeTLS}/>
          <Text onClick={handleChangeTLS}>TLS</Text>
        </Flex>
      </Flex>
      <Flex w='100%' justify='flex-start' align='center' direction='column'>
        <FormContainer label='Copia para'>
          <Input type='text' {...methods.register('copia')}/>
        </FormContainer>
        <FormContainer label='Assunto Padrão'>
          <Input type='email' {...methods.register('assunto')}/>
        </FormContainer>
        <FormContainer label='Mensagem Padrão'>
          <Textarea {...methods.register('mensagem')} />
        </FormContainer>
      </Flex>
    </Flex>
  );
}
