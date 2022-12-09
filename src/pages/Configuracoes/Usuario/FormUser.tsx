import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Checkbox, Flex, FormErrorMessage, Icon, Input, Text, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheck } from 'react-icons/fi';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { ApiException } from '../../../services/api/ApiException';
import { EmissorUsuarioService } from '../../../services/api/emissor/EmissorUsuarioService';
import { EmpresaService } from '../../../services/api/empresas/EmpresaService';
import { IUsuario, UsuarioService } from '../../../services/api/usuarios/UsuarioService';
import { getDecrypted } from '../../../utils/crypto';

interface FormUserProps {
  isDisabled: boolean
  setIsDisabled: () => void
}

export function FormUser({ isDisabled, setIsDisabled }: FormUserProps) {
  const { emissor, getEmissoresByUser } = useEmissorContext();
  const [idEmpresa, setIdEmpresa] = useState<number>();
  const [isCbChecked, setIsCbChecked] = useState<boolean>(false);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const methods = useForm();

  const LOCAL_DATA = getDecrypted(localStorage.getItem('user'));
  const TOKEN = LOCAL_DATA?.user.accessToken;

  const HEADERS = {
    headers: {
      'Authorization': TOKEN
    }
  };
  const { empresa } = LOCAL_DATA.user;

  const clearForm = () => {
    methods.reset({
      email: '',
      password: '',
      emissores: false,
      tipo_admin: false
    });
  };

  const getIdEmpresa = (cnpjcpf: string, HEADERS: any) => {
    EmpresaService.getId(cnpjcpf, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setIdEmpresa(result.data[0].id);
        }
      });
  };

  const handleCreateUser = async (data: any) => {
    const emissores = data.emissores;
    const dataToCreate = {
      'id_empresa': idEmpresa!,
      'email': data.email,
      'password': data.password,
      'tipo_admin': parseInt(data.tipo_admin ? data.tipo_admin : 0),
      'ultimo_emissor_selecionado':parseInt(emissores[0])
    };
    const isUsuarioCadastrado: IUsuario[] = await UsuarioService.getUserId(idEmpresa!, dataToCreate.email, HEADERS);

    if (isUsuarioCadastrado.length > 0) {
      toast({
        position: 'top',
        title: 'Erro ao cadastrar novo usuário.',
        description: 'Login já existente.',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
    }else if (emissores.length === 0 || emissores === false ) {
      toast({
        position: 'top',
        title: 'Erro ao cadastrar novo usuário.',
        description: 'Selecione um emissor para concluir.',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
    } else {
      UsuarioService.create(dataToCreate, HEADERS)
        .then((result) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            UsuarioService.getUserId(idEmpresa!, dataToCreate.email, HEADERS)
              .then((result) => {
                if (result instanceof ApiException) {
                  console.log(result.message);
                } else {
                  emissores.forEach((emi: number) => {
                    const dataEmissorUsuario = {
                      'id_usuario': result[0].id,
                      'id_emissor': emi
                    };
                    EmissorUsuarioService.create(dataEmissorUsuario, HEADERS)
                      .then((result) => {
                        if (result instanceof ApiException) {
                          console.log(result.message);
                        } else {
                          toast({
                            position: 'top',
                            title: 'Sucesso',
                            description: 'Cadastro realizado com sucesso.',
                            status: 'success',
                            duration: 2500,
                            isClosable: true,
                          });
                          clearForm();
                        }
                      });
                  });
                }
              });
          }
        });
    }
  };

  useEffect(() => {
    getEmissoresByUser();
    getIdEmpresa(empresa, HEADERS);
  }, []);

  useEffect(() => {
    methods.setFocus('email');
  }, [isDisabled]);

  return (
    <form onSubmit={methods.handleSubmit(handleCreateUser)}>
      <Flex direction='column' w='100%' h='100%' p='.5rem' align='center' justify='space-between' overflowY='auto'>
        <Flex direction='column' >
          <Text fontSize="sm" fontWeight='medium'>Login</Text>
          <Input type='text' isDisabled={isDisabled} {...methods.register('email')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} isRequired/>
        </Flex>
        <Flex direction='column'>
          <Text fontSize="sm" fontWeight='medium'>Senha</Text>
          <Input type='password' isDisabled={isDisabled} {...methods.register('password')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} isRequired/>
        </Flex>
        <Accordion defaultIndex={[-1]} w='100%' allowToggle my='1rem' borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}>
          <AccordionItem isDisabled={isDisabled}>
            <h2>
              <AccordionButton>
                <Flex flex='1' textAlign='left'>
                Emissores
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}>
              <Flex direction='column' gap='2'>
                {emissor !== undefined ? emissor.map((data: any) => (
                  <Checkbox key={data.id} value={data.id} {...methods.register('emissores')}>{data.razao}</Checkbox>
                )): ''}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Checkbox isDisabled={isDisabled} my='1rem' value={1} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}  {...methods.register('tipo_admin')}>Permissão de Administrador</Checkbox>
        <Flex w="100%" justify='center' >
          <Button w="100%" isDisabled={isDisabled} variant='outline' colorScheme="green" type="submit" size='sm'><Icon as={FiCheck} mr={1} />Salvar</Button>
        </Flex>
      </Flex>
    </form>
  );
}
