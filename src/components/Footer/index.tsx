import { HStack, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <HStack
      h="100%"
      px="2" 
      justify="space-between" 
      align="center" 
    >
      <Text>Versão: 5.7.1.0</Text>
      <Text>ID: MINI-7C62-DEA6</Text>
      <Text>Registrado à CUBO SISTEMAS [11.195.060/0001-23]</Text>
    </HStack>
  )
}