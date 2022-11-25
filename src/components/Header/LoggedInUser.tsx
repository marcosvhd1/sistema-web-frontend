import { Avatar, Flex, Link, Tag, TagLabel } from '@chakra-ui/react';
import { getDecrypted } from '../../utils/crypto';

interface LoggedInUserProps {
  showProfileData?: boolean;
}

export function LoggedInUser({ showProfileData = true }: LoggedInUserProps) {
  const data = getDecrypted(localStorage.getItem('user'));

  return (
    <Flex align="center" pointerEvents="none">
      <Link style={{textDecoration: 'inherit'}}>
        <Tag size="md" borderRadius="xl" colorScheme={showProfileData ? 'orange' : ''}>
          <Avatar size='sm' m={1} name={data.user.email} />
          { showProfileData && (
            <TagLabel fontSize={17}>{data.user.email}</TagLabel>
          )}
        </Tag>
      </Link>
    </Flex>
  );
}
