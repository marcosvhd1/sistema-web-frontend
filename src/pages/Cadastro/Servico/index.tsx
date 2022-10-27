import { useEffect, useState } from "react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form"

import { ServicoService } from "../../../services/api/servicos/ServicoService"


import MainContent from "../../../components/MainContent";
import { DataTable } from "../../../components/Table/DataTable";
import { FormModal } from "./components/Form/FormModal";
import { SearchBox } from "./components/SearchBox";
import { IServico } from "../../../services/api/servicos/ServicoService";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Button, Icon, Td, Tr } from "@chakra-ui/react";
import { ApiException } from "../../../services/api/ApiException";
import { DeleteAlertDialog } from "../../../components/utils/DeleteAlertDialog";

const newServiceFormValidationSchema = zod.object({
  descricao: zod.string(),
  un: zod.string(),
  preco: zod.number(),
  anotacoes: zod.string(),
  base_iss: zod.number(),
  aliquota_iss: zod.number(),
  situacao: zod.string(),
  item_lista: zod.string(),
  ncm: zod.string(),
})



const headers: { key: string, label: string }[] = [
  { key: "cod", label: "Código" },
  { key: "descricao", label: "Descrição" },
  { key: "un", label: "UN" },
  { key: "preco", label: "Preço" },
  { key: "ncm", label: "NCM" },
]

export function Servico() {
  const methods = useForm<IServico>({
    resolver: zodResolver(newServiceFormValidationSchema)
  })
  const [data, setData] = useState<IServico[]>([])
  const [id, setId] = useState<number>(0)

  useEffect(() => {
    getClients();
  }, [])

  const getClients = async () => {
    const response = await ServicoService.getAll()
    if (response instanceof ApiException) {
      alert(response.message);
    } else {
      setData(response)
    }
  }

  const handleOpenDialog = (id: number) => {
    
  }

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox>
          <DataTable headers={headers}>
            {data !== undefined ? data.map((data) => (
              <Tr key={data.id}>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.nserv}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.descricao}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.un}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.preco!! ? "R$ " + (data.preco).toString().replace('.', ',') : ""}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.ncm}</Td>
                <Td style={{ "textAlign": "center" }}>
                  <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => {}}>
                    <Icon color="orange.300" as={FiEdit} />
                  </Button>
                  <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleOpenDialog(data.id!)}>
                    <Icon as={FiTrash2} color="red.400" />
                  </Button>
                </Td>
              </Tr>
            )) : ""}
          </DataTable>
        </SearchBox>
        <FormModal />
        <DeleteAlertDialog label="Serviço" deleteFunction={() => {}} id={id} />
      </MainContent>
    </FormProvider>
  )
}
