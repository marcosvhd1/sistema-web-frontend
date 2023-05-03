import { Button, Flex, Icon, Input, Menu, MenuButton, MenuItem, MenuList, Select, Text, useColorMode } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FieldValues, useForm, useFormContext } from 'react-hook-form';
import { FaInfoCircle, FaThList } from 'react-icons/fa';
import { FcDocument } from 'react-icons/fc';
import { FiChevronsDown, FiSearch } from 'react-icons/fi';
import { MdAdd, MdCancel } from 'react-icons/md';
import { useModalNotaFiscal } from '../../../../Contexts/Modal/NotaFiscal/NotaFiscalContext';
import { INotaFiscal } from '../../../../services/api/notafiscal/NotaFiscalService';

interface SearchBoxProps {
  children: ReactNode;
  getNotasFiscaisByFilter: (description: string) => void;
  setIsEditing: (value: boolean) => void;
  stateFilter: (value: React.SetStateAction<any>) => void;
}

export function SearchBox({ children, stateFilter, getNotasFiscaisByFilter, setIsEditing }: SearchBoxProps) {
  const { register, handleSubmit } = useForm();
  const methods = useFormContext<INotaFiscal>();
  const { colorMode } = useColorMode();
  const { onOpen } = useModalNotaFiscal();

  const handleGetNotasFiscaisByFilter = async (data: FieldValues) => {
    const { description } = data;
    getNotasFiscaisByFilter(description);
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    methods.reset({});
    onOpen();
  };

  return (
    <form onSubmit={handleSubmit((data) => handleGetNotasFiscaisByFilter(data))}>
      <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column" >
        <Text fontFamily="Poppins" fontSize="xl">Lista de Notas Fiscais</Text>
        <Flex w="90%" m="4" align="center" justify="space-between">
          <Flex w="60%" justify="center" align="center">
            <Text fontSize={{base: 'sm', lg: 'lg'}} whiteSpace="nowrap" mr={3}>Buscar por </Text>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="35%" mr="3" onChange={(e) => stateFilter(e.target.value)}>
              <option value='cod'>N° da Nota</option>
              <option value='nome_destinatario'>Destinatario</option>
            </Select>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." w="60%" type="text" mr="3" {...register('description')} />
            <Button type="submit"><Icon as={FiSearch}/></Button>
          </Flex>
          <Flex w="40%" justify="flex-end" align="space-between">
            <Button variant="solid" colorScheme="green" onClick={handleOpenModal} mr={3}><Icon mr={2} as={MdAdd} />Cadastrar</Button>
            <Menu>
              <MenuButton as={Button} variant="solid" colorScheme="blue">
              Opções<Icon ml={2} as={FiChevronsDown} />
              </MenuButton>
              <MenuList>
                <MenuItem color={colorMode === 'light' ? 'blue.600' : 'blue.300'}><Icon mr={2} as={FaInfoCircle}/>Status do Servidor</MenuItem>
                <MenuItem color={colorMode === 'light' ? 'red.600' : 'red.300'}><Icon mr={2} as={MdCancel}/>Inutilizar Faixa</MenuItem>
                <MenuItem color={colorMode === 'light' ? 'blue.600' : 'blue.300'}><Icon mr={2} as={FaThList}/>Relatório Gerencial</MenuItem>
                <MenuItem color={colorMode === 'light' ? 'blue.600' : 'blue.300'}><Icon mr={2} as={FcDocument}/>Importar XML</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {children}
      </Flex>
    </form>
  );
}
