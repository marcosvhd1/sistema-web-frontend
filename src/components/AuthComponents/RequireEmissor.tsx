import { Outlet } from 'react-router-dom';
import { UnauthorizedUser } from '../../pages/Unauthorized';
import { getDecrypted } from '../../utils/crypto';

export function RequireEmissor() {
  const isEmissorSelected = getDecrypted(localStorage.getItem('emissor')) !== undefined;

  return (
    isEmissorSelected
      ? <Outlet />
      : <UnauthorizedUser/>
  );
}
