import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { useModalNotaFiscal } from '../../../../../Contexts/Modal/NotaFiscal/NotaFiscalContext';
import { ApiException } from '../../../../../services/api/ApiException';
import { INotaFiscal, NotaFiscalService } from '../../../../../services/api/notafiscal/NotaFiscalService';
import { userInfos } from '../../../../../utils/header';
import { FormDadosPrincipais } from './components/Dados Principais/FormDadosPrincipais';
import { FormFormaPagto } from './components/FormaPagto/FormFormaPagto';
import { FormInfoAdicional } from './components/FormInfoAdicional';
import { FormOutros } from './components/FormOutros';
import { FormTotais } from './components/FormTotais';
import { FormProdutos } from './components/Produtos/FormProdutos';
import { FormTransporte } from './components/Transporte/FormTransporte';
import { INFFormaPagto, NFPagtoService } from '../../../../../services/api/notafiscal/NFFormaPagto';

interface ModalNotaFiscalProps {
  id: number
  isEditing: boolean
  setIsEditing: (value: boolean) => void,
  getNF: (description: string) => void
}

export function ModalNotaFiscal({ isEditing, setIsEditing, id, getNF}: ModalNotaFiscalProps) {
  const toast = useToast();
  const methods = useFormContext<INotaFiscal>();

  const { isOpen, onClose } = useModalNotaFiscal();
  const { idEmissorSelecionado } = useEmissorContext();

  const [formaPagtos, setFormaPagto] = useState<INFFormaPagto[]>([]);
  
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const clearData = () => {
    setFormaPagto([]);

    onClose();
    getNF('');
  };

  const submitData = (data: INotaFiscal) => {
    if (isEditing) 
      handleUpdateNF(data);
    else 
      handleCreateNF(data);
    
    clearData();
  };

  const handleCreateNF = async (data: INotaFiscal) => {
    data.id_emissor = idEmissorSelecionado;
    if (data.nome_destinatario === null || data.nome_destinatario == undefined) {
      toast({
        position: 'top',
        title: 'Erro ao cadastrar.',
        description: 'A nota precisa de um destinatário',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      const retorno = await NotaFiscalService.create(data, HEADERS);

      if (retorno instanceof ApiException) {
        console.log(retorno.message);
      } else {
        formaPagtos.forEach(async (element) => {
          element.id_nfe = retorno.id;
          await NFPagtoService.createNFPagto(element, HEADERS);
        });
      }
    }
  };

  const handleUpdateNF = async (data: INotaFiscal) => {
    const retorno = await NotaFiscalService.updateById(id, data, HEADERS);

    if (retorno instanceof ApiException) {
      console.log(retorno.message);
    } else {
      setIsEditing(false);

      await NFPagtoService.deleteNFPagtoById(id, HEADERS);

      formaPagtos.forEach(async (element) => {
        element.id_nfe = id;
        await NFPagtoService.createNFPagto(element, HEADERS);
      });
    }
  };

  const handleTabChange = (tab: number) => {
    if (tab === 2) {
      calcTotalNota();
    }
  };

  const verify = (value: any) => {
    if (value !== null && value !== undefined) {
      if (value.toString().length > 0) {
        return true;
      }
    }

    return false;
  };

  const calcTotalNota = () => {
    let totalProdutos = 0;
    let totalICMSST = 0;
    let totalIPI = 0;
    let valorSeguro = 0;
    let totalFrete = 0;
    let outrasDesp = 0;
    let totalII = 0;
    let totalIPIDevolvido = 0;
    let totalDescProd = 0;

    if (verify(methods.getValues('total_produtos'))) {
      totalProdutos = parseFloat(`${methods.getValues('total_produtos')}`);
    }

    if (verify(methods.getValues('total_icms_st'))) {
      totalICMSST = parseFloat(`${methods.getValues('total_icms_st')}`);
    }

    if (verify(methods.getValues('total_ipi'))) {
      totalIPI = parseFloat(`${methods.getValues('total_ipi')}`);
    }

    if (verify(methods.getValues('valor_seguro'))) {
      valorSeguro = parseFloat(`${methods.getValues('valor_seguro')}`);
    }

    if (verify(methods.getValues('total_frete'))) {
      totalFrete = parseFloat(`${methods.getValues('total_frete')}`);
    }

    if (verify(methods.getValues('outras_despesas'))) {
      outrasDesp = parseFloat(`${methods.getValues('outras_despesas')}`);
    }

    if (verify(methods.getValues('total_ii'))) {
      totalII = parseFloat(`${methods.getValues('total_ii')}`);
    }

    if (verify(methods.getValues('total_ipi_devolvido'))) {
      totalIPIDevolvido = parseFloat(`${methods.getValues('total_ipi_devolvido')}`);
    }

    if (verify(methods.getValues('total_desconto_produtos'))) {
      totalDescProd = parseFloat(`${methods.getValues('total_desconto_produtos')}`);
    }

    const totalGeral = (totalProdutos + totalICMSST + totalIPI + valorSeguro + totalFrete + outrasDesp + totalII + totalIPIDevolvido) - (totalDescProd);

    methods.setValue('total_desconto_nf', totalDescProd);
    methods.setValue('total_nota', parseFloat(totalGeral.toFixed(2)));
  };

  return (
    <FormProvider {...methods}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        motionPreset='slideInBottom'
        isCentered
        scrollBehavior="inside"
        size={{md: '6xl', lg: '6xl'}}
      >
        <ModalOverlay />
        <form onSubmit={methods.handleSubmit(submitData)}>
          <ModalContent>
            <ModalHeader>Nota Fiscal</ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody>
              <Tabs variant='enclosed' colorScheme="gray" w="100%" onChange={handleTabChange}>
                <TabList>
                  <Tab>Dados Principais</Tab>
                  <Tab>Produtos</Tab>
                  <Tab>Totais</Tab>
                  <Tab>Formas de Pagamento</Tab>
                  <Tab>Transporte</Tab>
                  <Tab>Informações Adicionais</Tab>
                  <Tab>Outros</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <FormDadosPrincipais isEditing={isEditing} setFormaPagto={setFormaPagto} />
                  </TabPanel>
                  <TabPanel>
                    <FormProdutos />
                  </TabPanel>
                  <TabPanel>
                    <FormTotais />
                  </TabPanel>
                  <TabPanel>
                    <FormFormaPagto addForma={setFormaPagto} formaPagtos={formaPagtos} isEditing={isEditing} />
                  </TabPanel>
                  <TabPanel>
                    <FormTransporte />
                  </TabPanel>
                  <TabPanel>
                    <FormInfoAdicional />
                  </TabPanel>
                  <TabPanel>  
                    <FormOutros />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Flex w="100%" justify="space-between" align="center"h="8vh">
                <Button variant='solid' colorScheme="green" type='submit'><Icon as={FiCheck} mr={1} />Salvar</Button>
                <Button colorScheme='red' variant="outline" onClick={clearData}><Icon as={FiSlash} mr={1} />Cancelar</Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </FormProvider>
  );
}
