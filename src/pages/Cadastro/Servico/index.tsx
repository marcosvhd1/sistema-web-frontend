import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form"
import MainContent from "../../../components/MainContent";
import { DataTable } from "../../../components/Table/DataTable";
import { FormModal } from "./components/Form/FormModal";
import { SearchBox } from "./components/SearchBox";
import { IServico } from "../../../services/api/servicos/ServicoService";

const newServiceFormValidationSchema = zod.object({
  descricao: zod.string(),
  un: zod.string(),
  preco: zod.number().optional(),
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

  return (
    <FormProvider {...methods}>
      <MainContent>
        <SearchBox>
          <DataTable headers={headers}>
            <h1>Servico</h1>
          </DataTable>
        </SearchBox>
        <FormModal />
      </MainContent>
    </FormProvider>
  )
}
