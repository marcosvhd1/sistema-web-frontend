import { Flex, Text } from '@chakra-ui/react';

export function Plantext() {
  return (
    <Flex direction="column" justify='center' align='center'>
      <Text
        marginTop={{md: 4, lg: 14}}
        color="gray.700"
      >
        Não tem acesso? Adquira já sua licença!
      </Text>
      <Text
        as="a"
        href="https://www.cubosis.com.br/os-mini/"
        target="blank"
        color="cyan.500"
      >
        Conhecer nossos planos!
      </Text>
    </Flex>
  );
}
