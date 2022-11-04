import { Flex, Input, Select, Textarea, useColorMode } from "@chakra-ui/react";
import { FormContainer } from "../../../../../components/Form/FormContainer";

export function DadosFiscais() {
  const { colorMode } = useColorMode()

  return (
    <Flex w="58rem" h="30rem" gap="2" direction="column" justify="space-between">
      <Flex w="100%" justify="space-between" >
        <Flex direction="column" w="50%" mr={6}>
          <Flex gap="2">
            <FormContainer width="10rem" label="CST / CSOSN ICMS" >
              <Input id="cadastrado" type="text" w="10rem" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
            <FormContainer width="8rem" label="Alíquota ICMS" >
              <Input id="cadastrado" type="text" w="8rem" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
            <FormContainer width="6rem" label="Base" >
              <Input id="cadastrado" type="text" w="6rem" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer width="8rem" label="CST IPI" >
              <Input id="cadastrado" type="text" w="8rem" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
            <FormContainer width="8rem" label="Alíquota IPI" >
              <Input id="cadastrado" type="text" w="8rem" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer width="8rem" label="CST Cofins" >
              <Input id="cadastrado" type="text" w="8rem" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
            <FormContainer width="8rem" label="Alíquota Cofins" >
              <Input id="cadastrado" type="text" w="8rem" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer width="8rem" label="CST PIS" >
              <Input id="cadastrado" type="text" w="8rem" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
            <FormContainer width="8rem" label="Alíquota PIS" >
              <Input id="cadastrado" type="text" w="8rem" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
          </Flex>
        </Flex>
        <Flex direction="column" w="50%">
          <Flex gap="2">
            <FormContainer label="CFOP de Venda" width="8rem">
              <Input width="8rem" type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
            <FormContainer label="Produção Própria" width="8rem">
              <Select width="8rem" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"}>
                <option>Sim</option>
                <option selected>Não</option>
              </Select>
            </FormContainer>
            <FormContainer label="CNPJ do Produtor">
              <Input type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Classificação Fiscal (NCM)">
              <Input type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
            <FormContainer label="CEST">
              <Input type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Peso Bruto">
              <Input placeholder="0,0000 kg" type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
            <FormContainer label="Peso Líquido">
              <Input placeholder="0,0000 kg" type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
            <FormContainer label="Preço Trib.">
              <Input placeholder="Tributável" type="number" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} step={0.01} />
            </FormContainer>
            <FormContainer label="UN Trib.">
              <Input placeholder="Tributável" type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
            </FormContainer>
          </Flex>
          <FormContainer label="Origem Mercadoria">
            <Select borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"}>
              <option>0 - Nacional, exceto as indicadas nos códigos 3 a 5</option>
              <option>1 - Estrangeira - Importação direta, exceto a indicada no código 6</option>
              <option>2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7</option>
              <option>3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40%</option>
              <option>4 - Nacional, cuja produção tenha sido feita em conformidade com os processos...</option>
              <option>5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%</option>
              <option>6 - Estrangeira - Importação direta, sem similar nacional, constante em lista de Resolução CAMEX</option>
              <option>7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista de Resolução CAMEX e gás natural</option>
              <option>8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%</option>
            </Select>
          </FormContainer>
        </Flex>
      </Flex>
      <FormContainer label="Informações Adicionais">
        <Textarea borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} />
      </FormContainer>
    </Flex>
  )
}