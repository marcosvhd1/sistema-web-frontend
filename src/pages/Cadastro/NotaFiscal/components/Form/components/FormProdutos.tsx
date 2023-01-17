import { useState } from 'react';
import { Button, Flex, Icon, Td, Tr } from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable } from '../../../../../../components/Table/DataTable';
import { DeleteAlertDialog } from '../../../../../../components/Utils/DeleteAlertDialog';
import { IProduct } from '../../../../../../services/api/produtos/ProductService';
import { MdAdd } from 'react-icons/md';


export function FormProdutos() {
  const [data, setData] = useState<IProduct[]>([]);
  const [prodQtd, setProdQtd] = useState<number>(1);
  const [valorUnt, setValorUnt] = useState<number>(0);
  const [valorTot, setValorTot] = useState<number>(0);

  const headers: { key: string, label: string }[] = [
    { key: 'nprod', label: 'Código' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'ncm', label: 'NCM' },
    { key: 'cfop', label: 'CFOP' },
    { key: 'cst_icms', label: 'CST / CSOSN' },
    { key: 'un', label: 'UN' },
    { key: 'qtde_prod', label: 'Quantidade' },
    { key: 'vlr_unit_prod', label: 'Valor Unitário' },
    { key: 'vlr_total_prod', label: 'Valor Total' },
  ];

  return (
    <Flex w="100%" justify="center" align="center" direction="column" >
      <Flex w="100%" justify="flex-end" align="center" mt={2}>
        <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="outline" colorScheme="green" mr={3}>
          <Icon mr={2} as={MdAdd} />
          Incluir
        </Button>
        <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="outline" colorScheme="yellow" mr={3}>
          <Icon mr={2} as={FiEdit} />
          Alterar
        </Button>
        <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="outline" colorScheme="red">
          <Icon mr={2} as={FiTrash2} />
          Remover
        </Button>
      </Flex>
      <DataTable width='100%' headers={headers} mt="5">
        {data !== undefined ? data.map((data) => (
          <Tr key={data.id}>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.nprod).slice(-4)}</Td>
            <Td style={{ 'textAlign': 'center' }}>
              <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => null}>
                <Icon color="orange.300" as={FiEdit} />
              </Button>
              <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => null}>
                <Icon as={FiTrash2} color="red.400" />
              </Button>
            </Td>
          </Tr>
        )) : ''}
      </DataTable>
      <DeleteAlertDialog label="Nota Fiscal" deleteFunction={() => null} onClose={() => null} isOpen={false} id={1} />
    </Flex>
  );
}
