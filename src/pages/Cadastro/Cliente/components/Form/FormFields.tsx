import {
  Divider,
  Flex,
  Input,
  Select,
  Stack,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { FormContainer } from '../../../../../components/Form/FormContainer';
import { Adress } from './Adress';
import { Contact } from './Contact';

import { useColorMode } from '@chakra-ui/react';
import moment from 'moment';
import { IClient } from '../../../../../services/api/clientes/ClientService';
import { formatCnpjCpf } from '../../../../../utils/formatarCnpjCpf';
import { validaCpfCnpj } from '../../../../../utils/validaCnpjCpf';

interface IFormFields {
  id: number
  editCod: number
  getCod: () => void
  cod: number
  isEditing: boolean
}

export function FormFields({ id, editCod, isEditing, cod, getCod }: IFormFields) {
  const { register, formState: { errors }, setFocus, getValues, setValue } = useFormContext<IClient>();
  const { colorMode } = useColorMode();

  const [IErequired, setIErequired] = useState<boolean>(false);

  useEffect(() => {
    getCod();
    setFocus('cod');
    setTimeout(() => {
      setFocus('razao');
    }, 100);
  }, []);

  const validarCampo = () => {
    const data = getValues('cnpjcpf');
    const formatado = formatCnpjCpf(data);
    if (validaCpfCnpj(formatado)) {
      setValue('cnpjcpf', formatado);
    }
  };

  const IEisRequired = (value: any) => {
    if (value == '9') setIErequired(false);
    else setIErequired(true);
  };

  return (
    <Flex w="58rem" h="40rem" direction="column" justify="space-between">
      <Flex w="100%" >
        {/*lado A */}
        <Flex direction="column" w="50%">
          <Flex w="100%" justify="space-between">
            <FormContainer label="Código" width="5rem">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="id" type="text" w="5rem" isReadOnly value={(`0000${isEditing ? editCod : cod}`).slice(-4)} {...register('cod')} />
            </FormContainer>
            <FormContainer label="Tipo" width="4rem">
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}  w="4rem" {...register('tipo')}>
                <option value='f'>F</option>
                <option value='j'>J</option>
              </Select>
            </FormContainer>
            <FormContainer label="Categoria" width="9rem">
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}  {...register('categoria')}>
                <option value='cliente'>Cliente</option>
                <option value='fornecedor'>Fornecedor</option>
                <option value='outro'>Outro</option>
              </Select>
            </FormContainer>
            <FormContainer width="8rem" label="Alterado" >
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="cadastrado" type="text" w="8rem" isReadOnly value={moment().format('DD/MM/YYYY')} />
            </FormContainer>
          </Flex>
          <Flex direction="column">
            <FormContainer label="Nome / Razão Social" error={errors.razao} isRequired={true}>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="nome" type="text" {...register('razao')} />
            </FormContainer>
            <FormContainer label="Nome Fantasia">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="fantasia" type="text" {...register('fantasia')} />
            </FormContainer>
          </Flex>
        </Flex>

        {/*lado B */}
        <Flex direction="column" w="50%" ml="6">
          <Flex>
            <FormContainer label="CPF / CNPJ">
              <Input isRequired maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="cnpjcpf" type="text" w="14rem" {...register('cnpjcpf', {
                onBlur: (event) => validarCampo()
              })} mr="3" />
            </FormContainer>
            <FormContainer label="RG">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="rg" type="text" w="14rem" {...register('rg')} />
            </FormContainer>
          </Flex>
          <Flex>
            <FormContainer label="Inscrição Estadual (IE)">
              <Input isRequired={IErequired} maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="ie" type="number" w="14rem" {...register('ie')} mr="3" />
            </FormContainer>
            <FormContainer label="Inscrição Municipal">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="im" type="number" w="14rem" {...register('im')} />
            </FormContainer>
          </Flex>
          <Flex>
            <FormContainer label="Suframa">
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} id="suframa" type="text" w="14rem" {...register('suframa')} mr="3" />
            </FormContainer>
            <FormContainer label="Tipo de Contribuinte">
              <Select isRequired borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'}  w="14rem" {...register('tipo_contribuinte')} onChange={(event) => IEisRequired(event.target.value)}>
                <option value='1'>Contribuinte ICMS</option>
                <option value='2'>Contribuinte ISENTO</option>
                <option value='9'>Não Contribuinte</option>
              </Select>
            </FormContainer>
          </Flex>
        </Flex>
      </Flex>

      {/*Área Contatos*/}
      <Stack mt="5">
        <Text fontSize="xl">Contato</Text>
        <Divider />
        <Contact />
      </Stack>

      {/*Área Endereço*/}
      <Stack mt="5">
        <Text fontSize="xl" >Endereço</Text>
        <Divider />
        <Adress id={id}/>
      </Stack>
    </Flex>
  );
}
