import { useContext } from 'react';

import { Image, useColorModeValue } from '@chakra-ui/react';

import { SidebarContext } from '../../Contexts/SidebarContext';
import { SizeContext } from '../../Contexts/SizeContext';

import icon from '../../assets/logo-icon.png';
import logo from '../../assets/logo.png';
import logoClaro from '../../assets/logo-claro.png';

export function LogoCubo() {
  const { navSize } = useContext(SidebarContext);
  const { smSize } = useContext(SizeContext);
  const SwitchLogo = useColorModeValue(logo, logoClaro);

  return (
    <>
      <Image
        w="75%"
        src={!smSize[0] ? SwitchLogo: navSize == 'small' ? icon : SwitchLogo}
        alt="Logo da Cubo Sistemas"
        p={2}
        mb={3}
        align="center"
      />
    </>
  );
}