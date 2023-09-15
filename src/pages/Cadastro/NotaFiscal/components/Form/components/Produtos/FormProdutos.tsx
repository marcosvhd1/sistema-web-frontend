import { Button, Flex, Icon, Td, Tr, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { useAlertNFProductContext } from '../../../../../../../Contexts/AlertDialog/NotaFiscal/AlertNFProductContext';
import { useModalNFProduct } from '../../../../../../../Contexts/Modal/NotaFiscal/NFProductContext';
import { ActionButton } from '../../../../../../../components/Form/ActionButton';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { DeleteAlertDialog } from '../../../../../../../components/Utils/DeleteAlertDialog';
import { INFProduct } from '../../../../../../../services/api/notafiscal/NFProduct';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import formatMoney from '../../../../../../../utils/formatarValor';
import { ModalNFProduct } from './ModalNFProduct';
import { useModalNFProductCST } from '../../../../../../../Contexts/Modal/NotaFiscal/NFProductCSTContext';
import { ModalNFProductCST } from './ModalNFProductCST';

interface FormProdutosProps {
  produtos: INFProduct[],
  addProduto: (forma: INFProduct[]) => void
  calcTotalNota: () => void
}

export function FormProdutos({ produtos, addProduto, calcTotalNota }: FormProdutosProps) {
  const methods = useForm<INFProduct>();
  const nfMethods = useFormContext<INotaFiscal>();

  const [prodToDelete, setProdToDelete] = useState<INFProduct>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { onOpen: openModal } = useModalNFProduct();
  const { onOpen: openModalCST } = useModalNFProductCST();
  const { onOpen, onClose, isOpen } = useAlertNFProductContext();

  const toast = useToast();

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
    calcTotalNota();
  };

  const handleEditProduct = (data: INFProduct, index: number) => {
    produtos[index] = data;
    saveChanges();
  };

  const handleDeleteProd = () => {
    const newArray = produtos.filter(prod => prod !== prodToDelete);
    produtos = [];
    produtos = newArray;
    addProduto(newArray);
    onClose();
    saveChanges();
    calcTotalNota();
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
    let totDescProd = 0;
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
      if (produtos[i].produto.base_icms !== undefined) {
        if (produtos[i].produto.base_icms.toString().length > 0) {
          totBCICMS += parseFloat(`${produtos[i].produto.base_icms}`);
        }
      }

      if (produtos[i].valor_icms !== undefined) {
        if (produtos[i].valor_icms.toString().length > 0) {
          totICMS += parseFloat(`${produtos[i].valor_icms}`);
        }
      }

      if (produtos[i].base_icms_st !== undefined) {
        if (produtos[i].base_icms_st.toString().length > 0) {
          totBCICMSST += parseFloat(`${produtos[i].base_icms_st}`);
        }
      }

      if (produtos[i].valor_icms_st !== undefined) {
        if (produtos[i].valor_icms_st.toString().length > 0) {
          totICMSST += parseFloat(`${produtos[i].valor_icms_st}`);
        }
      }

      if (produtos[i].valor_ii !== undefined) {
        if (produtos[i].valor_ii.toString().length > 0) {
          totII += parseFloat(`${produtos[i].valor_ii}`);
        }
      }

      if (produtos[i].valor_ipi !== undefined) {
        if (produtos[i].valor_ipi.toString().length > 0) {
          totIPI += parseFloat(`${produtos[i].valor_ipi}`);
        }
      }

      if (produtos[i].valor_pis !== undefined) {
        if (produtos[i].valor_pis.toString().length > 0) {
          totPIS += parseFloat(`${produtos[i].valor_pis}`);
        }
      }
      
      if (produtos[i].valor_cofins !== undefined) {
        if (produtos[i].valor_cofins.toString().length > 0) {
          totCOFINS += parseFloat(`${produtos[i].valor_cofins}`);
        }
      }

      if (produtos[i].desconto_total !== undefined) {
        if (produtos[i].desconto_total.toString().length > 0) {
          totDescProd += parseFloat(`${produtos[i].desconto_total}`);
        }
      }

      if (produtos[i].valor_total !== undefined) {
        if (produtos[i].valor_total.toString().length > 0) {
          totProd += parseFloat(`${produtos[i].valor_total}`);
        }
      }

      if (produtos[i].p_aliquota_credito !== undefined) {
        if (produtos[i].p_aliquota_credito.toString().length > 0) {
          totAliqCredICMS += parseFloat(`${produtos[i].p_aliquota_credito}`);
        }
      }
      
      if (produtos[i].credito_icms_aproveitado !== undefined) {
        if (produtos[i].credito_icms_aproveitado.toString().length > 0) {
          totCredICMS += parseFloat(`${produtos[i].credito_icms_aproveitado}`);
        }
      }

      if (produtos[i].partilha_icms_valor_icms_uf_dest !== undefined) {
        if (produtos[i].partilha_icms_valor_icms_uf_dest.toString().length > 0) {
          totPartilhaICMSDest += parseFloat(`${produtos[i].partilha_icms_valor_icms_uf_dest}`);
        }
      }
      
      if (produtos[i].partilha_icms_valor_icms_uf_ori !== undefined) {
        if (produtos[i].partilha_icms_valor_icms_uf_ori.toString().length > 0) {
          totPartilhaICMSRem += parseFloat(`${produtos[i].partilha_icms_valor_icms_uf_ori}`);
        }
      }

      if (produtos[i].partilha_icms_valor_fcp_uf_dest !== undefined) {
        if (produtos[i].partilha_icms_valor_fcp_uf_dest.toString().length > 0) {
          totFCPUFDest += parseFloat(`${produtos[i].partilha_icms_valor_fcp_uf_dest}`);
        }
      }

      if (produtos[i].ipi_vlr_devolvido !== undefined) {
        if (produtos[i].ipi_vlr_devolvido.toString().length > 0) {
          totIPIDevolvido += parseFloat(`${produtos[i].ipi_vlr_devolvido}`);
        }
      }

      if (produtos[i].fcp_valor !== undefined) {
        if (produtos[i].fcp_valor.toString().length > 0) {
          totFCP += parseFloat(`${produtos[i].fcp_valor}`);
        }
      }

      if (produtos[i].fcp_valor_st !== undefined) {
        if (produtos[i].fcp_valor_st.toString().length > 0) {
          totFCPST += parseFloat(`${produtos[i].fcp_valor_st}`);
        }
      }
    }

    nfMethods.setValue('base_calc_icms', totBCICMS);
    nfMethods.setValue('total_icms', totICMS);
    nfMethods.setValue('base_icms_st', totBCICMSST);
    nfMethods.setValue('total_icms_st', totICMSST);
    nfMethods.setValue('total_ii', totII);
    nfMethods.setValue('total_ipi', totIPI);
    nfMethods.setValue('total_pis', totPIS);
    nfMethods.setValue('total_cofins', totCOFINS);
    nfMethods.setValue('total_desconto_produtos', totDescProd);
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

  const shareCST = async (value: string) => {
    if (produtos.length > 0) {
      const updatedData = produtos.map(element => ({
        ...element,
        produto: {
          ...element.produto,
          cst_icms: value
        }
      }));
  
      addProduto(updatedData);
  
      toast({
        position: 'top',
        description: `O CST/CSOSN ${value} foi aplicado em todos os produtos.`,
        status: 'success',
        duration: 3000,
      }); 
    } else {
      toast({
        position: 'top',
        description: 'A NFe não possui produtos.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      }); 
    }
  };

  const headers: { key: string, label: string }[] = [
    { key: 'nprod', label: 'Código' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'ncm', label: 'NCM' },
    { key: 'cfop', label: 'CFOP' },
    { key: 'cst_icms', label: 'CST / CSOSN' },
    { key: 'un', label: 'UN' },
    { key: 'quantidade', label: 'Quantidade' },
    { key: 'valor_unitario', label: 'Valor Unitário' },
    { key: 'valor_total', label: 'Valor Total' },
  ];

  return (
    <FormProvider {...methods}>
      <Flex w="100%" justify="center" align="center" direction="column" >
        <Flex w="100%" justify="space-between" align="center" mt={2}>
          <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="outline" colorScheme="green" onClick={openModalCST}>
            <Icon mr={2} as={FiEdit} />
            CST
          </Button>
          <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue" onClick={openModalAdd}>
            <Icon mr={2} as={MdAdd} />
            Adicionar
          </Button>
        </Flex>
        <DataTable 
          mt="5"
          width='100%'
          trailing={false}
          headers={headers} 
        >
          {produtos !== undefined ? produtos.map((data, index) => (
            <Tr key={uuidv4()}>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.nprod}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.descricao}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.ncm}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.cfop}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.cst_icms}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.produto.un}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.quantidade}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{'R$ ' + formatMoney(data.valor_unitario)}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{'R$ ' + formatMoney(data.valor_total)}</Td>
              <Td style={{ 'textAlign': 'center' }}>
                <ActionButton 
                  label='Editar'
                  colorScheme='orange'
                  action={() => openModalEdit(index)}
                  icon={FiEdit}
                />
                <ActionButton 
                  label='Excluir'
                  colorScheme='red'
                  action={() => openAlertDeleteProd(data)}
                  icon={FiTrash2}
                />
              </Td>
            </Tr>
          )) : ''}
        </DataTable>
        <ModalNFProductCST shareCST={shareCST} />
        <ModalNFProduct addProduct={handleAddProduct} editProduct={handleEditProduct} index={currentIndex} isEditing={isEditing} setIsEditing={setIsEditing}/>
        <DeleteAlertDialog label="Produto" deleteFunction={handleDeleteProd} onClose={onClose} isOpen={isOpen} id={0}/>
      </Flex>
    </FormProvider>
  );
}
