import { Button, Flex, Grid, GridItem, Icon, Select, Textarea, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { INotaFiscal } from '../../../../../../services/api/notafiscal/NotaFiscalService';

export function FormInfoAdicional() {
  const { register } = useFormContext<INotaFiscal>();
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
          <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="35%" mr={3}>
            <option value='0'></option>
          </Select>
          <Button w="10%" fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue"><Icon mr={2} as={MdAdd} />Inserir</Button>
        </Flex>
      </GridItem>

      <GridItem area={'main'} mt={3}>
        <Textarea maxLength={5000} h="100%" borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} placeholder='Informações adicionais...' {...register('info_adicionais')} />
      </GridItem>
    </Grid>
  );
}
