import { Button, Flex, Icon, Td, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { DeleteAlertDialog } from '../../../../../../../components/Utils/DeleteAlertDialog';
import { useAlertNFProductContext } from '../../../../../../../Contexts/AlertDialog/NotaFiscal/AlertNFProductContext';
import { useModalNFProduct } from '../../../../../../../Contexts/Modal/NotaFiscal/NFProductContext';
import { INFProduct } from '../../../../../../../services/api/notafiscal/NFProduct';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { ModalNFProduct } from './ModalNFProduct';

interface ProdutosProps {
  methods: UseFormReturn<INotaFiscal, any>
}

export function FormProdutos({ methods: nfMethods}: ProdutosProps) {
  const methods = useForm<INFProduct>();

  const { onOpen: openModal } = useModalNFProduct();
  const { onOpen, onClose, isOpen } = useAlertNFProductContext();

  const [produtos, setProdutos] = useState<INFProduct[]>([]);
  const [prodToDelete, setProdToDelete] = useState<INFProduct>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openModalAdd = () => {
    methods.reset({});
    openModal();
  };

  const openModalEdit = (index: number) => {
    setCurrentIndex(index);
    methods.reset(produtos[index]);
    openModal();
    setIsEditing(true);
  };

  const openAlertDeleteProd = (data: INFProduct) => {
    setProdToDelete(data);
    onOpen();
  };

  const handleAddProduct = (data: INFProduct) => {
    setProdutos([...produtos, data]);
    saveChanges();
  };

  const handleEditProduct = (data: INFProduct, index: number) => {
    produtos[index] = data;
    saveChanges();
  };

  const handleDeleteProd = () => {
    const newArray = produtos.filter(prod => prod !== prodToDelete);
    setProdutos(newArray);
    saveChanges();
    onClose();
  };

  const saveChanges = () => {
    nfMethods.setValue('produtos', produtos);
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
    <FormProvider {...methods}>
      <Flex w="100%" justify="center" align="center" direction="column" >
        <Flex w="100%" justify="flex-end" align="center" mt={2}>
          <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="outline" colorScheme="green" onClick={openModalAdd}>
            <Icon mr={2} as={MdAdd} />
            Incluir
          </Button>
        </Flex>
        <DataTable width='100%' headers={headers} mt="5">
          {produtos !== undefined ? produtos.map((data, index) => (
            <Tr key={uuidv4()}>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{('0000' + data.produto.nprod).slice(-4)}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.descricao}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.ncm}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.cfop}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.cst_icms}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.un}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.quantidade}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.valor_unitario ? 'R$ ' + (data.valor_unitario).toString().replace('.', ',') : ''}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.valor_total ? 'R$ ' + (data.valor_total).toString().replace('.', ',') : ''}</Td>
              <Td style={{ 'textAlign': 'center' }}>
                <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => openModalEdit(index)}>
                  <Icon color="orange.300" as={FiEdit} />
                </Button>
                <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => openAlertDeleteProd(data)}>
                  <Icon as={FiTrash2} color="red.400" />
                </Button>
              </Td>
            </Tr>
          )) : ''}
        </DataTable>
        <ModalNFProduct addProduct={handleAddProduct} editProduct={handleEditProduct} index={currentIndex} isEditing={isEditing} setIsEditing={setIsEditing}/>
        <DeleteAlertDialog label="Produto" deleteFunction={handleDeleteProd} onClose={onClose} isOpen={isOpen} id={0}/>
      </Flex>
    </FormProvider>
  );
}
