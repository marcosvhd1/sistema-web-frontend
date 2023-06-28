import { Badge, Box, Flex } from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';
import { useContadorContext } from '../../Contexts/ContadorContext';

export function BellWithBadge() {
  const { quantidadeRegistros } = useContadorContext();

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
          {quantidadeRegistros > 0 ? quantidadeRegistros : null}
        </Badge>
      </Box>
    </Flex>
  );
}