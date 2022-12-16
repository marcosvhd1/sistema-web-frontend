import { createContext, ReactNode, useContext, useState } from 'react';
import { ApiException } from '../services/api/ApiException';
import { GroupService, IGroup } from '../services/api/produtos/GroupService';
import { getDecrypted } from '../utils/crypto';
import { userInfos } from '../utils/header';
import { useEmissorContext } from './EmissorProvider';

type GroupProviderProps = {
  children: ReactNode
}

interface IProductGroup {
  data: IGroup[]
  getDados: () => void
}

const GroupContext = createContext({} as IProductGroup);

export function ProductGroupProvider({ children }: GroupProviderProps) {
  const [data, setData] = useState<IGroup[]>([]);
  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();

  const HEADERS = userInfo.header;

  const getDados = async () => {
    GroupService.getAll(idEmissorSelecionado, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          setData(result.data);
        }
      });
  };


  return (
    <GroupContext.Provider value={{ data, getDados }}>
      {children}
    </GroupContext.Provider>
  );
}

export const useGroupContext = () => useContext(GroupContext);
