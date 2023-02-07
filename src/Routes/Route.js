import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SidebarProvider } from '../Contexts/SidebarContext';
import { SidebarDrawerProvider } from '../Contexts/SidebarDrawerContext';
import { SizeProvider } from '../Contexts/SizeContext';

import { RequireAuth } from '../components/AuthComponents/RequireAuth';
import { RequireEmissor } from '../components/AuthComponents/RequireEmissor';

import { AlertClientContextProvider } from '../Contexts/AlertDialog/AlertClientContext';
import { AlertEmissorContextProvider } from '../Contexts/AlertDialog/AlertEmissorContext';
import { AlertProductContextProvider } from '../Contexts/AlertDialog/AlertProductContext';
import { AlertProductGroupContextProvider } from '../Contexts/AlertDialog/AlertProductGroupContext';
import { AlertServiceContextProvider } from '../Contexts/AlertDialog/AlertServiceContext';
import { AlertTransportadoraContextProvider } from '../Contexts/AlertDialog/AlertTransportadoraContext';
import { AlertNFProductContextProvider } from '../Contexts/AlertDialog/NotaFiscal/AlertNFProductContext';
import { AlertNFServiceContextProvider } from '../Contexts/AlertDialog/NotaFiscal/AlertNFServiceContext';

import { EmissorProvider } from '../Contexts/EmissorProvider';
import { ProductGroupProvider } from '../Contexts/ProductGroupContext';

import { ModalProductProvider } from '../Contexts/Modal/ProductContext';
import { ModalClientProvider } from '../Contexts/Modal/ClientContext';
import { ModalChangePasswordProvider } from '../Contexts/Modal/ChangePasswordContext';
import { ModalEmissorProvider } from '../Contexts/Modal/EmissorContext';
import { ModalGroupProvider } from '../Contexts/Modal/GroupConxtext';
import { ModalNewEmissorProvider } from '../Contexts/Modal/NewEmissorContext';
import { ModalNFClientProvider } from '../Contexts/Modal/NotaFiscal/NFClientContext';
import { ModalNFProductProvider } from '../Contexts/Modal/NotaFiscal/NFProductContext';
import { ModalNFSearchProductProvider } from '../Contexts/Modal/NotaFiscal/NFProductSearchContext';
import { ModalNFServiceProvider } from '../Contexts/Modal/NotaFiscal/NFServiceContext';
import { ModalNFSearchServiceProvider } from '../Contexts/Modal/NotaFiscal/NFServiceSearchContext';
import { ModalServiceProvider } from '../Contexts/Modal/ServiceContext';
import { ModalTransportadoraProvider } from '../Contexts/Modal/TransportadoraContext';
import { ModalUserProvider } from '../Contexts/Modal/UserContext';

import { CadastroNotaFiscal } from '../pages/Cadastro/NotaFiscal/components/Form/FormIndex';
import { Cliente } from '../pages/Cadastro/Cliente';
import { NotaFiscal } from '../pages/Cadastro/NotaFiscal';
import { Produto } from '../pages/Cadastro/Produto';
import { Servico } from '../pages/Cadastro/Servico';
import { Transportadora } from '../pages/Cadastro/Transportadora';
import { Emissor } from '../pages/Emissor';
import { Home } from '../pages/Inicio';
import { Login } from '../pages/Login';
import { PageNotFound } from '../pages/PageNotFound';
import { UnauthorizedUser } from '../pages/Unauthorized';

const ROLES = {
  'normal': 0,
  'admin': 1,
  'principal': 'Sim'
};

export default function MainRoutes() {
  return (
    <BrowserRouter>

      <SizeProvider>
        <SidebarProvider>
          <SidebarDrawerProvider>

            <EmissorProvider>

              <ModalClientProvider>
                <ModalProductProvider>
                  <ModalGroupProvider>
                    <ModalServiceProvider>
                      <ModalTransportadoraProvider>
                        <ModalEmissorProvider>
                          <ModalUserProvider>
                            <ModalChangePasswordProvider>
                              <ModalNewEmissorProvider>
                                <ModalNFClientProvider>
                                  <ModalNFProductProvider>
                                    <ModalNFSearchProductProvider>
                                      <ModalNFServiceProvider>
                                        <ModalNFSearchServiceProvider>

                                          <AlertClientContextProvider>
                                            <AlertServiceContextProvider>
                                              <AlertTransportadoraContextProvider>
                                                <AlertProductContextProvider>
                                                  <AlertEmissorContextProvider>
                                                    <AlertProductGroupContextProvider>
                                                      <AlertNFProductContextProvider>
                                                        <AlertNFServiceContextProvider>                                                     

                                                          <ProductGroupProvider>

                                                            <Routes>
                                                              <Route index element={<Login />} />

                                                              <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.normal]} />}>
                                                                <Route path="/app" element={<Home />} />
                                                                <Route path="/app/unauthorized" element={<UnauthorizedUser />} />
                                                                <Route element={<RequireEmissor />}>
                                                                  <Route path="/app/cadastro/clientes" element={<Cliente />} />
                                                                  <Route path="/app/cadastro/produtos" element={<Produto />} />
                                                                  <Route path="/app/cadastro/servicos" element={<Servico />} />
                                                                  <Route path="/app/cadastro/transportadora" element={<Transportadora />} />
                                                                  <Route path="/app/fiscal/nfe" element={<NotaFiscal />} />
                                                                  <Route path="/app/fiscal/nfe/cadastro" element={<CadastroNotaFiscal />} />
                                                                </Route>
                                                              </Route>

                                                              <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                                                                <Route path='/app/emissor' element={<Emissor />} />
                                                              </Route>

                                                              <Route path="*" element={<PageNotFound />} />
                                                            </Routes>

                                                          </ProductGroupProvider>

                                                        </AlertNFServiceContextProvider>
                                                      </AlertNFProductContextProvider>
                                                    </AlertProductGroupContextProvider>
                                                  </AlertEmissorContextProvider>
                                                </AlertProductContextProvider>
                                              </AlertTransportadoraContextProvider>
                                            </AlertServiceContextProvider>
                                          </AlertClientContextProvider>

                                        </ModalNFSearchServiceProvider>
                                      </ModalNFServiceProvider>
                                    </ModalNFSearchProductProvider>
                                  </ModalNFProductProvider>  
                                </ModalNFClientProvider>
                              </ModalNewEmissorProvider>
                            </ModalChangePasswordProvider>
                          </ModalUserProvider>
                        </ModalEmissorProvider>
                      </ModalTransportadoraProvider>
                    </ModalServiceProvider>
                  </ModalGroupProvider>
                </ModalProductProvider>
              </ModalClientProvider>

            </EmissorProvider>

          </SidebarDrawerProvider>
        </SidebarProvider>
      </SizeProvider>

    </BrowserRouter>
  );
}
