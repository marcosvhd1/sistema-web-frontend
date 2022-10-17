import { useState, useEffect } from "react"
import axios from "axios"

export interface Icidade {
  nome: string;
  codigo_ibge: string;
}

export function useCidades({ uf }: { uf: string }) {
  const [cidades, setCidades] = useState<Icidade[]>([]);

  async function getCities() {
    await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      .then((response) => setCidades(response.data))
  }

  useEffect(() => {
    getCities()
  }, [uf])

  return {
    cidades
  }

}