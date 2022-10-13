import { useState, useCallback, MouseEventHandler } from "react"
import { Flex, Icon, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Select, Input, Button } from "@chakra-ui/react";
import { FiArrowDown, FiArrowUp, FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";

import axios from "axios";
import { useEffect,  } from "react";


import { Pagination } from "./Pagination";

type Data = {
  id: number,
  name: string,
  city: string,
  state: string,
  email: string,
}

  
  export function DataTable() {
    const [data, setData] = useState<Data[]>()

    async function getClientes() {
      const response = await axios.get('http://192.168.15.124:3333/api/clients')
  
      const cliente = response.data

      setData(cliente)
    }

    const headers: { key: string, label: string }[] = [
      { key: "id", label: "Código" },
      { key: "nome", label: "Nome" },
      { key: "city", label: "Cidade" },
      { key: "state", label: "UF" },
      { key: "email", label: "E-mail" },
    ]
  return (
    <Flex w="100%" justify="center" mt="10">
      <TableContainer w="80%" bg="whiteAlpha.100" borderRadius={8} p={3} >
        <Flex m="4" align="center" justify="space-between">
          <Flex w="60%">
            <Select placeholder="Buscar por..." w="40%" mr="3">
              <option value='option1'>Nome / Razão Social</option>
              <option value='option1'>Nome Fantasia</option>
              <option value='option1'>CPF / CNPJ</option>
            </Select>
            <Input placeholder="Localizar..." w="60%" type="text" mr="3" />
            <Button onClick={getClientes}><Icon as={FiSearch} /></Button>
          </Flex>
          <Button variant="outline" colorScheme="green">Cadastrar</Button>
        </Flex>
        <Table variant='simple'>
          <Thead>
            <Tr>
              {headers.map((row) => {
                return (<Th key={row.key} onClick={() => {}}>{row.label}</Th>)
              })}
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data != undefined ? data.map((d) => (
              <Tr key={d.id}>
                <Td>{d.id}</Td>
                <Td>{d.name}</Td>
                <Td>{d.city}</Td>
                <Td>{d.state}</Td>
                <Td>{d.email}</Td>
                <Td><Icon color="#F5DEB3" as={FiEdit} /> <Icon as={FiTrash2} color="#A52A2A" /></Td>
              </Tr>
            )) : ""}
          </Tbody>
        </Table>
        <Pagination />
      </TableContainer>
    </Flex>
  )
}