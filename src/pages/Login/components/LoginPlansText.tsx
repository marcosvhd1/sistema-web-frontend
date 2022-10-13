import { Text } from "@chakra-ui/react";

export function Plantext() {
  return (
    <>
      <Text 
        marginTop={14}
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
    </>
  )
}