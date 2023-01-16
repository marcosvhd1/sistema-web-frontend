import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import MainContent from '../../../../../components/MainContent';
import { userInfos } from '../../../../../utils/header';
import { Button, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Td, Textarea, Tr, Portal, Text } from '@chakra-ui/react';
import { DataTable } from '../../../../../components/Table/DataTable';
import { INotaFiscal } from '../../../../../services/api/notafiscal/NotaFiscalService';
import { useColorMode } from '@chakra-ui/react';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { FormModal } from './components/FormModal';
import { useModalNotaFiscal } from '../../../../../Contexts/Modal/NotaFiscalContext';
import { FormDadosPrincipais } from './components/FormDadosPrincipais';

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
  const { onOpen } = useModalNotaFiscal();
  const { colorMode } = useColorMode();
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const openModal = () => {
    getCod();
    onOpen();
    changeEdit(false);
  };

  return (
    <FormProvider {...methods}>
      <MainContent>
        <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column">
          <Text fontFamily="Poppins" fontSize="xl" mb="2" >Cadastro de Nota Fiscal</Text>
          <Tabs variant='enclosed' colorScheme="gray" w="98%">
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
                {/* Produtos */}
              </TabPanel>

              <TabPanel>
                {/* Serviços */}
              </TabPanel>
  
              <TabPanel>
                {/* Totais */}
              </TabPanel>
  
              <TabPanel>
                {/* Formas Pagto */}
              </TabPanel>
  
              <TabPanel>
                {/* Transportes */}
              </TabPanel>
 
              <TabPanel>
                <Textarea borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} h="37rem" placeholder='Informações adicionais...' {...methods.register('info_adicionais')} />
              </TabPanel>

              <TabPanel>  
                {/* Outros */}
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* <Flex w="95%" justify="flex-end">
            <Button variant='solid' colorScheme="green" mr={3} type="submit"><Icon as={FiCheck} mr={1} />{isEditing ? 'Editar' : 'Cadastrar'}</Button>
            <Button colorScheme='red' variant="outline" onClick={() => null}><Icon as={FiSlash} mr={1} /> Cancelar</Button>
          </Flex> */}
        </Flex>
        {/* <FormModal header={HEADERS} cod={cod} editCod={editCod} isEditing={isEditing} id={id} /> */}
      </MainContent>
    </FormProvider>
  );
}
