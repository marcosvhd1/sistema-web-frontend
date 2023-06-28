import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList, Tag, TagLabel, Tooltip } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useModalChangePassword } from '../../Contexts/Modal/ChangePasswordContext';
import { getDecrypted } from '../../utils/crypto';
import { userInfos } from '../../utils/header';

interface LoggedInUserProps {
  showProfileData?: boolean;
}

export function LoggedInUser({ showProfileData = true }: LoggedInUserProps) {
  const { onOpen: OpenChangePassword } = useModalChangePassword();

  const data = getDecrypted(localStorage.getItem('user'));
  
  const userInfo = userInfos();
  const permissao = userInfo.infos?.permissao;

  const navigate = useNavigate();

  const navigateTo = () => {
    navigate('/app/emissor');
  };

  const managerUsers = () => {
    if (permissao === 1) navigate('/app/usuarios');
    else navigate('/app/unauthorized');
  };

  return (
    <Tag size="md" borderRadius="xl">
      <Menu>
        <MenuButton>
          <Flex align='center'>
            <Avatar size='sm' mr={1} name={data.user.email} />
            {showProfileData && (<TagLabel>{data.user.email}</TagLabel>)}
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={navigateTo}>Gerenciar Emissores</MenuItem>
          <MenuItem onClick={managerUsers}>Gerenciar Usuários</MenuItem>
          <MenuItem onClick={OpenChangePassword}>Alterar Senha</MenuItem>
        </MenuList>
      </Menu>
    </Tag>
  );
}
