import { Button, Flex, Input, InputGroup, InputLeftAddon, Stack } from "@chakra-ui/react";
import { FiUser, FiLock } from "react-icons/fi"

export function LoginForm() {
  return (
    <Flex
      as="form"
      justify="center"
      align="center"
      w="100%"
      direction="column"
      marginTop={10}
    >
      <Stack
        spacing="4"
        w="80%"
      >
        <InputGroup
          size="lg"
        >
          <InputLeftAddon children={<FiUser />} borderColor="blackAlpha.500" color="gray.700" />
          <Input
            borderColor="blackAlpha.500"
            focusBorderColor="orange.400"
            type="text"
            placeholder="Usuário"
          />
        </InputGroup>
        <InputGroup
          size="lg"
        >
          <InputLeftAddon children={<FiLock />} borderColor="blackAlpha.500" color="gray.700" />
          <Input
            borderColor="blackAlpha.500"
            type="password"
            placeholder="Senha"
          />
        </InputGroup>
        <Button as="a" size="md" colorScheme="messenger" href="/app">
          Acessar
        </Button>
      </Stack>
    </Flex>
  )
}