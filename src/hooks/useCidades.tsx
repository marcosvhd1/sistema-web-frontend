import { useEffect, useState } from 'react';
import { CidadeService, ICidade } from '../services/api/cidades/CidadeService';
import { userInfos } from '../utils/header';

interface ICidadeProps {
  uf: string;
}

export function useCidades({ uf }: ICidadeProps) {
  const [cidadeOptions, setCidadeOptions] = useState<any[]>([]);

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    getCidadesByUF();
  }, [uf]);

  const formatCidadesForSelect = (cities: ICidade[]) => {
    return cities.map((cidade) => ({
      value: cidade.nome,
      label: cidade.nome,
    }));
  };
  
  const getCidadesByUF = () => {
    CidadeService.getByUF(uf, HEADERS).then((cities) => {
      if (cities != null) {
        const formattedCities = formatCidadesForSelect(cities);
        setCidadeOptions(formattedCities);
      }
    });
  };

  return {
    cidadeOptions
  };
}