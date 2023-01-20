import { Button, Divider, Flex, Grid, GridItem, Icon, Input, Select, Text, Textarea, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { FormContainer } from '../../../../../../components/Form/FormContainer';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';

export function FormInfoAdicional() {
  const { register, setFocus } = useFormContext<INotaFiscal>();
  const { colorMode } = useColorMode();

  return (
    <Grid
      templateAreas={`
      "header"
      "main"`}
      gridTemplateRows={'6vh 1fr'}
      h="65vh"
    >
      <GridItem area={'header'}>
        <Flex w="100%" align="center" justify="flex-start" h="6vh">
          <Select w="35%" mr={3}>
            <option value='0'></option>
          </Select>
          <Button w="15%" fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="outline" colorScheme="green">Inserir</Button>
        </Flex>
      </GridItem>

      <GridItem area={'main'} mt={3}>
        <Textarea h="100%" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder='Informações adicionais...' {...register('info_adicionais')} />
      </GridItem>
    </Grid>
  );
}
