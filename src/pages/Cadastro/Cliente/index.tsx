import { useState } from "react";
import axios from "axios";

import { Icon, Td, Tr } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import MainContent from "../../../components/MainContent";
import { DataTable } from "../../../components/Table/DataTable";
import { SearchBox } from "./components/SearchBox";
import { FormModal } from "./components/Form/FormModal";

import { useForm, FormProvider } from "react-hook-form";

type Data = {
  id: number,
  nome: string,
  fantasia: string,
  cidade: string,
  uf: string,
  bairro: string,
  categoria: string,
  cnpjEcpf: string,
}

export function Cliente() {
  const [data, setData] = useState<Data[]>()




  // async function getClientes() {
  //   const response = await axios.get('http://192.168.15.124:3333/api/clients')

  //   const cliente = response.data

  //   setData(cliente)
  // }

  const headers: { key: string, label: string }[] = [
    { key: "id", label: "Código" },
    { key: "nome", label: "Nome / Razão Social" },
    { key: "fantasia", label: "Nome Fantasia" },
    { key: "cnpjEcpf", label: "CPF / CNPJ" },
    { key: "bairro", label: "Bairro" },
    { key: "cidade", label: "Cidade" },
    { key: "uf", label: "UF" },
    { key: "categoria", label: "Categoria" },
  ]

  return (
    <MainContent>
      <SearchBox>
        <DataTable headers={headers}>
          {data != undefined ? data.map((d) => (
            <Tr key={d.id}>
              <Td>{d.id}</Td>
              <Td>{d.nome}</Td>
              <Td>{d.fantasia}</Td>
              <Td>{d.cnpjEcpf}</Td>
              <Td>{d.bairro}</Td>
              <Td>{d.cidade}</Td>
              <Td>{d.uf}</Td>
              <Td>{d.categoria}</Td>
              <Td><Icon color="#F5DEB3" as={FiEdit} /> <Icon as={FiTrash2} color="#A52A2A" /></Td>
            </Tr>
          )) : ""}
        </DataTable>
      </SearchBox>
      <FormModal />
    </MainContent>
  )
}
