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
    <Flex w="100%" justify="space-between">
      <Flex direction="column">
        <Flex>
          <FormContainer label="Rua">
            <Input id="rua" type="text" w="25rem" mr="3" {...register('rua')}/>
          </FormContainer>
          <FormContainer label="N°">
            <Input id="numero" type="text" w="20" {...register('numero')}/>
          </FormContainer>
        </Flex>
        <Flex>
          <FormContainer label="Bairro">
            <Input id="bairro" type="text" w="20rem" mr="3" {...register('bairro')}/>
          </FormContainer>
          <FormContainer label="CEP">
            <Input id="cep" type="number" w="10rem" {...register('cep')}/>
          </FormContainer>
        </Flex>
      </Flex>
      <Flex direction="column">
        <Flex>
          <FormContainer label="UF">
            <Select {...register('uf')} w="20" mr="3" value={selectedEstado} onChange={(event) => setSelectedEstado(event.target.value)}>
              <option value={""}></option>
              {estados.map(estado => <option key={estado.id} value={estado.sigla}>{estado.sigla}</option>)}
            </Select>
          </FormContainer>
          <FormContainer label="Cidade">
            <Select {...register('cidade')} w="19.2rem">
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