import { Button, Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import { TotaisAllFields } from './TotaisAllFields';
import { TotaisReduced } from './TotaisReduced';

interface FormTotaisProps {
  calcTotal: () => void;
}

export function FormTotais({ calcTotal }: FormTotaisProps) {
  const [details, setDetails] = useState<boolean>(false);

  const handleChangeDetails = () => {
    setDetails(!details);
    calcTotal();
  };

  return (
    <Flex w="100%" justify="center" align="center">
      <Flex w="100%" justify="center" align="center">
        {
          details ?
            <TotaisAllFields />
            : <TotaisReduced />
        }
      </Flex>
      <Flex w="10%" justify="center" mt={7} align="center" direction="column" alignSelf='flex-start'>
        <Button w="100%" fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="blue" onClick={handleChangeDetails}>
          <Icon mr={2} as={CgDetailsMore} />
          Detalhes
        </Button>      
      </Flex>
    </Flex>
  );
}
