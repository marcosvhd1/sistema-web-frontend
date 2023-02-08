import { Button, Divider, Flex, Icon, Input, Select, Td, Text, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext, useForm } from 'react-hook-form';
import { FiTrash2 } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { FormContainer } from '../../../../../../components/Form/FormContainer';
import { DataTable } from '../../../../../../components/Table/DataTable';
import { INFDuplicata } from '../../../../../../services/api/notafiscal/NFDuplicata';
import { INFFormaPagto } from '../../../../../../services/api/notafiscal/NFFormaPagto';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';

export function FormFormaPagto() {
  const { register, setFocus } = useFormContext<INotaFiscal>();
  const [formaPagtos, setFormaPagto] = useState<INFFormaPagto[]>([]);
  const [duplicatas, setDuplicatas] = useState<INFDuplicata[]>([]);
  const methods = useForm<INFFormaPagto>();
  const methods2 = useForm<INFDuplicata>();

  const headers1: { key: string, label: string }[] = [
    { key: 'formapagto', label: 'Forma de Pagto' },
    { key: 'valor', label: 'Valor' },
    { key: 'bandeira', label: 'Bandeira' },
    { key: 'obs', label: 'Observação' },
  ];

  const headers2: { key: string, label: string }[] = [
    { key: 'numero', label: 'Número' },
    { key: 'vencimento', label: 'Vencimento' },
    { key: 'valor', label: 'Valor' },
  ];

  return (
    <Flex w="100%" justify="center" align="center" direction="column" >
      <Flex w="100%" justify="flex-start" align="center" mb={2}>
        <FormContainer width='45%' label='Presença do comprador no momento da operação'>
          <Select {...register('presenca_comprador')}>
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
      <Flex w="100%" align="center" justify="center">
        <Flex w="60%" direction="column" mr="5" mb={2} mt={2}> 
          <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
            <Divider w="20%" />
            <Text w="max" mr={3} ml={3}>Forma de Pagamento</Text>
            <Divider />
          </Flex>
          <DataTable width='100%' headers={headers1} mt='3' trailing={false}>
            <Tr key={uuidv4()}>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                <Select {...methods.register('forma')}>
                  <option value='0'>Dinheiro</option>
                  <option value='1'>Cheque</option>
                  <option value='2'>Cartão de Crédito</option>
                  <option value='3'>Cartão de Débito</option>
                  <option value='4'>Crédito Loja</option>
                  <option value='5'>Vale Alimentação</option>
                  <option value='6'>Vale Refeição</option>
                  <option value='7'>Vale Presente</option>
                  <option value='8'>Vale Combustível</option>
                  <option value='9'>Boleto Bancário</option>
                  <option value='10'>Sem Pagamento</option>
                  <option value='11'>Outros</option>
                </Select>
              </Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                <Input type="text" {...methods.register('valor')} />
              </Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                <Select {...methods.register('bandeira')}>
                  <option value='0'>Visa</option>
                  <option value='1'>Mastercard</option>
                  <option value='2'>American Express</option>
                  <option value='3'>Sorocred</option>
                  <option value='4'>Diners Club</option>
                  <option value='5'>Elo</option>
                  <option value='6'>Hipercard</option>
                  <option value='7'>Aura</option>
                  <option value='8'>Outros</option>
                </Select>
              </Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                <Input type="text" {...methods.register('observacao')} />
              </Td>
            </Tr>
          </DataTable>
        </Flex>
        <Flex w="40%" direction="column" mb={2} mt={2}> 
          <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
            <Divider w="20%" />
            <Text w="max" mr={3} ml={3}>Duplicatas</Text>
            <Divider />
          </Flex>
          <DataTable width='100%' headers={headers2} mt='3' trailing={false}>
            <Tr key={uuidv4()}>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                <Input type="text" {...methods2.register('numero')} />
              </Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                <Input type="date" {...methods2.register('vencimento')} />
              </Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>
                <Input type="text" {...methods.register('valor')} />
              </Td>
            </Tr>
          </DataTable>
        </Flex>
      </Flex>
    </Flex>
  );
}
