import { Button, Divider, Flex, Icon, Input, Select, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useFormContext, UseFormReturn } from 'react-hook-form';
import { FiCheckCircle, FiEdit, FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { useModalNFClient } from '../../../../../../../Contexts/Modal/NotaFiscal/NFClientContext';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { ModalNFClient } from './ModalNFClient';

interface DadosPrincipaisProps {
  methods: UseFormReturn<INotaFiscal, any>
}

export function FormDadosPrincipais({ methods }: DadosPrincipaisProps) {
  const { register, setFocus } = useFormContext<INotaFiscal>();
  const { onOpen } = useModalNFClient();
  
  const [block, setBlock] = useState<boolean>(true);
  
  const openModal = () => {
    onOpen();
  };

  const handleBlockInputCod = () => {
    setBlock(!block);

    if (block) {
      setFocus('cod');
    }
  };

  return (
    <FormProvider {...methods}>
      <Flex w="100%" justify="center" align="center" direction="column" >
        {/* DADOS PRINCIPAIS */}
        <Flex w="100%" mr="4" ml='4' align="center" justify="space-between">
          <FormContainer width='20%' label='Nº da NF'>
            <Input type="text" readOnly={block} {...register('cod')} />
          </FormContainer>
          <Button variant="ghost" colorScheme="orange" onClick={handleBlockInputCod} mt={7} ml={1} mr={3} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }}>
            <Icon color="orange.300" as={FiEdit} />
          </Button>

          <FormContainer width='15%' label='Série' mr='3'>
            <Input type="text" readOnly {...register('serie')} />
          </FormContainer>

          <FormContainer width='65%' label='Natureza de Operação' mr='3'>
            <Select {...register('natureza_operacao')}>
              <option value='razao'>Venda 5102</option>
              <option value='fantasia'>Compra 6204</option>
            </Select>
          </FormContainer>

          <FormContainer width='20%' label='CFOP'>
            <Input type="text" {...register('cfop')} />
          </FormContainer>
          <Button variant="ghost" colorScheme="green" onClick={() => null} mt={7} ml={1} mr={3} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }}>
            <Icon color="green.300" as={FiCheckCircle} />
          </Button>

          <FormContainer width='35%' label='Status'>
            <Input type="text" readOnly {...register('status')} />
          </FormContainer>
        </Flex>
        {/* OUTRAS INFOS */}
        <Flex w="100%" mb="4" mr="4" ml="4" align="center" justify="space-between">

          <FormContainer width='35%' label='Tipo' mr='3'>
            <Select {...register('tipo')}>
              <option value='0'>0 - Entrada</option>
              <option value='1'>1 - Saída</option>
            </Select>
          </FormContainer>
          <FormContainer width='40%' label='Forma de Emissão' mr='3'>
            <Select {...register('forma_emissao')}>
              <option value='normal'>Normal</option>
              <option value='contingencia'>Contingência</option>
              <option value='contingencia_scan'>Contingência com SCAN</option>
              <option value='contingencia_dpec'>Contingência via DPEC</option>
              <option value='contingencia_fsda'>Contingência FSDA</option>
              <option value='contingencia_svc_an'>Contingência SVC-AN</option>
              <option value='contingencia_svc_rs'>Contingência SVC-RS</option>
              <option value='contingencia_offline'>Contingência Offline</option>
            </Select>
          </FormContainer>
          <FormContainer width='40%' label='Finalidade' mr='3'>
            <Select {...register('finalidade')}>
              <option value='1'>1 - NF-e normal</option>
              <option value='2'>2 - NF-e complementar</option>
              <option value='3'>3 - NF-e de ajuste</option>
              <option value='4'>4 - Devolução/Retorno</option>
            </Select>
          </FormContainer>

          <FormContainer width='15%' label='Modelo' mr='3'>
            <Input type="text" readOnly {...register('modelo')} />
          </FormContainer>

          <FormContainer width='30%' label='Consumidor Final' >
            <Select {...register('consumidor_final')}>
              <option value='0'>0 - Não</option>
              <option value='1'>1 - Sim</option>
            </Select>
          </FormContainer>
        </Flex>
        {/* DADOS DESTINATARIO */}
        <Flex w="100%" align="center" justify="space-between">
          {/* DESTINATARIO */}
          <Flex w="100%" direction="column" mr='5'>
            <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap" mb={2} mt={2}>
              <Divider w="20%" />
              <Text w="max" mr={3} ml={3}>Dados do Destinatário / Remetente</Text>
              <Divider />
            </Flex>
            <Flex align="center" justify="space-between">

              <FormContainer width="20%" label='* Cód' mr='3'>
                <Input type="text" readOnly {...register('destinatario.cod')}/>
              </FormContainer>

              <FormContainer width="55%" label='* Nome / Razão Social' mr='3' >
                <Input type="text" readOnly {...register('destinatario.razao')}/>
              </FormContainer>

              <FormContainer width="25%" label='* CPF / CNPJ' >
                <Input type="text" readOnly {...register('destinatario.cnpjcpf')}/>
              </FormContainer>

            </Flex>
            <Flex align="center" justify="space-between">
              
              <FormContainer width="40%" label='* Endereço' mr='3' >
                <Input type="text" readOnly {...register('destinatario.logradouro')}/>
              </FormContainer>

              <FormContainer width="15%" label='* Nº' mr='3' >
                <Input type="text" readOnly {...register('destinatario.numero')}/>
              </FormContainer>

              <FormContainer width="20%" label='* Bairro' mr='3' >
                <Input type="text" readOnly {...register('destinatario.bairro')}/>
              </FormContainer>

              <FormContainer width="25%" label='* CEP' >
                <Input type="text" readOnly {...register('destinatario.cep')}/>
              </FormContainer>

            </Flex>
            <Flex align="center" justify="space-between">

              <FormContainer width="30%" label='* Cidade' mr='3' >
                <Input type="text" readOnly {...register('destinatario.cidade')}/>
              </FormContainer>

              <FormContainer width="15%" label='* UF' mr='3' >
                <Input type="text" readOnly {...register('destinatario.uf')}/>
              </FormContainer>

              <FormContainer width="25%" label='Telefone' mr='3' >
                <Input type="text" readOnly {...register('destinatario.telefone1')}/>
              </FormContainer>

              <FormContainer width="30%" label='Inscrição Estadual' >
                <Input type="text" readOnly {...register('destinatario.ie')}/>
              </FormContainer>

            </Flex>
            <Flex align="center" justify="space-between">

              <FormContainer width="35%" label='Complemento' mr='3' >
                <Input type="text" readOnly {...register('destinatario.complemento')}/>
              </FormContainer>

              <FormContainer width="25%" label='SUFRAMA' mr='3' >
                <Input type="text" readOnly {...register('destinatario.suframa')}/>
              </FormContainer>

              <FormContainer width="30%" label='País' mr='3' >
                <Input type="text" readOnly {...register('destinatario.pais')}/>
              </FormContainer>

              <Button onClick={openModal} w="15%" mt={7} fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue">
                <Icon mr={2} as={FiSearch} />
                Buscar
              </Button>
            </Flex>
          </Flex>
          <Flex w="25%" align="center" justify="space-between" direction="column" alignSelf="flex-start">
            <Flex w="100%" align="center" justify="space-between" whiteSpace="nowrap" mb={2} mt={2}>
              <Divider w="20%" />
              <Text w="max" mr={3} ml={3}>Data / Hora</Text>
              <Divider />
            </Flex>

            <FormContainer label='Data Emissão' >
              <Input type="date" {...register('data_emissao')}/>
            </FormContainer>

            <FormContainer label='Data Saída' >
              <Input type="date" {...register('data_saida')}/>
            </FormContainer>

            <FormContainer label='Hora Saída' >
              <Input type="time" {...register('hora')}/>
            </FormContainer>

          </Flex>
        </Flex>
        <ModalNFClient methods={methods}/>
      </Flex>
    </FormProvider>
  );
}
