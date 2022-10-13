import { useContext } from "react"
import { Flex } from "@chakra-ui/react"

import { FcBusinessman, FcDocument, FcHome, FcInTransit, FcLock, FcSearch, FcSettings, FcSupport } from "react-icons/fc";
import { FiPackage } from "react-icons/fi";
import { LogoCubo } from "../Images/LogoCubo"

import { SidebarContext } from "../../Contexts/SidebarContext";
import { SizeContext } from "../../Contexts/SizeContext"

import { NavSection } from "./NavSection";
import { NavItem } from "./NavItem"
import { Emissor } from "../Emissor"


export function SidebarNav() {
  const { smSize } = useContext(SizeContext)
  const { navSize } = useContext(SidebarContext)

  return (
    <Flex
      pos="sticky"
      w={!smSize[0] ? "100%" : navSize === "small" ? "4vw" : "14vw"}
      h="100%"
      direction="column"
      align="flex-start"
      bg={!smSize[0] ? "" : "whiteAlpha.100"}
      overflow="hidden"
    >
      <Flex
        p="3%"
        direction="column"
        alignItems={!smSize[0] ? "flex-start" : navSize === "small" ? "center" : "flex-start"}
        as="nav"
        justify="center"
      >
        <LogoCubo />

        <NavItem icon={FcHome} title="Início" rota="/app" />
        <NavSection title="CADASTRO">
          <NavItem icon={FcBusinessman} title="Clientes" rota="/app/cadastro/clientes" />
          <NavItem icon={FiPackage} title="Produtos" rota="/app/cadastro/produtos" />
          <NavItem icon={FcSupport} title="Serviços" rota="/app/cadastro/servicos" />
          <NavItem icon={FcInTransit} title="Transportadora" rota="/app/cadastro/transportadora" />
        </NavSection>
        <NavSection title="FISCAL">
          <NavItem icon={FcDocument} title="NF-e/NFC-e" rota="/app/fiscal/nfe" />
          <NavItem icon={FcDocument} title="MDF-e" rota="/app/fiscal/mdfe" />
        </NavSection>
        <NavSection title={navSize == "small" ? "CONFIG" : "CONFIGURAÇÃO"}>
          <NavItem icon={FcSettings} title="Configuração" rota="/app/config" />
          <NavItem icon={FcLock} title="Usuários" rota="/app/usuarios" />
        </NavSection>
        <NavSection title="EMISSOR">
          <Flex mt={4} display={!smSize[0] ? "flex" : navSize == "small" ? "none" : "flex"}>
            <Emissor />
          </Flex>
          {!smSize[0] ? "" : navSize == "small" && (
            <NavItem aria-label="Emissor" icon={FcSearch} title="" rota="/app/emissor" />
          )}
        </NavSection>
      </Flex>
    </Flex>
  )
}