import { Button, Flex, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiCheck, FiSlash } from 'react-icons/fi';
import { useEmissorContext } from '../../../../../Contexts/EmissorProvider';
import { useModalProduct } from '../../../../../Contexts/Modal/ProductContext';
import { ApiException } from '../../../../../services/api/ApiException';
import { IProduct, ProductService } from '../../../../../services/api/produtos/ProductService';
import { DadosFiscais } from './DadosFiscais';
import { DadosPrincipais } from './DadosPrincipais';

interface ModalProps {
  refreshPage: (description: string, status: string) => void
  getCod: () => void
  isEditing: boolean
  id: number
  header: any
  active: boolean
  setActive: (value: boolean) => void
  seeActive: string
}

export function FormModal({isEditing, id, refreshPage, header, getCod, setActive, active, seeActive }: ModalProps) {
  const methods = useFormContext<IProduct>();
  const toast = useToast();

  const { isOpen, onClose } = useModalProduct();
  const { idEmissorSelecionado } = useEmissorContext();

  const [currentTab, setCurrentTab] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen && !isEditing) getCod();
  }, [isOpen]);

  const clearForm = () => {
    onClose();
    methods.reset({
      descricao: '',
      referencia: '',
      codbarras: '',
      marca: '',
      grupo: '',
      preco: 0,
      preco_trib: 0,
      un: '',
      un_trib: '',
      status: '',
      anotacoes: '',
      cst_icms: '',
      aliquota_icms: 0,
      base_icms: 0,
      cst_ipi: 0,
      aliquota_ipi: 0,
      cst_cofins: 0,
      aliquota_cofins: 0,
      cst_pis: 0,
      aliquota_pis: 0,
      info_adicional: '',
      ncm: '',
      cest: '',
      cnpj_produtor: '',
      producao_propria: '',
      cfop: '',
      origem: '',
      peso_bruto: 0,
      peso_liquido: 0,
    });
    setActive(true);
    setFormSubmitted(false);
  };

  const hasErrors = () => {
    const camposObrigatorios: any[] = ['nprod', 'descricao', 'preco', 'un', 'cst_icms', 'ncm', 'cfop', 'origem'];
    
    for (const campo of camposObrigatorios) {
      if (methods.getValues(campo) === '') {
        let msg = '';
        switch (campo) {
        case camposObrigatorios[0]: 
          msg = 'Está faltando preencher o CÓDIGO.';
          setCurrentTab(0);
          setTimeout(() => methods.setFocus(camposObrigatorios[0]), 100);
          break;
        case camposObrigatorios[1]: 
          msg = 'Está faltando preencher a DESCRIÇÃO.';
          setCurrentTab(0);
          setTimeout(() => methods.setFocus(camposObrigatorios[1]), 100);
          break;
        case camposObrigatorios[2]: 
          msg = 'Está faltando preencher o PREÇO.';
          setCurrentTab(0);
          setTimeout(() => methods.setFocus(camposObrigatorios[2]), 100);
          break;
        case camposObrigatorios[3]: 
          msg = 'Está faltando preencher a UN.';
          setCurrentTab(0);
          setTimeout(() => methods.setFocus(camposObrigatorios[3]), 100);
          break;
        case camposObrigatorios[4]: 
          msg = 'Está faltando preencher o CST/CSOSN.';
          setCurrentTab(1);
          setTimeout(() => methods.setFocus(camposObrigatorios[4]), 100);
          break;
        case camposObrigatorios[5]: 
          msg = 'Está faltando preencher o NCM.';
          setCurrentTab(1);
          setTimeout(() => methods.setFocus(camposObrigatorios[5]), 100);
          break;
        case camposObrigatorios[6]: 
          msg = 'Está faltando preencher o CFOP.';
          setCurrentTab(1);
          setTimeout(() => methods.setFocus(camposObrigatorios[6]), 100);
          break;
        case camposObrigatorios[7]: 
          msg = 'Está faltando selecionar a ORIGEM.';
          setCurrentTab(1);
          setTimeout(() => methods.setFocus(camposObrigatorios[7]), 100);
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

  const handleCreateNewProduct = (data: IProduct) => {
    data.id_emissor = idEmissorSelecionado;
    if (data.descricao.trim().length === 0) {
      toast({
        position: 'top',
        title: 'Erro ao cadastrar.',
        description: 'Descrição inválida',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else {
      ProductService.create(data, header)
        .then((result) => {
          if (result instanceof ApiException) {
            console.log(result.message);
          } else {
            clearForm();
            refreshPage('', seeActive);
          }
        });
    }
  };

  const handleUpdateProduct = (data: IProduct) => {
    ProductService.updateById(id, data, idEmissorSelecionado, header)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          clearForm();
          refreshPage('', seeActive);
        }
      });
  };

  const submitData = (data: IProduct) => {
    if (hasErrors()) return;

    data.status = active ? 'Ativo' : 'Inativo';
    setFormSubmitted(true);

    if (isEditing) handleUpdateProduct(data);
    else handleCreateNewProduct(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size="5xl"
    >
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(submitData)}>
        <ModalContent>
          <ModalHeader>Cadastro de Produtos</ModalHeader>
          <ModalBody>
            <Tabs 
              variant='enclosed' 
              colorScheme="gray" 
              index={currentTab}
              onChange={(index) => setCurrentTab(index)}
            >
              <TabList>
                <Tab>1. Dados Principais</Tab>
                <Tab>2. Outros Dados / Fiscais</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <DadosPrincipais 
                    id={id}
                    active={active} 
                    setActive={setActive}  
                  />
                </TabPanel>
                <TabPanel>
                  <DadosFiscais />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Button type="submit" variant='solid' colorScheme="green" disabled={formSubmitted}>
                <Icon as={FiCheck} mr={2} />
                Salvar
              </Button>
              <Button onClick={clearForm}><Icon as={FiSlash} mr={2}/>Fechar</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}