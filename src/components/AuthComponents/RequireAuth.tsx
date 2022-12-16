import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UnauthorizedUser } from '../../pages/Unauthorized';
import { getDecrypted } from '../../utils/crypto';

interface IAuthProps {
  allowedRoles: number[],
}

export function RequireAuth({ allowedRoles }: IAuthProps) {
  const location = useLocation();

  const LOCAL_DATA = getDecrypted(localStorage.getItem('user'));

  const PERMISSION = LOCAL_DATA.user.permissao;

  const PRINCIPAL = LOCAL_DATA.user.principal;

  return (
    allowedRoles.some(el => [PERMISSION].includes(el))
      ? <Outlet />
      //comentar as duas linhas abaixo caso seja para permitir outros usuarios tipo admin a acessar a rota de cadastro de emissor
      : PRINCIPAL === 'Sim'
        ? <Outlet />
        : parseInt(PERMISSION) === 0
          ? <UnauthorizedUser/>
          : <Navigate to="/" state={{ from: location }} />
  );
}
