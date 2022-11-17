import { Flex, Image } from '@chakra-ui/react';
import img from '../assets/404page.svg';

export function PageNotFound() {
  return (
    <Flex direction="column" w='100vw' h='100vh' align='center' justify="center">
      <Image
        w="100%"
        h='100%'
        src={img}
      />

    </Flex>
  );
}