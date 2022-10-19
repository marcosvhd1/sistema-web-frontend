import { useState } from "react";

import { Button, Icon, Td, Tr, useDisclosure } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import MainContent from "../../../components/MainContent";
import { DataTable } from "../../../components/Table/DataTable";
import { SearchBox } from "./components/SearchBox";
import { FormModal } from "./components/Form/FormModal";

import { IClient, ClientService } from "../../../services/api/clientes/ClientService"
import { ApiException } from "../../../services/api/ApiException";
import { DeleteAlertDialog } from "../../../components/Utils/DeleteAlertDialog";
import { useAlertClientContext } from "../../../Contexts/AlertDialog/AlertClientContext";


export function Cliente() {
  const [data, setData] = useState<IClient[]>([])
  const [id, setId] = useState<number>(0)
  const { onOpen } = useAlertClientContext()

  const handleGetClients = async () => {
    ClientService.getAll()
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setData(result)
        }
      })
  }

  const handleOpenDialog = (id: number) => {
    onOpen()
    setId(id)
  }
  const headers: { key: string, label: string }[] = [
    { key: "cod", label: "Código" },
    { key: "razao", label: "Nome / Razão Social" },
    { key: "fantasia", label: "Nome Fantasia" },
    { key: "cnpjcpf", label: "CPF / CNPJ" },
    { key: "bairro", label: "Bairro" },
    { key: "cidade", label: "Cidade" },
    { key: "uf", label: "UF" },
    { key: "categoria", label: "Categoria" },
  ]

  return (
    <MainContent>
      <SearchBox getClients={handleGetClients}>
        <DataTable headers={headers}>
          {data != undefined ? data.map((data) => (
            <Tr key={data.id}>
              <Td>{data.cod}</Td>
              <Td>{data.razao}</Td>
              <Td>{data.fantasia}</Td>
              <Td>{data.cnpjcpf}</Td>
              <Td>{data.bairro}</Td>
              <Td>{data.cidade}</Td>
              <Td>{data.uf}</Td>
              <Td>{data.categoria}</Td>
              <Td>
                <Button variant="ghost" colorScheme="orange">
                  <Icon color="orange.300" as={FiEdit} />
                </Button>
                <Button variant="ghost" colorScheme="red" onClick={() => handleOpenDialog(data.id)}>
                  <Icon as={FiTrash2} color="red.400" />
                </Button>
              </Td>
            </Tr>
          )) : ""}
        </DataTable>
      </SearchBox>
      <FormModal getClients={handleGetClients} />
      <DeleteAlertDialog id={id} getClients={handleGetClients} />

    </MainContent>
  )
}
