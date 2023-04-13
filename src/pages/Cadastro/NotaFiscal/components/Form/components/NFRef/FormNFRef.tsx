import { Button, Flex, Icon, Input, Td, Tr, useColorMode } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { INFReferenciada } from '../../../../../../../services/api/notafiscal/NFReferenciada';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface FormNFRefProps {
  chaves: INFReferenciada[],
  addChave: (forma: INFReferenciada[]) => void
}

export function FormNFRef({ chaves, addChave }: FormNFRefProps) {
  const methods = useForm<INFReferenciada>();
  const { colorMode } = useColorMode();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const clearData = () => {
    methods.reset({descricao: ''});
    setIsEditing(false);
  };

  const submitData = () => {
    if (isEditing) handleEditChave();
    else handleAddChave();

    clearData();
  };

  const loadChaveToEdit = (index: number) => {
    methods.reset(chaves[index]);
    setCurrentIndex(index);
    setIsEditing(true);
  };

  const handleAddChave = () => {
    const data = {
      id_nfe: 0,
      descricao: methods.getValues('descricao')
    };

    addChave([...chaves, data]);
  };

  const handleEditChave = () => {
    const data = {
      id_nfe: 0,
      descricao: methods.getValues('descricao'),
    };

    chaves[currentIndex] = data;
  };
  
  const handleDeleteChave = (data: INFReferenciada) => {
    const newArray = chaves.filter(chave => chave !== data);
    addChave(newArray);
    setIsEditing(false);
  };

  const headers: { key: string, label: string }[] = [
    { key: 'chave', label: 'Chave de Acesso' },
    { key: 'acoes', label: 'Ações' },
  ];

  return (
    <FormProvider {...methods}>
      <Flex w="100%" align="flex-start" justify="center" direction="column">
        <Flex w="100%" justify="flex-end" align="center" width="70%">
          <Input maxLength={44} {...methods.register('descricao')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} mr={3} placeholder='Chave de acesso'/>
          <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue" onClick={submitData} w="20%">
            <Icon mr={2} as={MdAdd} />
            Incluir
          </Button>
        </Flex>
        <DataTable width='100%' headers={headers} trailing={false} mt='3'>
          {chaves !== undefined ? chaves.map((chave, index) => (
            <Tr key={uuidv4()}>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="80%">{chave.descricao}</Td>
              <Td style={{alignSelf: 'flex-end'}} fontSize={{ base: '.5rem', md: '.5rem', lg: '8rem' }} w="20%">
                <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} onClick={() => loadChaveToEdit(index)}>
                  <Icon color="orange.300" as={FiEdit} />
                </Button>
                <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} onClick={() => handleDeleteChave(chave)}>
                  <Icon as={FiTrash2} color="red.400" />
                </Button>
              </Td>
            </Tr>
          )) : ''}
        </DataTable>
      </Flex>
    </FormProvider>
  );
}
