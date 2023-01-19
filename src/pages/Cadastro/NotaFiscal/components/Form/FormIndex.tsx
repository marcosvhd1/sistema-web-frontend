import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Flex, Grid, GridItem, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, useColorMode } from '@chakra-ui/react';
import { FiCheck, FiSlash } from 'react-icons/fi';
import MainContent from '../../../../../components/MainContent';
import { SidebarContext } from '../../../../../Contexts/SidebarContext';
import { SizeContext } from '../../../../../Contexts/SizeContext';
import { INotaFiscal } from '../../../../../services/api/notafiscal/NotaFiscalService';
import { userInfos } from '../../../../../utils/header';
import { FormDadosPrincipais } from './components/FormDadosPrincipais';
import { FormFormaPagto } from './components/FormFormaPagto';
import { FormProdutos } from './components/FormProdutos';
import { FormServicos } from './components/FormServicos';
import { FormTotais } from './components/FormTotais';
import { FormTransporte } from './components/FormTransporte';
import { FormOutros } from './components/FormOutros';

interface NotaProps {
  refreshPage: (description: string) => void
  changeEdit: (value: React.SetStateAction<any>) => void
  getCod: () => void
  cod: number
  isEditing: boolean
  id: number
  editCod: number
  header: any
}


export function CadastroNotaFiscal({ isEditing, id, editCod, cod, refreshPage, getCod, changeEdit }: NotaProps) {
  const methods = useForm<INotaFiscal>();
  const { colorMode } = useColorMode();
  
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
                  <FormDadosPrincipais />
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
                  <Textarea borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} h="60vh" placeholder='Informações adicionais...' {...methods.register('info_adicionais')} />
                </TabPanel>
                <TabPanel>  
                  <FormOutros />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          <GridItem area={'footer'}>
            <Flex w="100%" justify="space-between" align="center" pl="3" pr="3" h="8vh">
              <Button variant='solid' colorScheme="green" type="submit"><Icon as={FiCheck} mr={1} />{isEditing ? 'Salvar' : 'Cadastrar'}</Button>
              <Button colorScheme='red' variant="outline" onClick={() => null}><Icon as={FiSlash} mr={1} />Cancelar</Button>
            </Flex>
          </GridItem>
        </Grid>
      </MainContent>
    </FormProvider>
  );
}
