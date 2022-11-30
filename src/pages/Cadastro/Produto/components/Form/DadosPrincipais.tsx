import { Button, Checkbox, Flex, Icon, IconButton, Input, Select, Textarea, useColorMode } from '@chakra-ui/react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FcPlus } from 'react-icons/fc';
import { FormContainer } from '../../../../../components/Form/FormContainer';
import { useModalGroup } from '../../../../../Contexts/Modal/GroupConxtext';
import { IProduct } from '../../../../../services/api/produtos/ProductService';
import { GroupModal } from './ModalGroup';

interface IFormFields {
  editCod: number
  getCod: () => void
  cod: number
  isEditing: boolean
  header: any
}

export function DadosPrincipais({ editCod, isEditing, getCod, cod, header }: IFormFields) {
  const { register, setFocus } = useFormContext<IProduct>();
  const [active, setActive] = useState<boolean>(true);
  const { colorMode } = useColorMode();
  const {onOpen} = useModalGroup();
  const [isMarca, setIsMarca] = useState<boolean>(false);

  useEffect(() => {
    getCod();
    setFocus('nprod');
    setTimeout(() => {
      setFocus('descricao');
    }, 100);
  }, []);

  const openMarca = () => {
    setIsMarca(true);
    onOpen();
  };
  const openGrupo = () => {
    setIsMarca(false);
    onOpen();
  };

  return (
    <Flex w={{md: '51rem', lg: '58rem'}} h='20rem'  gap="2" direction="column">
      <Flex w="100%" >
        {/* lado a */}
        <Flex direction="column" w="50%" mr={6}>
          <Flex gap="2">
            <FormContainer label="Código" width="5rem">
              <Input id="nprod" type="text" w="5rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} isReadOnly value={(`0000${isEditing ? editCod : cod}`).slice(-4)} {...register('nprod')} />
            </FormContainer>
            <FormContainer label="Descrição">
              <Input id="descricao" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('descricao')} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Referência" >
              <Input id="referencia" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('referencia')} />
            </FormContainer>
            <FormContainer label="Código de Barras">
              <Input id="codbarras" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('codbarras')} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Preço">
              <Input id="preco" placeholder="R$0,00"type="number" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} step={0.01} {...register('preco', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
            <FormContainer label="UN">
              <Input id="un" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('un')} />
            </FormContainer>
          </Flex>
        </Flex>
        {/* lado b */}
        <Flex direction="column" w="50%">
          <Flex gap="2">
            <Flex w='100%' align='center' gap='2'>
              <FormContainer label="Marca" >
                <Select id="marca" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} >
                </Select>
              </FormContainer>
              <FormContainer label='' width="2rem">
                <IconButton onClick={openMarca} mt='1.3rem'  variant='outline' fontSize="2xl" aria-label='Botao de adicionar grupo' icon={<FcPlus />} _hover={{'filter': 'brightness(0.8)'}} transition='0.3s' />
              </FormContainer>
            </Flex>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Grupo">
              <Select id="grupo" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}>
              </Select>
            </FormContainer>
            <FormContainer label='' width="2rem">
              <IconButton onClick={openGrupo} mt='1.3rem'  variant='outline' fontSize="2xl" aria-label='Botao de adicionar grupo' icon={<FcPlus />}  _hover={{'filter': 'brightness(0.8)'}} transition='0.3s' />
            </FormContainer>
          </Flex>
          <Flex w="100%" gap='3' justify='space-between'>
            <FormContainer label="Status" width="6rem" >
              <Checkbox id="status" onChange={() => setActive(!active)} isChecked={active} size="lg" colorScheme="green" mt='.4rem'>
                {active ? 'Ativo' : 'Inativo'}
              </Checkbox>
            </FormContainer>
            <FormContainer width="8rem" label="Cadastrado" >
              <Input id="cadastrado" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="8rem" isReadOnly value={moment().format('DD/MM/YYYY')} />
            </FormContainer>
            <FormContainer width="8rem" label="Alterado" >
              <Input id="alterado" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="8rem" isReadOnly value={moment().format('DD/MM/YYYY')} />
            </FormContainer>
          </Flex>
        </Flex>
      </Flex>
      <FormContainer label="Anotações">
        <Textarea id="anotacoes" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('anotacoes')}/>
      </FormContainer>
      <GroupModal header={header} isMarca={isMarca}/>
    </Flex>
  );
}
