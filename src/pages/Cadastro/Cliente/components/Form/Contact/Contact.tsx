import { Flex, Input } from "@chakra-ui/react";
import { FormContainer } from "../../../../../../components/Form/FormContainer";
import { Email } from "./Email";
import { Telefone } from "./Telefone";

export function Contact() {
  return (
    <Flex>
      <Flex w="50%">
        <Telefone />
      </Flex>
      <Flex direction="column" w="50%" ml="6">
        <Email />
        <FormContainer label="Site">
          <Input />
        </FormContainer>
      </Flex>
    </Flex>
  )
}