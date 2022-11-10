import { Image } from '@chakra-ui/react';

import backgroundImg from '../../assets/bg.jpg';

export function BackgroundImg() {
  return (
    <Image
      h="100%"
      w="65%"
      src={backgroundImg}
      alt="Imagem de fundo da tela de login"
    />
  );
}