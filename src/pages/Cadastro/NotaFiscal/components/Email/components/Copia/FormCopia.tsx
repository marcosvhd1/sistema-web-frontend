import { Button, Flex, Icon, Input, Td, Tr, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { ActionButton } from '../../../../../../../components/Form/ActionButton';
import { DataTable } from '../../../../../../../components/Table/DataTable';

interface FormCopiaProps {
  copiaCC: any,
  setCopiaCC: (email: any) => void
}

interface CopiaCC {
  email: string
}

export function FormCopia({ copiaCC, setCopiaCC }: FormCopiaProps) {
  const methods = useForm<CopiaCC>();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { colorMode } = useColorMode();

  const clearData = () => {
    methods.reset({email: ''});
    setIsEditing(false);
  };

  const submitDataCC = () => {
    if (isEditing) handleEditCC();
    else handleAddCC();

    clearData();
  };

  const loadCCToEdit = (index: number) => {
    methods.reset(copiaCC[index]);
    setCurrentIndex(index);
    setIsEditing(true);
  };

  const handleAddCC = () => {
    const data: CopiaCC = {
      email: methods.getValues('email')
    };

    setCopiaCC([...copiaCC, data]);
  };

  const handleEditCC = () => {
    const data: CopiaCC = {
      email: methods.getValues('email')
    };

    copiaCC[currentIndex] = data;
  };

  const handleDeleteCC = (data: CopiaCC) => {
    const newArray = copiaCC.filter((email: any) => email !== data);
    setCopiaCC(newArray);
    setIsEditing(false);
  };

  const headers: { key: string, label: string }[] = [
    { key: 'emails', label: 'Emails' },
  ];

  return (
    <Flex w="100%" align="center" justify="center" direction="column"> 
      <Flex w="100%" align="center" justify="center">
        <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('email')} mr={3}/>
        <Button fontSize={{ base: '.8rem', md: '.8rem', lg: '.9rem' }} variant="solid" colorScheme="blue" onClick={submitDataCC} w='15%'>
          <Icon mr={2} as={MdAdd} />
          Adicionar
        </Button>
      </Flex>
      <DataTable
        width='100%'
        trailing={false}
        headers={headers}
      >
        {copiaCC !== undefined ? copiaCC.map((email: any, index: number) => (
          <Tr key={uuidv4()}>
            <Td w='85%' fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{email.email}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
              <ActionButton 
                label='Editar'
                colorScheme='orange'
                action={() => loadCCToEdit(index)}
                icon={FiEdit}
              />
              <ActionButton 
                label='Excluir'
                colorScheme='red'
                action={() => handleDeleteCC(email)}
                icon={FiTrash2}
              />
            </Td>
          </Tr>
        )) : ''}
      </DataTable>
    </Flex>
  );
}