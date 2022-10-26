import { Flex, Input, Select } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form"
import { FormContainer } from "../../../../../components/Form/FormContainer";

type TelefoneProps = {
  tipo_telefone1: string;
  tipo_telefone2: string;
  tipo_telefone3: string;
  telefone1: string;
  telefone2: string;
  telefone3: string;
}

export function Telefone() {
  const { register, formState: { errors } } = useFormContext<TelefoneProps>();

  return (
    <Flex w="100%" direction="column">
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
      <Flex align="center" justify="center">
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
      <Flex align="center" justify="center">
        <FormContainer label="Tipo" width="15rem">
          <Select w="auto" mr="3" {...register('tipo_telefone3')}>
            <option>Celular</option>
            <option>Comercial</option>
            <option>Residencial</option>
          </Select>
        </FormContainer>
        <FormContainer label="Número" width="auto">
          <Input type="tel" {...register('telefone3')} />
        </FormContainer>
      </Flex>
    </Flex>
  )
}