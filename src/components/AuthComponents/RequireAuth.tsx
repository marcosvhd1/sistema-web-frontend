import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../Contexts/AuthProvider';
import { UnauthorizedUser } from '../../pages/Unauthorized';

interface IAuthProps {
  allowedRoles: number[],
}

export function RequireAuth({ allowedRoles }: IAuthProps) {
  const { auth } = useAuthContext();
  const location = useLocation();

  const teste = () => {
    console.log(auth?.token == localStorage.getItem('token')  );
    
  };

  useEffect(() => {
    teste();
    console.log(auth);
  }, []);

  return (
    // allowedRoles.some(el => [auth.permission].includes(el))
    auth?.permission?.find((role: number) => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.token == localStorage.getItem('token') 
        ? <UnauthorizedUser/>
        : <Navigate to="/" state={{ from: location }} />
  );
}
