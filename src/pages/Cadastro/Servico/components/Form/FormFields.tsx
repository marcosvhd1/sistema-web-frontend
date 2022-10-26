import { useFormContext } from "react-hook-form"
import moment from "moment";
import { Divider, Flex, Input, Textarea, Text, Select } from "@chakra-ui/react";
import { FormContainer } from "../../../../../components/Form/FormContainer";

export function FormFields() {
  const { register } = useFormContext()
  return (
    <Flex direction="column" justify="space-between">
      <Text fontSize="xl">Dados Principais</Text>
      <Divider />
      <Flex gap="3" align="center">
        <FormContainer label="Código" width="5rem">
          <Input id="id" type="text" w="5rem" isReadOnly value={("0000" + 1).slice(-4)} {...register('nserv')} />
        </FormContainer>
        <FormContainer label="Descrição do Serviço" isRequired={true}>
          <Input {...register('descricao')}/>
        </FormContainer>
      </Flex>
      <Flex justify="space-between">
        <FormContainer label="Preço" width="5rem">
          <Input type="number" w="5rem" {...register('preco')}/>
        </FormContainer>
        <FormContainer label="Unidade" width="5rem">
          <Input w="5rem" {...register('un')}/>
        </FormContainer>
        <FormContainer width="8rem" label="Cadastrado" >
          <Input id="cadastrado" type="text" w="8rem" isReadOnly value={moment().format("DD/MM/YYYY")} {...register('cadastrado')}/>
        </FormContainer>
        <FormContainer width="8rem" label="Alterado" >
          <Input id="cadastrado" type="text" w="8rem" isReadOnly value={moment().format("DD/MM/YYYY")} {...register('alterado')}/>
        </FormContainer>
      </Flex>
      <FormContainer label="Anotações Gerais">
        <Textarea {...register('anotacoes')}/>
      </FormContainer>
      <Text fontSize="xl" mt={2}>Nota Fiscal</Text>
      <Divider />
      <Flex justify="space-between">
        <FormContainer label="Base de Calculo ISS" width="10rem">
          <Input type="number" w="10rem" {...register('base_iss')}/>
        </FormContainer>
        <FormContainer label="Alíquota ISS" width="10rem">
          <Input type="number" w="10rem" {...register('aliquota_iss')}/>
        </FormContainer>
        <FormContainer label="NCM" width="10rem">
          <Input type="number" w="10rem" {...register('ncm')}/>
        </FormContainer>
      </Flex>
      <Flex align="center" justify="space-between">
        <FormContainer label="Item Lista de Serviços" width="15rem">
          <Input w="15rem" {...register('item_lista')}/>
        </FormContainer>
        <FormContainer label="Situação Tributária" width="15rem">
          <Select {...register('situacao')}>
            <option value='Normal'>Normal</option>
            <option value='retida'>Retida</option>
            <option value='substituta'>Substituta</option>
            <option value='isenta'>Isenta</option>
          </Select>
        </FormContainer>
      </Flex>
    </Flex>
  )
}