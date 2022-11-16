import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Image, useToast } from '@chakra-ui/react';

import MainContent from '../components/MainContent';
import img from '../assets/unauthorized.svg';

export function UnauthorizedUser() {
  const toast = useToast();

  return (
    <MainContent>
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Sem permissão de acesso!</AlertTitle>
        <AlertDescription>O seu usuário não tem permissão para prosseguir .</AlertDescription>
      </Alert>
      <Flex direction="column" w='100%' h='90%' align='center' justify="center">
        <Image
          w="100%"
          h='100%'
          src={img}
        />

      </Flex>
    </MainContent>
  );
}