import { useEffect, useState } from "react";
import * as zod from "zod";
import { useNavigate } from "react-router-dom";

import { Button, Icon, Td, Tr } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from "react-icons/fi";

import MainContent from "../../../components/MainContent";
import { DataTable } from "../../../components/Table/DataTable";
import { FormModal } from "./components/Form/FormModal";
import { SearchBox } from "./components/SearchBox";
import { DeleteAlertDialog } from "../../../components/Utils/DeleteAlertDialog";

import { ApiException } from "../../../services/api/ApiException";

import { useAlertClientContext } from "../../../Contexts/AlertDialog/AlertClientContext";
import { ClientService, IClient } from "../../../services/api/clientes/ClientService";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useModalClient } from "../../../Contexts/Modal/ClientContext";
import { Api } from "../../../services/api/ApiConfig";
import { Pagination } from "../../../components/Table/Pagination";


const newClientFormValidationSchema = zod.object({
  tipo: zod.string(),
  categoria: zod.string(),
  razao: zod.string(),
  fantasia: zod.string(),
  cnpjcpf: zod.string(),
  rg: zod.string(),
  ie: zod.string(),
  im: zod.string(),
  suframa: zod.string(),
  tipo_contribuinte: zod.string(),
  logradouro: zod.string(),
  numero: zod.string(),
  bairro: zod.string(),
  cep: zod.string(),
  uf: zod.string(),
  cidade: zod.string(),
  complemento: zod.string(),
  observacao: zod.string(),
  tipo_telefone1: zod.string(),
  tipo_telefone2: zod.string(),
  tipo_telefone3: zod.string(),
  telefone1: zod.string(),
  telefone2: zod.string(),
  telefone3: zod.string(),
  email1: zod.string(),
  email2: zod.string(),
  site: zod.string(),
})

export function Cliente() {
  const [data, setData] = useState<IClient[]>([])
  const [id, setId] = useState<number>(0)
  const [isEditing, setIsEditing] = useState(false)
  const { onOpen } = useAlertClientContext()
  const { onOpen: open } = useModalClient()
  const methods = useForm<IClient>({
    resolver: zodResolver(newClientFormValidationSchema)
  })
  ////////////////////////////////////////////////////////////////
  const [totalClients, setTotalClients] = useState<number>(0)
  const [limitRegistros, setLimitRegistros] = useState(5)
  const [pages, setPages] = useState<number[]>([])
  const [currentPage, setCurrantPage] = useState<number>(1)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadClients() {
      const response = await Api().get(`/clientes?page=${currentPage}&limit=${limitRegistros}`)
      setTotalClients(parseInt(response.headers["qtd"]!))
      const totalPages = Math.ceil(totalClients / limitRegistros)
      const arrayPages = []
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i)
      }
      setPages(arrayPages);
      setData(response.data)
    }
    navigate(`?page=${currentPage}&limit=${limitRegistros}`)
    loadClients()
  }, [totalClients, limitRegistros, currentPage])



/*
$fim = ($pagina $totalPagina); //Multiplicamos a página atual pela quantidade de itens por página: P=4 I= 5 | 4 5 = 20;

$inicio = ($fim - $totalPagina); //Subtraimos o total de páginas pela quantidade final a ser exibido: FIM = 20 Tot. Pag. = 5 | 20 - 5 = 15

ta ai a logica

só dale

ali onde começa o negrito

é *

pagina x totalpagina
*/


  ////////////////////////////////////////////////////////////////
  

  const changeEdit = () => {
    setIsEditing(false)
  }

  const handleGetClients = () => {
    ClientService.getAll({currentPage, limit: limitRegistros})
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

  const handleEditClient = (id: number) => {
    const clientToUpdate = data.find((client) => client.id === id)
    setId(id)
    methods.reset(clientToUpdate)
    open()
    setIsEditing(true)
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
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox getClients={handleGetClients} changeEdit={changeEdit}>
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
                  <Button variant="ghost" colorScheme="orange" onClick={() => handleEditClient(data.id!)}>
                    <Icon color="orange.300" as={FiEdit} />
                  </Button>
                  <Button variant="ghost" colorScheme="red" onClick={() => handleOpenDialog(data.id!)}>
                    <Icon as={FiTrash2} color="red.400" />
                  </Button>
                </Td>
              </Tr>
            )) : ""}
          </DataTable>
          <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalClients}>
            {currentPage > 1 && (
              <Button variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrantPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            )}
            {pages.map(page => (
              <Button
                key={page}
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="purple"
                onClick={() => setCurrantPage(page)}
                isActive={currentPage === page}
              >
                {page}
              </Button>
            ))}
            {currentPage < pages.length && (
            <Button variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrantPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
            )}
          </Pagination>
        </SearchBox>
        <FormModal getClients={handleGetClients} isEditing={isEditing} changeEdit={changeEdit} id={id} />
        <DeleteAlertDialog id={id} getClients={handleGetClients} />
      </MainContent>
    </FormProvider>
  )
}
