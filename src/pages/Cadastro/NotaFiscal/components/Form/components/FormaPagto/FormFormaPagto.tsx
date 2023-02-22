import { Button, Divider, Flex, Icon, Select, Td, Text, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { useModalNFDuplicata } from '../../../../../../../Contexts/Modal/NotaFiscal/NFDuplicataContext';
import { useModalNFFormaPagto } from '../../../../../../../Contexts/Modal/NotaFiscal/NFFormaPagtoContext';
import { INFDuplicata } from '../../../../../../../services/api/notafiscal/NFDuplicata';
import { INFFormaPagto } from '../../../../../../../services/api/notafiscal/NFFormaPagto';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { ModalNFDuplicata } from './ModalNFDuplicataPagto';
import { ModalNFFormaPagto } from './ModalNFFormaPagto';

export function FormFormaPagto() {
  const methods = useFormContext<INotaFiscal>();

  const { onOpen } = useModalNFFormaPagto();
  const { onOpen: openDuplicata } = useModalNFDuplicata();

  const [formaPagtos, setFormaPagto] = useState<INFFormaPagto[]>([]);
  const [duplicatas, setDuplicatas] = useState<INFDuplicata[]>([]);

  const openModalForma = () => {
    methods.reset({});

    onOpen();
  };
  const openModalDuplicata = () => {
    methods.reset({});

    openDuplicata();
  };

  const handleAddForma = (data: INFFormaPagto) => {
    formaPagtos.push(data);

    //methods.setValue('forma_pagto', formaPagtos);
  };

  const handleDeleteForma = (data: INFFormaPagto) => {
    const newArray = formaPagtos.filter(forma => forma !== data);
    setFormaPagto(newArray);
  };

  const handleAddDuplicata = (data: INFDuplicata) => {
    duplicatas.push(data);

    //methods.setValue('forma_pagto', formaPagtos);
  };

  const handleDeleteDuplicata = (data: INFDuplicata) => {
    const newArray = duplicatas.filter(doc => doc !== data);
    setDuplicatas(newArray);
  };

  const headers: { key: string, label: string }[] = [
    { key: 'formapagto', label: 'Forma de Pagto' },
    { key: 'valor', label: 'Valor' },
    { key: 'bandeira', label: 'Bandeira' },
    { key: 'obs', label: 'Observação' },
    { key: 'acoes', label: 'Excluir' },
  ];

  const headers2: { key: string, label: string }[] = [
    { key: 'numero', label: 'Número' },
    { key: 'vencimento', label: 'Vencimento' },
    { key: 'valor', label: 'Valor' },
    { key: 'acoes', label: 'Excluir' },
  ];

  return (
    <FormProvider {...methods}>
      <Flex w="100%" justify="center" align="center" direction="column" >
        <Flex w="100%" justify="flex-start" align="center" mb={2}>
          <FormContainer width='45%' label='Presença do comprador no momento da operação'>
            <Select {...methods.register('presenca_comprador')}>
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
              <Divider w="40%" mr={3} ml={3} />
              <Button variant="outline" colorScheme="green" fontSize={{ base: '.8rem', md: '.8rem', lg: '.9rem' }} onClick={openModalForma}>
                <Icon mr={2} as={MdAdd} />
                Adicionar
              </Button>
            </Flex>
            <DataTable width='100%' headers={headers} trailing={false} mt='3'>
              {formaPagtos !== undefined ? formaPagtos.map((data, index) => (
                <Tr key={uuidv4()}>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.forma}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{'R$ ' + data.valor}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.bandeira}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.observacao}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                    <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} onClick={() => handleDeleteForma(data)}>
                      <Icon as={FiTrash2} color="red.400" />
                    </Button>
                  </Td>
                </Tr>
              )) : ''}
            </DataTable>
          </Flex>
          <Flex w="100%" direction="column"> 
            <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
              <Divider w="10%" />
              <Text w="max" ml={3}>Duplicatas</Text>
              <Divider w="50%" mr={3} ml={3} />
              <Button variant="outline" colorScheme="green" fontSize={{ base: '.8rem', md: '.8rem', lg: '.9rem' }} onClick={openModalDuplicata}>
                <Icon mr={2} as={MdAdd} />
                Adicionar
              </Button>
            </Flex>
            <DataTable width='100%' headers={headers2} trailing={false} mt='3'>
              {duplicatas !== undefined ? duplicatas.map((data, index) => (
                <Tr key={uuidv4()}>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.numero}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.vencimento}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{'R$ ' + data.valor}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                    <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} onClick={() => handleDeleteDuplicata(data)}>
                      <Icon as={FiTrash2} color="red.400" />
                    </Button>
                  </Td>
                </Tr>
              )) : ''}
            </DataTable>
          </Flex>
        </Flex>
        <ModalNFFormaPagto addFormaPagto={handleAddForma} />
        <ModalNFDuplicata addDuplicata={handleAddDuplicata} />
      </Flex>
    </FormProvider>
  );
}
