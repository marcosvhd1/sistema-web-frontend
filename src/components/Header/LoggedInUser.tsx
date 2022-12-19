import { Avatar, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Tag, TagLabel, Tooltip } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useModalChangePassword } from '../../Contexts/Modal/ChangePasswordContext';
import { useModalUser } from '../../Contexts/Modal/UserContext';
import { getDecrypted } from '../../utils/crypto';
import { userInfos } from '../../utils/header';

interface LoggedInUserProps {
  showProfileData?: boolean;
}

export function LoggedInUser({ showProfileData = true }: LoggedInUserProps) {
  const data = getDecrypted(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { onOpen } = useModalUser();
  const { onOpen: OpenChangePassword } = useModalChangePassword();

  const navigateTo = () => {
    navigate('/app/emissor');
  };

  return (
    <>
      <Tag size="md" borderRadius="xl" colorScheme={showProfileData ? 'orange' : ''}>
        <Menu>
          <Tooltip label='Gerenciar' placement='bottom-end' hasArrow>
            <MenuButton>
              <Flex align='center'>
                <Avatar size='sm' m={1} name={data.user.email} />
                { showProfileData && (
                  <TagLabel fontSize={17}>{data.user.email}</TagLabel>
                )}
              </Flex>
            </MenuButton>
          </Tooltip>
          <MenuList>
            <MenuItem onClick={navigateTo}>Cadastrar Emissor</MenuItem>
            <MenuItem onClick={onOpen}>Gerenciar Usuários</MenuItem>
            <MenuItem onClick={OpenChangePassword}>Alterar Senha</MenuItem>
          </MenuList>
        </Menu>
      </Tag>
    </>
  );
}
