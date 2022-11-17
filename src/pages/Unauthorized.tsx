import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Image } from '@chakra-ui/react';

import img from '../assets/unauthorized.svg';
import MainContent from '../components/MainContent';

export function UnauthorizedUser() {

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