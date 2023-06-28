import { ReactNode } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Button, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import { useModalTransportadora } from '../../../../Contexts/Modal/TransportadoraContext';
import { MdAdd } from 'react-icons/md';
import { FormContainer } from '../../../../components/Form/FormContainer';



interface SearchBoxProps {
  children: ReactNode;
  getCod: () => void
  getTransportadora: (description: string) => void;
  changeEdit: (value: React.SetStateAction<any>) => void;
  stateFilter: (value: React.SetStateAction<any>) => void;

}

export function SearchBox({ children, changeEdit, stateFilter, getTransportadora, getCod}: SearchBoxProps) {
  const { onOpen } = useModalTransportadora();
  const { register, handleSubmit } = useForm();
  const { colorMode } = useColorMode();

  const openModal = () => {
    getCod();
    onOpen();
    changeEdit(false);
  };

  const HandlegetTransportadoraByFilter = (data: FieldValues) => {
    const { description } = data;
    getTransportadora(description);
  };


  return (
    <form onSubmit={handleSubmit((data) => HandlegetTransportadoraByFilter(data))}>
      <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Transportadoras</Text>
        <Flex w="95%" m="4" align="center" justify="space-between">
          <Flex w="70%" justify="center" align="center">
            <FormContainer label='Buscar por' width="30%" mr='3'>
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => stateFilter(e.target.value)}>
                <option value='razao'>Razão Social</option>
                <option value='cnpjcpf'>CNPJ</option>
              </Select>
            </FormContainer>
            <FormContainer label='Descrição' width="70%" mr='3'>
              <Input type="text" placeholder="Localizar..." maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('description')} />
            </FormContainer>
            <Button type="submit" mt={7}><Icon as={FiSearch} /></Button>
          </Flex>
          <Button variant="solid" onClick={openModal} colorScheme="green" mt={7}><Icon mr={2} as={MdAdd} />Cadastrar</Button>
        </Flex>
        {children}
      </Flex>
    </form >
  );
}
