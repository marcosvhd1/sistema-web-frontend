import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';

import { FcBusinessman, FcDocument, FcHome, FcInTransit, FcLock, FcPackage, FcSearch, FcSettings, FcSupport } from 'react-icons/fc';
import { LogoCubo } from '../Images/LogoCubo';

import { SidebarContext } from '../../Contexts/SidebarContext';
import { SizeContext } from '../../Contexts/SizeContext';

import { Emissor } from '../Emissor';
import { NavItem } from './NavItem';
import { NavSection } from './NavSection';
import { useModalEmissor } from '../../Contexts/Modal/EmissorContext';
import { useEmissorContext } from '../../Contexts/EmissorProvider';
import { getDecrypted } from '../../utils/crypto';
import { useLocation } from 'react-router-dom';
import { useModalUser } from '../../Contexts/Modal/UserContext';


export function SidebarNav() {
  const { smSize } = useContext(SizeContext);
  const { navSize } = useContext(SidebarContext);
  const { onOpen } = useModalEmissor();
  // const location = useLocation();
  // const { onOpen: openUserModal } = useModalUser();

  // const LOCAL_DATA = getDecrypted(localStorage.getItem('user'));
  // const permission = LOCAL_DATA?.user?.permissao;

  const handleOpenModal = () => {
    onOpen();
  };

  // const handleOpenUserModal = () => {
  //   if (permission === 1) {
  //     openUserModal();
  //   }
  // };


  return (
    <Flex
      pos="sticky"
      w={!smSize[0] ? '100%' : navSize === 'small' ? '4vw' : '14vw'}
      h="100%"
      direction="column"
      align="flex-start"
      bg={!smSize[0] ? '' : 'whiteAlpha.100'}
      overflow="hidden"
    >
      <Flex
        p="3%"
        direction="column"
        alignItems={!smSize[0] ? 'flex-start' : navSize === 'small' ? 'center' : 'flex-start'}
        as="nav"
        justify="center"
      >
        <LogoCubo />

        <NavItem icon={FcHome} title="Início" rota="/app" />
        <NavSection title="CADASTRO">
          <NavItem icon={FcBusinessman} title="Clientes" rota="/app/cadastro/clientes" />
          <NavItem icon={FcPackage} title="Produtos" rota="/app/cadastro/produtos" />
          <NavItem icon={FcSupport} title="Serviços" rota="/app/cadastro/servicos" />
          <NavItem icon={FcInTransit} title="Transportadora" rota="/app/cadastro/transportadora" />
        </NavSection>
        <NavSection title="FISCAL">
          <NavItem icon={FcDocument} title="NF-e/NFC-e" rota="/app/fiscal/nfe" />
          <NavItem icon={FcDocument} title="MDF-e" rota="/app/fiscal/mdfe" />
        </NavSection>
        <NavSection title={navSize == 'small' ? 'CONFIG' : 'CONFIGURAÇÃO'}>
          <NavItem icon={FcSettings} title="Configuração" rota="/app/config" />
          {/* <NavItem icon={FcLock} title="Usuários" rota={permission === 0 ? '/app/unauthorized' : location.pathname + location.search} click={handleOpenUserModal} /> */}
        </NavSection>
        <NavSection title="EMISSOR">
          <Flex mt={4} display={!smSize[0] ? 'flex' : navSize == 'small' ? 'none' : 'flex'}>
            <Emissor />
          </Flex>
          {!smSize[0] ? '' : navSize == 'small' && (
            <NavItem aria-label="Emissor" icon={FcSearch} title='Emissor' rota="" click={handleOpenModal} />
          )}
        </NavSection>
      </Flex>
    </Flex>
  );
}
