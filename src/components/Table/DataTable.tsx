import { ReactNode } from 'react';
import { Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

interface DataTableProps {
  children: ReactNode;
  headers: { key: string, label: string }[]
}

export function DataTable({ children, headers }: DataTableProps) {
  return (
    <Flex w="100%" justify="center" mt="10">
      <TableContainer  w="90%" borderRadius={8} >
        <Table size="sm" variant='simple' >
          <Thead bg="whiteAlpha.100">
            <Tr style={{'height': '2rem'}}>
              {headers.map((row) => {
                return (<Th fontSize="0.7rem"  key={row.key}>{row.label}</Th>);
              })}
              <Th style={{'textAlign': 'center'}} fontSize="0.7rem">Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {children}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}