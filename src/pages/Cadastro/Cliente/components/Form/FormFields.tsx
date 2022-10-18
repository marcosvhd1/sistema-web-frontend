import {
  Divider,
  Flex,
  Input,
  Select,
  Stack,
  Text
} from "@chakra-ui/react";

import { useFormContext } from "react-hook-form";

import { FormContainer } from "../../../../../components/Form/FormContainer";
import { Adress } from "./Adress";

import * as zod from "zod"

import { newClientFormValidationSchema } from "./FormModal"

import { Contact } from "./Contact/Contact";

type FormFieldsProps = zod.infer<typeof newClientFormValidationSchema>

interface FormFields {
  nome: string
}


export function FormFields() {
  const { register, formState: { errors } } = useFormContext<FormFieldsProps>();

  return (
    <Flex w="58rem" h="40rem" direction="column" justify="space-between">
      <Flex w="100%" >
        {/*lado A */}
        <Flex direction="column" w="50%">
          <Flex w="100%" justify="space-between">
            <FormContainer label="Código" width="5rem">
              <Input id="id" type="text" w="5rem" isReadOnly value={"00001"} {...register('id')} />
            </FormContainer>
            <FormContainer label="Tipo" width="4rem">
              <Select w="4rem" {...register('tipo')}>
                <option value='f'>F</option>
                <option value='j'>J</option>
              </Select>
            </FormContainer>
            <FormContainer label="Categoria" width="9rem">
              <Select {...register('categoria')}>
                <option value='cliente'>Cliente</option>
                <option value='fornecedor'>Fornecedor</option>
                <option value='outro'>Outro</option>
              </Select>
            </FormContainer>
            <FormContainer width="8rem" label="Cadastrado" >
              <Input id="cadastrado" type="text" w="8rem" isReadOnly value={"14/10/2022"} {...register('cadastrado')} />
            </FormContainer>
          </Flex>
          <Flex direction="column">
            <FormContainer label="Nome / Razão Social" error={errors.nome} isRequired={true}>
              <Input id="nome" type="text" {...register('nome')} />
            </FormContainer>
            <FormContainer label="Nome Fantasia" error={errors.fantasia}>
              <Input id="fantasia" type="text" {...register('fantasia')} />
            </FormContainer>
          </Flex>
        </Flex>

        {/*lado B */}
        <Flex direction="column" w="50%" ml="6">
          <Flex>
            <FormContainer label="CPF / CNPJ">
              <Input id="cnpjcpf" type="text" w="14rem" {...register('cnpjcpf')} mr="3" />
            </FormContainer>
            <FormContainer label="RG">
              <Input id="rg" type="text" w="14rem" {...register('rg')} />
            </FormContainer>
          </Flex>
          <Flex>
            <FormContainer label="Inscrição Estadual (IE)">
              <Input id="ie" type="text" w="14rem" {...register('ie')} mr="3" />
            </FormContainer>
            <FormContainer label="Inscrição Municipal">
              <Input id="im" type="text" w="14rem" {...register('im')} />
            </FormContainer>
          </Flex>
          <Flex>
            <FormContainer label="Suframa">
              <Input id="suframa" type="text" w="14rem" {...register('suframa')} mr="3" />
            </FormContainer>
            <FormContainer label="Tipo de Contribuinte">
              <Select w="14rem" {...register('contribuinte')}>
                <option value=''></option>
                <option value='contribuinteICMS'>Contribuinte ICMS</option>
                <option value='isento'>Contribuinte ISENTO</option>
                <option value='naoContribuinte'>Não Contribuinte</option>
              </Select>
            </FormContainer>
          </Flex>
        </Flex>
      </Flex>

      {/*Área Contatos*/}
      <Stack mt="5">
        <Text fontSize="xl" >Contato</Text>
        <Divider />
        <Contact />
      </Stack>

      {/*Área Endereço*/}
      <Stack mt="5">
        <Text fontSize="xl" >Endereço</Text>
        <Divider />
        <Adress />
      </Stack>
    </Flex>
  )
}