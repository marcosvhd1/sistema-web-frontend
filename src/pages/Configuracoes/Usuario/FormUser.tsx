import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Checkbox, Flex, FormErrorMessage, Icon, Input, Text, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiCheck } from 'react-icons/fi';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { ApiException } from '../../../services/api/ApiException';
import { EmissorService, IEmissor } from '../../../services/api/emissor/EmissorService';
import { EmissorUsuarioService } from '../../../services/api/emissor/EmissorUsuarioService';
import { EmpresaService } from '../../../services/api/empresas/EmpresaService';
import { IUsuario, UsuarioService } from '../../../services/api/usuarios/UsuarioService';
import { getDecrypted } from '../../../utils/crypto';
import { userInfos } from '../../../utils/header';

interface FormUserProps {
  isDisabled: boolean
  getUsers: () => void
  dataToUpdate: IUsuario
  id: number
  isEditing: boolean
  setIdEmissor: (value: number[]) => void
}

export function FormUser({ isDisabled, setIdEmissor, getUsers, dataToUpdate, id, isEditing }: FormUserProps) {
  const { emissores, idEmissor, getEmissores, setIdEmissorSelecionado, getIdEmissoresByUser } = useEmissorContext();
  const [idEmpresa, setIdEmpresa] = useState<number>();
  const [isTipoAdminChecked, setIsTipoAdminChecked] = useState<boolean>(false);
  const [tipoAdmin, setTipoAdmin] = useState<number>(0);

  const toast = useToast();
  const { colorMode } = useColorMode();
  const methods = useFormContext();

  const userInfo = userInfos();

  const HEADERS = userInfo.header;

  const { empresa } = userInfo.infos;

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
            EmissorUsuarioService.deleteById(id, HEADERS)
              .then(() => {
                idEmissor.forEach((idEmi: number) => {
                  const dataEmissorUsuario = {
                    'id_usuario': id,
                    'id_emissor': idEmi
                  };
                  EmissorUsuarioService.create(dataEmissorUsuario, HEADERS)
                    .then((result) => {
                      if (result instanceof ApiException) {
                        console.log(result.message);
                      }
                    });
                });
                toast({
                  position: 'top',
                  title: 'Sucesso',
                  description: 'Usuário atualizado com sucesso.',
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
    if (isEditing) {
      handleUpdateUsuario(dataToUpdates);
    }
    else {
      handleCreateUser(data);

    }
  };

  useEffect(() => {
    methods.reset(dataToUpdate);
    if (dataToUpdate?.tipo_admin === 1) {
      setIsTipoAdminChecked(true);
    } else {
      setIsTipoAdminChecked(false);
    }
    setIdEmissorSelecionado(dataToUpdate?.id ? dataToUpdate.id : 0);
    getIdEmissoresByUser();
    getEmissores();
  }, [dataToUpdate]);

  useEffect(() => {
    getIdEmpresa(empresa, HEADERS);
    getEmissores();

  }, []);

  useEffect(() => {
    methods.setFocus('email');
  }, [isDisabled]);

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
                {emissores !== undefined ? emissores.map((data: any) => (
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
