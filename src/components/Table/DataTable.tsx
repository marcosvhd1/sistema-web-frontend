import { ReactNode } from 'react';
import { Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

interface DataTableProps {
  children: ReactNode;
  headers: { key: string, label: string }[],
  width?: string
  mt?: string
  mr?: string
  trailing?: boolean
}

export function DataTable({ children, headers, width = '90%', mt = '10', mr, trailing = true }: DataTableProps) {
  return (
    <Flex w="100%" justify="center" mt={`${mt}`} mr={`${mr}`}>
      <TableContainer w={`${width}`} borderRadius={8} >
        <Table size="sm" variant='simple' >
          <Thead bg="whiteAlpha.100">
            <Tr style={{'height': '2rem'}}>
              {headers.map((row) => {
                return (<Th fontSize="0.7rem"  key={row.key}>{row.label}</Th>);
              })}
              {trailing ? <Th style={{'textAlign': 'center'}} fontSize="0.7rem">Ações</Th> : null}
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