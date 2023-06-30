import { Textarea, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';

export function FormInfoAdicional() {
  const { register } = useFormContext<INotaFiscal>();
  const { colorMode } = useColorMode();
  
  return (
    <Textarea
      h="20rem" 
      maxLength={5000} 
      placeholder='Informações adicionais...' 
      borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} 
      {...register('info_adicionais')}
    />
  );
}
