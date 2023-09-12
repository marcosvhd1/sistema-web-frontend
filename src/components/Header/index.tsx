import { useContext } from 'react';

import { Flex, IconButton, useColorMode, useColorModeValue, useToast } from '@chakra-ui/react';

import { FaMoon, FaSun } from 'react-icons/fa';
import { FiLogOut, FiMenu } from 'react-icons/fi';

import { SidebarContext } from '../../Contexts/SidebarContext';
import { useSidebarDrawer } from '../../Contexts/SidebarDrawerContext';
import { SizeContext } from '../../Contexts/SizeContext';

import { getDecrypted } from '../../utils/crypto';
import { BellWithBadge } from './BellWithBadge';
import { LoggedInUser } from './LoggedInUser';
import { useNavigate } from 'react-router-dom';
import { useContadorContext } from '../../Contexts/ContadorContext';

export function Header() {
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const { onOpen } = useSidebarDrawer();
  const { smSize } = useContext(SizeContext);
  const { toggleColorMode } = useColorMode();
  const { changeNavSize } = useContext(SidebarContext);
  
  const toast = useToast();
  const navigate = useNavigate();
  const { quantidadeRegistros } = useContadorContext();
  const isEmissorSelected = getDecrypted(localStorage.getItem('emissor')) !== undefined;

  const handleOnBellClick = () => {
    if (isEmissorSelected) {
      if (quantidadeRegistros > 0) navigate('/app/fiscal/nfe');
      toast({
        position: 'top',
        description: quantidadeRegistros > 0 ? `Existem ${quantidadeRegistros} nota(s) em digitação!` : 'Não há notas em digitação.',
        status: 'info',
        duration: 2000,
        isClosable: false,
      });
    } else {
      toast({
        position: 'top',
        title: 'Acesso bloqueado.',
        description: 'Emissor precisa estar selecionado.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      as="header"
      h="100%"
      mx="auto"
      align="center"
      justify="space-between"
    >
      <IconButton
        ml={3}
        alignSelf="center"
        aria-label="Botão de fechar e abrir a sidebar"
        background="none"
        fontSize={25}
        _hover={{ background: 'none' }}
        icon={<FiMenu />}
        onClick={!smSize[0] ? onOpen: changeNavSize}
      />
      <Flex>
        <IconButton
          aria-label="Trocar entre modo claro e escuro"
          icon={<SwitchIcon />}
          size={'lg'}
          bg="none"
          onClick={toggleColorMode}
        />
        <IconButton
          onClick={handleOnBellClick}
          aria-label="Lembrete para notas em digitação"
          icon={<BellWithBadge qtd={quantidadeRegistros} />}
          size={'lg'}
          bg="none"
          ml={3}
          mr={3}
        />
        <LoggedInUser />
        <IconButton
          ml={3}
          mr={3}
          as="a"
          href="/"
          aria-label="Botão de sair"
          icon={<FiLogOut />}
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
