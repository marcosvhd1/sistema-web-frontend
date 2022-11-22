import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UnauthorizedUser } from '../../pages/Unauthorized';

interface IAuthProps {
  allowedRoles: number[],
}

export function RequireAuth({ allowedRoles }: IAuthProps) {
  const location = useLocation();

  const LOCAL_DATA = JSON.parse(localStorage.getItem('user')!);
  const PERMISSION = LOCAL_DATA.user.permissao;

  return (
    allowedRoles.some(el => [PERMISSION].includes(el))
      ? <Outlet />
      : parseInt(PERMISSION) === 0
        ? <UnauthorizedUser/>
        : <Navigate to="/" state={{ from: location }} />
  );
}
