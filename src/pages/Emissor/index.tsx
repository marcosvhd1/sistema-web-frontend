import { Button, Icon, Td, Tr } from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import MainContent from '../../components/MainContent';
import { DataTable } from '../../components/Table/DataTable';
import { ModalNewEmissorProvider } from '../../Contexts/Modal/NewEmissorContext';
import { ModalNewEmisso } from './components/ModalNewEmissor';
import { SearchBox } from './components/SearchBox';


export function Emissor() {
  const headers: { key: string, label: string }[] = [
    { key: 'emissor', label: 'Emissor' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'ativo', label: 'Ativo' },
  ];

  return (
    <ModalNewEmissorProvider>
      <MainContent>
        <SearchBox>
          <DataTable headers={headers} >
            <Tr>
              <Td>GABRIEL LTDA</Td>
              <Td>11.195.060/0001-23</Td>
              <Td>ATIVO</Td>
              <Td style={{ 'textAlign': 'center' }}>
                <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem">
                  <Icon color="orange.300" as={FiEdit} />
                </Button>
                <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem">
                  <Icon as={FiTrash2} color="red.400" />
                </Button>
              </Td>
            </Tr>
          </DataTable>
        </SearchBox>
        <ModalNewEmisso />
      </MainContent>
    </ModalNewEmissorProvider>
  );
}
