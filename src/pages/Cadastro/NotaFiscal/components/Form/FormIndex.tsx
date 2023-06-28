import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { useModalNotaFiscal } from '../../../../../Contexts/Modal/NotaFiscal/NotaFiscalContext';
import { ApiException } from '../../../../../services/api/ApiException';
import {
  INotaFiscal,
  NotaFiscalService,
} from '../../../../../services/api/notafiscal/NotaFiscalService';
import { userInfos } from '../../../../../utils/header';
import { FormDadosPrincipais } from './components/Dados Principais/FormDadosPrincipais';
import { FormFormaPagto } from './components/FormaPagto/FormFormaPagto';
import { FormInfoAdicional } from './components/FormInfoAdicional';
import { FormOutros } from './components/FormOutros';
import { FormTotais } from './components/FormTotais';
import { FormProdutos } from './components/Produtos/FormProdutos';
import { FormTransporte } from './components/Transporte/FormTransporte';
import {
  INFFormaPagto,
  NFPagtoService,
} from '../../../../../services/api/notafiscal/NFFormaPagto';
import {
  INFProduct,
  NFProdutoService,
} from '../../../../../services/api/notafiscal/NFProduct';
import { INFDuplicata, NFDupliService } from '../../../../../services/api/notafiscal/NFDuplicata';
import { ConfigService } from '../../../../../services/api/config/ConfigService';
import { ICFOP, ICFOPService } from '../../../../../services/api/cfop/CFOPService';
import { INFReferenciada, NFRefService } from '../../../../../services/api/notafiscal/NFReferenciada';
import { FormNFRef } from './components/NFRef/FormNFRef';

interface ModalNotaFiscalProps {
  id: number;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  getNF: (description: string) => void;
}

export function ModalNotaFiscal({isEditing, setIsEditing, id, getNF}: ModalNotaFiscalProps) {
  const toast = useToast();
  const methods = useFormContext<INotaFiscal>();

  const { isOpen, onClose } = useModalNotaFiscal();
  const { idEmissorSelecionado } = useEmissorContext();

  const [currentTab, setCurrentTab] = useState(0);
  const [cfops, setCfops] = useState<ICFOP[]>([]);
  const [produtos, setProdutos] = useState<INFProduct[]>([]);
  const [formaPagtos, setFormaPagto] = useState<INFFormaPagto[]>([]);
  const [duplicatas, setDuplicatas] = useState<INFDuplicata[]>([]);
  const [chavesRef, setChavesRef] = useState<INFReferenciada[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    if (isEditing) setProdutos(methods.getValues('produtos'));
    if (isEditing) setFormaPagto(methods.getValues('forma_pagto'));
    if (isEditing) setDuplicatas(methods.getValues('duplicata'));
    if (isEditing) setChavesRef(methods.getValues('chaves_ref'));
  }, [isOpen]);

  useEffect(() => {
    if (isOpen === true && isEditing === false) {
      ConfigService.getByEmissor(idEmissorSelecionado, HEADERS).then((result) => {
        if (result !== null && result !== undefined) {
          if (result.serie_padrao.length > 0) methods.setValue('serie', parseInt(result.serie_padrao));
          else methods.setValue('serie', 0);
        }
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen === true) {
      ICFOPService.get(idEmissorSelecionado, HEADERS).then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          if (result.length > 0) {
            setCfops(result);

            if (!isEditing) {
              methods.setValue('natureza_operacao', result[0].natureza);
              methods.setValue('cfop', result[0].cfop_dentro);
            }
          }
        } 
      });
    }
  }, [isOpen]);

  const clearData = () => {
    const auxForma: INFFormaPagto[] = [];
    const auxDupli: INFDuplicata[] = [];
    const auxRef: INFReferenciada[] = [];
    const auxProd: INFProduct[] = [];

    setFormaPagto(auxForma);
    setDuplicatas(auxDupli);
    setChavesRef(auxRef);
    setProdutos(auxProd);
    setIsEditing(false);
    setFormSubmitted(false);

    getNF('');
    onClose();
  };

  const hasErrors = () => {
    const camposObrigatorios: any[] = ['cod', 'serie', 'natureza_operacao', 'cfop'];
    const cliente = methods.getValues('destinatario');

    if (cliente.razao.length == 0) {
      setCurrentTab(0);
      methods.setFocus('destinatario.razao');
      toast({
        position: 'top',
        description: 'Está faltando adicionar o DESTINATÁRIO.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return true;
    }
    
    if (produtos.length == 0) {
      setCurrentTab(1);
      toast({
        position: 'top',
        description: 'Está faltando adicionar os PRODUTOS.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return true;
    }

    if (formaPagtos.length == 0) {
      setCurrentTab(3);
      toast({
        position: 'top',
        description: 'Está faltando adicionar a FORMA DE PAGAMENTO.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return true;
    }

    for (const campo of camposObrigatorios) {
      if (methods.getValues(campo) === '') {
        let msg = '';

        switch (campo) {
        case 'cod': 
          msg = 'Está faltando preencher o CÓDIGO da NFe.';
          methods.setFocus('cod');
          break;
        case 'serie': 
          msg = 'Está faltando preencher a SÉRIE da NFe.';
          methods.setFocus('serie');
          break;
        case 'natureza_operacao': 
          msg = 'Está faltando selecionar a NATUREZA DE OPERAÇÃO da NFe.';
          methods.setFocus('natureza_operacao');
          break;
        case 'cfop': 
          msg = 'Está faltando preencher o CFOP da NFe.';
          methods.setFocus('cfop');
          break;
        }

        toast({
          position: 'top',
          description: msg,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return true;
      }
    }

    return false;
  };

  const submitData = (data: INotaFiscal) => {
    if (hasErrors()) return;

    setFormSubmitted(true);

    data.nome_destinatario = data.destinatario.razao;
    data.id_destinatario = `${data.destinatario.id}`;
    data.modelo = 55;

    if (isEditing) handleUpdateNF(data);
    else handleCreateNF(data);
  };

  const handleCreateNF = async (data: INotaFiscal) => {
    data.id_emissor = idEmissorSelecionado;
    
    const retorno = await NotaFiscalService.create(data, HEADERS);

    if (retorno instanceof ApiException) {
      console.log(retorno.message);
    } else {
      if (produtos.length > 0) {
        for (const element of produtos) {
          element.id_nfe = retorno.id;
          await NFProdutoService.create(element, HEADERS);
        }
      }

      if (formaPagtos.length > 0) {
        for (const element of formaPagtos) {
          element.id_nfe = retorno.id;
          await NFPagtoService.createNFPagto(element, HEADERS);
        }
      }

      if (duplicatas.length > 0) {
        for (const element of duplicatas) {
          element.id_nfe = retorno.id;
          await NFDupliService.createNFDupli(element, HEADERS);
        }
      }

      if (chavesRef.length > 0) {
        for (const element of chavesRef) {
          element.id_nfe = retorno.id;
          await NFRefService.createNFRef(element, HEADERS);
        }
      }
    }

    clearData();
  };

  const handleUpdateNF = async (data: INotaFiscal) => {
    const retorno = await NotaFiscalService.updateById(id, data, HEADERS);

    if (retorno instanceof ApiException) {
      console.log(retorno.message);
    } else {
      setIsEditing(false);

      await NFProdutoService.deleteNFProdByIDNF(id, HEADERS);
      await NFPagtoService.deleteNFPagtoById(id, HEADERS);
      await NFDupliService.deleteNFDupliById(id, HEADERS);
      await NFRefService.deleteNFRefById(id, HEADERS);

      for (const produto of produtos) {
        produto.id_nfe = id;
        await NFProdutoService.create(produto, HEADERS);
      }

      for (const forma of formaPagtos) {
        forma.id_nfe = id;
        await NFPagtoService.createNFPagto(forma, HEADERS);
      }

      for (const duplicata of duplicatas) {
        duplicata.id_nfe = id;
        await NFDupliService.createNFDupli(duplicata, HEADERS);
      }

      for (const chave of chavesRef) {
        chave.id_nfe = id;
        await NFRefService.createNFRef(chave, HEADERS);
      }
    }

    clearData();
  };

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
    if (index == 2) calcTotalNota();
  };

  const verify = (value: any) => {
    if (value !== null && value !== undefined) {
      if (value.toString().length > 0) {
        return true;
      }
    }

    return false;
  };

  const calcTotalNota = async () => {
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
      totalIPIDevolvido = parseFloat(
        `${methods.getValues('total_ipi_devolvido')}`
      );
    }

    if (verify(methods.getValues('total_desconto_produtos'))) {
      totalDescProd = parseFloat(
        `${methods.getValues('total_desconto_produtos')}`
      );
    }

    const totalGeral =
      totalProdutos +
      totalICMSST +
      totalIPI +
      valorSeguro +
      totalFrete +
      outrasDesp +
      totalII +
      totalIPIDevolvido -
      totalDescProd;

    methods.setValue('total_desconto_nf', totalDescProd);
    methods.setValue('total_nota', parseFloat(totalGeral.toFixed(2)));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
      isCentered
      scrollBehavior="inside"
      size={{ md: '6xl', lg: '6xl' }}
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>
            <Flex w="100%" justify="center" align="center">
              <Text>Nota Fiscal</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton onClick={clearData} />
          <ModalBody>
            <Tabs
              index={currentTab}
              variant="enclosed"
              colorScheme="gray"
              w="100%"
              onChange={handleTabChange}
            >
              <TabList>
                <Tab>Dados Principais</Tab>
                <Tab>Produtos</Tab>
                <Tab>Totais</Tab>
                <Tab>Formas de Pagto</Tab>
                <Tab>Transporte</Tab>
                <Tab>Info Adicional</Tab>
                <Tab>Chaves Referenciadas</Tab>
                <Tab>Outros</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormDadosPrincipais isEditing={isEditing} cfops={cfops} />
                </TabPanel>
                <TabPanel>
                  <FormProdutos
                    produtos={produtos}
                    addProduto={setProdutos}
                    calcTotalNota={calcTotalNota}
                  />
                </TabPanel>
                <TabPanel>
                  <FormTotais 
                    calcTotal={calcTotalNota}
                  />
                </TabPanel>
                <TabPanel>
                  <FormFormaPagto
                    addForma={setFormaPagto}
                    formaPagtos={formaPagtos}
                    duplicatas={duplicatas}
                    addDuplicata={setDuplicatas}
                  />
                </TabPanel>
                <TabPanel>
                  <FormTransporte />
                </TabPanel>
                <TabPanel>
                  <FormInfoAdicional />
                </TabPanel>
                <TabPanel>
                  <FormNFRef
                    addChave={setChavesRef}
                    chaves={chavesRef}
                  />
                </TabPanel>
                <TabPanel>
                  <FormOutros />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between" align="flex-end">
              <Button variant="solid" colorScheme="green" type="submit" disabled={methods.getValues('status') == 'Emitida' || formSubmitted}>
                <Icon as={FiCheck} mr={1} />
                {isEditing ? 'Editar' : 'Cadastrar'}
              </Button>
              <Button colorScheme="red" variant="outline" onClick={clearData}>
                <Icon as={FiSlash} mr={1} />
                  Cancelar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
