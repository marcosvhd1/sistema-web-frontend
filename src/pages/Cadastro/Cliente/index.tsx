import { useState, useEffect } from "react";
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
  razao: string,
  fantasia: string,
  cidade: string,
  uf: string,
  bairro: string,
  categoria: string,
  cnpjcpf: string,
}


export function Cliente() {
  const [data, setData] = useState<Data[]>()

  const getClientes = async () => {
    const response = await axios.get('http://192.168.15.121:3333/api/clientes')
  
    const cliente = response.data
  
    setData(cliente)
  }


  const headers: { key: string, label: string }[] = [
    { key: "id", label: "Código" },
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
      <SearchBox getCliente={getClientes}>
        <DataTable headers={headers}>
          {data != undefined ? data.map((d) => (
            <Tr key={d.id}>
              <Td>{d.id}</Td>
              <Td>{d.razao}</Td>
              <Td>{d.fantasia}</Td>
              <Td>{d.cnpjcpf}</Td>
              <Td>{d.bairro}</Td>
              <Td>{d.cidade}</Td>
              <Td>{d.uf}</Td>
              <Td>{d.categoria}</Td>
              <Td><Icon color="#F5DEB3" as={FiEdit} /> <Icon as={FiTrash2} color="#A52A2A" /></Td>
            </Tr>
          )) : ""}
        </DataTable>
      </SearchBox>
      <FormModal closeModal={getClientes}/>
    </MainContent>
  )
}
