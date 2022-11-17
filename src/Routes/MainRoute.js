import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SidebarProvider } from '../Contexts/SidebarContext';
import { SidebarDrawerProvider } from '../Contexts/SidebarDrawerContext';
import { SizeProvider } from '../Contexts/SizeContext';
import { ModalClientProvider } from '../Contexts/Modal/ClientContext';
import { ModalProductProvider } from '../Contexts/Modal/ProductContext';

import { Cliente } from '../pages/Cadastro/Cliente';
import { Home } from '../pages/Inicio';
import { Login } from '../pages/Login';
import { Produto } from '../pages/Cadastro/Produto';
import { Servico } from '../pages/Cadastro/Servico';
import { Transportadora } from '../pages/Cadastro/Transportadora';
import { AlertClientContextProvider } from '../Contexts/AlertDialog/AlertClientContext';
import { ModalServiceProvider } from '../Contexts/Modal/ServiceContext';
import { AlertServiceContextProvider } from '../Contexts/AlertDialog/AlertServiceContext';
import { AlertTransportadoraContextProvider } from '../Contexts/AlertDialog/AlertTransportadoraContext';
import { ModalTransportadoraProvider } from '../Contexts/Modal/TransportadoraContext';
import { AlertProductContextProvider } from '../Contexts/AlertDialog/AlertProductContext';
import { RequireAuth } from '../components/AuthComponents/RequireAuth';
import { Usuario } from '../pages/Configuracoes/Usuario';
import { PageNotFound } from '../pages/PageNotFound';

const ROLES = {
  'normal': 0,
  'admin': 1,
};

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <SizeProvider>
        <SidebarProvider>
          <SidebarDrawerProvider>
            <ModalClientProvider>
              <ModalProductProvider>
                <ModalServiceProvider>
                  <ModalTransportadoraProvider>
                    <AlertClientContextProvider>
                      <AlertServiceContextProvider>
                        <AlertTransportadoraContextProvider>
                          <AlertProductContextProvider>
                            <Routes>
                              <Route index element={<Login />} />

                              <Route element={<RequireAuth  allowedRoles={[ROLES.admin, ROLES.normal]} />}>
                                <Route path="/app" element={<Home />} />
                                <Route path="/app/cadastro/clientes" element={<Cliente />} />
                                <Route path="/app/cadastro/produtos" element={<Produto />} />
                                <Route path="/app/cadastro/servicos" element={<Servico />} />
                                <Route path="/app/cadastro/transportadora" element={<Transportadora />} />
                              </Route>
                              
                              <Route element={<RequireAuth  allowedRoles={[ROLES.admin]} />}>
                                <Route path="/app/usuarios" element={<Usuario />} />
                              </Route>

                              <Route path="*" element={<PageNotFound />} />
                            </Routes>
                          </AlertProductContextProvider>
                        </AlertTransportadoraContextProvider>
                      </AlertServiceContextProvider>
                    </AlertClientContextProvider>
                  </ModalTransportadoraProvider>
                </ModalServiceProvider>
              </ModalProductProvider>
            </ModalClientProvider>
          </SidebarDrawerProvider>
        </SidebarProvider>
      </SizeProvider>
    </BrowserRouter>
  );
}