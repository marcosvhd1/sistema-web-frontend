import { Button, Flex, Grid, GridItem, Select, Textarea, useColorMode } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { INFProduct } from '../../../../../../../../services/api/notafiscal/NFProduct';

export function FormTabInfoAdicional() {
  const { register } = useForm<INFProduct>();
  const { colorMode } = useColorMode();
  
  return (
    <Textarea h="15rem" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder='Informações adicionais...' {...register('produto.info_adicional')} />
  );
}
