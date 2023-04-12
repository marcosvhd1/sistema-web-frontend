import { useEffect, useState, ReactNode } from 'react';
import { Button, Checkbox, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { FiSearch } from 'react-icons/fi';
import { ModalNewEmissorProvider, useModalNewEmissor } from '../../../Contexts/Modal/NewEmissorContext';

interface SearchBoxProps {
  children: ReactNode;
  getEmissores: (description: string, status: string) => void
  changeEdit: (value: React.SetStateAction<any>) => void;
  setFilter: (value: React.SetStateAction<any>) => void;
  seeActive: string
  setSeeActive: (value: string) => void
}

interface getEmissorProps {
  description: string;
}


export function SearchBox({ children, getEmissores, changeEdit, setFilter, seeActive, setSeeActive }: SearchBoxProps) {
  const { onOpen } = useModalNewEmissor();
  const { register, handleSubmit } = useForm<getEmissorProps>();
  const [active, setActive] = useState<boolean>(false);
  const { colorMode } = useColorMode();

  const handleGetEmissoresByFilter = (data: getEmissorProps) => {
    const { description } = data;
    getEmissores(description, seeActive);
  };

  const handleSeeActiveProducts = () => {
    setSeeActive(active ? 'Ativo' : 'Inativo');
    setActive(!active);
  };


  return (
    <form onSubmit={handleSubmit(handleGetEmissoresByFilter)}>
      <Flex w="100%" justify="center" align="center" mt={{base: '2', md: '2', lg: '10'}} direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista Emissores</Text>
        <Flex w="90%" m="4" align="center" justify="space-between">
          <Flex w="95%" justify="center" align="center">
            <Text fontSize={{base: 'sm', lg: 'lg'}} w='11%'>Buscar por </Text>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="20%" mr="3" onChange={(e) => setFilter(e.target.value)}>
              <option value='razao'>Emissor</option>
              <option value='cnpjcpf'>CPF / CNPJ</option>
            </Select>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." w="40%" type="text" mr="3" {...register('description')}/>
            <Button type='submit'><Icon as={FiSearch} /></Button>
            <Checkbox size='lg' mx='2' onChange={handleSeeActiveProducts} value={active ? 'Ativo' : 'Inativo'} isChecked={active}/>
            <Text fontSize={{base: 'sm', lg: 'lg'}} w='20%' onClick={handleSeeActiveProducts}>Visualizar inativos</Text>
          </Flex>
          <Button variant="outline" onClick={onOpen} colorScheme="green">Cadastrar</Button>
        </Flex>
        {children}
      </Flex>
    </form>
  );
}
