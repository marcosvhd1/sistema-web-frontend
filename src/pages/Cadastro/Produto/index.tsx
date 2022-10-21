import { Icon, Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import MainContent from "../../../components/MainContent";
import { DataTable } from "../../../components/Table/DataTable";
import { ModalProduct } from "./components/ModalProduct";
import { SearchBox } from "./components/SearchBox";

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

export function Produto() {
  const [data, setData] = useState<Data[]>()

  const headers: { key: string, label: string }[] = [
    { key: "id", label: "Código" },
    { key: "referencia", label: "Referência" },
    { key: "descricao", label: "Descrição" },
    { key: "marca", label: "Marca" },
    { key: "grupo", label: "Grupo" },
    { key: "un", label: "UN" },
    { key: "preco", label: "Preço" },
    { key: "ncm", label: "NCM" },
  ]

  return (
    <MainContent>
      <SearchBox>
        {/* <DataTable headers={headers}>
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
        </DataTable> */}
      </SearchBox>
      <ModalProduct/>
    </MainContent>
  )
}