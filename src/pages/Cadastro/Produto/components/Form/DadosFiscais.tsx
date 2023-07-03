import { Flex, Input, Select, Textarea, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormContainer } from '../../../../../components/Form/FormContainer';
import { IProduct } from '../../../../../services/api/produtos/ProductService';

export function DadosFiscais() {
  const { register } = useFormContext<IProduct>();
  const { colorMode } = useColorMode();

  return (
    <Flex w={{md: '51rem', lg: '58rem'}} h={{ md: '20rem', lg: '25rem', sm: '20rem'}} gap="2" direction="column">
      <Flex w="100%" justify="space-between" >
        <Flex direction="column" w="50%" mr={6}>
          <Flex gap="2">
            <FormContainer width="10rem" label="CST / CSOSN ICMS" >
              <Input maxLength={255} id="cst_icms" type="number" w="10rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('cst_icms', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
            <FormContainer width="8rem" label="Alíquota ICMS" >
              <Input maxLength={255} id="aliquota_icms" placeholder="0,00%" type="number" w="8rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('aliquota_icms', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
            <FormContainer width="6rem" label="Base" >
              <Input maxLength={255} id="base_icms" placeholder="0,00%" type="number" w="6rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('base_icms', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer width="8rem" label="CST IPI" >
              <Input maxLength={255} id="cst_ipi" type="number" w="8rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('cst_ipi', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
            <FormContainer width="8rem" label="Alíquota IPI" >
              <Input maxLength={255} id="aliquota_ipi" placeholder="0,00%" type="number" w="8rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('aliquota_ipi', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer width="8rem" label="CST Cofins" >
              <Input maxLength={255} id="cst_cofins" type="number" w="8rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('cst_cofins', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
            <FormContainer width="8rem" label="Alíquota Cofins" >
              <Input maxLength={255} id="aliquota_cofins" placeholder="0,00%" type="number" w="8rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('aliquota_cofins', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer width="8rem" label="CST PIS">
              <Input maxLength={255} id="cst_pis" type="number" w="8rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('cst_pis', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
            <FormContainer width="8rem" label="Alíquota PIS" >
              <Input maxLength={255} placeholder="0,00%" id="cadastrado" type="number" w="8rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('aliquota_pis', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
          </Flex>
        </Flex>
        <Flex direction="column" w="50%">
          <Flex gap="2">
            <FormContainer label="CFOP de Venda" width="8rem">
              <Input maxLength={255} id="cfop" width="8rem" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('cfop')} />
            </FormContainer>
            <FormContainer label="Produção Própria" width="8rem">
              <Select defaultValue="nao" id="producao_propria" width="8rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('producao_propria')}>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </Select>
            </FormContainer>
            <FormContainer label="CNPJ do Produtor">
              <Input maxLength={255} id="cnpj_produtor" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('cnpj_produtor')} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Classificação Fiscal (NCM)">
              <Input maxLength={255} id="ncm" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('ncm')} />
            </FormContainer>
            <FormContainer label="CEST">
              <Input maxLength={255} id="cest" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('cest')} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Peso Bruto">
              <Input maxLength={255} id="peso_bruto" placeholder="0,000kg" type="number" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('peso_bruto', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
            <FormContainer label="Peso Líquido">
              <Input maxLength={255} id="peso_liquido" placeholder="0,000kg" type="number" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('peso_liquido', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
            <FormContainer label="Preço Trib.">
              <Input maxLength={255} id="preco_trib" placeholder="Tributável" type="number" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} step={0.01} {...register('preco_trib', {
                setValueAs: (value) => value === '' ? 0 : parseFloat(value),
              })} />
            </FormContainer>
            <FormContainer label="UN Trib.">
              <Input maxLength={255} id="un_trib" placeholder="Tributável" type="text" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('un_trib')} />
            </FormContainer>
          </Flex>
          <FormContainer label="Origem Mercadoria">
            <Select id="origem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('origem')}>
              <option value="0">0 - Nacional, exceto as indicadas nos códigos 3 a 5</option>
              <option value="1">1 - Estrangeira - Importação direta, exceto a indicada no código 6</option>
              <option value="2">2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7</option>
              <option value="3">3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40%</option>
              <option value="4">4 - Nacional, cuja produção tenha sido feita em conformidade com os processos...</option>
              <option value="5">5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%</option>
              <option value="6">6 - Estrangeira - Importação direta, sem similar nacional, constante em lista de Resolução CAMEX</option>
              <option value="7">7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista de Resolução CAMEX e gás natural</option>
              <option value="8">8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%</option>
            </Select>
          </FormContainer>
        </Flex>
      </Flex>
      <FormContainer label="Informações Adicionais">
        <Textarea id="info_adicional" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} {...register('info_adicional')} />
      </FormContainer>
    </Flex>
  );
}

