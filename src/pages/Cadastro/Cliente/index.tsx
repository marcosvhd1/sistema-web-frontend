import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Icon, Td, Tr, useToast } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from "react-icons/fi";

import MainContent from "../../../components/MainContent";
import { DataTable } from "../../../components/Table/DataTable";
import { DeleteAlertDialog } from "../../../components/utils/DeleteAlertDialog";
import { FormModal } from "./components/Form/FormModal";
import { SearchBox } from "./components/SearchBox";
import { Pagination } from "../../../components/Table/Pagination";

import { ApiException } from "../../../services/api/ApiException";
import { Api } from "../../../services/api/ApiConfig";
import { ClientService, IClient } from "../../../services/api/clientes/ClientService";

import { useAlertClientContext } from "../../../Contexts/AlertDialog/AlertClientContext";
import { useModalClient } from "../../../Contexts/Modal/ClientContext";

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
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lastCod, setLastCod] = useState<number>(1)
  const [filter, setFilter] = useState<string>('razao');
  const [description, setDescription] = useState<string>('');
  const [totalClients, setTotalClients] = useState<number>(0)
  const [limitRegistros, setLimitRegistros] = useState(5)
  const [pages, setPages] = useState<number[]>([])
  const navigate = useNavigate()
  const toast = useToast()
  const { onClose } = useAlertClientContext()
  const methods = useForm<IClient>({
    resolver: zodResolver(newClientFormValidationSchema)
  })

  useEffect(() => {
    getClientsByFilter();
    navigate(`?page=${currentPage}&limit=${limitRegistros}`)
  }, [currentPage, description, limitRegistros, totalClients]);

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients]);

  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalClients / limitRegistros)
    const arrayPages = []
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i)
    }
    setPages(arrayPages);
  }

  const getLastCod = async () => {
    const response = await Api().get('/cod/clientes')
    const { max } = response.data.rows[0];
    setLastCod(max + 1)
  }

  const getClientsByFilter = async () => {
    await Api().get(`/cadastro/clientes?page=${currentPage}&limit=${limitRegistros}&filter=${filter}&description=${description}`)
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setData(result.data)
          setTotalClients(parseInt(result.headers["qtd"]!))
        }
      })
  }
  
  const HandleDeleteClient = (clientId: number) => {
    ClientService.deleteById(clientId)
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: "Cliente excluido com sucesso.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
        }
      })
    onClose()
    setTotalClients(totalClients - 1)
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
        <SearchBox onSubmit={getClientsByFilter} changeEdit={setIsEditing} getLastCod={getLastCod} stateDescription={setDescription} stateFilter={setFilter}>
          <DataTable headers={headers} >
            {data !== undefined ? data.map((data) => (
              <Tr key={data.id}>
                <Td style={{ "width": "1rem" }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cod}</Td>
                <Td style={{ "width": "1rem" }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.razao}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.fantasia}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cnpjcpf}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.bairro}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cidade}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.uf}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.categoria}</Td>
                <Td style={{ "textAlign": "center" }}>
                  <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditClient(data.id!)}>
                    <Icon color="orange.300" as={FiEdit} />
                  </Button>
                  <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleOpenDialog(data.id!)}>
                    <Icon as={FiTrash2} color="red.400" />
                  </Button>
                </Td>
              </Tr>
            )) : ""}
          </DataTable>
          <Pagination currentPage={currentPage} limitRegistros={limitRegistros} totalClients={totalClients} changeLimitRegister={setLimitRegistros}>
            <Button isDisabled={currentPage === 1} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage - 1)}><Icon as={FiChevronLeft} /></Button>
            <Button isDisabled={currentPage === pages.length || data.length === 0} variant="ghost" size="sm" fontSize="2xl" width="4" onClick={() => setCurrentPage(currentPage + 1)}><Icon as={FiChevronRight} /></Button>
          </Pagination>
        </SearchBox>
        <FormModal refreshPage={getClientsByFilter} lastCod={lastCod} isEditing={isEditing} changeEdit={setIsEditing} id={id} />
        <DeleteAlertDialog label="Cliente" deleteFunction={HandleDeleteClient} id={id} />
      </MainContent>
    </FormProvider>
  )
}
