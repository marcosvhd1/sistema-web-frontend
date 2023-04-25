import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { IEmissor } from '../../../../services/api/emissor/EmissorService';
import { IUsuario, UsuarioService } from '../../../../services/api/usuarios/UsuarioService';
import { useModalUser } from '../../../../Contexts/Modal/UserContext';
import { FormContainer } from '../../../../components/Form/FormContainer';
import { useEmissorContext } from '../../../../Contexts/EmissorProvider';
import { EmpresaService } from '../../../../services/api/empresas/EmpresaService';
import { ApiException } from '../../../../services/api/ApiException';
import { userInfos } from '../../../../utils/header';
import { EmissorUsuarioService } from '../../../../services/api/emissor/EmissorUsuarioService';

interface ModalUsuarioProps {
  id: number;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  admin: boolean;
  setAdmin: (value: boolean) => void;
  ativo: boolean;
  setAtivo: (value: boolean) => void;
  getUsuarios: (value: string) => void;
}

export function ModalUsuario({ id, isEditing, setIsEditing, admin, setAdmin, ativo, setAtivo, getUsuarios }: ModalUsuarioProps) {
  const methods = useFormContext<IUsuario>();
  const toast = useToast();

  const [idEmpresa, setIdEmpresa] = useState<number>();

  const { emissores, idEmissor, getEmissores, getIdEmissoresByUser, setIdEmissor } = useEmissorContext();
  const { onClose, isOpen } = useModalUser();
  const { colorMode } = useColorMode();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;
  const permissao = userInfo.infos?.permissao;
  const { empresa } = userInfo.infos;

  useEffect(() => {
    if (isOpen === true) {
      getEmissores();
      getIdEmpresa(empresa, HEADERS);
      if (isEditing) getIdEmissoresByUser();
    }
  }, [isOpen]);

  const clearForm = () => {
    methods.reset({email: '', password: ''});
    idEmissor.splice(0, idEmissor.length);
    setAdmin(false);
    setIsEditing(false);
    onClose();
  };

  const handleChangeAdmin = () => {
    if (permissao === 1 ? true : false) setAdmin(!admin);
  };

  const handleChangeAtivo = () => {
    setAtivo(!ativo);
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
      'tipo_admin': admin ? 1 : 0,
      'ultimo_emissor_selecionado': idEmissor[0],
      'usuario_principal': 'Não',
      'status': ativo ? 'Ativo' : 'Inativo'
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
                  idEmissor.forEach((idEmi: number) => {
                    console.log(result[0].id);
                    console.log(idEmi);
                    const dataEmissorUsuario = {
                      'id_usuario': result[0].id,
                      'id_emissor': idEmi
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
                    getUsuarios('');
                  });
                }
              });
          }
        });
    }
  };

  const handleUpdateUser = (data: IUsuario) => {
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
                getUsuarios('');
              });
          }
        });
    }
  };

  const submitData = (data: IUsuario) => {
    if (isEditing) {
      const dataToUpdate = {
        'id': id,
        'id_empresa': idEmpresa!,
        'email': data.email,
        'password': data.password,
        'tipo_admin': admin ? 1 : 0,
        'ultimo_emissor_selecionado': idEmissor[0],
        'usuario_principal': 'Não',
        'status': ativo ? 'Ativo' : 'Inativo'
      };

      handleUpdateUser(dataToUpdate);
    } else {
      handleCreateUser(data);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={clearForm}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size={{md: '4xl', lg: '5xl'}}
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>Cadastro de Usuário</ModalHeader>
          <ModalCloseButton onClick={clearForm} />
          <ModalBody>
            <Flex width="100%" justify="center" align="flex-start">
              <Flex width="100%" justify="center" align="center" direction="column" mr={5}>
                <FormContainer label='Login'>
                  <Input type='text' {...methods.register('email')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}/>
                </FormContainer>
                <FormContainer label='Senha'>
                  <Input type='password' {...methods.register('password')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}/>
                </FormContainer>
                <Flex w='100%' mt={5}>
                  <Checkbox size='lg' mr='2' isChecked={admin} onChange={handleChangeAdmin} />
                  <Text onClick={handleChangeAdmin}>Permissão de Admin</Text>
                </Flex>
                <Flex w='100%' mt={5}>
                  <Checkbox size='lg' mr='2' isChecked={ativo} onChange={handleChangeAtivo} />
                  <Text onClick={handleChangeAtivo}>{ativo ? 'Ativo' : 'Inativo'}</Text>
                </Flex>
              </Flex>
              <FormContainer label='Lista de Emissores'>
                <Flex width="100%" gap={2} mt={3} overflow='auto' maxH='10rem' direction='column'>
                  {emissores !== undefined ? emissores.map((data: any) => (
                    <Checkbox id={data.id} key={data.id} isChecked={idEmissor.includes(data.id)} onChange={() => getEmissorId(data.id)} value={data.id}>{data.razao}</Checkbox>
                  )): ''}
                </Flex>
              </FormContainer>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex justify='space-between' w='100%'>
              <Button variant='solid' colorScheme="green" type='submit'><Icon as={FiCheck} mr={1} />{isEditing ? 'Editar' : 'Cadastrar'}</Button>
              <Button variant='outline' colorScheme="red" onClick={clearForm}><Icon as={FiSlash} mr={1} />Cancelar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
