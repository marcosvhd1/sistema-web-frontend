import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, Td, Tr, useToast } from '@chakra-ui/react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
  FiTrash2,
} from 'react-icons/fi';

import MainContent from '../../../components/MainContent';
import { DataTable } from '../../../components/Table/DataTable';
import { Pagination } from '../../../components/Table/Pagination';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';
import { useModalNotaFiscal } from '../../../Contexts/Modal/NotaFiscal/NotaFiscalContext';
import { ApiException } from '../../../services/api/ApiException';
import {
  INFProduct,
  NFProdutoService,
} from '../../../services/api/notafiscal/NFProduct';
import {
  INotaFiscal,
  NotaFiscalService,
} from '../../../services/api/notafiscal/NotaFiscalService';
import { userInfos } from '../../../utils/header';
import { ModalNotaFiscal } from './components/Form/FormIndex';
import { SearchBox } from './components/SearchBox';
import { ClientService } from '../../../services/api/clientes/ClientService';
import { TransportadoraService } from '../../../services/api/transportadora/TransportadoraService';
import { NFPagtoService } from '../../../services/api/notafiscal/NFFormaPagto';
import { IProduct, ProductService } from '../../../services/api/produtos/ProductService';
import { INFDuplicata } from '../../../services/api/notafiscal/NFDuplicata';

export function NotaFiscal() {
  const methods = useForm<INotaFiscal>();

  const [data, setData] = useState<INotaFiscal[]>([]);
  const [filter, setFilter] = useState<string>('nome_destinatario');

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNotas, setTotalNotas] = useState<number>(0);
  const [limitRegistros, setLimitRegistros] = useState(5);
  const [pages, setPages] = useState<number[]>([]);

  const [prods, setProds] = useState<INFProduct[]>([]);

  const { idEmissorSelecionado } = useEmissorContext();
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
  }, [currentPage]);

  useEffect(() => {
    getNF('');
  }, [limitRegistros]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalNotas, limitRegistros]);

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalNotas / limitRegistros);
    const arrayPages = [];
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }
    setPages(arrayPages);
  };

  const getNF = (description: string) => {
    NotaFiscalService.getNFByFilter(
      currentPage,
      limitRegistros,
      filter,
      description,
      idEmissorSelecionado,
      HEADERS
    ).then((result: any) => {
      if (result instanceof ApiException) {
        console.log(result.message);
      } else {
        setData(result.data);
        setTotalNotas(parseInt(result.headers['qtd']));
      }
    });
  };

  const handleEditNF = async (idNf: number) => {
    const nfToUpdate = data.find((prod) => prod.id === idNf);

    if (nfToUpdate) {
      methods.reset(nfToUpdate);

      const aux: INFProduct[] = [];
      setProds(aux);

      //Carrega o cliente da nota
      await ClientService.getClientsByFilter(currentPage, limitRegistros, 'id', nfToUpdate.id_destinatario, idEmissorSelecionado, HEADERS)
        .then((result: any) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            methods.setValue('destinatario', result.data[0]);
          }
        });

      //Carrega a transportadora da nota
      await TransportadoraService.getTransportadoraByFilter(currentPage, limitRegistros, 'id', nfToUpdate.id_transportadora, idEmissorSelecionado, HEADERS)
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
                prod.cfop = element.cfop;
                prod.ncm = element.ncm;
                prod.un = element.un;
                prod.cest = element.cest;

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
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            methods.setValue('forma_pagto', result.data);
          }
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
            isClosable: true,
          });
          getNF('');
          setTotalNotas(totalNotas - 1);
        }
      }
    );
  };

  const headers: { key: string; label: string }[] = [
    { key: 'data_emissao', label: 'Emissão' },
    { key: 'cod', label: 'Número' },
    { key: 'serie', label: 'Série' },
    { key: 'natureza_operacao', label: 'Natureza de Operação' },
    { key: 'destinatario', label: 'Destinatário' },
    { key: 'status', label: 'Status' },
    { key: 'total_nota', label: 'Valor Total' },
  ];

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox
          getNotasFiscaisByFilter={getNF}
          stateFilter={setFilter}
          setIsEditing={setIsEditing}
        >
          <DataTable headers={headers}>
            {data !== undefined
              ? data.map((data) => (
                <Tr key={data.id}>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                    {data.data_emissao.toString()}
                  </Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                    {('0000' + data.cod).slice(-4)}
                  </Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                    {data.serie}
                  </Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                    {data.natureza_operacao}
                  </Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                    {data.nome_destinatario}
                  </Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                    {data.status}
                  </Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                    {data.total_nota}
                  </Td>
                  <Td style={{ textAlign: 'center' }}>
                    <Button
                      variant="ghost"
                      colorScheme="orange"
                      fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}
                      w="2rem"
                      onClick={() => handleEditNF(data.id)}
                    >
                      <Icon color="orange.300" as={FiEdit} />
                    </Button>
                    <Button
                      variant="ghost"
                      colorScheme="red"
                      fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}
                      w="2rem"
                      onClick={() => handleDeleteNF(data.id)}
                    >
                      <Icon as={FiTrash2} color="red.400" />
                    </Button>
                  </Td>
                </Tr>
              ))
              : ''}
          </DataTable>
          <Pagination
            currentPage={currentPage}
            limitRegistros={limitRegistros}
            totalClients={totalNotas}
            changeLimitRegister={setLimitRegistros}
          >
            <Button
              isDisabled={currentPage === 1}
              variant="ghost"
              size="sm"
              fontSize="2xl"
              width="4"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <Icon as={FiChevronLeft} />
            </Button>
            <Button
              isDisabled={
                currentPage === pages.length ||
                data.length === 0 ||
                limitRegistros >= totalNotas
              }
              variant="ghost"
              size="sm"
              fontSize="2xl"
              width="4"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <Icon as={FiChevronRight} />
            </Button>
          </Pagination>
        </SearchBox>
        <ModalNotaFiscal
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          id={id}
          getNF={getNF}
        />
      </MainContent>
    </FormProvider>
  );
}
