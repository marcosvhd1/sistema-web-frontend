import { Flex, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form"
import { FormContainer } from "../../../../../components/Form/FormContainer";
import { Email } from "./Email";
import { Telefone } from "./Telefone"

type SiteProps = {
  site: string
}

export function Contact() {
  const { register } = useFormContext<SiteProps>();

  return (
    <Flex>
      <Flex w="50%">
        <Telefone />
      </Flex>
      <Flex direction="column" w="50%" ml="6">
        <Email />
        <FormContainer label="Site">
          <Input {...register('site')}/>
        </FormContainer>
      </Flex>
    </Flex>
  )
}