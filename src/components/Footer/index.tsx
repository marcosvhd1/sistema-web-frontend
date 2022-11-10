import { HStack, Text } from '@chakra-ui/react';

export function Footer() {
  return (
    <HStack
      h="100%"
      px="2" 
      align="center" 
      gap="4"
    >
      <Text fontWeight="light">Versão: 5.7.1.0</Text>
      <Text fontWeight="light">ID: MINI-7C62-DEA6</Text>
      <Text fontWeight="light">Registrado à CUBO SISTEMAS [11.195.060/0001-23]</Text>
    </HStack>
  );
}