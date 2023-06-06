import axios from 'axios';
import { useEffect, useState } from 'react';
import { CidadeService, ICidade } from '../services/api/cidades/CidadeService';
import { userInfos } from '../utils/header';

interface ICidadeProps {
  uf: string;
}

export function useCidades({ uf }: ICidadeProps) {
  const [cidades, setCidades] = useState<ICidade[]>([]);

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    getCidadesByUF();
  }, [uf]);
  
  const getCidadesByUF = () => {
    CidadeService.getByUF(uf, HEADERS).then((cities) => {
      if (cities != null) setCidades(cities);
    });
  };

  return {
    cidades
  };
}