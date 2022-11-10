import { Avatar, Flex, Link, Tag, TagLabel } from '@chakra-ui/react';

interface LoggedInUserProps {
  showProfileData?: boolean;
}

export function LoggedInUser({ showProfileData = true }: LoggedInUserProps) {
  return (
    <Flex align="center">
      <Link style={{textDecoration: 'inherit'}}>
        <Tag size="md" borderRadius="xl" colorScheme={showProfileData ? 'orange' : ''}>
          <Avatar size='sm' m={1} name='Gabriel Machado' />
          { showProfileData && (
            <TagLabel fontSize={17}>Gabriel Machado</TagLabel>
          )}
        </Tag>
      </Link>
    </Flex>
  );
}