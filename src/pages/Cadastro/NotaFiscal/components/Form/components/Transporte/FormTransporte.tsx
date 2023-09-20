import { Button, Divider, Flex, Icon, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { FormProvider, useFormContext } from 'react-hook-form';
import { FiSearch, FiSlash } from 'react-icons/fi';
import { useModalNFTransporte } from '../../../../../../../Contexts/Modal/NotaFiscal/NFTransporteContext';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { ModalNFTransporte } from './ModalNFTransporte';
import { useEstados } from '../../../../../../../hooks/useEstados';

export function FormTransporte() {
  const methods = useFormContext<INotaFiscal>();

  const { estados } = useEstados();
  
  const { onOpen } = useModalNFTransporte();
  const { colorMode } = useColorMode();

  const handleRemoveTransp = () => {
    methods.setValue('transportadora', {
      anotacoes: '',
      antt: '',
      bairro: '',
      cep: '',
      cidade: '',
      cnpjcpf: '',
      cod: '',
      complemento: '',
      id: 0,
      id_emissor: 0,
      ie: '',
      logradouro: '',
      numero: '',
      placa: '',
      razao: '',
      rntrc: '',
      telefone1: '',
      telefone2: '',
      tipo_telefone1: '',
      tipo_telefone2: '',
      uf: '',
      uf_placa: '',
    });
  };

  return (
    <FormProvider {...methods}>
      <Flex w="100%" justify="center" align="center">
        {/* COLUNA 1 */}
        <Flex w="50%" justify="center" align="center" direction="column" mr={5}>
          <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
            <Divider w="20%" />
            <Text w="max" ml={5}>Transportadora</Text>
            <Divider w="80%" ml={5} />
          </Flex>
          <FormContainer label='Frete'>
            <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('modalidade_frete')}>
              <option value='9'>Sem frete</option>
              <option value='0'>Por conta do remetente (CIF)</option>
              <option value='1'>Por conta do destinatário (FOB)</option>
              <option value='2'>Por conta de terceiros</option>
              <option value='3'>Transporte próprio - por conta do remetente</option>
              <option value='4'>Transporte próprio - por conta do destinatário</option>
            </Select>
          </FormContainer>
          <FormContainer label='Razão Social'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('transportadora.razao')}/>
          </FormContainer>
          <Flex w="100%" justify="center" align="center">
            <FormContainer label='CNPJ' mr='3'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('transportadora.cnpjcpf')}/>
            </FormContainer>
            <FormContainer label='Inscrição Estadual'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('transportadora.ie')}/>
            </FormContainer>
          </Flex>
          <FormContainer label='Endereço'>
            <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('transportadora.logradouro')}/>
          </FormContainer>
          <Flex w="100%" justify="center" align="center">
            <FormContainer width='80%' label='Cidade' mr='3'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('transportadora.cidade')}/>
            </FormContainer>
            <FormContainer width='20%' label='UF'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('transportadora.uf')}/>
            </FormContainer>
          </Flex>
          <Flex w="100%" justify="center" align="center">
            <FormContainer label='UF Placa' width='40%' mr='3'>
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('transportadora.uf_placa')}>
                {estados.map((estado, index) => <option key={index} value={estado}>{estado}</option>)}
              </Select>
            </FormContainer>
            <FormContainer label='Placa do Veículo' width='60%'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('transportadora.placa')}/>
            </FormContainer>
          </Flex>
          <Flex w="100%" justify="center" align="center">
            <FormContainer label='Código ANTT' mr='3'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" readOnly {...methods.register('transportadora.antt')}/>
            </FormContainer>
            <Button onClick={onOpen} w="30%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue" mr='3'>
              <Icon mr={2} as={FiSearch} />
              Buscar
            </Button>
            <Button onClick={handleRemoveTransp} w="30%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }}><Icon as={FiSlash} mr={2}/>Limpar</Button>
          </Flex>
        </Flex>

        {/* COLUNA 2 */}
        <Flex w="50%" justify="center" align="center" direction="column" alignSelf="flex-start">
          <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap">
            <Divider w="20%" />
            <Text w="max" ml={5}>Carga</Text>
            <Divider w="80%" ml={5} />
          </Flex>
          <Flex w="100%" justify="center" align="center">
            <FormContainer width='25%' label='Quantidade' mr='3'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('quantidade_transporte')}/>
            </FormContainer>
            <FormContainer width='40%' label='Espécie' mr='3'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('especie_transporte')}/>
            </FormContainer>
            <FormContainer width='35%' label='Marca'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('marca_transporte')}/>
            </FormContainer>
          </Flex>
          <Flex w="100%" justify="center" align="center">
            <FormContainer width='25%' label='Número' mr='3'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('numero_transporte')}/>
            </FormContainer>
            <FormContainer width='40%' label='Peso Bruto' mr='3'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('peso_bruto')}/>
            </FormContainer>
            <FormContainer width='35%' label='Peso Líquido'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="text" {...methods.register('peso_liquido')}/>
            </FormContainer>
          </Flex>
        </Flex>
      </Flex>
      <ModalNFTransporte />
    </FormProvider>
  );
}
