import { ReactNode } from "react"
import { FieldValues, useForm } from "react-hook-form";


import { Button, Flex, Icon, Input, Select, Text } from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";
import { useModalProduct } from "../../../../Contexts/Modal/ProductContext";

interface SearchBoxProps {
  children: ReactNode;
  changeEdit: (value: React.SetStateAction<any>) => void;
  setFilter: (value: React.SetStateAction<any>) => void;
  setDescription: (value: React.SetStateAction<any>) => void;
}

export function SearchBox({ children, setFilter, setDescription, changeEdit }: SearchBoxProps) {
  const { onOpen } = useModalProduct();
  const { register, handleSubmit } = useForm()

  const openModal = async () => {
    onOpen()
    changeEdit(false)
  }

  const HandleGetProductByFilter = (data: FieldValues) => {
    const { description } = data
    setDescription(description);
  }


  return (
    <form onSubmit={handleSubmit((data) => HandleGetProductByFilter(data))}>
      <Flex w="100%" justify="center" align="center" mt="10" direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Produtos</Text>
        <Flex w="90%" m="4" align="center" justify="space-between">
          <Flex w="80%" justify="center" align="center">
            <Text w="9rem">Buscar por </Text>
            <Select w="40%" mr="3">
              <option value='descricao'>Descrição</option>
              <option value='codigo'>Código</option>
              <option value='referencia'>Referência</option>
              <option value='marca'>Marca</option>
              <option value='ncm'>NCM</option>
            </Select>
            <Input placeholder="Localizar..." w="60%" type="text" mr="3" {...register('description')}/>
            <Select placeholder="Selecione o Grupo" w="40%" mr="3">
            </Select>
            <Button type="submit"><Icon as={FiSearch} /></Button>
          </Flex>
          <Button variant="outline" onClick={openModal} colorScheme="green">Cadastrar Produto</Button>
        </Flex>
        {children}
      </Flex>
    </form >

  )
}