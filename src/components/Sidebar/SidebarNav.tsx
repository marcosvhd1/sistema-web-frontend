import { Flex, useToast } from '@chakra-ui/react';
import { useContext } from 'react';

import { FcBusinessman, FcDocument, FcHome, FcInTransit, FcPackage, FcSearch, FcSettings, FcSupport } from 'react-icons/fc';
import { LogoCubo } from '../Images/LogoCubo';

import { SidebarContext } from '../../Contexts/SidebarContext';
import { SizeContext } from '../../Contexts/SizeContext';

import { useModalEmissor } from '../../Contexts/Modal/EmissorContext';
import { getDecrypted } from '../../utils/crypto';
import { Emissor } from '../Emissor';
import { NavItem } from './NavItem';
import { NavSection } from './NavSection';

export function SidebarNav() {
  const { smSize } = useContext(SizeContext);
  const { navSize } = useContext(SidebarContext);
  const { onOpen } = useModalEmissor();
  const toast = useToast();

  const handleOpenModal = () => {
    onOpen();
  };
  const isEmissorSelected = getDecrypted(localStorage.getItem('emissor')) !== undefined;

  const checkPermission = () => {
    if (!isEmissorSelected) {
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
      pos='sticky'
      w={!smSize[0] ? '100%' : navSize === 'small' ? '4vw' : '14vw'}
      h='100%'
      direction='column'
      align='flex-start'
      bg={!smSize[0] ? '' : 'whiteAlpha.100'}
      overflow='hidden'
    >
      <Flex
        p='3%'
        direction='column'
        alignItems={!smSize[0] ? 'flex-start' : navSize === 'small' ? 'center' : 'flex-start'}
        as='nav'
        justify='center'
      >
        <LogoCubo />

        <NavItem icon={FcHome} title='Início' rota='/app' />
        <NavSection title='CADASTRO'>
          <NavItem icon={FcBusinessman} title='Clientes' rota={isEmissorSelected ? '/app/cadastro/clientes' : ''} click={checkPermission}/>
          <NavItem icon={FcPackage} title='Produtos' rota={isEmissorSelected ? '/app/cadastro/produtos' : ''} click={checkPermission} />
          <NavItem icon={FcSupport} title='Serviços' rota={isEmissorSelected ? '/app/cadastro/servicos' : ''} click={checkPermission} />
          <NavItem icon={FcInTransit} title='Transportadora' rota={isEmissorSelected ? '/app/cadastro/transportadora' : ''} click={checkPermission}/>
        </NavSection>
        <NavSection title='FISCAL'>
          <NavItem icon={FcDocument} title='NF-e/NFC-e' rota={isEmissorSelected ? '/app/fiscal/nfe' : ''} click={checkPermission}/>
          <NavItem icon={FcDocument} title='MDF-e' rota={isEmissorSelected ? '/app/fiscal/mdfe' : ''} click={checkPermission}/>
        </NavSection>
        <NavSection title={navSize == 'small' ? 'CONFIG' : 'CONFIGURAÇÃO'}>
          <NavItem icon={FcSettings} title='Configuração' rota={isEmissorSelected ? '/app/config' : ''} click={checkPermission} />
        </NavSection>
        <NavSection title='EMISSOR'>
          <Flex mt={4} display={!smSize[0] ? 'flex' : navSize == 'small' ? 'none' : 'flex'}>
            <Emissor />
          </Flex>
          {!smSize[0] ? '' : navSize == 'small' && (
            <NavItem aria-label='Emissor' icon={FcSearch} title='Emissor' rota='' click={handleOpenModal} />
          )}
        </NavSection>
      </Flex>
    </Flex>
  );
}
