import { Avatar, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Tag, TagLabel } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useModalUser } from '../../Contexts/Modal/UserContext';
import { getDecrypted } from '../../utils/crypto';

interface LoggedInUserProps {
  showProfileData?: boolean;
}

export function LoggedInUser({ showProfileData = true }: LoggedInUserProps) {
  const data = getDecrypted(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { onOpen } = useModalUser();

  const navigateTo = () => {
    navigate('/app/emissor');
  };

  return (
    <>
      <Tag size="md" borderRadius="xl" colorScheme={showProfileData ? 'orange' : ''}>
        <Menu>
          <MenuButton>
            <Flex align='center'>
              <Avatar size='sm' m={1} name={data.user.email} />
              { showProfileData && (
                <TagLabel fontSize={17}>{data.user.email}</TagLabel>
              )}
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={navigateTo}>Cadastrar Emissor</MenuItem>
            <MenuItem onClick={onOpen}>Gerenciar / Editar Usuário</MenuItem>
          </MenuList>
        </Menu>
      </Tag>
    </>
  );
}
