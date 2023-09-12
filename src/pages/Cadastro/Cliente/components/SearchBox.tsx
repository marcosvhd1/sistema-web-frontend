import { ReactNode } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Button, Flex, Icon, Input, Select, Spinner, Text, useColorMode } from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import { useModalClient } from '../../../../Contexts/Modal/ClientContext';
import { MdAdd } from 'react-icons/md';
import { FormContainer } from '../../../../components/Form/FormContainer';

interface SearchBoxProps {
  children: ReactNode;
  isLoading: boolean;
  getCod: () => void
  getClientsByFilter: (description: string) => void;
  changeEdit: (value: React.SetStateAction<any>) => void;
  stateFilter: (value: React.SetStateAction<any>) => void;
}

export function SearchBox({ children, changeEdit , stateFilter, getClientsByFilter, getCod, isLoading}: SearchBoxProps) {
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
      <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column">
        <Flex w="95%" justify="space-between" align="center">
          <Flex w="20%" justify="center" align="center">
          </Flex>
          <Text fontFamily="Poppins" fontSize="xl">Lista de Clientes</Text>
          <Flex w="20%" justify="flex-end" align="center">
            <Button disabled={isLoading} variant="solid" colorScheme="green" onClick={openModal}>
              <Icon mr={2} as={MdAdd}/>
              Cadastrar
            </Button>
          </Flex>
        </Flex>
        <Flex w="95%" m="4" align="center" justify="space-between">
          <Flex w="50%" justify="center" align="center" mr='3'>
            <Flex w="100%" justify="flex-start" align="center">
              <FormContainer label='Buscar por' width="25%" mr='3'>
                <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => stateFilter(e.target.value)}>
                  <option value='cod'>Código</option>
                  <option value='razao'>Nome/Razão Social</option>
                  <option value='fantasia'>Nome Fantasia</option>
                  <option value='cnpjcpf'>CPF/CNPJ</option>
                  <option value='cidade'>Cidade</option>
                  <option value='uf'>UF</option>
                  <option value='cep'>CEP</option>
                </Select>
              </FormContainer>
              <FormContainer label='' width="75%" mt='7'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." type="text" {...register('description')} />
              </FormContainer>
            </Flex>
          </Flex>
          <Flex w="50%" justify="flex-start" align="center">
            {
              isLoading ?
                <Button w="10%" mt={7} variant="solid" colorScheme="blue">
                  <Spinner size='sm' /> 
                </Button> :
                <Button disabled={isLoading} type="submit" w="10%" mt={7} variant="solid" colorScheme="blue">
                  <Icon as={FiSearch} />
                </Button> 
            }
          </Flex>
        </Flex>
        {children}
      </Flex>
    </form >
  );
}