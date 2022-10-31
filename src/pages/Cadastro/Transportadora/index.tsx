import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form"
import * as zod from "zod";
import { useToast } from "@chakra-ui/react";
import MainContent from "../../../components/MainContent";
import { DataTable } from "../../../components/Table/DataTable";
import { useAlertTransportadoraContext } from "../../../Contexts/AlertDialog/AlertTransportadoraContext";
import { ModalTransportadoraProvider, useModalTransportadora } from "../../../Contexts/Modal/TransportadoraContext";
import { Itransportadora } from "../../../services/api/transportadora/TransportadoraService";
import { FormModal } from "./components/Form/FormModal";
import { SearchBox } from "./components/SearchBox";
import { zodResolver } from "@hookform/resolvers/zod";

const newTransportadoraFormValidationSchema = zod.object({
  razao: zod.string(),
  cnpjcpf: zod.string(),
  ie: zod.string(),
  rntrc: zod.string(),
  logradouro: zod.string(),
  numero: zod.string(),
  bairro: zod.string(),
  cep: zod.string(),
  uf: zod.string(),
  cidade: zod.string(),
  complemento: zod.string(),
  tipo_telefone1: zod.string(),
  tipo_telefone2: zod.string(),
  telefone1: zod.string(),
  telefone2: zod.string(),
  anotacoes: zod.string(),
  placa: zod.string(),
  uf_placa: zod.string(),
})

const headers: { key: string, label: string }[] = [
  { key: "cod", label: "Código" },
  { key: "razao", label: "Nome / Razão Social" },
  { key: "cnpjcpf", label: "CPF / CNPJ" },
  { key: "bairro", label: "Bairro" },
  { key: "cidade", label: "Cidade" },
  { key: "uf", label: "UF" },
  { key: "telefone1", label: "Telefone 01" },
  { key: "telefone2", label: "Telefone 02" },
]

export function Transportadora() {
  const methods = useForm<Itransportadora>({
    resolver: zodResolver(newTransportadoraFormValidationSchema)
  })
  const [data, setData] = useState<Itransportadora[]>([])
  const [id, setId] = useState<number>(0)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editCod, setEditCod] = useState<number>(1)
  const { onOpen, onClose, isOpen } = useAlertTransportadoraContext()
  const { onOpen: openEditModal } = useModalTransportadora()
  /// pagination and search by filter
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<string>('descricao');
  const [description, setDescription] = useState<string>('');
  const [totalClients, setTotalClients] = useState<number>(0)
  const [limitRegistros, setLimitRegistros] = useState<number>(5)
  const [pages, setPages] = useState<number[]>([])
  ///////////////////////////////////
  const navigate = useNavigate()
  const toast = useToast()

  const getTransportadora = () => { }

  return (
    <ModalTransportadoraProvider>
      <FormProvider {...methods}>
        <MainContent>
          <SearchBox stateDescription={setDescription} changeEdit={setIsEditing} stateFilter={setFilter}>
            <DataTable headers={headers}>

            </DataTable>
          </SearchBox>
          <FormModal editCod={editCod} refreshPage={getTransportadora} id={id} isEditing={isEditing} />
        </MainContent>
      </FormProvider>
    </ModalTransportadoraProvider>
  )
}