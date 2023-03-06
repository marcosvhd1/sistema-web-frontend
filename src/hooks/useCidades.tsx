import { useState, useEffect } from 'react';
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
  
  const getCidadesByUF = async () => {
    const data = await CidadeService.getByUF(uf, HEADERS);
    
    if (data != null) {
      setCidades(data);
    }
  };

  return {
    cidades
  };
}