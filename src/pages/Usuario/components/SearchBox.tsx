import { Button, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { FiSearch } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { useModalUser } from '../../../Contexts/Modal/UserContext';
import { FormContainer } from '../../../components/Form/FormContainer';

interface SearchBoxProps {
  children: ReactNode;
  isLoading: boolean;
  getUsuarios: (description: string) => void
  changeEdit: (value: React.SetStateAction<any>) => void;
  setFilter: (value: React.SetStateAction<any>) => void;
}

interface getUserProps {
  description: string;
}

export function SearchBox({ children, getUsuarios, setFilter, isLoading }: SearchBoxProps) {
  const { onOpen } = useModalUser();
  const { register, handleSubmit } = useForm<getUserProps>();
  const { colorMode } = useColorMode();

  const handleGetUsersByFilter = (data: getUserProps) => {
    const { description } = data;
    getUsuarios(description);
  };

  return (
    <form onSubmit={handleSubmit(handleGetUsersByFilter)}>
      <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column">
        <Flex w="95%" justify="space-between" align="center">
          <Flex w="20%" justify="center" align="center">
          </Flex>
          <Text fontFamily="Poppins" fontSize="xl">Lista de Usuários</Text>
          <Flex w="20%" justify="flex-end" align="center">
            <Button disabled={isLoading} variant="solid" colorScheme="green" onClick={onOpen}>
              <Icon mr={2} as={MdAdd}/>
              Cadastrar
            </Button>
          </Flex>
        </Flex>
        <Flex w="95%" m="4" align="center" justify="space-between">
          <Flex w="50%" justify="center" align="center" mr='3'>
            <Flex w="100%" justify="flex-start" align="center">
              <FormContainer label='Buscar por' width="25%" mr='3'>
                <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => setFilter(e.target.value)}>
                  <option value='email'>Login</option>
                </Select>
              </FormContainer>
              <FormContainer label='' width="75%" mt='7'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." type="text" {...register('description')} />
              </FormContainer>
            </Flex>
          </Flex>
          <Flex w="50%" justify="flex-start" align="center">
            <Button disabled={isLoading} type="submit" w="10%" mt={7} variant="solid" colorScheme="blue">
              <Icon as={FiSearch} />
            </Button>
          </Flex>
        </Flex>
        {children}
      </Flex>
    </form>
  );
}
