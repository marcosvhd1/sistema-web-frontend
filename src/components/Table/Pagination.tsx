import { Box, Stack } from "@chakra-ui/react";
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
      <Box>
        <strong>{limitRegistros * currentPage}</strong> de <strong>{totalClients}</strong>
      </Box>
      <Stack direction="row" spacing="2" align="center">
        {children}
      </Stack>
    </Stack>
  )
}