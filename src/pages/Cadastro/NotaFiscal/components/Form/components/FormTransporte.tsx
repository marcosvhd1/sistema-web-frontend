import { Button, Flex, Icon, Input, Select } from '@chakra-ui/react';
import { FiSlash } from 'react-icons/fi';
import { FormContainer } from '../../../../../../components/Form/FormContainer';
import { useFormContext } from 'react-hook-form';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';

export function FormTransporte() {
  const { register, setFocus } = useFormContext<INotaFiscal>();
  return (
    <Flex w="100%" justify="center" align="center">

      {/* COLUNA 1 */}
      <Flex w="50%" justify="center" align="center" direction="column" mr={5}>
        <FormContainer label='Modalidade do Frete'>
          <Select {...register('modalidade_frete')}>
            <option value='0'>Por conta do remetente (CIF)</option>
            <option value='1'>Por conta do destinatário (FOB)</option>
            <option value='2'>Por conta de terceiros</option>
            <option value='3'>Transporte próprio - por conta do remetente</option>
            <option value='4'>Transporte próprio - por conta do destinatário</option>
            <option value='9'>Sem frete</option>
          </Select>
        </FormContainer>
        <Flex w="100%" justify="center" align="center">
          <FormContainer label='Transportadora' mr='3'>
            <Select {...register('transportadora.razao')}>
              <option value='0'></option>
            </Select>
          </FormContainer>
          <Button w="25%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="outline" colorScheme="red"><Icon mr={2} as={FiSlash} />Limpar</Button>
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer label='CNPJ' mr='3'>
            <Input type="text" readOnly {...register('transportadora.cnpjcpf')}/>
          </FormContainer>
          <FormContainer label='Inscrição Estadual'>
            <Input type="text" readOnly {...register('transportadora.ie')}/>
          </FormContainer>
        </Flex>
        <FormContainer label='Endereço'>
          <Input type="text" readOnly {...register('transportadora.logradouro')}/>
        </FormContainer>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='80%' label='Cidade' mr='3'>
            <Input type="text" readOnly {...register('transportadora.cidade')}/>
          </FormContainer>
          <FormContainer width='20%' label='UF'>
            <Input type="text" readOnly {...register('transportadora.uf')}/>
          </FormContainer>
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='30%' label='Placa do Veículo' mr='3'>
            <Input type="text" {...register('transportadora.placa')}/>
          </FormContainer>
          <FormContainer width='20%' label='UF' mr='3'>
            <Select {...register('transportadora.uf_placa')}>
              <option value='0'></option>
            </Select>
          </FormContainer>
          <FormContainer width='50%' label='Código ANTT'>
            <Input type="text" readOnly {...register('transportadora.antt')}/>
          </FormContainer>
        </Flex>
      </Flex>

      {/* COLUNA 2 */}
      <Flex w="50%" justify="center" align="center" direction="column" alignSelf="flex-start">
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='25%' label='Quantidade' mr='3'>
            <Input type="text" {...register('quantidade_transporte')}/>
          </FormContainer>
          <FormContainer width='40%' label='Espécie' mr='3'>
            <Input type="text" {...register('especie_transporte')}/>
          </FormContainer>
          <FormContainer width='35%' label='Marca'>
            <Input type="text" {...register('marca_transporte')}/>
          </FormContainer>
        </Flex>
        <Flex w="100%" justify="center" align="center">
          <FormContainer width='25%' label='Número' mr='3'>
            <Input type="text" {...register('numero_transporte')}/>
          </FormContainer>
          <FormContainer width='40%' label='Peso Bruto' mr='3'>
            <Input type="text" {...register('peso_bruto')}/>
          </FormContainer>
          <FormContainer width='35%' label='Peso Líquido'>
            <Input type="text" {...register('peso_liquido')}/>
          </FormContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}