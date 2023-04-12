import { ReactNode } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, Flex, Icon, Input, Select, Text, Link, useColorMode } from '@chakra-ui/react';
import { getDecrypted } from '../../../../utils/crypto';
import { MdAdd } from 'react-icons/md';
import { useModalNotaFiscal } from '../../../../Contexts/Modal/NotaFiscal/NotaFiscalContext';
import { useFormContext } from 'react-hook-form';
import { INotaFiscal } from '../../../../services/api/notafiscal/NotaFiscalService';

interface SearchBoxProps {
  children: ReactNode;
  getNotasFiscaisByFilter: (description: string) => void;
  setIsEditing: (value: boolean) => void;
  stateFilter: (value: React.SetStateAction<any>) => void;
}

export function SearchBox({ children, stateFilter, getNotasFiscaisByFilter, setIsEditing }: SearchBoxProps) {
  const { register, getValues } = useForm();
  const methods = useFormContext<INotaFiscal>();
  const { colorMode } = useColorMode();
  const { onOpen } = useModalNotaFiscal();

  const handleGetNotasFiscaisByFilter = async () => {
    const description = getValues('description');
    getNotasFiscaisByFilter(description);
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    methods.reset({});
    onOpen();
  };


  return (
    <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column" >
      <Text fontFamily="Poppins" fontSize="xl">Lista de Notas Fiscais</Text>
      <Flex w="90%" m="4" align="center" justify="space-between">
        <Flex w="60%" justify="center" align="center">
          <Text w="8rem">Buscar por </Text>
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="50%" mr="3" onChange={(e) => stateFilter(e.target.value)}>
            <option value='cod'>N° da Nota</option>
            <option value='nome_destinatario'>Destinatario</option>
          </Select>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." w="60%" type="text" mr="3" {...register('description')} />
          <Button onClick={handleGetNotasFiscaisByFilter}><Icon as={FiSearch} /></Button>
        </Flex>
        <Button variant="solid" colorScheme="green" onClick={handleOpenModal}><Icon mr={2} as={MdAdd} />Cadastrar</Button>
      </Flex>
      {children}
    </Flex>
  );
}
