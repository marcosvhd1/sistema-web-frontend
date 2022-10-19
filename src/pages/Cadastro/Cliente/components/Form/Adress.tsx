import { useState } from "react"
import { useFormContext } from "react-hook-form";
import { Flex, Input, Select } from "@chakra-ui/react";
import { useEstados } from "../../../../../hooks/useEstados";
import { useCidades } from "../../../../../hooks/useCidades";
import { FormContainer } from "../../../../../components/Form/FormContainer";


export function Adress() {
  const [selectedEstado, setSelectedEstado] = useState("")
  const { estados } = useEstados()
  const { cidades } = useCidades({ uf: selectedEstado })
  const { register } = useFormContext();


  return (
    <Flex>
      <Flex w="50%" direction="column">
        <Flex justify="space-between">
          <FormContainer label="Rua" width="21.5rem">
            <Input id="rua" type="text" {...register('logradouro')} width="21.5rem"/>
          </FormContainer>
          <FormContainer label="N°" width="6rem">
            <Input id="numero" type="text" {...register('numero')} width="6rem"/>
          </FormContainer>
        </Flex>
        <Flex justify="space-between">
          <FormContainer label="Bairro" width="17.5rem">
            <Input id="bairro" type="text" {...register('bairro')} width="17.5rem"/>
          </FormContainer>
          <FormContainer label="CEP" width="10rem">
            <Input id="cep" type="number" w="10rem" {...register('cep')}/>
          </FormContainer>
        </Flex>
      </Flex>
      <Flex direction="column" w="50%"  ml="6">
        <Flex justify="space-between">
          <FormContainer label="UF" width="5rem">
            <Select {...register('uf')} w="5rem" value={selectedEstado} onChange={(event) => setSelectedEstado(event.target.value)}>
              <option value={""}></option>
              {estados.map(estado => <option key={estado.id} value={estado.sigla}>{estado.sigla}</option>)}
            </Select>
          </FormContainer>
          <FormContainer label="Cidade" width="22.5rem">
            <Select {...register('cidade')} w="22.5rem">
              {cidades.map(cidade => <option key={cidade.codigo_ibge}>{cidade.nome}</option>)}
            </Select>
          </FormContainer>
        </Flex>
        <FormContainer label="Complemento">
          <Input id="complemento" {...register('complemento')}/>
        </FormContainer>
      </Flex>
    </Flex>
  )
}