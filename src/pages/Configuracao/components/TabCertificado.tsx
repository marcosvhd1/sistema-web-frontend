import { Button, Flex, Icon, Input, Select, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../../components/Form/FormContainer';
import { IConfig } from '../../../services/api/config/ConfigService';

export function TabCertificado() {
  const methods = useFormContext<IConfig>();
  const { colorMode } = useColorMode();

  return (
    <Flex w='100%' justify='center' align='center' direction='column'>
      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='N° de série' mr='3'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' readOnly {...methods.register('n_serie')} />
        </FormContainer>
        <Button mt={7} mr={7}>
          <Icon as={FiSearch} />
        </Button>
        <FormContainer width='30%' label='Validade'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='date' readOnly {...methods.register('validade')} />
        </FormContainer>
      </Flex>
      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Ambiente de Destino' mr='3'>
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('ambiente')}>
            <option value='1'>Homologação</option>
            <option value='2'>Produção</option>
          </Select>
        </FormContainer>
        <FormContainer label='Tipo de impressão DANFE'>
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('tipo_imp')}>
            <option value='1'>Retrato</option>
            <option value='2'>Paisagem</option>
          </Select>
        </FormContainer>
      </Flex>
      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Forma de Emisão' mr='3'>
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('forma_emi')}>
            <option value='1'>Normal</option>
            <option value='2'>Contingência</option>
            <option value='3'>Contingência com SCAN</option>
            <option value='4'>Contingência via DPEC</option>
            <option value='5'>Contingência FSDA</option>
            <option value='6'>Contingência SVC-AN</option>
            <option value='7'>Contingência SVC-RS</option>
            <option value='8'>Contingência Offline</option>
          </Select>
        </FormContainer>
        <FormContainer label='Finalidade de Emissão'>
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('finalidade')}>
            <option value='1'>NFe normal</option>
            <option value='2'>NFe complementar</option>
            <option value='3'>NFe de ajuste</option>
            <option value='4'>Devolução/Retorno</option>
          </Select>
        </FormContainer>
      </Flex>
    </Flex>
  );
}
