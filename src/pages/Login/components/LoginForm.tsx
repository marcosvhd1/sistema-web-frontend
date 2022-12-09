import { Button, Flex, Input, InputGroup, InputLeftAddon, Stack, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiAtSign, FiLock, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../Contexts/AuthProvider';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { useModalEmissor } from '../../../Contexts/Modal/EmissorContext';
import { Api } from '../../../services/api/ApiConfig';
import { getEncrypted } from '../../../utils/crypto';

interface ILogin {
  email: string
  password: string
  cnpjcpf: string
  errorLogin: string
}

export function LoginForm() {
  const { register, handleSubmit, setFocus } = useForm<ILogin>();
  const { auth, setAuth } = useAuthContext();
  const {getEmissoresByUser, setIdEmissorSelecionado, setIdUsuarioSelecionado} = useEmissorContext();
  const navigate = useNavigate();
  const toast = useToast();
  const { onOpen } = useModalEmissor();


  const submitData = async (data: ILogin) => {
    try {
      const response = await Api().post('/login', data,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });

      const user = {
        'user': {
          'empresa': data.cnpjcpf,
          'email': data.email,
          'permissao': response.data.admin,
          'accessToken': `Bearer ${response.data.token.token}`
        },
      };

      setAuth(user);

      const cryptoData = getEncrypted(user);

      setIdUsuarioSelecionado(response.data.idUser);
      setIdEmissorSelecionado(response.data.ultimoEmissor);
      localStorage.setItem('user', cryptoData);
      getEmissoresByUser();
      onOpen();
      navigate('/app');

    } catch (error: any) {
      toast({
        position: 'top',
        description: 'Credencias inválidas',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(()=> {
    setFocus('cnpjcpf');
  }, []);


  return (
    <Flex
      justify="center"
      align="center"
      w="100%"
      direction="column"
      marginTop={{ md: 2, lg: 10 }}
    >
      <form onSubmit={handleSubmit(submitData)}>
        <Stack
          spacing="4"
          w="100%"
        >
          <InputGroup
            size="lg"
          >
            <InputLeftAddon borderColor="blackAlpha.500" color="gray.700">
              <FiUser />
            </InputLeftAddon>
            <Input
              borderColor="blackAlpha.500"
              type="text"
              placeholder="CNPJ"
              color="black"
              {...register('cnpjcpf')}
            />
          </InputGroup>
          <InputGroup
            size="lg"
          >
            <InputLeftAddon borderColor="blackAlpha.500" color="gray.700" >
              <FiAtSign />
            </InputLeftAddon>
            <Input
              borderColor="blackAlpha.500"
              focusBorderColor="orange.400"
              type="text"
              placeholder="E-mail"
              color="black"
              {...register('email')}
            />
          </InputGroup>
          <InputGroup
            size="lg"
          >
            <InputLeftAddon borderColor="blackAlpha.500" color="gray.700" >
              <FiLock />
            </InputLeftAddon>
            <Input
              borderColor="blackAlpha.500"
              type="password"
              placeholder="Senha"
              color="black"
              {...register('password')}
            />
          </InputGroup>
          <Button size="md" colorScheme="messenger" type='submit'>
            Acessar
          </Button>
        </Stack>
      </form>
    </Flex>
  );
}
