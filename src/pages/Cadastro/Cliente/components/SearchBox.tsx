import { ReactNode } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Button, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import { useModalClient } from '../../../../Contexts/Modal/ClientContext';
import { MdAdd } from 'react-icons/md';

interface SearchBoxProps {
  children: ReactNode;
  getCod: () => void
  getClientsByFilter: (description: string) => void;
  changeEdit: (value: React.SetStateAction<any>) => void;
  stateFilter: (value: React.SetStateAction<any>) => void;
}

export function SearchBox({ children, changeEdit , stateFilter, getClientsByFilter, getCod}: SearchBoxProps) {
  const { onOpen } = useModalClient();
  const { register, handleSubmit } = useForm();
  const { colorMode } = useColorMode();

  const openModal = () => {
    getCod();
    onOpen();
    changeEdit(false);
  };

  const handleGetClientsByFilter = async (data: FieldValues) => {
    const { description } = data;
    getClientsByFilter(description);
  };


  return (
    <form onSubmit={handleSubmit((data) => handleGetClientsByFilter(data))}>
      <Flex w="100%" justify="center" align="center" mt={{base: '2', md: '2', lg: '10'}} direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Clientes / Fornecedores</Text>
        <Flex w="90%" m="4" align="center" justify="space-between">
          <Flex w="60%" justify="center" align="center">
            <Text w="8rem">Buscar por </Text>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="50%" mr="3" onChange={(e) => stateFilter(e.target.value)}>
              <option value='razao'>Nome / Razão Social</option>
              <option value='fantasia'>Nome Fantasia</option>
              <option value='cnpjcpf'>CPF / CNPJ</option>
            </Select>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." w="60%" type="text" mr="3" {...register('description')} />
            <Button type="submit"><Icon as={FiSearch} /></Button>
          </Flex>
          <Button variant="solid" onClick={openModal} colorScheme="green"><Icon mr={2} as={MdAdd} />Cadastrar</Button>
        </Flex>
        {children}
      </Flex>
    </form >
  );
}
