import { FormProvider, useForm } from "react-hook-form"
import MainContent from "../../../components/MainContent";
import { DataTable } from "../../../components/Table/DataTable";
import { FormModal } from "./components/Form/FormModal";


import { SearchBox } from "./components/SearchBox";

const headers: { key: string, label: string }[] = [
  { key: "cod", label: "Código" },
  { key: "descricao", label: "Descrição" },
  { key: "un", label: "UN" },
  { key: "preco", label: "Preço" },
  { key: "ncm", label: "NCM" },
]

export function Servico() {
  const methods = useForm()

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
