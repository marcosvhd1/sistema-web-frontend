import { Button, Flex, Grid, GridItem, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import MainContent from '../../../../../components/MainContent';
import { INotaFiscal } from '../../../../../services/api/notafiscal/NotaFiscalService';
import { userInfos } from '../../../../../utils/header';
import { FormDadosPrincipais } from './components/Dados Principais/FormDadosPrincipais';
import { FormFormaPagto } from './components/FormFormaPagto';
import { FormInfoAdicional } from './components/FormInfoAdicional';
import { FormOutros } from './components/FormOutros';
import { FormProdutos } from './components/FormProdutos';
import { FormServicos } from './components/FormServicos';
import { FormTotais } from './components/FormTotais';
import { FormTransporte } from './components/FormTransporte';

export function CadastroNotaFiscal() {
  const methods = useForm<INotaFiscal>();
  
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

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
            <Tabs variant='enclosed' colorScheme="gray" w="100%">
              <TabList>
                <Tab>Dados Principais</Tab>
                <Tab>Produtos</Tab>
                <Tab>Serviços</Tab>
                <Tab>Totais</Tab>
                <Tab>Formas de Pagamento</Tab>
                <Tab>Transporte</Tab>
                <Tab>Informações Adicionais</Tab>
                <Tab>Outros</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormDadosPrincipais methods={methods}/>
                </TabPanel>
                <TabPanel>
                  <FormProdutos />
                </TabPanel>
                <TabPanel>
                  <FormServicos />
                </TabPanel>
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
