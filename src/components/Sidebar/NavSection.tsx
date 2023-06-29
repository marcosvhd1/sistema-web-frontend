import { ReactNode, useContext } from 'react';
import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';

import { SidebarContext } from '../../Contexts/SidebarContext';
import { SizeContext } from '../../Contexts/SizeContext';

interface NavSectionProps {
  title?: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  const {navSize} = useContext(SidebarContext);
  const {mdSize, smSize} = useContext(SizeContext);
  const SwitchColor = useColorModeValue('gray.500', 'gray.300');

  return (
    <Box my={2} w="100%">
      <Text fontWeight="bold" align={!smSize[0] ? 'justify' : navSize == 'small' ? 'center' : 'justify'} color={SwitchColor} fontSize={navSize == 'small' ? 'xxs' : mdSize[0] ? 'xxs' : 'xs' }>{title}</Text>
      <Stack spacing={mdSize[0] ? '1' : '3' } >
        {children}
      </Stack>
    </Box>
  );
}