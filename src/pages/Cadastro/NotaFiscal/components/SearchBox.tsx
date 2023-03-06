import { ReactNode } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, Flex, Icon, Input, Select, Text, Link, useColorMode } from '@chakra-ui/react';
import { getDecrypted } from '../../../../utils/crypto';
import { MdAdd } from 'react-icons/md';

interface SearchBoxProps {
  children: ReactNode;
  getNotasFiscaisByFilter: (description: string) => void;
  stateFilter: (value: React.SetStateAction<any>) => void;
}

export function SearchBox({ children, stateFilter, getNotasFiscaisByFilter }: SearchBoxProps) {
  const { register, handleSubmit } = useForm();
  const isEmissorSelected = getDecrypted(localStorage.getItem('emissor')) !== undefined;
  const { colorMode } = useColorMode();

  const handleGetNotasFiscaisByFilter = async (data: FieldValues) => {
    const { description } = data;
    getNotasFiscaisByFilter(description);
  };


  return (
    <form onSubmit={handleSubmit((data) => handleGetNotasFiscaisByFilter(data))}>
      <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Notas Fiscais</Text>
        <Flex w="90%" m="4" align="center" justify="space-between">
          <Flex w="60%" justify="center" align="center">
            <Text w="8rem">Buscar por </Text>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="50%" mr="3" onChange={(e) => stateFilter(e.target.value)}>
              <option value='razao'>N° da Nota</option>
              <option value='fantasia'>Destinatário</option>
            </Select>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." w="60%" type="text" mr="3" {...register('description')} />
            <Button type="submit"><Icon as={FiSearch} /></Button>
          </Flex>
          <Link style={{ textDecoration: 'none' }} as={ReactRouterLink} to={isEmissorSelected ? '/app/fiscal/nfe/cadastro' : ''}>
            <Button variant="solid" colorScheme="green"><Icon mr={2} as={MdAdd} />Cadastrar</Button>
          </Link>
        </Flex>
        {children}
      </Flex>
    </form >
  );
}
