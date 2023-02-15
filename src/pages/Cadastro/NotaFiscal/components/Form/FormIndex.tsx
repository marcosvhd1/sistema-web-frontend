import { Button, Flex, Grid, GridItem, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import MainContent from '../../../../../components/MainContent';
import { INotaFiscal } from '../../../../../services/api/notafiscal/NotaFiscalService';
import { FormDadosPrincipais } from './components/Dados Principais/FormDadosPrincipais';
import { FormFormaPagto } from './components/FormFormaPagto';
import { FormInfoAdicional } from './components/FormInfoAdicional';
import { FormOutros } from './components/FormOutros';
import { FormTotais } from './components/FormTotais';
import { FormTransporte } from './components/Transporte/FormTransporte';
import { FormProdutos } from './components/Produtos/FormProdutos';
import { FormServicos } from './components/Servicos/FormServicos';

export function CadastroNotaFiscal() {
  const methods = useForm<INotaFiscal>();

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
      <MainContent>
        <Grid
          templateAreas={`
          "header"
          "main"
          "footer"`}
          gridTemplateRows={'6vh 1fr 8vh'}
          h='88vh'
        >
          <GridItem area={'header'}>
            <Flex w="100%" align="center" justify="center" h="6vh">
              <Text fontFamily="Poppins" fontSize="xl">Cadastro de Nota Fiscal</Text>
            </Flex>
          </GridItem>
          <GridItem area={'main'} overflowY="auto" pl="3" pr="3">
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
          </GridItem>
          <GridItem area={'footer'} pl="7" pr="7">
            <Flex w="100%" justify="space-between" align="center"h="8vh">
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} />Salvar</Button>
              <Button colorScheme='red' variant="outline" onClick={() => null}><Icon as={FiSlash} mr={1} />Cancelar</Button>
            </Flex>
          </GridItem>
        </Grid>
      </MainContent>
    </FormProvider>
  );
}
