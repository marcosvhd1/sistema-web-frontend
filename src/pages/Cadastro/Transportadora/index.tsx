import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form"
import * as zod from "zod";
import { Button, Icon, Td, Tr, useToast } from "@chakra-ui/react";
import MainContent from "../../../components/MainContent";
import { DataTable } from "../../../components/Table/DataTable";
import { AlertTransportadoraContextProvider, useAlertTransportadoraContext } from "../../../Contexts/AlertDialog/AlertTransportadoraContext";
import { ModalTransportadoraProvider, useModalTransportadora } from "../../../Contexts/Modal/TransportadoraContext";
import { ITransportadora, TransportadoraService } from "../../../services/api/transportadora/TransportadoraService";
import { FormModal } from "./components/Form/FormModal";
import { SearchBox } from "./components/SearchBox";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiException } from "../../../services/api/ApiException";
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from "react-icons/fi";
import { Pagination } from "../../../components/Table/Pagination";
import { DeleteAlertDialog } from "../../../components/utils/DeleteAlertDialog";

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
  const methods = useForm<ITransportadora>({
    resolver: zodResolver(newTransportadoraFormValidationSchema)
  })
  const [data, setData] = useState<ITransportadora[]>([])
  const [id, setId] = useState<number>(0)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editCod, setEditCod] = useState<number>(1)
  const { onOpen, onClose, isOpen } = useAlertTransportadoraContext()
  const { onOpen: openEditModal } = useModalTransportadora()
  /// pagination and search by filter
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<string>('razao');
  const [description, setDescription] = useState<string>('');
  const [totalClients, setTotalClients] = useState<number>(0)
  const [limitRegistros, setLimitRegistros] = useState<number>(5)
  const [pages, setPages] = useState<number[]>([])
  ///////////////////////////////////
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    getTransportadora();
    navigate(`?page=${currentPage}&limit=${limitRegistros}`)
  }, [currentPage, description, limitRegistros, totalClients])

  useEffect(() => {
    handleChangeTotalPage();
  }, [totalClients])


  const handleChangeTotalPage = () => {
    const totalPages = Math.ceil(totalClients / limitRegistros)
    const arrayPages = []
    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i)
    }
    setPages(arrayPages);
  }

  const getTransportadora = () => {
    TransportadoraService.getTransportadoraByFilter(currentPage, limitRegistros, filter, description)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message)
        } else {
          setData(result.data)
          setTotalClients(parseInt(result.headers["qtd"]))
        }
      })
  }

  const handleDeleteService = (transportadoraId: number) => {
    TransportadoraService.deleteById(transportadoraId)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: "Transportadora excluída com sucesso.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
        }
      })
    onClose()
    setTotalClients(totalClients - 1)
  }

  const handleOpenDialog = (id2: number) => {
    onOpen();
    setId(id2);
    console.log(id)
  }

  const handleEditTransportadora = (id: number) => {
    const transportadoraToUpdate = data.find((transportadora) => transportadora.id === id)
    setId(id)
    openEditModal()
    setEditCod(transportadoraToUpdate?.cod!)
    methods.reset(transportadoraToUpdate)
    setIsEditing(true)
  }

  return (
      <FormProvider {...methods}>
        <MainContent>
          <SearchBox stateDescription={setDescription} changeEdit={setIsEditing} stateFilter={setFilter}>
            <DataTable headers={headers}>
              {data !== undefined ? data.map((data) => (
                <Tr key={data.id}>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{("0000" + data.cod).slice(-4)}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.razao}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cnpjcpf}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.bairro}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cidade}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.uf}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.telefone1}</Td>
                  <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.telefone2}</Td>
                  <Td style={{ "textAlign": "center" }}>
                    <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditTransportadora(data.id!)}>
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
          <FormModal editCod={editCod} refreshPage={getTransportadora} id={id} isEditing={isEditing} />
          <DeleteAlertDialog label="Transportadora" deleteFunction={handleDeleteService} onClose={onClose} isOpen={isOpen} id={id} />
        </MainContent>
      </FormProvider>
  )
}