import { Button, Flex, Icon, Td, Tr } from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useForm, useFormContext, UseFormReturn } from 'react-hook-form';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { DataTable } from '../../../../../../../components/Table/DataTable';
import { DeleteAlertDialog } from '../../../../../../../components/Utils/DeleteAlertDialog';
import { useAlertNFServiceContext } from '../../../../../../../Contexts/AlertDialog/NotaFiscal/AlertNFServiceContext';
import { useModalNFService } from '../../../../../../../Contexts/Modal/NotaFiscal/NFServiceContext';
import { INFService } from '../../../../../../../services/api/notafiscal/NFService';
import { INotaFiscal } from '../../../../../../../services/api/notafiscal/NotaFiscalService';
import { ModalNFService } from './ModalNFService';
import formatMoney from '../../../../../../../utils/formatarValor';

export function FormServicos() {
  const methods = useForm<INFService>();
  const nfMethods = useFormContext<INotaFiscal>();

  const { onOpen: openModal } = useModalNFService();
  const { onOpen, onClose, isOpen } = useAlertNFServiceContext();

  const [servicos, setServicos] = useState<INFService[]>([]);
  const [servToDelete, setServToDelete] = useState<INFService>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openModalAdd = () => {
    methods.reset({});
    openModal();
  };

  const openModalEdit = (index: number) => {
    setCurrentIndex(index);
    methods.reset(servicos[index]);
    openModal();
    setIsEditing(true);
  };

  const openAlertDeleteServ = (data: INFService) => {
    setServToDelete(data);
    onOpen();
  };

  const handleAddServ = (data: INFService) => {
    servicos.push(data);
    saveChanges();
  };

  const handleEditServ = (data: INFService, index: number) => {
    servicos[index] = data;
    saveChanges();
  };

  const handleDeleteServ = () => {
    const newArray = servicos.filter(serv => serv !== servToDelete);
    setServicos(newArray);
    saveChanges();
    onClose();
  };

  const saveChanges = () => {
    nfMethods.setValue('servicos', servicos);
    calcTotais();
  };

  const calcTotais = () => {
    let totDescServ = 0;
    let totServ = 0;

    for (let i = 0; i < servicos.length; i++) {
      if (servicos[i].desconto_total.toString().length > 0) {
        totDescServ += parseFloat(`${servicos[i].desconto_total}`);
      }

      if (servicos[i].valor_total.toString().length > 0) {
        totServ += parseFloat(`${servicos[i].valor_total}`);
      }
    }

    nfMethods.setValue('total_servicos', totServ);
    nfMethods.setValue('total_desconto_servicos', totDescServ);
  };

  const headers: { key: string, label: string }[] = [
    { key: 'nserv', label: 'Código' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'cfop', label: 'CFOP' },
    { key: 'un', label: 'UN' },
    { key: 'qtde', label: 'Quantidade' },
    { key: 'vlr_unit', label: 'Valor Unitário' },
    { key: 'vlr_total', label: 'Valor Total' },
  ];

  return (
    <FormProvider {...methods}>
      <Flex w="100%" justify="center" align="center" direction="column" >
        <Flex w="100%" justify="flex-end" align="center" mt={2}>
          <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="outline" colorScheme="green" onClick={openModalAdd}>
            <Icon mr={2} as={MdAdd} />
            Incluir
          </Button>
        </Flex>
        <DataTable width='100%' headers={headers} mt="5">
          {servicos !== undefined ? servicos.map((data, index) => (
            <Tr key={uuidv4()}>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.servico.nserv}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.servico.descricao}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.cfop}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.servico.un}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.quantidade}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.valor_unitario ? 'R$ ' + formatMoney(data.valor_unitario) : ''}</Td>
              <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.valor_total ? 'R$ ' + formatMoney(data.valor_total) : ''}</Td>
              <Td style={{ 'textAlign': 'center' }}>
                <Button variant="ghost" colorScheme="orange" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => openModalEdit(index)}>
                  <Icon color="orange.300" as={FiEdit} />
                </Button>
                <Button variant="ghost" colorScheme="red" fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }} w="2rem" onClick={() => openAlertDeleteServ(data)}>
                  <Icon as={FiTrash2} color="red.400" />
                </Button>
              </Td>
            </Tr>
          )) : ''}
        </DataTable>
        <ModalNFService addServ={handleAddServ} editServ={handleEditServ} index={currentIndex} isEditing={isEditing} setIsEditing={setIsEditing}/>
        <DeleteAlertDialog label="Serviço" deleteFunction={handleDeleteServ} onClose={onClose} isOpen={isOpen} id={0}/>
      </Flex>
    </FormProvider>
  );
}
