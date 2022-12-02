import { ReactNode, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';


import { Button, Flex, Icon, Input, Select, Text } from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import { useModalProduct } from '../../../../Contexts/Modal/ProductContext';
import { GroupService, IGroup } from '../../../../services/api/produtos/GroupService';
import { useEmissorContext } from '../../../../Contexts/EmissorProvider';
import { ApiException } from '../../../../services/api/ApiException';

interface SearchBoxProps {
  children: ReactNode;
  getCod: () => void
  getProduct: (description: string) => void;
  changeEdit: (value: React.SetStateAction<any>) => void;
  setFilter: (value: React.SetStateAction<any>) => void;
  header: any
}

export function SearchBox({children, setFilter, getProduct, getCod, changeEdit, header }: SearchBoxProps) {
  const { onOpen } = useModalProduct();
  const { register, handleSubmit } = useForm();
  const { idEmissorSelecionado } = useEmissorContext();
  const [data, setData] = useState<IGroup[]>([]);

  const openModal = () => {
    getCod();
    onOpen();
    changeEdit(false);
  };

  useEffect(() => {
    getDados();
  },[]);

  const HandleGetProductByFilter = (data: FieldValues) => {
    const { description } = data;
    getProduct(description);
  };

  const getDados = async () => {
    GroupService.getAll(idEmissorSelecionado, header)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
        }});
  };

  return (
    <form onSubmit={handleSubmit((data) => HandleGetProductByFilter(data))}>
      <Flex w="100%" justify="center" align="center" mt="10" direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Produtos</Text>
        <Flex w="90%" m="4" align="center" justify="space-between">
          <Flex w="80%" justify="center" align="center">
            <Text w="9rem">Buscar por </Text>
            <Select w="40%" mr="3" onChange={(e) => setFilter(e.target.value)}>
              <option value='descricao'>Descrição</option>
              <option value='nprod'>Código</option>
              <option value='referencia'>Referência</option>
              <option value='marca'>Marca</option>
              <option value='ncm'>NCM</option>
            </Select>
            <Input placeholder="Localizar..." w="60%" type="text" mr="3" {...register('description')}/>
            <Select placeholder="Selecione o Grupo" w="40%" mr="3">
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
            <Button type="submit"><Icon as={FiSearch} /></Button>
          </Flex>
          <Button variant="outline" onClick={openModal} colorScheme="green">Cadastrar Produto</Button>
        </Flex>
        {children}
      </Flex>
    </form >

  );
}
