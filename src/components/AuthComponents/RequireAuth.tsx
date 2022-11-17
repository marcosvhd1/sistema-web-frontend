import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UnauthorizedUser } from '../../pages/Unauthorized';

interface IAuthProps {
  allowedRoles: number[],
}

const LOCAL_DATA = JSON.parse(localStorage.getItem('user')!);
const PERMISSION = LOCAL_DATA.user.permissao;


export function RequireAuth({ allowedRoles }: IAuthProps) {
  const location = useLocation();

  // const teste = async () => {
  //   const opt = {
  //     headers: {
  //       'Authorization': `Bearer ${auth.token}`
  //     }
  //   };
  //   const data = await Api().get('/token', opt);
  //   console.log(data);
  // };
  // setInterval(async () => await teste(), 1000);
  // useEffect(() => {
  //   teste();
  // },[]);

  return (
    allowedRoles.some(el => [PERMISSION].includes(el))
      ? <Outlet />
      : parseInt(PERMISSION) === 0
        ? <UnauthorizedUser/>
        : <Navigate to="/" state={{ from: location }} />
  );
}
