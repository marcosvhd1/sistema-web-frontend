import { useState, useEffect } from "react"
import axios from "axios"

export interface Regiao {
  id: number;
  sigla: string;
  nome: string;
}

export interface IEstado {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

export function useEstados() {
  const [estados, setEstados] = useState<IEstado[]>([]);

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => setEstados(response.data))
  }, [])

  return {
    estados
  }
}