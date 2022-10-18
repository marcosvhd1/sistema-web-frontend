import { Flex, Input } from "@chakra-ui/react";
import { FormContainer } from "../../../../../../components/Form/FormContainer";

export function Email() {
  return (
    <Flex direction="column" align="center" justify="center">
      <FormContainer label="E-mail 01">
        <Input type="email" />
      </FormContainer>
      <FormContainer label="E-mail 02">
        <Input type="email" />
      </FormContainer>
    </Flex>
  )
}