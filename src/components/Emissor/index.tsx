import { Box, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { FcSearch } from 'react-icons/fc';
import { useEmissorContext } from '../../Contexts/EmissorProvider';
import { useModalEmissor } from '../../Contexts/Modal/EmissorContext';
import { SidebarContext } from '../../Contexts/SidebarContext';
import { SizeContext } from '../../Contexts/SizeContext';
import { EmissorModal } from './EmissorModal';


export function Emissor() {
  const { mdSize, smSize } = useContext(SizeContext);
  const { navSize } = useContext(SidebarContext);
  const { onOpen } = useModalEmissor();
  const {getEmissoresByUser, cnpjcpf, razao} = useEmissorContext();

  const handleOpenModal = () => {
    getEmissoresByUser();
    onOpen();
  };



  return (
    <Flex direction="row" align="cente" justify="space-between" p="3%" w="100%">
      <Box display={!smSize[0] ? '' : navSize == 'small' ? 'none' : ''}>
        <Text fontWeight="bold" fontSize={mdSize[0] ? 10 : 14}>{razao.toString()}</Text>
        <Text fontSize={11}>CNPJ: {cnpjcpf.toString()}</Text>
      </Box>
      <IconButton
        icon={<Icon as={FcSearch} fontSize={mdSize[0] ? 20 : 25} />}
        aria-label="Botão de abrir emissor"
        background="none"
        _hover={{ background: 'none' }}
        ml={5}
        onClick={handleOpenModal}
      />
      <EmissorModal/>
    </Flex>
  );
}
