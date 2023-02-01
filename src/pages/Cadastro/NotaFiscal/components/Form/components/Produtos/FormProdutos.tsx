import { Button, Flex, Icon, Td, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useForm, useFormContext, UseFormReturn } from 'react-hook-form';
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

export function FormProdutos() {
  const methods = useForm<INFProduct>();
  const nfMethods = useFormContext<INotaFiscal>();

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
    produtos.push(data);
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
    calcTotais();
  };

  const calcTotais = () => {
    let totBCICMS = 0;
    let totICMS = 0;
    let totBCICMSST = 0;
    let totICMSST = 0;
    let totII = 0;
    let totIPI = 0;
    let totPIS = 0;
    let totCOFINS = 0;
    let totDesc = 0;
    let totProd = 0;
    let totAliqCredICMS = 0;
    let totCredICMS = 0;
    let totPartilhaICMSDest = 0;
    let totPartilhaICMSRem = 0;
    let totFCPUFDest = 0;
    let totIPIDevolvido = 0;
    let totFCP = 0;
    let totFCPST = 0;

    for (let i = 0; i < produtos.length; i++) {
      totBCICMS += produtos[i].produto.base_icms;
      totICMS += produtos[i].valor_icms;
      totBCICMSST += produtos[i].base_icms_st;
      totICMSST += produtos[i].valor_icms_st;
      totII += produtos[i].valor_ii;
      totIPI += produtos[i].valor_ipi;
      totPIS += produtos[i].valor_pis;
      totCOFINS += produtos[i].valor_cofins;
      totDesc += produtos[i].desconto_total;
      totProd += produtos[i].valor_total;
      totAliqCredICMS += produtos[i].p_aliquota_credito;
      totCredICMS += produtos[i].credito_icms_aproveitado;
      totPartilhaICMSDest += produtos[i].partilha_icms_valor_icms_uf_dest;
      totPartilhaICMSRem += produtos[i].partilha_icms_valor_icms_uf_ori;
      totFCPUFDest += produtos[i].partilha_icms_valor_fcp_uf_dest;
      totIPIDevolvido += produtos[i].ipi_vlr_devolvido;
      totFCP += produtos[i].fcp_valor;
      totFCPST += produtos[i].fcp_valor_st;
    }

    nfMethods.setValue('base_calc_icms', totBCICMS);
    nfMethods.setValue('total_icms', totICMS);
    nfMethods.setValue('base_icms_st', totBCICMSST);
    nfMethods.setValue('total_icms_st', totICMSST);
    nfMethods.setValue('total_ii', totII);
    nfMethods.setValue('total_ipi', totIPI);
    nfMethods.setValue('total_pis', totPIS);
    nfMethods.setValue('total_cofins', totCOFINS);
    nfMethods.setValue('total_desconto', totDesc);
    nfMethods.setValue('total_produtos', totProd);
    nfMethods.setValue('aliquota_credito', totAliqCredICMS);
    nfMethods.setValue('valor_credito', totCredICMS);
    nfMethods.setValue('partilha_icms_dest', totPartilhaICMSDest);
    nfMethods.setValue('partilha_icms_rem', totPartilhaICMSRem);
    nfMethods.setValue('fcp_uf_dest', totFCPUFDest);
    nfMethods.setValue('total_ipi_devolvido', totIPIDevolvido);
    nfMethods.setValue('total_fcp', totFCP);
    nfMethods.setValue('total_fcp_st', totFCPST);
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
