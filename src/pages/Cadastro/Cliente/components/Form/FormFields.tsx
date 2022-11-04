import { useState, useEffect } from "react"
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
import { Contact } from "./Contact";

import { ClientService, IClient } from "../../../../../services/api/clientes/ClientService";
import moment from "moment";
import { useColorMode } from "@chakra-ui/react";

interface IFormFields {
  editCod: number
  isEditing: boolean
}
export function FormFields({ editCod, isEditing }: IFormFields) {
  const { register, formState: { errors } } = useFormContext<IClient>();
  const [cod, setCod] = useState<number>(1)
  const { colorMode } = useColorMode()

  useEffect(() => {
    ClientService.getLastCod().then((result) => {
      if (isEditing) {
        setCod(editCod)
      } else {
        if (result === null) {
          setCod(1)
        } else {
          setCod(parseInt(result) + 1)
        }
      }
    })
  }, [])


  return (
    <Flex w="58rem" h="40rem" direction="column" justify="space-between">
      <Flex w="100%" >
        {/*lado A */}
        <Flex direction="column" w="50%">
          <Flex w="100%" justify="space-between">
            <FormContainer label="Código" width="5rem">
              <Input borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} id="id" type="text" w="5rem" isReadOnly value={("0000" + cod).slice(-4)} {...register('cod')} />
            </FormContainer>
            <FormContainer label="Tipo" width="4rem">
              <Select borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} w="4rem" {...register('tipo')}>
                <option value='f'>F</option>
                <option value='j'>J</option>
              </Select>
            </FormContainer>
            <FormContainer label="Categoria" width="9rem">
              <Select borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} {...register('categoria')}>
                <option value='cliente'>Cliente</option>
                <option value='fornecedor'>Fornecedor</option>
                <option value='outro'>Outro</option>
              </Select>
            </FormContainer>
            <FormContainer width="8rem" label="Alterado" >
              <Input borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} id="cadastrado" type="text" w="8rem" isReadOnly value={moment().format("DD/MM/YYYY")} />
            </FormContainer>
          </Flex>
          <Flex direction="column">
            <FormContainer label="Nome / Razão Social" error={errors.razao} isRequired={true}>
              <Input borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} id="nome" type="text" {...register('razao')} />
            </FormContainer>
            <FormContainer label="Nome Fantasia">
              <Input borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} id="fantasia" type="text" {...register('fantasia')} />
            </FormContainer>
          </Flex>
        </Flex>

        {/*lado B */}
        <Flex direction="column" w="50%" ml="6">
          <Flex>
            <FormContainer label="CPF / CNPJ">
              <Input borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} id="cnpjcpf" type="text" w="14rem" {...register('cnpjcpf')} mr="3" />
            </FormContainer>
            <FormContainer label="RG">
              <Input borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} id="rg" type="text" w="14rem" {...register('rg')} />
            </FormContainer>
          </Flex>
          <Flex>
            <FormContainer label="Inscrição Estadual (IE)">
              <Input borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} id="ie" type="text" w="14rem" {...register('ie')} mr="3" />
            </FormContainer>
            <FormContainer label="Inscrição Municipal">
              <Input borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} id="im" type="text" w="14rem" {...register('im')} />
            </FormContainer>
          </Flex>
          <Flex>
            <FormContainer label="Suframa">
              <Input borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} id="suframa" type="text" w="14rem" {...register('suframa')} mr="3" />
            </FormContainer>
            <FormContainer label="Tipo de Contribuinte">
              <Select borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} w="14rem" {...register('tipo_contribuinte')}>
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
        <Text fontSize="xl">Contato</Text>
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