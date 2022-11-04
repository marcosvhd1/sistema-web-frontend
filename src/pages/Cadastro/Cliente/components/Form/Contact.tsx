import { Flex, Input, useColorMode } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form"
import { FormContainer } from "../../../../../components/Form/FormContainer";
import { Email } from "./Email";
import { Telefone } from "./Telefone"

type SiteProps = {
  site: string
}

export function Contact() {
  const { register } = useFormContext<SiteProps>();
  const { colorMode } = useColorMode()

  return (
    <Flex>
      <Flex w="50%">
        <Telefone />
      </Flex>
      <Flex direction="column" w="50%" ml="6">
        <Email />
        <FormContainer label="Site">
          <Input borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} {...register('site')}/>
        </FormContainer>
      </Flex>
    </Flex>
  )
}