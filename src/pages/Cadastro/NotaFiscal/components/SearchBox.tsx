import { Button, Flex, Icon, Input, Menu, MenuButton, MenuItem, MenuList, Select, Text, useColorMode } from '@chakra-ui/react';
import { ReactNode, useState, useEffect } from 'react';
import { FieldValues, useForm, useFormContext } from 'react-hook-form';
import { FaInfoCircle, FaThList } from 'react-icons/fa';
import { FcDocument } from 'react-icons/fc';
import { FiSearch } from 'react-icons/fi';
import { MdAdd, MdCancel, MdMenu } from 'react-icons/md';
import { useEmissorContext } from '../../../../Contexts/EmissorProvider';
import { useModalNotaFiscal } from '../../../../Contexts/Modal/NotaFiscal/NotaFiscalContext';
import { useModalNFInutilizar } from '../../../../Contexts/Modal/NotaFiscal/Sefaz/NFInutilizarContext';
import { useModalStatusServidor } from '../../../../Contexts/Modal/NotaFiscal/Sefaz/StatusServidorContext';
import { INotaFiscal } from '../../../../services/api/notafiscal/NotaFiscalService';
import { SefazService } from '../../../../services/api/sefaz/SefazService';
import { userInfos } from '../../../../utils/header';
import { ModalInutilizar } from './ModalInutilizar';
import { ModalStatusServidor } from './ModalSefaz/ModalStatusServidor';
import { FormContainer } from '../../../../components/Form/FormContainer';

interface SearchBoxProps {
  children: ReactNode;
  getNotasFiscaisByFilter: (description: string) => void;
  setIsEditing: (value: boolean) => void;
  stateFilter: (value: React.SetStateAction<any>) => void;
  stateFilterByDate: (value: React.SetStateAction<any>) => void;
  stateFilterByStatus: (value: React.SetStateAction<any>) => void;
  startDate: any;
  setStartDate: (value: React.SetStateAction<any>) => void;
  endDate: any;
  setEndDate: (value: React.SetStateAction<any>) => void;
}

export function SearchBox({ children, stateFilter, getNotasFiscaisByFilter, setIsEditing, stateFilterByStatus, stateFilterByDate, startDate, setStartDate, endDate, setEndDate }: SearchBoxProps) {
  const methods = useFormContext<INotaFiscal>();
  const { register, handleSubmit } = useForm();
  const { colorMode } = useColorMode();
  const { onOpen } = useModalNotaFiscal();
  const { onOpen: openStatusServ } = useModalStatusServidor();
  const { onOpen: openInutilizar } = useModalNFInutilizar();
  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const [motivo, setMotivo] = useState<string>('');

  const handleGetNotasFiscaisByFilter = async (data: FieldValues) => {
    const { description } = data;
    getNotasFiscaisByFilter(description);
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    methods.reset({});
    onOpen();
  };

  const handleStatusServidor = async () => {
    const data = await SefazService.status_servidor(idEmissorSelecionado, HEADERS);
    
    if (data.erro != null) setMotivo(data.erro);
    else setMotivo(data.xMotivo);

    openStatusServ();
  };

  return (
    <form onSubmit={handleSubmit((data) => handleGetNotasFiscaisByFilter(data))}>
      <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column">
        <Flex w="95%" justify="space-between" align="center">
          <Flex w="20%" justify="center" align="center">
          </Flex>
          <Text fontFamily="Poppins" fontSize="xl">Lista de Notas Fiscais</Text>
          <Flex w="20%" justify="flex-end" align="center">
            <Button variant="solid" colorScheme="green" onClick={handleOpenModal} mr={3}><Icon mr={2} as={MdAdd} />Cadastrar</Button>
            <Menu>
              <MenuButton as={Button} w="25%" variant="solid" colorScheme="blue">
                <Icon as={MdMenu}/>
              </MenuButton>
              <MenuList>
                <MenuItem color={colorMode === 'light' ? 'blue.600' : 'blue.300'} onClick={handleStatusServidor}><Icon mr={2} as={FaInfoCircle}/>Status do Servidor</MenuItem>
                <MenuItem color={colorMode === 'light' ? 'red.600' : 'red.300'} onClick={openInutilizar}><Icon mr={2} as={MdCancel}/>Inutilizar Faixa</MenuItem>
                <MenuItem color={colorMode === 'light' ? 'blue.600' : 'blue.300'}><Icon mr={2} as={FaThList}/>Relatório Gerencial</MenuItem>
                <MenuItem color={colorMode === 'light' ? 'blue.600' : 'blue.300'}><Icon mr={2} as={FcDocument}/>Importar XML</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Flex w="95%" m="4" align="center" justify="space-between">
          <Flex w="50%" justify="center" align="center" mr='3'>
            <Flex w="100%" justify="flex-start" align="center">
              <FormContainer label='Buscar por' width="25%" mr='3'>
                <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => stateFilter(e.target.value)}>
                  <option value=''>Nenhum</option>
                  <option value='cod'>Número</option>
                  <option value='nome_destinatario'>Destinatário</option>
                </Select>
              </FormContainer>
              <FormContainer label='' width="50%" mr='3' mt='7'>
                <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder="Localizar..." type="text" {...register('description')} />
              </FormContainer>
              <FormContainer label='Status' width="25%">
                <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => stateFilterByStatus(e.target.value)}>
                  <option value=''>Todos</option>
                  <option value='Em digitação'>Em digitação</option>
                  <option value='Emitida'>Emitida</option>
                  <option value='Cancelada'>Cancelada</option>
                  <option value='Inutilizada'>Inutilizada</option>
                </Select>
              </FormContainer>
            </Flex>
          </Flex>
          <Flex w="50%" justify="center" align="center">
            <FormContainer label='Por data' width="30%" mr="3">
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(e) => stateFilterByDate(e.target.value)}>
                <option value=''>Nenhuma</option>
                <option value='data_emissao'>Emissão</option>
                <option value='data_saida'>Saída</option>
              </Select>
            </FormContainer>
            <FormContainer label='Início' width="30%" mr='3'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
            </FormContainer>
            <FormContainer label='Fim' width="30%" mr='3'>
              <Input maxLength={255} borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
            </FormContainer>
            <Button type="submit" w="10%" mt={7} variant="solid" colorScheme="blue">
              <Icon as={FiSearch} />
            </Button>
          </Flex>
        </Flex>
        {children}
      </Flex>
      <ModalStatusServidor content={motivo}/>
      <ModalInutilizar getNotas={getNotasFiscaisByFilter} />
    </form>
  );
}
