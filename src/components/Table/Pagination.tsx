import { ReactNode } from 'react';
import { Flex, Select, Stack, Text, useColorMode } from '@chakra-ui/react';

interface IPagination {
  children: ReactNode
  limitRegistros: number
  currentPage: number
  totalClients: number
  visible?: boolean;
  changeLimitRegister: (value: number) => void
}

export function Pagination({ children, limitRegistros, currentPage, totalClients, changeLimitRegister, visible = true }: IPagination) {
  const { colorMode } = useColorMode();
  
  return (
    <Stack
      direction="row"
      spacing="6"
      m={{base: '2rem 0 .5rem 0', md: '2rem 0 .5rem 0', lg: '2rem 0'}}
      justify="flex-end"
      align="center"
      w="90%"
      visibility={visible ? 'visible' : 'hidden'}
    >
      <Flex
        align="center"
        gap="3"
      >
        <Text fontFamily="Poppins" fontSize="md">Registros por Página</Text>
        <Flex
          justify="center"
          align="center"
          gap="2"
        >
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => changeLimitRegister(parseInt(e.target.value))} >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Select>
          <Text>{limitRegistros * (currentPage - 1) + 1}</Text> - <Text>{limitRegistros * currentPage > totalClients ? totalClients : limitRegistros * currentPage}</Text> de <Text  fontWeight="semibold">{totalClients ? totalClients : 0}</Text>
        </Flex>
      </Flex>
      <Stack direction="row" spacing="2" align="center">
        {children}
      </Stack>
    </Stack>
  );
}
