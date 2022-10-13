import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FcSearch } from "react-icons/fc";
import { SidebarContext } from "../../Contexts/SidebarContext";
import { SizeContext } from "../../Contexts/SizeContext";


export function Emissor() {
  const { mdSize, smSize } = useContext(SizeContext)
  const { navSize } = useContext(SidebarContext)

  return (
    <Flex direction="row" align="cente" justify="space-between" p="3%" w="100%">
      <Box display={!smSize[0] ? "" : navSize == "small" ? "none" : ""}>
        <Text fontWeight="bold" fontSize={mdSize[0] ? 10 : 14}>1 - CUBO SISTEMAS</Text>
        <Text fontSize={11}>CNPJ: 11.195.060/0001-43</Text>
      </Box>
      <IconButton
        icon={<Icon as={FcSearch} fontSize={mdSize[0] ? 20 : 25} />}
        aria-label="Botão de fechar a sidebar"
        background="none"
        _hover={{ background: 'none' }}
        ml={5}
      />
    </Flex>
  )
}