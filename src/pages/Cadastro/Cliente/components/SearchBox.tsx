import { ReactNode, useState } from "react";
import { useForm, FieldValues } from "react-hook-form"

import { Button, Flex, Icon, Input, Select, Text } from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";
import { useModalClient } from "../../../../Contexts/Modal/ClientContext";



interface SearchBoxProps {
  children: ReactNode;
  getClientsByFilter: (description: string, param: string) => void;
  changeEdit: () => void;
  getLastCod: () => void;
}

export function SearchBox({ children, changeEdit, getClientsByFilter, getLastCod }: SearchBoxProps) {
  const { onOpen } = useModalClient();
  const [filter, setFilter] = useState<string>('razao');
  const { register, handleSubmit, reset } = useForm()

  const openModal = () => {
    onOpen()
    changeEdit()
    getLastCod()
  }

  const HandlegetClientsByFilter = (data: FieldValues) => {
    const { description } = data
    getClientsByFilter(filter, description)
    reset()
  }

  
  return (
    <form onSubmit={handleSubmit((data) => HandlegetClientsByFilter(data))}>
      <Flex w="100%" justify="center" align="center" mt="10" direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Clientes / Fornecedores</Text>
        <Flex w="90%" m="4" align="center" justify="space-between">
          <Flex w="60%" justify="center" align="center">
            <Text w="8rem">Buscar por </Text>
            <Select w="40%" mr="3" onChange={(e) => setFilter(e.target.value)}>
              <option value='razao'>Nome / Razão Social</option>
              <option value='fantasia'>Nome Fantasia</option>
              <option value='cnpjcpf'>CPF / CNPJ</option>
            </Select>
            <Input placeholder="Localizar..." w="60%" type="text" mr="3" {...register('description')} />
            <Button type="submit"><Icon as={FiSearch} /></Button>
          </Flex>
          <Button variant="outline" onClick={() => openModal()} colorScheme="green">Cadastrar</Button>
        </Flex>
        {children}
      </Flex>
    </form >
  )
}