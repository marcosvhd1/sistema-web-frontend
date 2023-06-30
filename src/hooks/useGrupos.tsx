import { useEffect, useState } from 'react';
import { useEmissorContext } from '../Contexts/EmissorProvider';
import { ApiException } from '../services/api/ApiException';
import { GroupService, IGroup } from '../services/api/produtos/GroupService';
import { userInfos } from '../utils/header';

export function useGrupos() {
  const [grupos, setGrupos] = useState<IGroup[]>([]);

  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  useEffect(() => {
    getGrupos();
  }, []);

  useEffect(() => {
    getGrupos();
  }, [grupos]);
  
  const getGrupos = () => {
    GroupService.getAll(idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) console.log(result.message);
        else setGrupos(result.data);
      });
  };

  return {
    grupos,
    setGrupos,
    getGrupos,
  };
}