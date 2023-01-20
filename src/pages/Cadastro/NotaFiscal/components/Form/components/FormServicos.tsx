import { useState } from 'react';
import { Button, Flex, Icon, Input, Td, Text, Tr } from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { DataTable } from '../../../../../../components/Table/DataTable';
import { DeleteAlertDialog } from '../../../../../../components/Utils/DeleteAlertDialog';
import { IProduct } from '../../../../../../services/api/produtos/ProductService';
import { MdAdd } from 'react-icons/md';
import { IServico } from '../../../../../../services/api/servicos/ServicoService';
import { FormContainer } from '../../../../../../components/Form/FormContainer';
import { useFormContext } from 'react-hook-form';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';


export function FormServicos() {
  const { register, setFocus } = useFormContext<INotaFiscal>();
  const [data, setData] = useState<IServico[]>([]);
  const [servQtd, setServQtd] = useState<number>(1);
  const [valorUnt, setValorUnt] = useState<number>(0);
  const [valorTot, setValorTot] = useState<number>(0);

  const headers: { key: string, label: string }[] = [
    { key: 'nprod', label: 'Código' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'cfop', label: 'CFOP' },
    { key: 'un', label: 'UN' },
    { key: 'qtde_prod', label: 'Quantidade' },
    { key: 'vlr_unit_prod', label: 'Valor Unitário' },
    { key: 'vlr_total_prod', label: 'Valor Total' },
    { key: 'vlr_iss', label: 'Valor ISS' },
    { key: 'porcent_iss', label: '% ISS' },
  ];

  return (
    <Flex w="100%" justify="center" align="center" direction="column" mt={2}>
      <Flex w="100%" justify="flex-end" align="center">
        <Flex w="100%" justify="flex-start" align="center">
          <Text mr={3}>
            Competência:
          </Text>
          <Input w="30%" type="date" {...register('competencia')}/>
        </Flex>
        <Flex w="100%" justify="flex-end" align="center">
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
      </Flex>
      <DataTable width='100%' headers={headers} mt="5">
        {data !== undefined ? data.map((data) => (
          <Tr key={data.id}>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.nserv).slice(-4)}</Td>
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
