import { Button, Divider, Flex, Icon, Select, Td, Text, Tr, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { useModalNFDuplicata } from '../../../../../../../Contexts/Modal/NotaFiscal/NFDuplicataContext';
import { useModalNFFormaPagto } from '../../../../../../../Contexts/Modal/NotaFiscal/NFFormaPagtoContext';
import { ActionButton } from '../../../../../../../components/Form/ActionButton';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { INFDuplicata } from '../../../../../../../services/api/notafiscal/NFDuplicata';
import { INFFormaPagto } from '../../../../../../../services/api/notafiscal/NFFormaPagto';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import formatMoney from '../../../../../../../utils/formatarValor';
import { ModalNFDuplicata } from './ModalNFDuplicataPagto';
import { ModalNFFormaPagto } from './ModalNFFormaPagto';

interface FormFormaPagtoProps {
  formaPagtos: INFFormaPagto[],
  addForma: (forma: INFFormaPagto[]) => void
  duplicatas: INFDuplicata[],
  addDuplicata: (forma: INFDuplicata[]) => void
}

export function FormFormaPagto({ formaPagtos, addForma, duplicatas, addDuplicata }: FormFormaPagtoProps) {
  const methods = useFormContext<INotaFiscal>();

  const [isEditingForma, setIsEditingForma] = useState<boolean>(false);
  const [isEditingDup, setIsEditingDup] = useState<boolean>(false);

  const [currentIndexForma, setCurrentIndexForma] = useState<number>(0);
  const [currentIndexDup, setCurrentIndexDup] = useState<number>(0);

  const { onOpen } = useModalNFFormaPagto();
  const { onOpen: openDuplicata } = useModalNFDuplicata();
  const { colorMode } = useColorMode();

  const formatDate = (date: string) => {
    const aux = date.split('-');
    return `${aux[2]}/${aux[1]}/${aux[0]}`;
  };

  const openModalForma = () => {
    setIsEditingForma(false);
    onOpen();
  };

  const openModalDuplicata = () => {
    setIsEditingDup(false);
    openDuplicata();
  };

  const handleAddForma = (data: INFFormaPagto) => {
    formaPagtos.push(data);
  };

  const handleAddDupli = (data: INFDuplicata) => {
    duplicatas.push(data);
  };

  const loadFormaToEdit = (index: number) => {
    methods.reset(formaPagtos[index]);
    setCurrentIndexForma(index);
    setIsEditingForma(true);
    onOpen();
  };

  const loadDupToEdit = (index: number) => {
    methods.reset(duplicatas[index]);
    setCurrentIndexDup(index);
    setIsEditingDup(true);
    openDuplicata();
  };

  const handleEditForma = (data: INFFormaPagto) => {
    formaPagtos[currentIndexForma] = data;
  };

  const handleEditDup = (data: INFDuplicata) => {
    duplicatas[currentIndexDup] = data;
  };

  const handleDeleteForma = (data: INFFormaPagto) => {
    const newArray = formaPagtos.filter(forma => forma !== data);
    addForma(newArray);
  };

  const handleDeleteDupli = (data: INFDuplicata) => {
    const newArray = duplicatas.filter(dupli => dupli !== data);
    addDuplicata(newArray);
  };

  const headersForma: { key: string, label: string }[] = [
    { key: 'formapagto', label: 'Forma de Pagto' },
    { key: 'valor', label: 'Valor' },
    { key: 'bandeira', label: 'Bandeira' },
    { key: 'obs', label: 'Observação' },
    { key: 'acoes', label: 'Ações' },
  ];

  const headersDuplicata: { key: string, label: string }[] = [
    { key: 'numero', label: 'Número' },
    { key: 'vencimento', label: 'Vencimento' },
    { key: 'valor', label: 'Valor' },
    { key: 'acoes', label: 'Ações' },
  ];

  return (
    <FormProvider {...methods}>
      <Flex w="100%" justify="center" align="center" direction="column" >
        <Flex w="100%" justify="flex-start" align="center" mb={2}>
          <FormContainer width='45%' label='Presença do comprador no momento da operação'>
            <Select isRequired borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('presenca_comprador')}>
              <option value='0'>0 - Não se aplica (Para NF complementar ou de ajuste)</option>
              <option value='1'>1 - Operação presencial</option>
              <option value='2'>2 - Operação não presencial, pela Internet</option>
              <option value='3'>3 - Operação não presencial, Teleatendimento</option>
              <option value='4'>4 - NFCE-e em operação com entrega em domicílio</option>
              <option value='5'>5 - Operação presencial - fora do estabelecimento</option>
              <option value='9'>5 - Operação não presencial, Outros</option>
            </Select>
          </FormContainer>
        </Flex>
        <Flex w="100%" align="flex-start" justify="center" mt={3}>
          <Flex w="100%" direction="column" mr={10}> 
            <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
              <Divider w="10%" />
              <Text w="max" ml={3}>Forma de Pagamento</Text>
              <Divider w="25%" mr={3} ml={3} />
              <Button fontSize={{ base: '.8rem', md: '.8rem', lg: '.9rem' }} variant="solid" colorScheme="blue" onClick={openModalForma} w="25%">
                <Icon mr={2} as={MdAdd} />
                Adicionar
              </Button>
            </Flex>
            <DataTable width='100%' headers={headersForma} trailing={false} mt='3'>
              {formaPagtos !== undefined ? formaPagtos.map((data, index) => (
                <Tr key={uuidv4()}>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.forma}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{'R$ ' + formatMoney(data.valor)}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.bandeira}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.observacao}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                    <ActionButton 
                      label='Editar'
                      colorScheme='orange'
                      action={() => loadFormaToEdit(index)}
                      icon={FiEdit}
                    />
                    <ActionButton 
                      label='Excluir'
                      colorScheme='red'
                      action={() => handleDeleteForma(data)}
                      icon={FiTrash2}
                    />
                  </Td>
                </Tr>
              )) : ''}
            </DataTable>
          </Flex>
          <Flex w="100%" direction="column"> 
            <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
              <Divider w="10%" />
              <Text w="max" ml={3}>Duplicatas</Text>
              <Divider w="30%" mr={3} ml={3} />
              <Button fontSize={{ base: '.8rem', md: '.8rem', lg: '.9rem' }} variant="solid" colorScheme="blue" onClick={openModalDuplicata} w="25%">
                <Icon mr={2} as={MdAdd} />
                Adicionar
              </Button>
            </Flex>
            <DataTable width='100%' headers={headersDuplicata} trailing={false} mt='3'>
              {duplicatas !== undefined ? duplicatas.map((data, index) => (
                <Tr key={uuidv4()}>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.numero}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{formatDate(data.vencimento)}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{'R$ ' + formatMoney(data.valor)}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                    <ActionButton 
                      label='Editar'
                      colorScheme='orange'
                      action={() => loadDupToEdit(index)}
                      icon={FiEdit}
                    />
                    <ActionButton 
                      label='Excluir'
                      colorScheme='red'
                      action={() => handleDeleteDupli(data)}
                      icon={FiTrash2}
                    />
                  </Td>
                </Tr>
              )) : ''}
            </DataTable>
          </Flex>
        </Flex>
        <ModalNFFormaPagto
          isEditing={isEditingForma}
          addFormaPagto={handleAddForma}
          editFormaPagto={handleEditForma}
        />
        <ModalNFDuplicata 
          isEditing={isEditingDup}
          addDuplicata={handleAddDupli} 
          editDuplicata={handleEditDup}
        />
      </Flex>
    </FormProvider>
  );
}
