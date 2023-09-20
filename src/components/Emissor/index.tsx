import { Box, Button, Flex, Icon, Text, Tooltip } from '@chakra-ui/react';
import { useContext } from 'react';
import { FcSearch } from 'react-icons/fc';
import { useModalEmissor } from '../../Contexts/Modal/EmissorContext';
import { SidebarContext } from '../../Contexts/SidebarContext';
import { SizeContext } from '../../Contexts/SizeContext';
import { getDecrypted } from '../../utils/crypto';
import { EmissorModal } from './EmissorModal';


export function Emissor() {
  const { mdSize, smSize } = useContext(SizeContext);
  const { navSize } = useContext(SidebarContext);
  const { onOpen } = useModalEmissor();

  const handleOpenModal = () => {
    onOpen();
  };

  const dadosEmi = getDecrypted(localStorage.getItem('emissor'));
  const cnpjcpf = dadosEmi ? dadosEmi.cnpjcpf : '';
  const razao = dadosEmi ? dadosEmi.razao : '';

  return (
    <Flex direction="row" align="cente" justify="space-between" p="3%" w="100%">
      <Box display={!smSize[0] ? '' : navSize == 'small' ? 'none' : ''}>
        <Text fontWeight="bold" fontSize={mdSize[0] ? 10 : 14}>{razao.toString()}</Text>
        <Text fontSize={11}>CNPJ: {cnpjcpf.toString()}</Text>
      </Box>
      <Tooltip label='Alterar Emissor' placement="auto-start" hasArrow>
        <Button onClick={handleOpenModal}>
          <Icon as={FcSearch} fontSize={mdSize[0] ? 20 : 25}/>
        </Button>
      </Tooltip>
      <EmissorModal/>
    </Flex>
  );
}