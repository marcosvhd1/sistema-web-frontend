import { useEffect, useState } from 'react';
import { Button, Icon, Tag, Td, Tr } from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import MainContent from '../../components/MainContent';
import { DataTable } from '../../components/Table/DataTable';
import { ModalNewEmissorProvider } from '../../Contexts/Modal/NewEmissorContext';
import { ModalNewEmissor } from './components/ModalNewEmissor';
import { SearchBox } from './components/SearchBox';
import { EmissorService, IEmissor } from '../../services/api/emissor/EmissorService';
import { userInfos } from '../../utils/header';
import { EmpresaService } from '../../services/api/empresas/EmpresaService';
import { ApiException } from '../../services/api/ApiException';

const headers: { key: string, label: string }[] = [
  { key: 'emissor', label: 'Emissor' },
  { key: 'cnpj', label: 'CNPJ' },
  { key: 'status', label: 'Status' },
];

export function Emissor() {
  const [data, setData] = useState<IEmissor[]>([]);
  const userInfo = userInfos();

  const HEADERS = userInfo.header;
  const empresa = userInfo.infos?.empresa;


  const getEmissores = () => {
    EmpresaService.getId(empresa, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          const idEmpresa = result.data[0].id;
          EmissorService.getAll(idEmpresa, HEADERS)
            .then((result) => {
              if (result instanceof ApiException) {
                console.log(result.message);
              } else {
                setData(result);
              }
            });
        }
      });
  };

  return (
    <ModalNewEmissorProvider>
      <MainContent>
        <SearchBox getEmissores={getEmissores}>
          <DataTable headers={headers} >
            {data != undefined ? data.map((data) => (
              <Tr key={data.id}>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.razao}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cnpjcpf}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                  <Tag variant='outline' colorScheme={data.status === 'Ativo' ? 'green' : 'red'}>
                    {data.status}
                  </Tag>
                </Td>
                <Td style={{ 'textAlign': 'center' }}>
                  <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => console.log(data.id)}>
                    <Icon color="orange.300" as={FiEdit} />
                  </Button>
                  <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => console.log(data.id)}>
                    <Icon as={FiTrash2} color="red.400" />
                  </Button>
                </Td>
              </Tr>
            )) : ''}
          </DataTable>
        </SearchBox>
        <ModalNewEmissor />
      </MainContent>
    </ModalNewEmissorProvider>
  );
}
