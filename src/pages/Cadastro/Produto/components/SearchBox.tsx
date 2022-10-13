import { ReactNode } from "react"

import { Button, Flex, Icon, Input, Select, Text } from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";
import { useModalProduct } from "../../../../Contexts/Modal/ProductContext";

interface SearchBoxProps {
  children: ReactNode;
}

export function SearchBox({ children }: SearchBoxProps) {
  const { onOpen } = useModalProduct();
  
  return (
    <Flex w="100%" justify="center" align="center" mt="10" direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Produtos</Text>
      <Flex w="90%" m="4" align="center" justify="space-between">
        <Flex w="60%">
          <Select placeholder="Buscar por..." w="40%" mr="3">
            <option value='option1'>Nome / Razão Social</option>
            <option value='option1'>Nome Fantasia</option>
            <option value='option1'>CPF / CNPJ</option>
          </Select>
          <Input placeholder="Localizar..." w="60%" type="text" mr="3" />
          <Button onClick={() => {}}><Icon as={FiSearch} /></Button>
        </Flex>
        <Button variant="outline" onClick={onOpen} colorScheme="green">Cadastrar Produto</Button>
      </Flex>
      {children}
    </Flex>
  )
}