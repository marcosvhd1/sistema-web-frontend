import { ReactNode } from 'react';
import { Button, Flex, Icon, Input, Select, Text } from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import { ModalNewEmissorProvider, useModalNewEmissor } from '../../../Contexts/Modal/NewEmissorContext';

interface SearchBoxProps {
  children: ReactNode;
}

export function SearchBox({ children }: SearchBoxProps) {
  const { onOpen } = useModalNewEmissor();
  return (
    <Flex w="100%" justify="center" align="center" mt={{base: '2', md: '2', lg: '10'}} direction="column" >
      <Text fontFamily="Poppins" fontSize="xl">Lista Emissores</Text>
      <Flex w="90%" m="4" align="center" justify="space-between">
        <Flex w="60%" justify="center" align="center">
          <Text w="8rem">Buscar por </Text>
          <Select w="50%" mr="3">
            <option value='emissor'>Emissor</option>
            <option value='cnpjcpf'>CPF / CNPJ</option>
          </Select>
          <Input placeholder="Localizar..." w="60%" type="text" mr="3"/>
          <Button type="submit"><Icon as={FiSearch} /></Button>
        </Flex>
        <Button variant="outline" onClick={onOpen} colorScheme="green">Cadastrar Emissor</Button>
      </Flex>
      {children}
    </Flex>
  );
}
