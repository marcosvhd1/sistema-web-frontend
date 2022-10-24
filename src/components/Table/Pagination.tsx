import { Box, Flex, FormLabel, Select, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IPagination {
  children: ReactNode
  limitRegistros: number
  currentPage: number
  totalClients: number
}

export function Pagination({ children, limitRegistros, currentPage, totalClients }: IPagination) {

  return (
    <Stack
      direction="row"
      spacing="6"
      mt="8"
      justify="flex-end"
      align="center"
      w="90%"
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
          <Select>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Select>
          <Text>{limitRegistros * (currentPage - 1) + 1}</Text> - <Text>{limitRegistros * currentPage > totalClients ? totalClients : limitRegistros * currentPage}</Text> de <Text  fontWeight="semibold">{totalClients}</Text>
        </Flex>
      </Flex>
      <Stack direction="row" spacing="2" align="center">
        {children}
      </Stack>
    </Stack>
  )
}