import { Flex, Input, Select } from "@chakra-ui/react";
import { FormContainer } from "../../../../../components/Form/FormContainer";

export function Contact() {
  return (
    <Flex w="100%" direction="column">
      <Flex>
        <FormContainer label="Tipo">
          <Select w="8rem" mr="3">
            <option value='option1'>Celular</option>
            <option value='option2'>Residencial</option>
            <option value='option3'>Comercial</option>
          </Select>
        </FormContainer>
        <FormContainer label="Número">
          <Input name="suframa" id="suframa" type="number" w="14rem" mr="3"/>
        </FormContainer>
        <FormContainer label="Operadora">
          <Select w="8rem">
            <option value='option1'>Tim</option>
            <option value='option2'>Vivo</option>
            <option value='option3'>Claro</option>
          </Select>
        </FormContainer>
      </Flex>
    </Flex>
  )
}