import { useState } from "react"
import {
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  Select,
  Stack,
  Text,
  Tooltip
} from "@chakra-ui/react";

import { useFormContext } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";

import { FormContainer } from "../../../../../components/Form/FormContainer";
import { Adress } from "./Adress";
import { Contact } from "./Contact";
import * as zod from "zod"

import { newClientFormValidationSchema } from "./FormModal"

type FormFieldsProps = zod.infer<typeof newClientFormValidationSchema>


export function FormFields() {
  const [renderFild, setRenderFild] = useState(false);
  const { register, formState: { errors } } = useFormContext<FormFieldsProps>();

  function renderFilds() {
    setRenderFild(true);
  }
  console.log(renderFild)
  return (
    <Flex w="100%" h="40rem" direction="column" justify="space-between">
      <Flex w="100%" >

        {/*lado A */}
        <Flex direction="column" w="50%">
          <Flex justify="space-between">
            <FormContainer label="Código">
              <Input id="id" type="text" w="20" isReadOnly value={"00001"} {...register('id')} />
            </FormContainer>
            <FormContainer label="Tipo">
              <Select w="20" {...register('tipo')}>
                <option value='f'>F</option>
                <option value='j'>J</option>
              </Select>
            </FormContainer>
            <FormContainer label="Categoria" >
              <Select {...register('categoria')}>
                <option value='cliente'>Cliente</option>
                <option value='fornecedor'>Fornecedor</option>
                <option value='outro'>Outro</option>
              </Select>
            </FormContainer>
            <FormContainer label="Cadastrado" >
              <Input id="cadastrado" type="text" w="8rem" isReadOnly value={"14/10/2022"} {...register('cadastrado')} />
            </FormContainer>
          </Flex>
          <Flex direction="column">
            <FormContainer label="Nome / Razão Social" error={errors.nome}>
              <Input id="nome" type="text" {...register('nome')} />
            </FormContainer>
            <FormContainer label="Nome Fantasia">
              <Input id="fantasia" type="text" {...register('fantasia')} />
            </FormContainer>
          </Flex>
        </Flex>

        {/*lado B */}
        <Flex direction="column" w="50%" ml="6">
          <Flex justify="space-between" >
            <FormContainer label="CPF / CNPJ">
              <Input id="cnpjcpf" type="text" w="14rem" {...register('cnpjcpf')} mr="3"/>
            </FormContainer>
            <FormContainer label="RG">
              <Input id="rg" type="text" w="14rem" {...register('rg')} />
            </FormContainer>
          </Flex>
          <Flex justify="space-between">
            <FormContainer label="Inscrição Estadual (IE)">
              <Input id="ie" type="text" w="14rem" {...register('ie')} mr="3"/>
            </FormContainer>
            <FormContainer label="Inscrição Municipal">
              <Input id="im" type="text" w="14rem" {...register('im')} />
            </FormContainer>
          </Flex>
          <Flex justify="space-between">
            <FormContainer label="Suframa">
              <Input id="suframa" type="text" w="14rem" {...register('suframa')} mr="3"/>
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
        <Flex justify="space-between">
          <Text fontSize="xl" >Contato</Text>
          <Tooltip hasArrow label='Adicionar um novo contato'>
            <Button 
              variant="unstyled" 
              onClick={renderFilds}
            >
              <Icon as={FiPlusCircle} boxSize="1.8rem" color="#32CD32" />
            </Button>
          </Tooltip>
        </Flex>
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