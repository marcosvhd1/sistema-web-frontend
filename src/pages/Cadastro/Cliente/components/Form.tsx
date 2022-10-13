import { Flex, FormLabel, Input, Select } from "@chakra-ui/react";
import { FormContainer } from "../../../../components/Form/FormContainer";

export function Form() {
  return (
    <Flex w="100%" direction="column">
      <Flex>
        <FormContainer label="Código">
          <Input name="id" id="id" type="text" w="20" mr={4} isDisabled />
        </FormContainer>
        <FormContainer label="Tipo">
          <Select w="20" mr="10">
            <option value='option1'>F</option>
            <option value='option1'>J</option>
          </Select>
        </FormContainer>
        <FormContainer label="Nome / Razão Social">
          <Input name="nome" id="id" type="text" w="md"/>
        </FormContainer>
      </Flex>
    </Flex>
  )
}