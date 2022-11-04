import { Button, useColorMode, Checkbox, Flex, FormControl, FormLabel, Icon, IconButton, Input, Radio, Select, Switch, Textarea } from "@chakra-ui/react"
import moment from "moment"
import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { FcPlus } from "react-icons/fc"
import { FormContainer } from "../../../../../components/Form/FormContainer"
import { IProduct, ProductService } from "../../../../../services/api/produtos/ProductService"

interface IFormFields {
  editCod: number
  isEditing: boolean
}

export function DadosPrincipais({ editCod, isEditing }: IFormFields) {
  const { register } = useFormContext<IProduct>();
  const [cod, setCod] = useState<number>(1);
  const [active, setActive] = useState<boolean>(true)
  const { colorMode } = useColorMode()

  useEffect(() => {
    ProductService.getLastCod()
      .then((result) => {
        if (isEditing) {
          setCod(editCod)
        } else {
          if (result === null) {
            setCod(1)
          } else {
            setCod(parseInt(result) + 1)
          }
        }
      })
  }, [])




  return (
    <Flex w="58rem" h="25rem" gap="2" direction="column" justify="space-between">
      <Flex w="100%" >
        {/* lado a */}
        <Flex direction="column" w="50%" mr={6}>
          <Flex gap="2">
            <FormContainer label="Código" width="5rem">
              <Input id="nprod" type="text" w="5rem" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} isReadOnly value={("0000" + cod).slice(-4)} {...register('nprod')} />
            </FormContainer>
            <FormContainer label="Descrição">
              <Input id="descricao" type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} {...register('descricao')} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Referência" >
              <Input id="referencia" type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} {...register('referencia')} />
            </FormContainer>
            <FormContainer label="Código de Barras">
              <Input id="codbarras" type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} {...register('codbarras')} />
            </FormContainer>
          </Flex>
          <Flex gap="2">
            <FormContainer label="Preço">
              <Input id="preco" placeholder="R$0,00"type="number" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} step={0.01} {...register('preco', {
                setValueAs: (value) => value === "" ? 0 : parseFloat(value),
              })} />
            </FormContainer>
            <FormContainer label="UN">
              <Input id="un" type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} {...register("un")} />
            </FormContainer>
          </Flex>
        </Flex>
        <Flex direction="column" w="50%">
          <Flex align="center" gap="2" justify="space-between">
            <FormContainer label="Marca" >
              <Select id="marca" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} >

              </Select>
            </FormContainer>
            <Button mt="3rem">
              <Icon fontSize="2xl" width="2rem" as={FcPlus} />
            </Button>
          </Flex>
          <Flex align="center" gap="2" justify="space-between">
            <FormContainer label="Grupo">
              <Select id="grupo" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"}>

              </Select>
            </FormContainer>
            <Button mt="3rem">
              <Icon fontSize="2xl" width="2rem" as={FcPlus} />
            </Button>
          </Flex>
          <Flex w="100%" justify="space-between">
            <FormContainer label="Status" width="6rem">
              <Checkbox id="status" onChange={() => setActive(!active)} isChecked={active} size="lg" colorScheme="green">
                {active ? "Ativo" : "Inativo"}
              </Checkbox>
            </FormContainer>
            <FormContainer width="8rem" label="Cadastrado" >
              <Input id="cadastrado" type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} w="8rem" isReadOnly value={moment().format("DD/MM/YYYY")} />
            </FormContainer>
            <FormContainer width="8rem" label="Alterado" >
              <Input id="alterado" type="text" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} w="8rem" isReadOnly value={moment().format("DD/MM/YYYY")} />
            </FormContainer>
          </Flex>
        </Flex>
      </Flex>
      <FormContainer label="Anotações">
        <Textarea id="anotacoes" borderColor={colorMode === 'light' ? "blackAlpha.600" : "gray.600"} {...register('anotacoes')}/>
      </FormContainer>
    </Flex>
  )
}