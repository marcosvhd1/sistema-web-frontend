import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Checkbox, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { useModalProduct } from '../../../../Contexts/Modal/ProductContext';
import { FormContainer } from '../../../../components/Form/FormContainer';
import { useGrupos } from '../../../../hooks/useGrupos';

interface SearchBoxProps {
  children: ReactNode;
  getCod: () => void
  getProduct: (description: string, status: string) => void;
  changeEdit: (value: React.SetStateAction<any>) => void;
  setFilter: (value: React.SetStateAction<any>) => void;
  setFilterGrupo: (value: React.SetStateAction<any>) => void;
  setFilterMarca: (value: React.SetStateAction<any>) => void;
  seeActive: string
  setSeeActive: (value: string) => void
}

interface getProductProps {
  description: string;
}

export function SearchBox({ children, setFilter, setFilterGrupo, setFilterMarca, getProduct, getCod, changeEdit, seeActive, setSeeActive }: SearchBoxProps) {
  const { register, handleSubmit } = useForm<getProductProps>();
  const [active, setActive] = useState<boolean>(false);

  const { grupos } = useGrupos();
  const { onOpen } = useModalProduct();

  const { colorMode } = useColorMode();

  const openModal = () => {
    changeEdit(false);
    onOpen();
  };

  const handleGetProductByFilter = (data: getProductProps) => {
    const { description } = data;
    getProduct(description, seeActive);
  };

  const handleSeeActiveProducts = () => {
    setSeeActive(active ? 'Ativo' : 'Inativo');
    setActive(!active);
  };

  return (
    <form onSubmit={handleSubmit(handleGetProductByFilter)}>
      <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column">
        <Flex w="95%" justify="space-between" align="center">
          <Flex w="20%" justify="center" align="center">
          </Flex>
          <Text fontFamily="Poppins" fontSize="xl">Lista de Produtos</Text>
          <Flex w="20%" justify="flex-end" align="center">
            <Button variant="solid" colorScheme="green" onClick={openModal}><Icon mr={2} as={MdAdd} />Cadastrar</Button>
          </Flex>
        </Flex>
        <Flex w="95%" m="4" align="center" justify="space-between">
          <Flex w="50%" justify="center" align="center" mr='3'>
            <Flex w="100%" justify="flex-start" align="center">
              <FormContainer label='Buscar por' width="25%" mr='3'>
                <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => setFilter(e.target.value)}>
                  <option value='nprod'>Código</option>
                  <option value='descricao'>Descrição</option>
                  <option value='referencia'>Referência</option>
                  <option value='ncm'>NCM</option>
                </Select>
              </FormContainer>
              <FormContainer label='' width="50%" mr='3' mt='7'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." type="text" {...register('description')} />
              </FormContainer>
              <FormContainer label='Marca' width="25%">
                <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => setFilterMarca(e.target.value)}>
                  <option value=''>Nenhuma</option>
                  {grupos.map((grupo, index) => grupo.tipo !== 'Grupo' ? <option key={index} value={grupo.descricao}>{grupo.descricao}</option> : null)}
                </Select>
              </FormContainer>
            </Flex>
          </Flex>
          <Flex w="50%" justify="flex-start" align="center">
            <FormContainer label='Grupo' width="25%" mr='3'>
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => setFilterGrupo(e.target.value)}>
                <option value=''>Nenhum</option>
                {grupos.map((grupo, index) => grupo.tipo === 'Grupo' ? <option key={index} value={grupo.descricao}>{grupo.descricao}</option> : null)}
              </Select>
            </FormContainer>
            <Button type="submit" w="10%" mt={7} variant="solid" colorScheme="blue" mr={3}>
              <Icon as={FiSearch} />
            </Button>
            <Checkbox size='lg' mt={7} mr={2} onChange={handleSeeActiveProducts} value={active ? 'Ativo' : 'Inativo'} isChecked={active}/>
            <Text w='20%' mt={7} onClick={handleSeeActiveProducts}>Visualizar inativos</Text>
          </Flex>
        </Flex>
        {children}
      </Flex>
    </form >
  );
}
