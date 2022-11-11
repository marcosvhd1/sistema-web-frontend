import { createContext, useState, ReactNode, useContext } from 'react';

type AuthProviderProps = {
  children: ReactNode
}

interface IAuth {
  auth: any
  setAuth: (value: React.SetStateAction<any>) => void;
}

const AuthContext = createContext({} as IAuth);

export function AuthProvider({children}: AuthProviderProps) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);