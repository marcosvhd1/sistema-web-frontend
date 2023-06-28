import { useContext } from 'react';

import { Flex, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

import { FiBell, FiLogOut, FiMenu } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useSidebarDrawer } from '../../Contexts/SidebarDrawerContext';
import { SidebarContext } from '../../Contexts/SidebarContext';
import { SizeContext } from '../../Contexts/SizeContext';

import { LoggedInUser } from './LoggedInUser';
import { Api } from '../../services/api/ApiConfig';
import { BellWithBadge } from './BellWithBadge';

export function Header() {
  const { changeNavSize } = useContext(SidebarContext);
  const { smSize } = useContext(SizeContext);
  const { onOpen } = useSidebarDrawer();
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Flex
      as="header"
      h="100%"
      mx="auto"
      align="center"
      justify="space-between"
    >
      <IconButton
        alignSelf="center"
        aria-label="Botão de fechar e abrir a sidebar"
        background="none"
        fontSize={25}
        ml="2"
        _hover={{ background: 'none' }}
        icon={<FiMenu />}
        onClick={!smSize[0] ? onOpen: changeNavSize}
      />
      <Flex>
        <IconButton
          aria-label="Trocar entre modo claro e escuro"
          _hover={{ background: 'none' }}
          icon={<SwitchIcon />}
          size={'lg'}
          bg="none"
          onClick={toggleColorMode}
          mr={5}
        />
        <IconButton
          variant="unstyled"
          aria-label="Lembrete para notas em digitação"
          _hover={{ background: 'none' }}
          icon={<BellWithBadge />}
          size={'lg'}
          bg="none"
        />
        <LoggedInUser />
        <IconButton
          ml={2}
          as="a"
          href="/"
          aria-label="Botão de sair"
          icon={<FiLogOut />}
          _hover={{ background: 'none' }}
          size={'lg'}
          bg="none"
          onClick={() => {
            localStorage.clear();
          }}
        />
      </Flex>
    </Flex >
  );
}
