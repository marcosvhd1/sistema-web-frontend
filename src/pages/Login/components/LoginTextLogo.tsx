import { Flex, Text } from '@chakra-ui/react';

export function TextLogo() {
  return (
    <Flex marginBottom={4} direction="column">
      <Flex justify="center">
        <Text color="orange.300" fontSize={55} fontWeight="bold">
          OS
        </Text>
        <Text color="blue.500" fontSize={55} fontWeight="bold">
          Mini
        </Text>
      </Flex>
      <Text color="gray.700" fontFamily="Roboto" fontSize={20}>
        Emissor de NF-e e NFC-e (Cupom).
      </Text>
    </Flex>
  );
}
