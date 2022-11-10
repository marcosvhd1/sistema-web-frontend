import { useEffect, useState } from "react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form"
import { IProduct, ProductService } from "../../../services/api/produtos/ProductService";
import { Button, Icon, Td, Tr, useToast } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2 } from "react-icons/fi";
import MainContent from "../../../components/MainContent";
import { DataTable } from "../../../components/Table/DataTable";
import { FormModal } from "./components/Form/ModalProduct";
import { SearchBox } from "./components/SearchBox";
import { useAlertProductContext } from "../../../Contexts/AlertDialog/AlertProductContext";
import { useModalProduct } from "../../../Contexts/Modal/ProductContext";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../../components/Table/Pagination";
import { ApiException } from "../../../services/api/ApiException";
import { DeleteAlertDialog } from "../../../components/Utils/DeleteAlertDialog";

const headers: { key: string, label: string }[] = [
  { key: "id", label: "Código" },
  { key: "descricao", label: "Descrição" },
  { key: "referencia", label: "Referência" },
  { key: "marca", label: "Marca" },
  { key: "grupo", label: "Grupo" },
  { key: "un", label: "UN" },
  { key: "preco", label: "Preço" },
  { key: "ncm", label: "NCM" },
  {key: "status", label: "Status"}
]

const newProductFormValidationSchema = zod.object({
  descricao: zod.string(),
  referencia: zod.string(),
  codbarras: zod.string(),
  marca: zod.string(),
  grupo: zod.string(),
  preco: zod.number(),
  preco_trib: zod.number(),
  un: zod.string(),
  un_trib: zod.string(),
  status: zod.string(),
  anotacoes: zod.string(),
  cst_icms: zod.number(),
  aliquota_icms: zod.number(),
  base_icms: zod.number(),
  cst_ipi: zod.number(),
  aliquota_ipi: zod.number(),
  cst_cofins: zod.number(),
  aliquota_cofins: zod.number(),
  cst_pis: zod.number(),
  aliquota_pis: zod.number(),
  info_adicional: zod.string(),
  ncm: zod.string(),
  cest: zod.string(),
  cnpj_produtor: zod.string(),
  producao_propria: zod.string(),
  cfop: zod.string(),
  origem: zod.string(),
  peso_bruto: zod.number(),
  peso_liquido: zod.number(),

})

export function Produto() {
  const methods = useForm<IProduct>()
  const [data, setData] = useState<IProduct[]>([])
  const [id, setId] = useState<number>(0)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editCod, setEditCod] = useState<number>(1)
  const { onOpen, onClose, isOpen } = useAlertProductContext()
  const { onOpen: openEditModal } = useModalProduct()
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

  useEffect(() => {
    getProduct();
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

  const getProduct = () => {
    ProductService.getProductByFilter(currentPage, limitRegistros, filter, description)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data)
          setTotalClients(parseInt(result.headers["qtd"]))
        }
      })
  }

  const handleDeleteProduct = (clientId: number) => {
    ProductService.deleteById(clientId)
      .then((result) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          toast({
            position: 'top',
            title: 'Operação concluída.',
            description: "Produto excluído com sucesso.",
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
    onOpen();
    setId(id);
  }

  const handleEditService = async (id: number) => {
    const productToUpdate = data.find((product) => product.id === id)
    setId(id)
    openEditModal()
    setEditCod(productToUpdate?.nprod!)
    methods.reset(productToUpdate)
    setIsEditing(true)
  }



  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox setDescription={setDescription} changeEdit={setIsEditing} setFilter={setFilter}>
          <DataTable headers={headers}>
            {data != undefined ? data.map((data) => (
              <Tr key={data.id}>
                <Td style={{ "width": "1rem" }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{("0000" + data.nprod).slice(-4)}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.descricao}</Td>
                <Td style={{ "width": "1rem" }} fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.referencia}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.marca}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.grupo}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.un}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.preco}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.ncm}</Td>
                <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.status}</Td>
                <Td style={{ "textAlign": "center" }}>
                  <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleEditService(data.id!)}>
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
        <FormModal editCod={editCod} refreshPage={getProduct} id={id} isEditing={isEditing} />
        <DeleteAlertDialog label="Produto" deleteFunction={handleDeleteProduct} onClose={onClose} isOpen={isOpen} id={id} />
      </MainContent>
    </FormProvider>
  )
}
