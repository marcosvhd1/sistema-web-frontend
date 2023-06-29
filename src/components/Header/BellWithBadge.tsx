import { Badge, Box, Flex } from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';

interface BellWithBadgeProps {
  qtd: number;
}

export function BellWithBadge({ qtd }: BellWithBadgeProps) {
  return (
    <Flex alignItems="center">
      <Box position="relative">
        <FiBell />
        <Badge
          colorScheme="red"
          position="absolute"
          top="-8px"
          right="-8px"
          borderRadius="full"
        >
          {qtd > 0 ? qtd : null}
        </Badge>
      </Box>
    </Flex>
  );
}