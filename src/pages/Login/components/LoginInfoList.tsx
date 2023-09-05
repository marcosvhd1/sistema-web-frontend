import { Flex } from '@chakra-ui/react';
import { LoginItem } from './LoginItem';

export function InfoLogin() {
  return (
    <Flex justify="flex-start" direction="column">
      <LoginItem description="Treinamento e suporte técnico total." />
      <LoginItem description="Emissão de nota fiscal em poucos minutos." />
      <LoginItem description="Cálculo de impostos automáticos." />
      <LoginItem description="Envio de XML e PDF por e-mail para cliente." />
      <LoginItem description="Compatível com certificado A1." />
      <LoginItem description="Espelhamento de NFe." />
      <LoginItem description="Cancelamento e carta de correção." />
    </Flex>
  );
}