import { Button, Flex, Icon, Input, Select, useColorMode } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../../components/Form/FormContainer';
import { IConfig } from '../../../services/api/config/ConfigService';

export function TabCertificado() {
  const methods = useFormContext<IConfig>();

  const { colorMode } = useColorMode();

  const onClickFile = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const base64Data = btoa(e.target!.result!.toString());
        methods.setValue('cert_base64', base64Data);
      };
      
      reader.readAsBinaryString(file);
    }
  };

  return (
    <Flex w='100%' justify='center' align='center' direction='column'>
      <Input id="fileInput" type="file" name="arquivo" onChange={handleFileUpload} display='none'/>
      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Certificado' width='50%' mr='3'>
          <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' readOnly {...methods.register('cert_base64')} />
        </FormContainer>
        <FormContainer label='Senha' width='35%' mr='3'>
          <Input borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type='text' {...methods.register('cert_senha')} />
        </FormContainer>
        <Button onClick={onClickFile} mt={7} w="15%" fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue">
          <Icon as={FiSearch} mr={2}/>
          Buscar
        </Button>
      </Flex>
      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Ambiente de Destino' mr='3'>
          <Select isRequired borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('ambiente')}>
            <option value='2'>Homologação</option>
            <option value='1'>Produção</option>
          </Select>
        </FormContainer>
        <FormContainer label='Tipo de impressão DANFE'>
          <Select isRequired borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('tipo_imp')}>
            <option value='1'>Retrato</option>
            <option value='2'>Paisagem</option>
          </Select>
        </FormContainer>
      </Flex>
      <Flex w='100%' justify='center' align='flex-start'>
        <FormContainer label='Forma de Emisão' mr='3'>
          <Select isRequired borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('forma_emi')}>
            <option value='1'>Normal</option>
            <option value='2'>Contingência</option>
            <option value='3'>Contingência com SCAN</option>
            <option value='4'>Contingência via DPEC</option>
            <option value='5'>Contingência FSDA</option>
          </Select>
        </FormContainer>
        <FormContainer label='Finalidade de Emissão'>
          <Select isRequired borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...methods.register('finalidade')}>
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
