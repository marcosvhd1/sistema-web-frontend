import { Button, Flex, Icon, Td, Tr, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { DataTable } from '../../../../components/Table/DataTable';
import { ICFOP, ICFOPService } from '../../../../services/api/cfop/CFOPService';
import { ModalCFOP } from './ModalCFOP';
import { useEmissorContext } from '../../../../Contexts/EmissorProvider';
import { useModalCFOP } from '../../../../Contexts/Modal/CFOPContext';
import { userInfos } from '../../../../utils/header';
import { ApiException } from '../../../../services/api/ApiException';
import { useForm, FormProvider } from 'react-hook-form';
import { TdCustom } from '../../../../components/Table/TdCustom';

export function TabCFOP() {
  const methods = useForm<ICFOP>();

  const [id, setId] = useState<number>(0);
  const [cfops, setCfops] = useState<ICFOP[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { idEmissorSelecionado } = useEmissorContext();
  const { onOpen } = useModalCFOP();
  
  const toast = useToast();
  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const headers: { key: string, label: string }[] = [
    { key: 'natureza', label: 'Natureza de operação' },
    { key: 'cfop_dentro', label: 'CFOP D.E' },
    { key: 'cfop_fora', label: 'CFOP F.E' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const openModal = () => {
    methods.reset({});
    setIsEditing(false);
    onOpen();
  };

  const openModalEdit = async (id: number) => {
    const cfopToUpdate = cfops.find((cfop) => cfop.id === id);

    if (cfopToUpdate) {
      methods.reset(cfopToUpdate);
      setIsEditing(true);
      setId(id);
      onOpen();
    }
  };

  const loadData = () => {
    ICFOPService.get(idEmissorSelecionado, HEADERS).then((result) => {
      if (result instanceof ApiException) {
        console.log(result.message);
      } else {
        setCfops(result);
      }
    });
  };

  const handleAddCFOP = async (data: ICFOP) => {
    data.id_emissor = idEmissorSelecionado;

    await ICFOPService.create(data, HEADERS).then(() => {
      loadData();
    });
  };

  const handleUpdateCFOP = async (data: ICFOP) => {
    await ICFOPService.update(id, data, idEmissorSelecionado, HEADERS).then(() => {
      setIsEditing(false);
      loadData();
    });
  };

  const handleDeleteCFOP = async (id: number) => {
    await ICFOPService.remove(id, idEmissorSelecionado, HEADERS).then((result) => {
      if (result instanceof ApiException) {
        console.log(result.message);
      } else {
        toast({
          position: 'top',
          title: 'Operação concluída.',
          description: 'CFOP excluído com sucesso.',
          status: 'success',
          duration: 2000,
        });
        loadData();
      }
    }
    );
  };

  return (
    <FormProvider {...methods}>
      <Flex w="100%" justify="center" align="center" direction="column" >
        <Flex w="100%" justify="flex-end" align="center" mt={2}>
          <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="green" onClick={openModal}>
            <Icon mr={2} as={MdAdd} />
            Cadastrar
          </Button>
        </Flex>
        <DataTable 
          mt="5"
          width='100%' 
          headers={headers} 
        >
          {cfops !== undefined ? cfops.map((data) => (
            <Tr key={uuidv4()}>
              <TdCustom>{data.natureza}</TdCustom>
              <TdCustom>{data.cfop_dentro}</TdCustom>
              <TdCustom>{data.cfop_fora}</TdCustom>
              <TdCustom style={{ 'textAlign': 'center' }}>
                <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => openModalEdit(data.id)}>
                  <Icon color="orange.300" as={FiEdit} />
                </Button>
                <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => handleDeleteCFOP(data.id)}>
                  <Icon as={FiTrash2} color="red.400" />
                </Button>
              </TdCustom>
            </Tr>
          )) : ''}
        </DataTable>
        <ModalCFOP addCFOP={handleAddCFOP} editCFOP={handleUpdateCFOP} isEditing={isEditing} />
      </Flex>
    </FormProvider>
  );
}
