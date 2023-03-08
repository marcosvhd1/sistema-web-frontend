import { Button, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { FormProvider, useFormContext } from 'react-hook-form';
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

interface ModalNotaFiscalProps {
  isEditing: boolean
  id: number
  getNF: (description: string) => void
}

export function ModalNotaFiscal({ isEditing, id, getNF}: ModalNotaFiscalProps) {
  const toast = useToast();
  const methods = useFormContext<INotaFiscal>();
  const { isOpen, onClose } = useModalNotaFiscal();
  const { idEmissorSelecionado } = useEmissorContext();
  
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const submitData = (data: INotaFiscal) => {
    if (isEditing)
      handleUpdateNF(data);
    else
      handleCreateNF(data);
  };

  const handleCreateNF = (data: INotaFiscal) => {
    data.id_emissor = idEmissorSelecionado;
    if (data.destinatario === null || data.destinatario == undefined) {
      toast({
        position: 'top',
        title: 'Erro ao cadastrar.',
        description: 'A nota precisa de um destinatário',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      NotaFiscalService.create(data, HEADERS)
        .then((result) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            onClose();
            getNF('');
          }
        });
    }
  };

  const handleUpdateNF = (data: INotaFiscal) => {
    NotaFiscalService.updateById(id, data, HEADERS)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          onClose();
          getNF('');
        }
      });
  };

  const handleTabChange = (tab: number) => {
    if (tab === 3) {
      calcTotalNota();
    }
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
    // let totalServ = 0;
    let totalDescProd = 0;
    // let totalDescServ = 0;

    if (methods.getValues('total_produtos') !== undefined) {
      if (methods.getValues('total_produtos').toString().length > 0) {
        totalProdutos = parseFloat(`${methods.getValues('total_produtos')}`);
      }
    }

    if (methods.getValues('total_icms_st') !== undefined) {
      if (methods.getValues('total_icms_st').toString().length > 0) {
        totalICMSST = parseFloat(`${methods.getValues('total_icms_st')}`);
      }
    }

    if (methods.getValues('total_ipi') !== undefined) {
      if (methods.getValues('total_ipi').toString().length > 0) {
        totalIPI = parseFloat(`${methods.getValues('total_ipi')}`);
      }
    }

    if (methods.getValues('valor_seguro') !== undefined) {
      if (methods.getValues('valor_seguro').toString().length > 0) {
        valorSeguro = parseFloat(`${methods.getValues('valor_seguro')}`);
      }
    }

    if (methods.getValues('total_frete') !== undefined) {
      if (methods.getValues('total_frete').toString().length > 0) {
        totalFrete = parseFloat(`${methods.getValues('total_frete')}`);
      }
    }

    if (methods.getValues('outras_despesas') !== undefined) {
      if (methods.getValues('outras_despesas').toString().length > 0) {
        outrasDesp = parseFloat(`${methods.getValues('outras_despesas')}`);
      }
    }

    if (methods.getValues('total_ii') !== undefined) {
      if (methods.getValues('total_ii').toString().length > 0) {
        totalII = parseFloat(`${methods.getValues('total_ii')}`);
      }
    }

    if (methods.getValues('total_ipi_devolvido') !== undefined) {
      if (methods.getValues('total_ipi_devolvido').toString().length > 0) {
        totalIPIDevolvido = parseFloat(`${methods.getValues('total_ipi_devolvido')}`);
      }
    }

    // if (methods.getValues('total_servicos') !== undefined) {
    //   if (methods.getValues('total_servicos').toString().length > 0) {
    //     totalServ = parseFloat(`${methods.getValues('total_servicos')}`);
    //   }
    // }

    if (methods.getValues('total_desconto_produtos') !== undefined) {
      if (methods.getValues('total_desconto_produtos').toString().length > 0) {
        totalDescProd = parseFloat(`${methods.getValues('total_desconto_produtos')}`);
      }
    }

    // if (methods.getValues('total_desconto_servicos') !== undefined) {
    //   if (methods.getValues('total_desconto_servicos').toString().length > 0) {
    //     totalDescServ = parseFloat(`${methods.getValues('total_desconto_servicos')}`);
    //   }
    // }

    const totalGeral = (totalProdutos + totalICMSST + totalIPI + valorSeguro + totalFrete + outrasDesp + totalII + totalIPIDevolvido) - (totalDescProd);

    // methods.setValue('total_desconto_nf', (totalDescProd + totalDescServ));
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
                  {/* <Tab>Serviços</Tab> */}
                  <Tab>Totais</Tab>
                  <Tab>Formas de Pagamento</Tab>
                  <Tab>Transporte</Tab>
                  <Tab>Informações Adicionais</Tab>
                  <Tab>Outros</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <FormDadosPrincipais />
                  </TabPanel>
                  <TabPanel>
                    <FormProdutos />
                  </TabPanel>
                  {/* <TabPanel>
                  <FormServicos />
                </TabPanel> */}
                  <TabPanel>
                    <FormTotais />
                  </TabPanel>
                  <TabPanel>
                    <FormFormaPagto />
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
                <Button colorScheme='red' variant="outline" onClick={onClose}><Icon as={FiSlash} mr={1} />Cancelar</Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </FormProvider>
  );
}
