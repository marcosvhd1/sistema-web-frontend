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
                                                    <Routes>
                                                        <Route index element={<Login />} />
                                                        <Route path="/app" element={<Home />} />
                                                        <Route path="/app/cadastro/clientes" element={<Cliente />} />
                                                        <Route path="/app/cadastro/produtos" element={<Produto />} />
                                                        <Route path="/app/cadastro/servicos" element={<Servico />} />
                                                        <Route path="/app/cadastro/transportadora" element={<Transportadora />} />
                                                    </Routes>
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
    )
}