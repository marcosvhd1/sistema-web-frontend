import { ElementType, useContext } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Flex, Icon, Link, Menu, MenuButton, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';

import { SidebarContext } from '../../Contexts/SidebarContext';
import { SizeContext } from '../../Contexts/SizeContext';

interface NavItemProps {
  title: string;
  icon: ElementType;
  rota: string;

}
export function NavItem({ title, icon, rota }: NavItemProps) {
  const { mdSize, smSize } = useContext(SizeContext);
  const { navSize } = useContext(SidebarContext);
  const SwitchColor = useColorModeValue('#FFEBCD', 'gray.600');

  return (
    <Flex
      mt={1}
      direction="column"
      w="100%"
      alignItems={!smSize[0] ? 'flex-start' : navSize === 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Tooltip label={navSize === 'small' ? title : ''} placement='auto-start' hasArrow>
          <Link
            as={ReactRouterLink}
            to={rota}
            p={mdSize[0] ? (navSize == 'small' ? 2 : 1) : 2}
            borderRadius={8}
            _hover={{ textDecor: 'none', bg: SwitchColor, pl: navSize == 'small' ? '' : '3' }}
            w={navSize == 'large' ? '100%' : ''}
          >
            <MenuButton
              justifyContent="space-between"
              flexDirection="row"
            >
              <Flex align="center">
                <Icon as={icon} color="#DAA520" fontSize={navSize == 'small' ? '2xl' : 'xl'} />
                <Text ml={5} fontFamily="Roboto" fontSize={mdSize[0] ? 'small' : 'xl'} display={!smSize[0] ? 'flex-start' : navSize == 'small' ? 'none' : 'flex'}>{title}</Text>
              </Flex>
            </MenuButton>
          </Link>
        </Tooltip>
      </Menu>
    </Flex>
  );
}