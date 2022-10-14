import { Button, Divider, Flex, FormLabel, Heading, Icon, IconButton, Input, Select, Stack, Text, Tooltip } from "@chakra-ui/react";
import { FiCircle, FiPlusCircle } from "react-icons/fi";
import { FormContainer } from "../../../../../components/Form/FormContainer";
import { Adress } from "./Adress";
import { Contact } from "./Contact";

export function Form() {
  return (
    <Flex w="100%" h="40rem" direction="column" justify="space-between">
      <Flex w="100%" >
        {/*lado A */}
        <Flex direction="column" w="50%">
          <Flex justify="space-between">
            <FormContainer label="Código">
              <Input name="id" id="id" type="text" w="20" isDisabled value={"00001"} />
            </FormContainer>
            <FormContainer label="Tipo">
              <Select w="20">
                <option value='option1'>F</option>
                <option value='option2'>J</option>
              </Select>
            </FormContainer>
            <FormContainer label="Categoria" >
              <Select>
                <option value='option1'>Cliente</option>
                <option value='option2'>Fornecedor</option>
                <option value='option3'>Outro</option>
              </Select>
            </FormContainer>
            <FormContainer label="Cadastrado" >
              <Input name="cadastrado" id="cadastrado" type="text" w="8rem" isDisabled value={"14/10/2022"} />
            </FormContainer>
          </Flex>
          <Flex direction="column">
            <FormContainer label="Nome / Razão Social">
              <Input name="nome" id="id" type="text" />
            </FormContainer>
            <FormContainer label="Nome Fantasia">
              <Input name="fantasia" id="fantasia" type="text" />
            </FormContainer>
          </Flex>
        </Flex>
        {/*lado B */}
        <Flex direction="column" w="50%" ml="6">
          <Flex justify="space-between" >
            <FormContainer label="CPF / CNPJ">
              <Input name="cnpj" id="cnpj" type="text" w="14rem" />
            </FormContainer>
            <FormContainer label="RG">
              <Input name="fantasia" id="fantasia" type="text" w="14rem" />
            </FormContainer>
          </Flex>
          <Flex justify="space-between">
            <FormContainer label="Inscrição Estadual (IE)">
              <Input name="ie" id="ie" type="text" w="14rem" />
            </FormContainer>
            <FormContainer label="Inscrição Municipal">
              <Input name="im" id="im" type="text" w="14rem" />
            </FormContainer>
          </Flex>
          <Flex justify="space-between">
            <FormContainer label="Suframa">
              <Input name="suframa" id="suframa" type="text" w="14rem" />
            </FormContainer>
            <FormContainer label="Tipo de Contribuinte">
              <Select w="14rem">
                <option value='option1'></option>
                <option value='option2'>Contribuinte ICMS</option>
                <option value='option3'>Contribuinte ISENTO</option>
                <option value='option4'>Não Contribuinte</option>
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
            <Button variant="unstyled" ><Icon as={FiPlusCircle} boxSize="1.8rem" color="#32CD32" /></Button>
          </Tooltip>
        </Flex>
        <Divider />
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
