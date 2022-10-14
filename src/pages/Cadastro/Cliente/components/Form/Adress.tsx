import { useState } from "react"
import { Flex, Input, Select } from "@chakra-ui/react";
import { useEstados } from "../../../../../hooks/useEstados";
import { useCidades } from "../../../../../hooks/useCidades";
import { FormContainer } from "../../../../../components/Form/FormContainer";



export function Adress() {
  const [selectedEstado, setSelectedEstado] = useState("")
  const { estados } = useEstados()
  const { cidades } = useCidades({ uf: selectedEstado })


  return (
    <Flex w="100%" justify="space-between">
      <Flex direction="column">
        <Flex>
          <FormContainer label="Rua">
            <Input name="rua" id="rua" type="text" w="25rem" mr="3" />
          </FormContainer>
          <FormContainer label="N°">
            <Input name="numero" id="numero" type="text" w="20" />
          </FormContainer>
        </Flex>
        <Flex>
          <FormContainer label="Bairro">
            <Input name="bairro" id="bairro" type="text" w="20rem" mr="3" />
          </FormContainer>
          <FormContainer label="CEP">
            <Input name="cep" id="cep" type="number" w="10rem" />
          </FormContainer>
        </Flex>
      </Flex>
      <Flex direction="column">
        <Flex>
          <FormContainer label="UF">
            <Select w="20" mr="3" value={selectedEstado} onChange={(event) => setSelectedEstado(event.target.value)}>
              <option value={""}></option>
              {estados.map(estado => <option key={estado.id} value={estado.sigla}>{estado.sigla}</option>)}
            </Select>
          </FormContainer>
          <FormContainer label="Cidade">
            <Select w="19.2rem">
              {cidades.map(cidade => <option key={cidade.codigo_ibge}>{cidade.nome}</option>)}
            </Select>
          </FormContainer>
        </Flex>
        <FormContainer label="Complemento">
          <Input />
        </FormContainer>
      </Flex>
    </Flex>
  )
}