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

import { ModalChangePasswordProvider } from '../Contexts/Modal/ChangePasswordContext';
import { ModalClientProvider } from '../Contexts/Modal/ClientContext';
import { ModalEmissorProvider } from '../Contexts/Modal/EmissorContext';
import { ModalGroupProvider } from '../Contexts/Modal/GroupConxtext';
import { ModalNewEmissorProvider } from '../Contexts/Modal/NewEmissorContext';
import { ModalNFClientProvider } from '../Contexts/Modal/NotaFiscal/NFClientContext';
import { ModalNFProductProvider } from '../Contexts/Modal/NotaFiscal/NFProductContext';
import { ModalNFSearchProductProvider } from '../Contexts/Modal/NotaFiscal/NFProductSearchContext';
import { ModalNFServiceProvider } from '../Contexts/Modal/NotaFiscal/NFServiceContext';
import { ModalNFSearchServiceProvider } from '../Contexts/Modal/NotaFiscal/NFServiceSearchContext';
import { ModalNFTransporteProvider } from '../Contexts/Modal/NotaFiscal/NFTransporteContext';
import { ModalProductProvider } from '../Contexts/Modal/ProductContext';
import { ModalServiceProvider } from '../Contexts/Modal/ServiceContext';
import { ModalTransportadoraProvider } from '../Contexts/Modal/TransportadoraContext';
import { ModalUserProvider } from '../Contexts/Modal/UserContext';

import { ModalConfigProvider } from '../Contexts/Modal/ConfigContext';
import { ModalNFApoioProvider } from '../Contexts/Modal/NotaFiscal/NFApoioContext';
import { ModalNFApoioCSTProvider } from '../Contexts/Modal/NotaFiscal/NFApoioCSTContext';
import { ModalNFDuplicataProvider } from '../Contexts/Modal/NotaFiscal/NFDuplicataContext';
import { ModalNFFormaPagtoProvider } from '../Contexts/Modal/NotaFiscal/NFFormaPagtoContext';
import { ModalNotaFiscalProvider } from '../Contexts/Modal/NotaFiscal/NotaFiscalContext';
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
import { AlertNotaFiscalContextProvider } from '../Contexts/AlertDialog/NotaFiscal/AlertNotaFiscalContext';
import { ModalCFOPProvider } from '../Contexts/Modal/CFOPContext';
import { Usuarios } from '../pages/Usuario';
import { ModalStatusServidorProvider } from '../Contexts/Modal/NotaFiscal/Sefaz/StatusServidorContext';
import { ModalRetornoSefazProvider } from '../Contexts/Modal/NotaFiscal/Sefaz/RetornoSefazContext';

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

              <ModalNotaFiscalProvider>
                <ModalConfigProvider>
                  <ModalCFOPProvider>
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
                                                <ModalNFTransporteProvider>
                                                  <ModalNFFormaPagtoProvider>
                                                    <ModalNFDuplicataProvider>
                                                      <ModalNFApoioProvider>
                                                        <ModalNFApoioCSTProvider>
                                                          <ModalStatusServidorProvider>
                                                            <ModalRetornoSefazProvider>

                                                              <AlertClientContextProvider>
                                                                <AlertServiceContextProvider>
                                                                  <AlertTransportadoraContextProvider>
                                                                    <AlertProductContextProvider>
                                                                      <AlertEmissorContextProvider>
                                                                        <AlertProductGroupContextProvider>
                                                                          <AlertNotaFiscalContextProvider>
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
                                                                                      </Route>
                                                                                    </Route>

                                                                                    <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                                                                                      <Route path='/app/emissor' element={<Emissor />} />
                                                                                      <Route path='/app/usuarios' element={<Usuarios />} />
                                                                                    </Route>

                                                                                    <Route path="*" element={<PageNotFound />} />
                                                                                  </Routes>

                                                                                </ProductGroupProvider>

                                                                              </AlertNFServiceContextProvider>
                                                                            </AlertNFProductContextProvider>
                                                                          </AlertNotaFiscalContextProvider>
                                                                        </AlertProductGroupContextProvider>
                                                                      </AlertEmissorContextProvider>
                                                                    </AlertProductContextProvider>
                                                                  </AlertTransportadoraContextProvider>
                                                                </AlertServiceContextProvider>
                                                              </AlertClientContextProvider>
                                                  
                                                            </ModalRetornoSefazProvider>
                                                          </ModalStatusServidorProvider>
                                                        </ModalNFApoioCSTProvider>
                                                      </ModalNFApoioProvider>
                                                    </ModalNFDuplicataProvider>
                                                  </ModalNFFormaPagtoProvider>
                                                </ModalNFTransporteProvider>
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
                  </ModalCFOPProvider>
                </ModalConfigProvider>
              </ModalNotaFiscalProvider>

            </EmissorProvider>

          </SidebarDrawerProvider>
        </SidebarProvider>
      </SizeProvider>

    </BrowserRouter>
  );
}
