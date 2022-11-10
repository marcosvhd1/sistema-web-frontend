import { ReactNode } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Button, Flex, Icon, Input, Select, Text } from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import { useModalService } from '../../../../Contexts/Modal/ServiceContext';



interface SearchBoxProps {
  children: ReactNode;
  changeEdit: (value: React.SetStateAction<any>) => void;
  stateFilter: (value: React.SetStateAction<any>) => void;
  stateDescription: (value: React.SetStateAction<any>) => void;
}

export function SearchBox({ children, changeEdit, stateFilter, stateDescription }: SearchBoxProps) {
  const { onOpen } = useModalService();
  const { register, handleSubmit } = useForm();

  const openModal = async () => {
    onOpen();
    changeEdit(false);
  };

  const HandleGetServiceByFilter = (data: FieldValues) => {
    const { description } = data;
    stateDescription(description);
  };


  return (
    <form onSubmit={handleSubmit((data) => HandleGetServiceByFilter(data))}>
      <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Serviços</Text>
        <Flex w="90%" m="4" align="center" justify="space-between">
          <Flex w="60%" justify="center" align="center">
            <Text w="8rem">Buscar por </Text>
            <Select w="50%" mr="3" onChange={(e) => stateFilter(e.target.value)}>
              <option value='descricao'>Descrição</option>
              <option value='nserv'>Código</option>
              <option value='ncm'>NCM</option>
            </Select>
            <Input placeholder="Localizar..." w="60%" type="text" mr="3" {...register('description')} />
            <Button type="submit"><Icon as={FiSearch} /></Button>
          </Flex>
          <Button variant="outline" onClick={openModal} colorScheme="green">Cadastrar Serviço</Button>
        </Flex>
        {children}
      </Flex>
    </form >
  );
}