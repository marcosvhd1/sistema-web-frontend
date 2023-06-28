import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


import { Button, Checkbox, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import { useModalProduct } from '../../../../Contexts/Modal/ProductContext';
import { useGroupContext } from '../../../../Contexts/ProductGroupContext';
import { MdAdd } from 'react-icons/md';
import { FormContainer } from '../../../../components/Form/FormContainer';

interface SearchBoxProps {
  children: ReactNode;
  getCod: () => void
  getProduct: (description: string, status: string) => void;
  getProductByGroup: (description: string, group: string, status: string) => void;
  changeEdit: (value: React.SetStateAction<any>) => void;
  setFilter: (value: React.SetStateAction<any>) => void;
  seeActive: string
  setSeeActive: (value: string) => void
}

interface getProductProps {
  description: string;
  group: string
}

export function SearchBox({ children, setFilter, getProduct, getProductByGroup, getCod, changeEdit, seeActive, setSeeActive }: SearchBoxProps) {
  const { onOpen } = useModalProduct();
  const { register, handleSubmit } = useForm<getProductProps>();
  const { colorMode } = useColorMode();
  const { data, getDados } = useGroupContext();
  const [active, setActive] = useState<boolean>(false);

  const openModal = () => {
    getCod();
    onOpen();
    changeEdit(false);
  };

  useEffect(() => {
    getDados();
  }, []);

  const HandleGetProductByFilter = (data: getProductProps) => {
    const { description, group } = data;
    group ? getProductByGroup(description, group, seeActive) : getProduct(description, seeActive);
  };

  const handleSeeActiveProducts = () => {
    setSeeActive(active ? 'Ativo' : 'Inativo');
    setActive(!active);
  };

  return (
    <form onSubmit={handleSubmit(HandleGetProductByFilter)}>
      <Flex w="100%" justify="center" align="center" mt={{base: '2', md: '2', lg: '10'}} direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Produtos</Text>
        <Flex w="95%" m="4" align="center" justify="space-between">
          <Flex w="80%" justify="center" align="center">
            <FormContainer label='Buscar por' width="20%" mr='3'>
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => setFilter(e.target.value)}>
                <option value='descricao'>Descrição</option>
                <option value='nprod'>Código</option>
                <option value='referencia'>Referência</option>
                <option value='marca'>Marca</option>
                <option value='ncm'>NCM</option>
              </Select>
            </FormContainer>
            <FormContainer label='Descrição' width="40%" mr='3'>
              <Input type="text" placeholder="Localizar..." maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('description')} />
            </FormContainer>
            <FormContainer label='Grupo' width="20%" mr='3'>
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('group')}>
                {
                  data != undefined ? data.map((data) => (
                    data.tipo.toUpperCase() === 'GRUPO'
                      ?
                      <option key={data.id} id={data.descricao} value={data.descricao}>{data.descricao}</option>
                      :
                      ''
                  ))
                    :
                    ''
                }
              </Select>
            </FormContainer>
            <Button type="submit" mt={7} mr={3}><Icon as={FiSearch} onClick={getDados} /></Button>
            <Checkbox size='lg' mx='2' mt={7} onChange={handleSeeActiveProducts} value={active ? 'Ativo' : 'Inativo'} isChecked={active}/>
            <Text w='20%' mt={7} mr={5} onClick={handleSeeActiveProducts}>Visualizar inativos</Text>
          </Flex>
          <Button mt={7} variant="solid" onClick={openModal} colorScheme="green"><Icon mr={2} as={MdAdd} />Cadastrar</Button>
        </Flex>
        {children}
      </Flex>
    </form >

  );
}
