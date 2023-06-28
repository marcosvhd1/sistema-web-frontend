import { Button, Checkbox, Flex, Icon, IconButton, Input, Select, Textarea, useColorMode } from '@chakra-ui/react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FcPlus } from 'react-icons/fc';
import { FormContainer } from '../../../../../components/Form/FormContainer';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { useModalGroup } from '../../../../../Contexts/Modal/GroupConxtext';
import { ApiException } from '../../../../../services/api/ApiException';
import { GroupService, IGroup } from '../../../../../services/api/produtos/GroupService';
import { IProduct } from '../../../../../services/api/produtos/ProductService';
import { GroupModal } from './ModalGroup';

interface IFormFields {
  editCod: number
  getCod: () => void
  cod: number
  isEditing: boolean
  header: any
  marca: string
  grupo: string
  active: boolean
  setActive: (value: boolean) => void
}

export function DadosPrincipais({ marca, grupo, editCod, isEditing, getCod, cod, header, setActive, active}: IFormFields) {
  const { register, setFocus, setValue } = useFormContext<IProduct>();
  const { colorMode } = useColorMode();
  const {onOpen} = useModalGroup();
  const [isMarca, setIsMarca] = useState<boolean>(false);
  const { idEmissorSelecionado } = useEmissorContext();
  const [data, setData] = useState<IGroup[]>([]);

  useEffect(() => {
    getCod();
    getDados();
    setFocus('nprod');
    setTimeout(() => {
      setFocus('descricao');
    }, 100);
  }, []);

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        setValue('marca', marca);
        setValue('grupo', grupo);
      }, 100);
    } else {
      setTimeout(() => {
        setValue('marca', '');
        setValue('grupo', '');

      }, 100);
    }
  },[]);

  const openMarca = () => {
    setIsMarca(true);
    onOpen();
  };
  const openGrupo = () => {
    setIsMarca(false);
    onOpen();
  };

  const getDados = async () => {
    GroupService.getAll(idEmissorSelecionado, header)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
        }});
  };


  return (
    <Flex w={{md: '51rem', lg: '58rem'}} h='20rem'  gap="2" direction="column">
      <Flex w="100%" >
        {/* lado a */}
        <Flex direction="column" w="50%" mr={6}>
          <Flex gap="2">
            <FormContainer label="Código" width="5rem">
              <Input maxLength={255} id="nprod" type="text" w="5rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} isReadOnly value={(`0000${isEditing ? editCod : cod}`).slice(-4)} {...register('nprod')} />
            </FormContainer>
            <FormContainer label="Descrição">
              <Input maxLength={500} id="descricao" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('descricao')} isRequired />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Referência" >
              <Input maxLength={255} id="referencia" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('referencia')} />
            </FormContainer>
            <FormContainer label="Código de Barras">
              <Input maxLength={255} id="codbarras" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('codbarras')} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Preço">
              <Input isRequired maxLength={255} id="preco" placeholder="R$0,00"type="number" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} step={0.01} {...register('preco', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
            <FormContainer label="UN">
              <Input isRequired maxLength={255} id="un" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('un')} />
            </FormContainer>
          </Flex>
        </Flex>
        {/* lado b */}
        <Flex direction="column" w="50%">
          <Flex gap="2">
            <Flex w='100%' align='center' gap='2'>
              <FormContainer label="Marca" >
                <Select id="marca" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('marca')} >
                  <option value=''></option>
                  {data != undefined ? data.map((data) => (
                    data.tipo.toUpperCase() === 'MARCA'
                      ?
                      <option key={data.id} value={data.descricao}>{data.descricao}</option>
                      :
                      ''
                  ))
                    :
                    ''}
                </Select>
              </FormContainer>
              <FormContainer label='' width="2rem">
                <IconButton onClick={openMarca} mt='1.3rem'  variant='outline' fontSize="2xl" aria-label='Botao de adicionar grupo' icon={<FcPlus />} _hover={{'filter': 'brightness(0.8)'}} transition='0.3s' />
              </FormContainer>
            </Flex>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Grupo">
              <Select id="grupo" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('grupo')} >
                <option value=''></option>
                {data != undefined ? data.map((data) => (
                  data.tipo.toUpperCase() === 'GRUPO'
                    ?
                    <option key={data.id} id={data.descricao} value={data.descricao}>{data.descricao}</option>
                    :
                    ''
                ))
                  :
                  ''}
              </Select>
            </FormContainer>
            <FormContainer label='' width="2rem">
              <IconButton onClick={openGrupo} mt='1.3rem'  variant='outline' fontSize="2xl" aria-label='Botao de adicionar grupo' icon={<FcPlus />}  _hover={{'filter': 'brightness(0.8)'}} transition='0.3s' />
            </FormContainer>
          </Flex>
          <Flex w="100%" gap='3' justify='space-between'>
            <FormContainer label="Status" width="6rem" >
              <Checkbox id="status" onChange={() => setActive(!active)} value={active ? 'Ativo' : 'Inativo'} isChecked={active} size="lg" colorScheme="green" mt='.4rem'>
                {active ? 'Ativo' : 'Inativo'}
              </Checkbox>
            </FormContainer>
            <FormContainer width="8rem" label="Cadastrado" >
              <Input maxLength={255} id="cadastrado" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="8rem" isReadOnly value={moment().format('DD/MM/YYYY')} />
            </FormContainer>
            <FormContainer width="8rem" label="Alterado" >
              <Input maxLength={255} id="alterado" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="8rem" isReadOnly value={moment().format('DD/MM/YYYY')} />
            </FormContainer>
          </Flex>
        </Flex>
      </Flex>
      <FormContainer label="Anotações">
        <Textarea maxLength={5000} id="anotacoes" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('anotacoes')}/>
      </FormContainer>
      <GroupModal refreshData={getDados} header={header} isMarca={isMarca}/>
    </Flex>
  );
}
