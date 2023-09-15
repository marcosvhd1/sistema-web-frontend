import { Button, Flex, Icon, Input, Tr, useColorMode, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { TdCustom } from '../../../../../../../components/Table/TdCustom';
import { INFReferenciada } from '../../../../../../../services/api/notafiscal/NFReferenciada';

interface FormNFRefProps {
  chaves: INFReferenciada[],
  addChave: (forma: INFReferenciada[]) => void
}

export function FormNFRef({ chaves, addChave }: FormNFRefProps) {
  const methods = useForm<INFReferenciada>();
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const { colorMode } = useColorMode();
  const toast = useToast();

  const clearData = () => {
    methods.reset({descricao: ''});
    setIsEditing(false);
  };

  const submitData = () => {
    const description = methods.getValues('descricao');

    if (description.length == 44) {
      if (isEditing) handleEditChave();
      else handleAddChave();

      clearData();
    } else {
      toast({
        position: 'top',
        description: `A chave precisa ter 44 dígitos, tamanho atual: ${description.length}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
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
    { key: 'descricao', label: 'Chave de Acesso' },
    { key: 'acoes', label: 'Ações' },
  ];

  return (
    <FormProvider {...methods}>
      <Flex w="100%" align="flex-start" justify="center" direction="column">
        <Flex w="100%" justify="flex-end" align="center" width="70%" h="6vh">
          <Input type='number' {...methods.register('descricao')} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} mr={3} placeholder='Chave de acesso'/>
          <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue" onClick={submitData} w="20%">
            <Icon mr={2} as={MdAdd} />
            Adicionar
          </Button>
        </Flex>
        <DataTable 
          mt='3'
          width='100%' 
          trailing={false} 
          headers={headers} 
        >
          {chaves !== undefined ? chaves.map((chave, index) => (
            <Tr key={uuidv4()}>
              <TdCustom>{chave.descricao}</TdCustom>
              <TdCustom style={{alignSelf: 'flex-end'}}>
                <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} onClick={() => loadChaveToEdit(index)}>
                  <Icon color="orange.300" as={FiEdit} />
                </Button>
                <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} onClick={() => handleDeleteChave(chave)}>
                  <Icon as={FiTrash2} color="red.400" />
                </Button>
              </TdCustom>
            </Tr>
          )) : ''}
        </DataTable>
      </Flex>
    </FormProvider>
  );
}
