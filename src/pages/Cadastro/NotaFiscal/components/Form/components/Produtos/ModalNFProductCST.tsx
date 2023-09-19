import { Button, Flex, Icon, Modal, ModalCloseButton, ModalContent, ModalOverlay, Select, Text, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useEmissorContext } from '../../../../../../../Contexts/EmissorProvider';
import { useModalNFProductCST } from '../../../../../../../Contexts/Modal/NotaFiscal/NFProductCSTContext';
import { FormContainer } from '../../../../../../../components/Form/FormContainer';
import { ApiException } from '../../../../../../../services/api/ApiException';
import { EmissorService } from '../../../../../../../services/api/emissor/EmissorService';
import { EmpresaService } from '../../../../../../../services/api/empresas/EmpresaService';
import { userInfos } from '../../../../../../../utils/header';

interface ModalNFProductCSTProps {
  shareCST: (value: string) => void;
}

export function ModalNFProductCST({ shareCST }: ModalNFProductCSTProps) {
  const [value, setValue] = useState<string>('');
  const [regime, setRegime] = useState<string>('');

  const { isOpen, onClose } = useModalNFProductCST();
  const { colorMode } = useColorMode();

  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;
  const empresa = userInfo.infos?.empresa;

  const cst = ['00', '10', '20', '30', '40', '41', '50', '51', '60', '70', '90'];
  const csosn = ['101', '102', '103', '201', '202', '203', '300', '400', '500', '900'];

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (isOpen === true && event.key === 'Enter') handleChangeCST;
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen === true) getTipoEmissor();
  }, [isOpen]);

  const getTipoEmissor = () => {
    EmpresaService.getId(empresa, HEADERS)
      .then((result: any) => {
        if (result instanceof ApiException) {
          console.log(result.message);
        } else {
          const idEmpresa = result.data[0].id;
          EmissorService.getAll(1, 1, 'id', 'razao', 'desc', `${idEmissorSelecionado}`, idEmpresa, 'Ativo', HEADERS)
            .then((result: any) => {
              if (result instanceof ApiException) {
                console.log(result.message);
              } else {
                setRegime(result.data[0].regime);
              }
            });
        }
      });
  };

  const handleOnChange= (index: any) => {
    setValue(index.target.value);
  };

  const handleChangeCST = () => {
    if (value.length > 0) {
      shareCST(value);
      setValue('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
      scrollBehavior="inside"
      size='3xl'
    >
      <ModalOverlay />
      <ModalContent>
        <Flex w="100%" justify="center" align="center" mt={{ base: '2', md: '2', lg: '10' }} direction="column">
          <Flex w="95%" justify="center" align="center">
            <Text fontFamily="Poppins" fontSize="xl">Alterar CST</Text>
          </Flex>
          <Flex w="95%" justify="space-between" align="center" py={7} px={3}>
            <FormContainer label='CST'>
              <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} onChange={(index) => handleOnChange(index)} value={value}>
                {regime === '1' ? csosn.map((data) => (<option key={data} value={data}>{data}</option>)) : cst.map((data) => (<option key={data} value={data}>{data}</option>))}
              </Select>
            </FormContainer>
            <Button variant="solid" colorScheme="blue" onClick={handleChangeCST} mt={7} ml={3} w='20%'>
              <Icon as={FiCheck} mr={2} />
              Aplicar
            </Button>
          </Flex>
        </Flex>
        <ModalCloseButton onClick={onClose} />
      </ModalContent>
    </Modal>
  );
}