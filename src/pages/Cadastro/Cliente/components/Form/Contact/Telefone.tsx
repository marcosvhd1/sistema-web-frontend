import { Flex, Input, Select } from "@chakra-ui/react";
import { FormContainer } from "../../../../../../components/Form/FormContainer";

export function Telefone() {
  return (
    <Flex w="100%" direction="column">
      <Flex justify="space-between">
        <FormContainer label="Tipo" width="15rem">
          <Select w="auto" mr="3">
            <option>Celular</option>
            <option>Comercial</option>
            <option>Residencial</option>
          </Select>
        </FormContainer>
        <FormContainer label="Número" width="auto">
          <Input type="tel" />
        </FormContainer>
      </Flex>
      <Flex align="center" justify="center">
        <FormContainer label="Tipo" width="15rem">
          <Select w="auto" mr="3">
            <option>Celular</option>
            <option>Comercial</option>
            <option>Residencial</option>
          </Select>
        </FormContainer>
        <FormContainer label="Número" width="auto">
          <Input type="tel" />
        </FormContainer>
      </Flex>
      <Flex align="center" justify="center">
        <FormContainer label="Tipo" width="15rem">
          <Select w="auto" mr="3">
            <option>Celular</option>
            <option>Comercial</option>
            <option>Residencial</option>
          </Select>
        </FormContainer>
        <FormContainer label="Número" width="auto">
          <Input type="tel" />
        </FormContainer>
      </Flex>
    </Flex>
  )
}