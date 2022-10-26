import { ReactNode } from "react";
import { Flex, Select, Stack, Text } from "@chakra-ui/react";

interface IPagination {
  children: ReactNode
  limitRegistros: number
  currentPage: number
  totalClients: number
  changeLimitRegister: (value: number) => void
}

export function Pagination({ children, limitRegistros, currentPage, totalClients, changeLimitRegister }: IPagination) {

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
          <Select onChange={(e) => changeLimitRegister(parseInt(e.target.value))} >
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
  )
}