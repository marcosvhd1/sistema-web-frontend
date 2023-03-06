import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


import { Button, Checkbox, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import { useModalProduct } from '../../../../Contexts/Modal/ProductContext';
import { useGroupContext } from '../../../../Contexts/ProductGroupContext';
import { MdAdd } from 'react-icons/md';

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
      <Flex w="100%" justify="center" align="center" mt="10" direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Produtos</Text>
        <Flex w="90%" m="4" align="center" justify="space-between">
          <Flex w="95%" justify="center" align="center">
            <Text fontSize={{base: 'sm', lg: 'lg'}} w='11%'>Buscar por </Text>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="20%" mr="3" onChange={(e) => setFilter(e.target.value)}>
              <option value='descricao'>Descrição</option>
              <option value='nprod'>Código</option>
              <option value='referencia'>Referência</option>
              <option value='marca'>Marca</option>
              <option value='ncm'>NCM</option>
            </Select>
            <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." w="40%" type="text" mr="3" {...register('description')} />
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Selecione o Grupo" w="40%" mr="3" {...register('group')}>
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
            <Button type="submit"><Icon as={FiSearch} onClick={getDados} /></Button>
            <Checkbox size='lg' mx='2' onChange={handleSeeActiveProducts} value={active ? 'Ativo' : 'Inativo'} isChecked={active}/>
            <Text fontSize={{base: 'sm', lg: 'lg'}} w='20%' onClick={handleSeeActiveProducts}>Visualizar inativos</Text>
          </Flex>
          <Button ml='4' variant="solid" onClick={openModal} colorScheme="green"><Icon mr={2} as={MdAdd} />Cadastrar</Button>
        </Flex>
        {children}
      </Flex>
    </form >

  );
}
