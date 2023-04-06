import axios from 'axios';
import { useEffect, useState } from 'react';
import { ICidade } from '../services/api/cidades/CidadeService';

interface ICidadeProps {
  uf: string;
}

export function useCidades({ uf }: ICidadeProps) {
  const [cidades, setCidades] = useState<ICidade[]>([]);

  useEffect(() => {
    getCidadesByUF();
  }, [uf]);
  
  const getCidadesByUF = () => {
    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      .then((response) => {
        setCidades(response.data);
      });
  };

  return {
    cidades
  };
}