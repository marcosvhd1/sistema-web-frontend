import { Button, Divider, Flex, Icon, Input, Select, Td, Text, Tr, useColorMode } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
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
  const methodsPag = useForm<INFFormaPagto>();
  const methods = useFormContext<INotaFiscal>();

  const [isHidden, setIsHidden] = useState<boolean>(true);

  const [sortBy, setSortBy] = useState<keyof INFFormaPagto | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [sortByDup, setSortByDup] = useState<keyof INFDuplicata | null>(null);
  const [sortOrderDup, setSortOrderDup] = useState<'asc' | 'desc'>('asc');

  const [isEditingForma, setIsEditingForma] = useState<boolean>(false);
  const [isEditingDup, setIsEditingDup] = useState<boolean>(false);

  const [currentIndexForma, setCurrentIndexForma] = useState<number>(0);
  const [currentIndexDup, setCurrentIndexDup] = useState<number>(0);

  const { onOpen } = useModalNFFormaPagto();
  const { onOpen: openDuplicata } = useModalNFDuplicata();
  const { colorMode } = useColorMode();

  useEffect(() => {
    changeVisibility(methods.getValues('presenca_comprador'));
  }, []);

  const handleSort = (columnName: keyof INFFormaPagto) => {
    if (columnName === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
  };

  const sortedData = [...formaPagtos].sort((a, b) => {
    if (sortBy) {
      const aValue = a[sortBy]!;
      const bValue = b[sortBy]!;
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    }
    return 0;
  });

  const handleSortDup = (columnName: keyof INFDuplicata) => {
    if (columnName === sortByDup) {
      setSortOrderDup(sortOrderDup === 'asc' ? 'desc' : 'asc');
    } else {
      setSortByDup(columnName);
      setSortOrderDup('asc');
    }
  };

  const sortedDataDup = [...duplicatas].sort((a, b) => {
    if (sortByDup) {
      const aValue = a[sortByDup]!;
      const bValue = b[sortByDup]!;
      if (sortOrderDup === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    }
    return 0;
  });

  const formatDate = (date: string) => {
    const aux = date.split('-');
    return `${aux[2]}/${aux[1]}/${aux[0]}`;
  };

  const changeVisibility = (e: string) => {
    if (e == '2' || e == '3' || e == '9') setIsHidden(false);
    else setIsHidden(true);
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
    methodsPag.reset(formaPagtos[index]);
    setCurrentIndexForma(index);
    setIsEditingForma(true);
    onOpen();
  };

  const loadDupToEdit = (index: number) => {
    methodsPag.reset(duplicatas[index]);
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
    <FormProvider {...methodsPag}>
      <Flex w="100%" justify="center" align="center" direction="column" >
        <Flex w="100%" justify="flex-start" align="center" mb={2}>
          <FormContainer width='35%' label='Presença do comprador' mr='3'>
            <Select isRequired borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('presenca_comprador')} onChange={(event) =>changeVisibility(event.target.value)}>
              <option value='0'>0 - Não se aplica (Para NF complementar ou de ajuste)</option>
              <option value='1'>1 - Operação presencial</option>
              <option value='2'>2 - Operação não presencial, pela Internet</option>
              <option value='3'>3 - Operação não presencial, Teleatendimento</option>
              <option value='4'>4 - NFCE-e em operação com entrega em domicílio</option>
              <option value='5'>5 - Operação presencial - fora do estabelecimento</option>
              <option value='9'>9 - Operação não presencial, Outros</option>
            </Select>
          </FormContainer>
          <FormContainer hidden={isHidden} width='25%' label='Indicativo de intermediador' mr='3'>
            <Select isRequired borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('ind_intermed')}>
              <option value='0'>0 - Operação sem intermediador</option>
              <option value='1'>1 - Operação em site ou Plataformas de Terceiros</option>
            </Select>
          </FormContainer>
          <FormContainer hidden={isHidden} width="20%" label='CNPJ Intermediador' mr='3' >
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('cnpj_intermed')}/>
          </FormContainer>
          <FormContainer hidden={isHidden} width="20%" label='ID Intermediador' mr='3' >
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('id_intermed')}/>
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
            <DataTable 
              mt='3'
              width='100%' 
              trailing={false} 
              headers={headersForma}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onTap={handleSort}
            >
              {sortedData !== undefined ? sortedData.map((data, index) => (
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
            <DataTable 
              mt='3'
              width='100%' 
              trailing={false} 
              headers={headersDuplicata}
              sortBy={sortByDup}
              sortOrder={sortOrderDup}
              onTap={handleSortDup}
            >
              {sortedDataDup !== undefined ? sortedDataDup.map((data, index) => (
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
