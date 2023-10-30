import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { useModalNotaFiscal } from '../../../../../Contexts/Modal/NotaFiscal/NotaFiscalContext';
import { ApiException } from '../../../../../services/api/ApiException';
import { ICFOP, ICFOPService } from '../../../../../services/api/cfop/CFOPService';
import { ConfigService } from '../../../../../services/api/config/ConfigService';
import { INFDuplicata, NFDupliService } from '../../../../../services/api/notafiscal/NFDuplicata';
import {
  INFFormaPagto,
  NFPagtoService,
} from '../../../../../services/api/notafiscal/NFFormaPagto';
import {
  INFProduct,
  NFProdutoService,
} from '../../../../../services/api/notafiscal/NFProduct';
import { INFReferenciada, NFRefService } from '../../../../../services/api/notafiscal/NFReferenciada';
import {
  INotaFiscal,
  NotaFiscalService,
} from '../../../../../services/api/notafiscal/NotaFiscalService';
import { userInfos } from '../../../../../utils/header';
import { FormDadosPrincipais } from './components/Dados Principais/FormDadosPrincipais';
import { FormInfoAdicional } from './components/FormInfoAdicional';
import { FormOutros } from './components/FormOutros';
import { FormTotais } from './components/Totais/FormTotais';
import { FormFormaPagto } from './components/FormaPagto/FormFormaPagto';
import { FormNFRef } from './components/NFRef/FormNFRef';
import { FormProdutos } from './components/Produtos/FormProdutos';
import { FormTransporte } from './components/Transporte/FormTransporte';
import { lpad, regex } from '../../../../../utils/formatarCnpjCpf';

interface ModalNotaFiscalProps {
  id: number;
  isEditing: boolean;
  model: string;
  setIsEditing: (value: boolean) => void;
  getNF: (description: string) => void;
}

export function ModalNotaFiscal({isEditing, setIsEditing, id, getNF, model}: ModalNotaFiscalProps) {
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
    if (isOpen === true) {
      setCurrentTab(0);
      ICFOPService.get(idEmissorSelecionado, HEADERS).then((result) => {
        if (result instanceof ApiException) console.log(result.message);
        else {
          if (result.length > 0) {
            setCfops(result);

            if (!isEditing) {
              methods.setValue('natureza_operacao', result[0].natureza);
              methods.setValue('cfop', result[0].cfop_dentro);
            }
          }
        } 
      });

      if (isEditing) {
        setFormaPagto(methods.getValues('forma_pagto'));
        setDuplicatas(methods.getValues('duplicata'));
        setChavesRef(methods.getValues('chaves_ref'));
        setProdutos(methods.getValues('produtos'));
      } else {
        ConfigService.getByEmissor(idEmissorSelecionado, HEADERS).then((result) => {
          if (result !== null && result !== undefined) {
            if (result.serie_padrao.length > 0) {
              methods.setValue('serie', parseInt(result.serie_padrao));
              getCod(parseInt(result.serie_padrao));
            }
          }
        });
      }
    }
  }, [isOpen]);

  const getCod = async (serie: number) => {
    NotaFiscalService.getLastCod(idEmissorSelecionado, serie, HEADERS).then((result) => {
      if (result === null || result === undefined) methods.setValue('cod', '0001');
      else {
        if (regex.test(result)) methods.setValue('cod', lpad((parseInt(result) + 1).toString()));
        else methods.setValue('cod', '');
      }
    });
  };

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

    onClose();
  };

  const hasErrors = () => {
    const camposObrigatorios: any[] = ['cod', 'serie', 'natureza_operacao', 'cfop'];
    const cliente = methods.getValues('destinatario');

    if (cliente.razao.length == 0 && model === '55') {
      setCurrentTab(0);
      setTimeout(() => {
        methods.setFocus('destinatario.razao');
      }, 100);
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
        case camposObrigatorios[0]: 
          setCurrentTab(0);
          msg = 'Está faltando preencher o CÓDIGO da NFe.';
          setTimeout(() => {
            methods.setFocus(camposObrigatorios[0]);
          }, 100);
          break;
        case camposObrigatorios[1]: 
          setCurrentTab(0);
          msg = 'Está faltando preencher a SÉRIE da NFe.';
          setTimeout(() => {
            methods.setFocus(camposObrigatorios[1]);
          }, 100);
          break;
        case camposObrigatorios[2]: 
          setCurrentTab(0);
          msg = 'Está faltando selecionar a NATUREZA DE OPERAÇÃO da NFe.';
          setTimeout(() => {
            methods.setFocus(camposObrigatorios[2]);
          }, 100);
          break;
        case camposObrigatorios[3]: 
          setCurrentTab(0);
          msg = 'Está faltando preencher o CFOP da NFe.';
          setTimeout(() => {
            methods.setFocus(camposObrigatorios[3]);
          }, 100);
          break;
        }

        toast({
          position: 'top',
          description: msg,
          status: 'error',
          duration: 4000,
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
    data.modelo = parseInt(model);

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
    getNF('');
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
    getNF('');
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

  const shareCFOP = async () => {
    const cfop = methods.getValues('cfop');

    if (produtos.length > 0) {
      for (const element of produtos) {
        element.produto.cfop = cfop;
      }
  
      toast({
        position: 'top',
        description: `O CFOP ${cfop} foi aplicado em todos os produtos.`,
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
      size="6xl"
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>
            {
              model === '55' ? 'Cadastro NFe' : 'Cadastro de NFCe'
            }
          </ModalHeader>
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
                  <FormDadosPrincipais 
                    cfops={cfops}
                    shareCFOP={shareCFOP}
                  />
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
              <Button type="submit" variant='solid' colorScheme="green" disabled={methods.getValues('status') != 'Em digitação' || formSubmitted}>
                <Icon as={FiCheck} mr={2} />
                Salvar
              </Button>
              <Button onClick={clearData}><Icon as={FiSlash} mr={2}/>Fechar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
