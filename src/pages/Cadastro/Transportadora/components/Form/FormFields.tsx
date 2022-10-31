import { Divider, Flex, Input, Select, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormContainer } from "../../../../../components/Form/FormContainer";
import { useCidades } from "../../../../../hooks/useCidades";
import { useEstados } from "../../../../../hooks/useEstados";
import { Itransportadora } from "../../../../../services/api/transportadora/TransportadoraService";

export function FormFields() {
  const [selectedEstadoVeiculo, setSelectedEstadoVeiculo] = useState<string>("")
  const [selectedEstado, setSelectedEstado] = useState<string>("")
  const { estados } = useEstados()
  const { cidades } = useCidades({ uf: selectedEstado })
  const { register } = useFormContext<Itransportadora>()
  const [cod, setCod] = useState<number>(1)

  return (
    <Flex direction="column" justify="space-between">
      <Text fontSize="xl">Dados Principais</Text>
      <Divider />
      <Flex gap="3" align="center">
        <FormContainer label="Código" width="5rem">
          <Input id="id" type="text" w="5rem" isReadOnly value={("0000" + cod).slice(-4)} {...register('cod')} />
        </FormContainer>
        <FormContainer label="Nome / Razão Social" isRequired={true}>
          <Input {...register('razao')} />
        </FormContainer>
      </Flex>
      <Flex>
        <FormContainer label="CPF / CNPJ">
          <Input id="cnpjcpf" type="text" w="12rem" {...register('cnpjcpf')} mr="3" />
        </FormContainer>
        <FormContainer label="Inscrição Estadual (IE)">
          <Input id="ie" type="text" w="10rem" {...register('ie')} mr="3" />
        </FormContainer>
        <FormContainer label="RNTRC">
          <Input id="antt" type="text" {...register('rntrc')} />
        </FormContainer>
      </Flex>
      <Text fontSize="xl" mt="5">Contatos</Text>
      <Divider />
      <Flex justify="space-between">
        <FormContainer label="Tipo" width="15rem">
          <Select w="auto" mr="3" {...register('tipo_telefone1')}>
            <option>Celular</option>
            <option>Comercial</option>
            <option>Residencial</option>
          </Select>
        </FormContainer>
        <FormContainer label="Número" width="auto">
          <Input type="tel" {...register('telefone1')} />
        </FormContainer>
      </Flex>
      <Flex align="center" justify="space-between">
        <FormContainer label="Tipo" width="15rem">
          <Select w="auto" mr="3" {...register('tipo_telefone2')}>
            <option>Celular</option>
            <option>Comercial</option>
            <option>Residencial</option>
          </Select>
        </FormContainer>
        <FormContainer label="Número" width="auto">
          <Input type="tel" {...register('telefone2')} />
        </FormContainer>
      </Flex>
      <Text fontSize="xl" mt="5">Endereço</Text>
      <Divider />
      <Flex gap="3" align="center">
        <FormContainer label="Rua">
          <Input id="logradouro" type="text" {...register('logradouro')} />
        </FormContainer>
        <FormContainer label="Nº" width="5rem">
          <Input id="numero" type="text" w="5rem" {...register('numero')} />
        </FormContainer>
      </Flex>
      <Flex gap="3" align="center">
        <FormContainer label="Bairro">
          <Input id="bairro" type="text" {...register('bairro')} />
        </FormContainer>
        <FormContainer label="CEP" width="10rem">
          <Input id="cep" type="number" w="10rem" {...register('cep')} />
        </FormContainer>
      </Flex>
      <Flex justify="space-between" align="center">
        <FormContainer label="UF" width="5rem">
          <Select {...register('uf')} w="5rem" value={selectedEstado} onChange={(event) => setSelectedEstado(event.target.value)}>
            <option value={""}></option>
            {estados.map(estado => <option key={estado.id} value={estado.sigla}>{estado.sigla}</option>)}
          </Select>
        </FormContainer>
        <FormContainer label="Cidade" width="22.5rem">
          <Select {...register('cidade')} w="22.5rem">
            {cidades.map(cidade => <option key={cidade.codigo_ibge}>{cidade.nome}</option>)}
          </Select>
        </FormContainer>
      </Flex>
      <FormContainer label="Complemento">
        <Input id="complemento" {...register('complemento')} />
      </FormContainer>
      <Text fontSize="xl" mt="5">Veículo</Text>
      <Divider />
      <Flex gap="2" align="center">
        <FormContainer label="Placa" width="10rem">
          <Input id="ie" type="text" w="10rem" {...register('placa')} />
        </FormContainer>
        <FormContainer label="UF" width="5rem">
          <Select {...register('uf_placa')} w="5rem" value={selectedEstadoVeiculo} onChange={(event) => setSelectedEstadoVeiculo(event.target.value)}>
            <option value={""}></option>
            {estados.map(estado => <option key={estado.id} value={estado.sigla}>{estado.sigla}</option>)}
          </Select>
        </FormContainer>
      </Flex>
      <FormContainer label="Anotações Gerais">
        <Textarea placeholder='Observações...' {...register('anotacoes')} />
      </FormContainer>
    </Flex>
  )
}