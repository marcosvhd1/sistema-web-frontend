import { Button, Checkbox, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FiSearch } from 'react-icons/fi';
import { useModalNewEmissor } from '../../../Contexts/Modal/NewEmissorContext';
import { MdAdd } from 'react-icons/md';
import { useModalUser } from '../../../Contexts/Modal/UserContext';

interface SearchBoxProps {
  children: ReactNode;
  getUsuarios: (description: string) => void
  changeEdit: (value: React.SetStateAction<any>) => void;
  setFilter: (value: React.SetStateAction<any>) => void;
}

interface getUserProps {
  description: string;
}

export function SearchBox({ children, getUsuarios, setFilter }: SearchBoxProps) {
  const { onOpen } = useModalUser();
  const { register, handleSubmit } = useForm<getUserProps>();
  const { colorMode } = useColorMode();

  const handleGetUsersByFilter = (data: getUserProps) => {
    const { description } = data;
    getUsuarios(description);
  };

  return (
    <form onSubmit={handleSubmit(handleGetUsersByFilter)}>
      <Flex w="100%" justify="center" align="center" mt={{base: '2', md: '2', lg: '10'}} direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Usuários</Text>
        <Flex w="90%" m="4" align="center" justify="space-between">
          <Flex w="60%" justify="center" align="center">
            <Text fontSize={{base: 'sm', lg: 'lg'}} whiteSpace="nowrap" mr={3}>Buscar por </Text>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="35%" mr="3" onChange={(e) => setFilter(e.target.value)}>
              <option value='email'>Email</option>
            </Select>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." w="60%" type="text" mr="3" {...register('description')} />
            <Button type="submit"><Icon as={FiSearch} /></Button>
          </Flex>
          <Button variant="solid" onClick={onOpen} colorScheme="green"><Icon mr={2} as={MdAdd} />Cadastrar</Button>
        </Flex>
        {children}
      </Flex>
    </form>
  );
}
