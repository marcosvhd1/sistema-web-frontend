import { ReactNode } from 'react';
import { Flex, Icon, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

interface DataTableProps {
  children: ReactNode;
  headers: { key: string, label: string }[],
  width?: string
  mt?: string
  mr?: string
  colorScheme?: string
  trailing?: boolean
  orderBy?: any;
  orderDirection?: 'asc' | 'desc';
  onTap?: (column: any) => void;
}

export function DataTable({ children, headers, width = '95%', mt = '5', mr, colorScheme, trailing = true, orderBy, orderDirection, onTap }: DataTableProps) {
  return (
    <Flex w="100%" justify="center" mt={`${mt}`} mr={`${mr}`}>
      <TableContainer w={`${width}`} borderRadius={8} >
        <Table size="sm" variant='simple' colorScheme={colorScheme}>
          <Thead bg="whiteAlpha.100">
            <Tr style={{'height': '2rem'}}>
              {headers.map((row) => {
                return (
                  <Th 
                    key={row.key}
                    cursor={onTap != undefined ? 'pointer' : ''}
                    fontSize="0.7rem"
                    onClick={() => onTap != undefined ? onTap(row.key) : null}
                  >
                    <Flex alignItems="center">
                      {row.label}
                      {orderBy === row.key ? (
                        orderDirection === 'desc' ? (
                          <Icon as={FiArrowDown} ml={1} w={4} h={4} />
                        ) : (
                          <Icon as={FiArrowUp} ml={1} w={4} h={4} />
                        )
                      ) : (
                        ''
                      )}
                    </Flex>
                  </Th>
                );
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