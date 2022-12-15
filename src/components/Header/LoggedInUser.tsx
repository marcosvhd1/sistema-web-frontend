import { Avatar, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Tag, TagLabel } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getDecrypted } from '../../utils/crypto';

interface LoggedInUserProps {
  showProfileData?: boolean;
}

export function LoggedInUser({ showProfileData = true }: LoggedInUserProps) {
  const data = getDecrypted(localStorage.getItem('user'));
  const navigate = useNavigate();

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
            <MenuItem>Gerenciar / Editar Usuário</MenuItem>
          </MenuList>
        </Menu>
      </Tag>
    </>
    // <Button variant='unstyled' onClick={navigateTo}>
    //   <Flex align="center" pointerEvents="none">
    //     <Link style={{textDecoration: 'inherit'}}>
    //       <Tag size="md" borderRadius="xl" colorScheme={showProfileData ? 'orange' : ''}>
    //         <Menu>
    //           <MenuButton as={Button}>
    //             <Avatar size='sm' m={1} name={data.user.email} />
    //             { showProfileData && (
    //               <TagLabel fontSize={17}>{data.user.email}</TagLabel>
    //             )}
    //           </MenuButton>
    //           <MenuList>
    //             <MenuItem>Download</MenuItem>
    //             <MenuItem>Create a Copy</MenuItem>
    //             <MenuItem>Mark as Draft</MenuItem>
    //             <MenuItem>Delete</MenuItem>
    //             <MenuItem>Attend a Workshop</MenuItem>
    //           </MenuList>
    //         </Menu>
    //       </Tag>
    //     </Link>
    //   </Flex>
    // </Button>
  );
}
