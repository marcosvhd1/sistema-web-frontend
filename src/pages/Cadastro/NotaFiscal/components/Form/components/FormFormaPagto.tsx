import { Button, Divider, Flex, Icon, Select, Td, Text, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { FormContainer } from '../../../../../../components/Form/FormContainer';
import { DataTable } from '../../../../../../components/Table/DataTable';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';


export function FormFormaPagto() {
  const { register, setFocus } = useFormContext<INotaFiscal>();
  const [data, setData] = useState<number[]>([]);
  const [duplicata, setDuplicata] = useState<number[]>([]);

  const headers1: { key: string, label: string }[] = [
    { key: 'formapagto', label: 'Forma de Pagto' },
    { key: 'valor', label: 'Valor' },
    { key: 'bandeira', label: 'Bandeira' },
    { key: 'obs', label: 'Observação' },
  ];

  const headers2: { key: string, label: string }[] = [
    { key: 'numero', label: 'Número' },
    { key: 'vencimento', label: 'Vencimento' },
    { key: 'valor', label: 'Valor' },
  ];

  return (
    <Flex w="100%" justify="center" align="center" direction="column" >
      <Flex w="100%" justify="flex-start" align="center" mb={2}>
        <FormContainer width='45%' label='Presença do comprador no momento da operação'>
          <Select {...register('presenca_comprador')}>
            <option value='0'>0 - Não se aplica (Para NF complementar ou de ajuste)</option>
            <option value='1'>1 - Operação presencial</option>
            <option value='2'>2 - Operação não presencial, pela Internet</option>
            <option value='3'>3 - Operação não presencial, Teleatendimento</option>
            <option value='4'>4 - NFCE-e em operação com entrega em domicílio</option>
            <option value='5'>5 - Operação presencial - fora do estabelecimento</option>
            <option value='9'>5 - Operação não presencial, Outros</option>
          </Select>
        </FormContainer>
      </Flex>
      <Flex w="100%" align="center" justify="center">
        <Flex w="100%" direction="column" mr="5" mb={2} mt={2}> 
          <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
            <Divider w="20%" />
            <Text w="max" mr={3} ml={3}>Forma de Pagamento</Text>
            <Divider />
          </Flex>
          <DataTable width='100%' headers={headers1} mt='3'>
            {data !== undefined ? data.map((data) => (
              <Tr key={data}>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data}</Td>
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
        </Flex>
        <Flex w="100%" direction="column" mb={2} mt={2}> 
          <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
            <Divider w="20%" />
            <Text w="max" mr={3} ml={3}>Duplicatas</Text>
            <Divider />
          </Flex>
          <DataTable width='100%' headers={headers2} mt='3'>
            {data !== undefined ? data.map((data) => (
              <Tr key={data}>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data}</Td>
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
        </Flex>
      </Flex>
    </Flex>
  );
}