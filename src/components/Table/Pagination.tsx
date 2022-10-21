import { useState, useEffect, ReactNode } from "react"
import { Box, Button, Icon, Stack } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Api } from "../../services/api/ApiConfig";
import { IClient } from "../../services/api/clientes/ClientService";

interface IPagination {
  children: ReactNode
}

export function Pagination({children}: IPagination) {
  const [totalClients, setTotalClients] = useState<number>(0)
  const [limitRegistros, setLimitRegistros] = useState(5)
  const [pages, setPages] = useState<number[]>([])
  const [currentPage, setCurrantPage] = useState<number>(1)

  useEffect(() => {
    async function loadClients() {
      const response = await Api().get(`/clientes?page=${currentPage}&limit=${limitRegistros}`)
      setTotalClients(parseInt(response.headers["qtd"]!))
      const totalPages = Math.ceil(totalClients / limitRegistros)
      const arrayPages = []
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i)
      }
      setPages(arrayPages);
    }
    loadClients()
  }, [totalClients, limitRegistros])


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
        <strong>0</strong> - <strong>10</strong> de <strong>{totalClients}</strong>
      </Box>
      <Stack direction="row" spacing="2" align="center">
        {children}
      </Stack>
    </Stack>
  )
}