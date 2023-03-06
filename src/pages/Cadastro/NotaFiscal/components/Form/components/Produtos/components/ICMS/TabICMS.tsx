import { Button, Flex, Icon, Select, Text, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { useModalNFApoioCST } from '../../../../../../../../../Contexts/Modal/NotaFiscal/NFApoioCSTContext';
import { INFProduct } from '../../../../../../../../../services/api/notafiscal/NFProduct';
import { Fields101 } from './101/Fields101';
import { Fields102 } from './102/Fields102';
import { Fields201 } from './201/Fields201';
import { Fields202 } from './202/Fields202';
import { Fields500 } from './500/Fields500';
import { Fields900 } from './900/Fields900';
import { ModalNFCST } from './ModalNFCST';

export function FormTabICMS() {
  const { register } = useFormContext<INFProduct>();
  const [selected, setSelected] = useState<string>('');

  const { onOpen } = useModalNFApoioCST();
  const { colorMode } = useColorMode();

  const cst = ['00', '10', '20', '30', '40', '41', '50', '51', '60', '70', '90'];
  const csosn = ['101', '102', '103', '201', '202', '203', '300', '400', '500', '900'];

  const handleOnChange= (index: any) => {
    setSelected(index.target.value);
  };

  const visibleFields = () => {
    switch (selected) {
    case '101':
      return <Fields101 />;

    case '102':
      return <Fields102 />;
    
    case '103':
      return <Fields102 />;

    case '201':
      return <Fields201 />;
    
    case '202':
      return <Fields202 />;
    
    case '203':
      return <Fields202 />;

    case '300':
      return <Fields102 />;

    case '400':
      return <Fields102 />;
      
    case '500':
      return <Fields500 />;

    case '900':
      return <Fields900 />;

    default:
      return <Fields101 />;
    }
  };

  return (
    <Flex w="100%" justify="center" align="center" direction="column">
      <Flex w="100%" align="center" justify="flex-start">
        <Text mr={3}>
          <strong>Situação Tributária (CST/CSOSN):</strong>
        </Text>
        <Select borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'gray.600'} w="15%" mr={3} {...register('produto.cst_icms')} onChange={(index) => handleOnChange(index)}>
          {csosn.map((data) => (<option key={data} value={data}>{data}</option>))}
        </Select>
        <Button onClick={onOpen}>
          <Icon as={FiSearch} />
        </Button>
      </Flex>
      {visibleFields()}
      <ModalNFCST content={`
      101 - Tributada COM permissão de crédito
      102 - Tributada SEM permissão de crédito
      103 - Isenção de ICMS para faixa de receita bruta
      201 - Tributada COM permissão de crédito e com cob. do ICMS por ST
      202 - Tributada SEM permissão de crédito e com cob. do ICMS por ST
      203 - Isenção de ICMS para faixa de receita bruta e com cob. do ICMS por ST
      300 - Imune
      400 - Não tributada
      500 - ICMS cobrado anteriormente por ST ou por antecipação
      900 - Outros
      `} />
    </Flex>
  );
}
