import { useState, useEffect } from "react"
import axios from "axios"

export interface Icidade {
  nome: string;
  codigo_ibge: string;
}

export function useCidades({ uf }:{ uf: string}) {
  const [cidades, setCidades] = useState<Icidade[]>([]);
  
  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      .then((response) => setCidades(response.data))
  }, [uf])

  return {
    cidades
  }

}