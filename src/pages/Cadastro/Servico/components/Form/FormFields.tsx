import { Divider, Flex, Input, Select, Text, Textarea, useColorMode } from '@chakra-ui/react';
import moment from 'moment';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../components/Form/FormContainer';
import { IServico } from '../../../../../services/api/servicos/ServicoService';

interface IFormFields {
  editCod: number
  getCod: () => void
  cod: number
  isEditing: boolean
}

export function FormFields({ editCod, isEditing, cod, getCod }: IFormFields) {
  const { register, setFocus } = useFormContext<IServico>();
  const { colorMode } = useColorMode();

  useEffect(() => {
    getCod();
    setFocus('nserv');
    setTimeout(() => {
      setFocus('descricao');
    }, 100);
  }, []);

  return (
    <Flex direction="column" justify="space-between">
      <Text fontSize="xl">Dados Principais</Text>
      <Divider />
      <Flex gap="3" align="center">
        <FormContainer label="Código" width="5rem">
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="id" type="text" w="5rem" isReadOnly value={(`0000${isEditing ? editCod : cod}`).slice(-4)} {...register('nserv')} />
        </FormContainer>
        <FormContainer label="Descrição do Serviço" isRequired={true}>
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('descricao')} />
        </FormContainer>
      </Flex>
      <Flex justify="space-between">
        <FormContainer label="Preço" width="6rem">
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" step={0.01} w="6rem" {...register('preco', {
            setValueAs: (value) => value === '' ? 0 : parseFloat(value),
          })} />
        </FormContainer>
        <FormContainer label="Unidade" width="5rem">
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="5rem" {...register('un')} />
        </FormContainer>
        <FormContainer width="8rem" label="Cadastrado" >
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="cadastrado" type="text" w="8rem" isReadOnly value={moment().format('DD/MM/YYYY')} />
        </FormContainer>
        <FormContainer width="8rem" label="Alterado" >
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="cadastrado" type="text" w="8rem" isReadOnly value={moment().format('DD/MM/YYYY')} />
        </FormContainer>
      </Flex>
      <FormContainer label="Anotações Gerais">
        <Textarea borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('anotacoes')} />
      </FormContainer>
      <Text fontSize="xl" mt={2}>Nota Fiscal</Text>
      <Divider />
      <Flex justify="space-between">
        <FormContainer label="Base de Calculo ISS" width="10rem">
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" step={0.01} w="10rem" {...register('base_iss', {
            setValueAs: (value) => value === '' ? 0 : parseFloat(value),
          })} />
        </FormContainer>
        <FormContainer label="Alíquota ISS" width="10rem">
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="number" step={0.01} w="10rem" {...register('aliquota_iss', {
            setValueAs: (value) => value === '' ? 0 : parseFloat(value),
          })} />
        </FormContainer>
        <FormContainer label="NCM" width="10rem">
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" w="10rem" {...register('ncm')} />
        </FormContainer>
      </Flex>
      <Flex align="center" justify="space-between">
        <FormContainer label="Item Lista de Serviços" width="15rem">
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="15rem" {...register('item_lista')} />
        </FormContainer>
        <FormContainer label="Situação Tributária" width="15rem">
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('situacao')}>
            <option value='Normal'>Normal</option>
            <option value='retida'>Retida</option>
            <option value='substituta'>Substituta</option>
            <option value='isenta'>Isenta</option>
          </Select>
        </FormContainer>
      </Flex>
    </Flex>
  );
}
