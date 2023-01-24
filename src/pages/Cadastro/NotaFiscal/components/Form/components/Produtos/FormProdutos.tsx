import { Button, Flex, Icon, Td, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { useModalNFProduct } from '../../../../../../../Contexts/Modal/NotaFiscal/NFProductContext';
import { INFProduct } from '../../../../../../../services/api/notafiscal/NFProduct';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { ModalNFProduct } from './ModalNFProduct';

interface ProdutosProps {
  methods: UseFormReturn<INotaFiscal, any>
}

export function FormProdutos({ methods }: ProdutosProps) {
  const [produtos, setProdutos] = useState<INFProduct[]>([]);
  const { onOpen } = useModalNFProduct();

  const handleAddProduct = (data: INFProduct) => {
    setProdutos([...produtos, data]);
  };

  const handleSaveProducts = () => {
    methods.setValue('produtos', produtos);
  };

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
        <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="outline" colorScheme="green" onClick={onOpen}>
          <Icon mr={2} as={MdAdd} />
          Incluir
        </Button>
      </Flex>
      <DataTable width='100%' headers={headers} mt="5">
        {produtos !== undefined ? produtos.map((data) => (
          <Tr key={data.produto.id}>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.produto.nprod).slice(-4)}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.descricao}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.ncm}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.cfop}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.cst_icms}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.un}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.quantidade}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.valor_unitario}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.valor_total}</Td>
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
      <ModalNFProduct addProduct={handleAddProduct}/>
    </Flex>
  );
}
