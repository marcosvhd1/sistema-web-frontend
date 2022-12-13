import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Checkbox, Flex, FormErrorMessage, Icon, Input, Text, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheck } from 'react-icons/fi';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { ApiException } from '../../../services/api/ApiException';
import { IEmissor } from '../../../services/api/emissor/EmissorService';
import { EmissorUsuarioService } from '../../../services/api/emissor/EmissorUsuarioService';
import { EmpresaService } from '../../../services/api/empresas/EmpresaService';
import { IUsuario, UsuarioService } from '../../../services/api/usuarios/UsuarioService';
import { getDecrypted } from '../../../utils/crypto';

interface FormUserProps {
  isDisabled: boolean
  setIsDisabled: () => void
  getUsers: () => void
  dataToUpdate: IUsuario
  id: number
  isEditing: boolean
}

export function FormUser({ isDisabled, setIsDisabled, getUsers, dataToUpdate, id, isEditing }: FormUserProps) {
  const { emissor, emissorByUser, getNewEmissorByUserId,getEmissoresByUser, setIdNewEmissorSelecionado } = useEmissorContext();
  const [idEmpresa, setIdEmpresa] = useState<number>();
  const [isTipoAdminChecked, setIsTipoAdminChecked] = useState<boolean>(false);
  const [tipoAdmin, setTipoAdmin] = useState<number>(0);
  const [idEmissor, setIdEmissor] = useState<number[]>([]);
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
    });
    idEmissor.splice(0, idEmissor.length);
    setIsTipoAdminChecked(false);
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

  const getPermissaoAdmin = () => {
    if (tipoAdmin === 0) {
      setTipoAdmin(1);
      setIsTipoAdminChecked(true);
    } else {
      setTipoAdmin(0);
      setIsTipoAdminChecked(false);
    }
  };

  const getEmissorId = (data: number) => {
    const index = idEmissor.indexOf(data);
    if (index > -1) {
      const newArray = [...idEmissor];
      newArray.splice(index, 1);
      setIdEmissor(newArray);
    } else {
      const newArray = [...idEmissor, data];
      setIdEmissor(newArray);
    }
  };

  const handleCreateUser = async (data: any) => {
    const dataToCreate = {
      'id_empresa': idEmpresa!,
      'email': data.email,
      'password': data.password,
      'tipo_admin': tipoAdmin,
      'ultimo_emissor_selecionado':idEmissor[0],
      'usuario_principal': 'Não'
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
    }else if (idEmissor.length === 0) {
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
                  idEmissor.forEach((id: number) => {
                    const dataEmissorUsuario = {
                      'id_usuario': result[0].id,
                      'id_emissor': id
                    };
                    EmissorUsuarioService.create(dataEmissorUsuario, HEADERS)
                      .then((result) => {
                        if (result instanceof ApiException) {
                          console.log(result.message);
                        }
                      });
                    toast({
                      position: 'top',
                      title: 'Sucesso',
                      description: 'Cadastro realizado com sucesso.',
                      status: 'success',
                      duration: 2500,
                      isClosable: true,
                    });
                    clearForm();
                    getUsers();
                  });
                }
              });
          }
        });
    }
  };

  const handleUpdateUsuario = (data: IUsuario) => {
    if (data.id === id) {
      UsuarioService.updateById(id, data, HEADERS)
        .then((result) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            clearForm();
            getUsers();
          }
        });
    }
  };

  const submitData = (data: IUsuario) => {
    const dataToUpdates = {
      id: dataToUpdate.id,
      id_empresa: dataToUpdate.id_empresa,
      email: data.email,
      password: data.password,
      tipo_admin: data.tipo_admin,
      ultimo_emissor_selecionado: dataToUpdate.ultimo_emissor_selecionado,
      usuario_principal: dataToUpdate.usuario_principal
    };
    if (isEditing)
      handleUpdateUsuario(dataToUpdates);
    else
      handleCreateUser(data);
  };

  useEffect(() => {
    getEmissoresByUser();
    getIdEmpresa(empresa, HEADERS);
  }, []);

  useEffect(() => {
    methods.setFocus('email');
  }, [isDisabled]);

  useEffect(() => {
    methods.reset(dataToUpdate);
    if (dataToUpdate?.tipo_admin === 1) {
      setIsTipoAdminChecked(true);
    } else {
      setIsTipoAdminChecked(false);
    }
    setIdNewEmissorSelecionado(dataToUpdate?.id ? dataToUpdate.id : 0);
    getNewEmissorByUserId();
    const idEmi: number[] = [];
    emissorByUser.forEach((emi: IEmissor) => {
      idEmi.push(emi.id);
    });
    setIdEmissor(idEmi);
    setIsDisabled();
  }, [dataToUpdate]);
  console.log(idEmissor);

  return (
    <form onSubmit={methods.handleSubmit(submitData)}>
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
                  <Checkbox key={data.id} isChecked={idEmissor.includes(data.id)} onChange={() => getEmissorId(data.id)} value={data.id}>{data.razao}</Checkbox>
                )): ''}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Checkbox isDisabled={isDisabled} my='1rem' isChecked={isTipoAdminChecked} onChange={getPermissaoAdmin} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} >Permissão de Administrador</Checkbox>
        <Flex w="100%" justify='center' >
          <Button w="100%" isDisabled={isDisabled} variant='outline' colorScheme="green" type="submit" size='sm'><Icon as={FiCheck} mr={1} />Salvar</Button>
        </Flex>
      </Flex>
    </form>
  );
}
