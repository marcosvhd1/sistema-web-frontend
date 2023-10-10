import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, Menu, MenuButton, MenuItem, MenuList, Tag, Td, Tr, useColorMode, useToast } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiEdit, FiFile, FiFilePlus, FiMail, FiPrinter, FiSend, FiSlash, FiTrash2 } from 'react-icons/fi';

import { MdMenu } from 'react-icons/md';
import { useAlertEmitirNFContext } from '../../../Contexts/AlertDialog/NotaFiscal/AlertEmitirNFContext';
import { useAlertNotaFiscalContext } from '../../../Contexts/AlertDialog/NotaFiscal/AlertNotaFiscalContext';
import { useContadorContext } from '../../../Contexts/ContadorContext';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { useModalNotaFiscal } from '../../../Contexts/Modal/NotaFiscal/NotaFiscalContext';
import { useModalNFCCe } from '../../../Contexts/Modal/NotaFiscal/Sefaz/NFCCeContext';
import { useModalNFCancelar } from '../../../Contexts/Modal/NotaFiscal/Sefaz/NFCancelarContext';
import { ActionButton } from '../../../components/Form/ActionButton';
import MainContent from '../../../components/MainContent';
import { DataTable } from '../../../components/Table/DataTable';
import { Pagination } from '../../../components/Table/Pagination';
import { TdCustom } from '../../../components/Table/TdCustom';
import { DeleteAlertDialog } from '../../../components/Utils/DeleteAlertDialog';
import { ApiException } from '../../../services/api/ApiException';
import { ClientService } from '../../../services/api/clientes/ClientService';
import { NFDupliService } from '../../../services/api/notafiscal/NFDuplicata';
import { NFPagtoService } from '../../../services/api/notafiscal/NFFormaPagto';
import { INFProduct, NFProdutoService } from '../../../services/api/notafiscal/NFProduct';
import { NFRefService } from '../../../services/api/notafiscal/NFReferenciada';
import { INotaFiscal, NotaFiscalService } from '../../../services/api/notafiscal/NotaFiscalService';
import { IProduct, ProductService } from '../../../services/api/produtos/ProductService';
import { SefazService } from '../../../services/api/sefaz/SefazService';
import { TransportadoraService } from '../../../services/api/transportadora/TransportadoraService';
import formatMoney from '../../../utils/formatarValor';
import { userInfos } from '../../../utils/header';
import { ModalNotaFiscal } from './components/Form/FormIndex';
import { ModalCCe } from './components/ModalCCe';
import { ModalCancelar } from './components/ModalCancelar';
import { SearchBox } from './components/SearchBox';
import { ModalEmail } from './components/Email/ModalEmail';
import { useModalEmail } from '../../../Contexts/Modal/EmailContext';

const headers: { key: string; label: string }[] = [
  { key: 'cod', label: 'Nº da nota' },
  { key: 'serie', label: 'Série' },
  { key: 'data_emissao', label: 'Emissão' },
  { key: 'natureza_operacao', label: 'Natureza de Operação' },
  { key: 'nome_destinatario', label: 'Destinatário' },
  { key: 'status', label: 'Status' },
  { key: 'total_nota', label: 'Valor Total' },
];

export function NotaFiscal() {
  const methods = useForm<INotaFiscal>();
  const { colorMode } = useColorMode();

  const [orderBy, setOrderBy] = useState<string>('cod');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');

  const [id, setId] = useState<number>(0);
  const [data, setData] = useState<INotaFiscal[]>([]);
  const [dataToModal, setDataToModal] = useState<INotaFiscal>();
  
  const [filter, setFilter] = useState<string>('cod');
  const [description, setDescription] = useState<string>('');
  const [filterByStatus, setFilterByStatus] = useState<string>('');
  const [filterByDate, setFilterByDate] = useState<string>('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNotas, setTotalNotas] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  
  const [prods, setProds] = useState<INFProduct[]>([]);

  const { getNFDigitacao } = useContadorContext();
  const { idEmissorSelecionado } = useEmissorContext();
  const { onOpen: openAlertEmitir, onClose: onCloseEmitir, isOpen: isOpenEmitir } = useAlertEmitirNFContext();
  const { onOpen: openAlert, onClose, isOpen } = useAlertNotaFiscalContext();
  const { onOpen: openEmail } = useModalEmail();
  const { onOpen: openCancelar } = useModalNFCancelar();
  const { onOpen: openCCe } = useModalNFCCe();
  const { onOpen } = useModalNotaFiscal();

  const navigate = useNavigate();
  const toast = useToast();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    navigate(`?page=${currentPage}&limit=${limitRegistros}`);
  }, [currentPage, limitRegistros, totalNotas]);

  useEffect(() => {
    getNF('');
    handleChangeTotalPage();
  }, [currentPage, limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalNotas]);

  useEffect(() => {
    getNF(description);
  }, [orderBy, orderDirection]);

  const handleChangeOrder = (columnName: string) => {
    if (columnName === orderBy) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(columnName);
      setOrderDirection('asc');
    }
  };

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalNotas / limitRegistros);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
  };

  const handleOpenDialogEmitir = (id: number) => {
    openAlertEmitir();
    setId(id);
  };

  const handleOpenDialog = (id: number) => {
    openAlert();
    setId(id);
  };

  const handleOpenModalCancelar = (nota: INotaFiscal) => {
    openCancelar();
    setDataToModal(nota);
  };

  const handleOpenModalEmail = (id: string) => {
    openEmail();
    setId(parseInt(id));
  };

  const handleOpenModalCCe = (nota: INotaFiscal) => {
    openCCe();
    setDataToModal(nota);
  };

  const handleImprimir = (nota: INotaFiscal) => {
    if (nota.caminho_pdf == null) {
      SefazService.preview(nota.id, idEmissorSelecionado, HEADERS).then((response) => {
        if (response.type == 'success') window.open(response.caminhoPDF, '_blank');
        
      });
    } else window.open(nota.caminho_pdf, '_blank');
  };

  const handleImprimirCCe = (nota: INotaFiscal) => {
    if (nota.caminho_pdf_cce != null) {
      window.open(nota.caminho_pdf_cce, '_blank');
    } else {
      toast({
        position: 'top',
        description: 'Nenhuma CCe vinculada a NFe',
        status: 'error',
        duration: 5000,
      });
    }
  };

  const formatDate = (date: string) => {
    const aux = date.split('-');
    return `${aux[2]}/${aux[1]}/${aux[0]}`;
  };

  const getNF = (desc: string) => {
    setIsLoading(true);
    setDescription(desc);
    NotaFiscalService.getNFByFilter(
      currentPage,
      limitRegistros,
      filter,
      filterByStatus,
      filterByDate,
      desc,
      orderBy, 
      orderDirection,
      startDate,
      endDate,
      idEmissorSelecionado,
      HEADERS
    ).then((result: any) => {
      if (result instanceof ApiException) {
        console.log(result.message);
      } else {
        setData(result.data);
        setTotalNotas(parseInt(result.headers['qtd']));
        getNFDigitacao();
      }
      
      setIsLoading(false);
    });
  };

  const handleEditNF = async (idNf: number) => {
    const nfToUpdate = data.find((prod) => prod.id === idNf);

    if (nfToUpdate) {
      methods.reset(nfToUpdate);

      const aux: INFProduct[] = [];
      setProds(aux);

      //Carrega o cliente da nota
      await ClientService.getClientsByFilter(currentPage, limitRegistros, 'id', nfToUpdate.id_destinatario, 'cod', 'desc', idEmissorSelecionado, HEADERS)
        .then((result: any) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            methods.setValue('destinatario', result.data[0]);
          }
        });

      //Carrega a transportadora da nota
      await TransportadoraService.getTransportadoraByFilter(currentPage, limitRegistros, 'id', nfToUpdate.id_transportadora, 'cod', 'desc', idEmissorSelecionado, HEADERS)
        .then((result: any) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            methods.setValue('transportadora',result.data[0]);
          }
        });

      //Carrega os produtos da nota
      await NFProdutoService.getNFProdByNF(idNf, HEADERS).then(
        async (result: any) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            for (const element of result.data) {
              const prod = await ProductService.getProductByID(element.id_produto, HEADERS);

              if (prod instanceof ApiException) {
                console.log(prod.message);
              } else {
                prod.descricao = element.descricao;
                prod.codbarras = element.codbarras;
                prod.cfop = element.cfop;
                prod.cest = element.cest;
                prod.ncm = element.ncm;
                prod.un = element.un;
                
                prod.aliquota_cofins = element.aliquota_cofins;
                prod.aliquota_icms = element.aliquota_icms;
                prod.aliquota_ipi = element.aliquota_ipi;
                prod.aliquota_pis = element.aliquota_pis;
                prod.cst_cofins = element.cst_cofins;
                prod.base_icms = element.base_icms;
                prod.cst_icms = element.cst_icms;
                prod.cst_ipi = element.cst_ipi;
                prod.cst_pis = element.cst_pis;

                const NFprod: INFProduct = {
                  id: element.id,
                  id_nfe: element.id_nfe,
                  produto: prod as IProduct,
                  quantidade: element.quantidade,
                  valor_unitario: element.valor_unitario,
                  valor_total: element.valor_total,
                  desconto_p: element.desconto_p,
                  desconto_total: element.desconto_total,
                  p_reducao_base_icms: element.p_reducao_base_icms,
                  valor_icms: element.valor_icms,
                  p_aliquota_credito: element.p_aliquota_credito,
                  credito_icms_aproveitado: element.credito_icms_aproveitado,
                  mod_det_bc_icms: element.mod_det_bc_icms,
                  mod_det_bc_icms_st: element.mod_det_bc_icms_st,
                  p_margem_vlr_adc_icms_st: element.p_margem_vlr_adc_icms_st,
                  p_reducao_base_icms_st: element.p_reducao_base_icms_st,
                  base_icms_st: element.base_icms_st,
                  aliquota_icms_st: element.aliquota_icms_st,
                  valor_icms_st: element.valor_icms_st,
                  base_calc_retido_ant: element.base_calc_retido_ant,
                  icms_st_retido_ant: element.icms_st_retido_ant,
                  ean: element.ean,
                  pedido_compra: element.pedido_compra,
                  item: element.item,
                  base_calc_ipi: element.base_calc_ipi,
                  valor_ipi: element.valor_ipi,
                  cnpj_produtor: element.cnpj_produtor,
                  base_calc_ii: element.base_calc_ii,
                  desp_aduaneiras: element.desp_aduaneiras,
                  valor_iof: element.valor_iof,
                  valor_ii: element.valor_ii,
                  base_calc_pis: element.base_calc_pis,
                  valor_pis: element.valor_pis,
                  base_calc_cofins: element.base_calc_cofins,
                  valor_cofins: element.valor_cofins,
                  ipi_p_devolvida: element.ipi_p_devolvida,
                  ipi_vlr_devolvido: element.ipi_vlr_devolvido,
                  fcp_p: element.fcp_p,
                  fcp_valor: element.fcp_valor,
                  fcp_base_calc: element.fcp_base_calc,
                  fcp_base_calc_st: element.fcp_base_calc_st,
                  fcp_p_st: element.fcp_p_st,
                  fcp_valor_st: element.fcp_valor_st,
                  partilha_icms_base_calc: element.partilha_icms_base_calc,
                  partilha_icms_aliquota_fcp_uf_dest: element.partilha_icms_aliquota_fcp_uf_dest,
                  partilha_icms_valor_fcp_uf_dest: element.partilha_icms_valor_fcp_uf_dest,
                  partilha_icms_aliquota_interna_icms_uf_dest: element.partilha_icms_aliquota_interna_icms_uf_dest,
                  partilha_icms_aliquota_icms_interestadual: element.partilha_icms_aliquota_icms_interestadual,
                  partilha_icms_p_partilha: element.partilha_icms_p_partilha,
                  partilha_icms_valor_icms_uf_dest: element.partilha_icms_valor_icms_uf_dest,
                  partilha_icms_valor_icms_uf_ori: element.partilha_icms_valor_icms_uf_ori,
                  cod_anp: element.cod_anp,
                  descricao_anp: element.descricao_anp,
                  uf_consumo: element.uf_consumo,
                };
  
                prods.push(NFprod);
              }
            }
            methods.setValue('produtos', prods);
          }
        }
      );

      // Carrega as formas de pagto da nota
      await NFPagtoService.getNFPagtoByNF(idNf, HEADERS)
        .then((result: any) => {
          if (result instanceof ApiException) console.log(result.message);
          else methods.setValue('forma_pagto', result.data);
        });

      // Carrega as duplicatas da nota
      await NFDupliService.getNFDupliByNF(idNf, HEADERS)
        .then((result: any) => {
          if (result instanceof ApiException) console.log(result.message);
          else methods.setValue('duplicata', result.data);
        });

      // Carrega as chaves de acesso da nota
      await NFRefService.getNFRefByNF(idNf, HEADERS)
        .then((result: any) => {
          if (result instanceof ApiException) console.log(result.message);
          else methods.setValue('chaves_ref', result.data);
        });

      onOpen();
      setIsEditing(true);
      setId(idNf);
    }
  };

  const handleDeleteNF = (nfId: number) => {
    NotaFiscalService.deleteById(nfId, idEmissorSelecionado, HEADERS).then(
      (result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: 'Nota excluída com sucesso.',
            status: 'success',
            duration: 2000,
          });
          getNF('');
          setTotalNotas(totalNotas - 1);
          onClose();
        }
      }
    );
  };

  const handleEmitirNF = async (idNfe: number) => {
    setFormSubmitted(true);

    await SefazService.emitir(idNfe, idEmissorSelecionado, HEADERS).then((resp) => {
      if (resp.type == 'error') {
        toast({
          position: 'top',
          title: 'Erro',
          description: resp.message,
          status: 'error',
          duration: 10000,
          isClosable: true,
        }); 
      } else {
        onCloseEmitir();
        getNF('');
        toast({
          position: 'top',
          title: 'Operação concluída.',
          description: resp.message,
          status: 'success',
          duration: 3000,
        }); 
      }
    });

    setFormSubmitted(false);
  };

  const handleDuplicarNF = async (idNfe: number) => {
    await NotaFiscalService.duplicar(idNfe, idEmissorSelecionado, HEADERS).then(() => {
      getNF('');
      setTotalNotas(totalNotas + 1);
    });
  };

  const tagColor = (status: string) => {
    switch (status) {
    case 'Emitida': return 'green';
    case 'Cancelada': return 'red';
    case 'Inutilizada': return 'gray';
    case 'Em digitação': return 'blue';
    }
  };

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox isLoading={isLoading} getNotasFiscaisByFilter={getNF} stateFilter={setFilter} stateFilterByStatus={setFilterByStatus} filterByDate={filterByDate} stateFilterByDate={setFilterByDate} setIsEditing={setIsEditing} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}>
          <DataTable 
            headers={headers} 
            orderBy={orderBy}
            orderDirection={orderDirection}
            onTap={handleChangeOrder}
          >
            {data !== undefined
              ? data.map((data) => (
                <Tr key={data.id}>
                  <Td width="5%">
                    {data.cod}
                  </Td>
                  <Td width="5%">
                    {data.serie}
                  </Td>
                  <Td width="5%">
                    {data.data_emissao != undefined ? formatDate(data.data_emissao.toString()) : ''}
                  </Td>
                  <TdCustom style={{ width: '15%' }}>
                    {data.natureza_operacao ?? ''}
                  </TdCustom>
                  <TdCustom style={{ width: '15%' }}>
                    {data.nome_destinatario ?? ''}
                  </TdCustom>
                  <Td width="5%">
                    <Tag variant='outline' colorScheme={tagColor(data.status)}>
                      {data.status}
                    </Tag>
                  </Td>
                  <Td width="5%">
                    {'R$ ' + formatMoney(data.total_nota) ?? ''}
                  </Td>
                  <Td width="5%" style={{ textAlign: 'end' }}>
                    {
                      data.status === 'Em digitação' ?
                        <ActionButton 
                          label='Emitir'
                          colorScheme='green'
                          action={() => handleOpenDialogEmitir(data.id)}
                          icon={FiSend}
                        /> 
                        : null
                    }
                    {
                      data.status !== 'Inutilizada' ?
                        <ActionButton 
                          label='Editar'
                          colorScheme='orange'
                          action={() => handleEditNF(data.id)}
                          icon={FiEdit}
                        />
                        : null
                    }
                    {
                      data.status !== 'Inutilizada' ?
                        <ActionButton 
                          label= {data.status === 'Em digitação' ? 'Pré visualizar' : 'Imprimir'}
                          colorScheme='blue'
                          action={() => handleImprimir(data)}
                          icon={FiPrinter}
                        />
                        : null
                    }
                    <Menu>
                      <MenuButton 
                        as={Button}
                        w="2rem"
                        p={0}
                        variant='ghost'
                        colorScheme='blue'
                        fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}
                      >
                        <Icon as={MdMenu} color={colorMode === 'light' ? 'blue.400' : 'blue.300'}/>
                      </MenuButton>
                      <MenuList>
                        {
                          data.status === 'Emitida' ?
                            <MenuItem onClick={() => handleOpenModalCancelar(data)} color={colorMode === 'light' ? 'red.600' : 'red.300'} my={1} py={2}>
                              <Icon as={FiSlash} mr={2}/>
                              Cancelar
                            </MenuItem>
                            : null
                        }
                        {
                          // data.status === 'Emitida' ?
                          <MenuItem onClick={() => handleOpenModalEmail(data.id_destinatario)} color={colorMode === 'light' ? 'blue.600' : 'blue.300'} my={1} py={2}>
                            <Icon as={FiMail} mr={2}/>
                              Enviar Email
                          </MenuItem>
                          // : null
                        }
                        {
                          data.status === 'Emitida' ?
                            <MenuItem onClick={() => handleOpenModalCCe(data)} color={colorMode === 'light' ? 'blue.600' : 'blue.300'} my={1} py={2}>
                              <Icon as={FiFile} mr={2}/>
                              Carta de Correção
                            </MenuItem>
                            : null
                        }
                        {
                          data.status === 'Emitida' && data.caminho_pdf_cce !== null ?
                            <MenuItem onClick={() => handleImprimirCCe(data)} color={colorMode === 'light' ? 'blue.600' : 'blue.300'} my={1} py={2}>
                              <Icon as={FiPrinter} mr={2}/>
                              Imprimir Correção
                            </MenuItem>
                            : null
                        }
                        {
                          data.status !== 'Emitida' && data.status !== 'Cancelada' ?
                            <MenuItem onClick={() => handleOpenDialog(data.id)} color={colorMode === 'light' ? 'red.600' : 'red.300'} my={1} py={2}>
                              <Icon as={FiTrash2} mr={2}/>
                              Excluir
                            </MenuItem>
                            : null
                        }
                        <MenuItem onClick={() => handleDuplicarNF(data.id)} color={colorMode === 'light' ? 'blue.600' : 'blue.300'} my={1} py={2}>
                          <Icon as={FiFilePlus} mr={2}/>
                          Duplicar
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))
              : ''}
          </DataTable>
          <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalNotas} changeLimitRegister={setLimitRegistros}>
            <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}>
              <Icon as={FiChevronLeft} />
            </Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0 || limitRegistros >= totalNotas} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}>
              <Icon as={FiChevronRight} />
            </Button>
          </Pagination>
        </SearchBox>
        <ModalNotaFiscal isEditing={isEditing} setIsEditing={setIsEditing} id={id} getNF={getNF}/>        
        <ModalCancelar data={dataToModal!} getNotas={getNF}/>
        <ModalEmail idCliente={id}/>
        <ModalCCe getNotas={getNF} data={dataToModal!}/>
        <DeleteAlertDialog label="NFe" deleteFunction={handleEmitirNF} onClose={onCloseEmitir} isOpen={isOpenEmitir} id={id} colorScheme='green' disabled={formSubmitted}/>
        <DeleteAlertDialog label="NFe" deleteFunction={handleDeleteNF} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  );
}
