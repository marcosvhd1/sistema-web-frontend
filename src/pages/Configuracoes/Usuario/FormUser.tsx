import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Checkbox, Flex, Icon, Input, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';

export function FormUser() {
  const { emissor, getEmissoresByUser } = useEmissorContext();

  useEffect(() => {
    getEmissoresByUser();
  }, []);

  return (
    <form autoComplete={'off'}>
      <Flex direction='column' w='100%' h='100%' p='.5rem' align='center' justify='space-between' overflowY='auto'>
        <Flex direction='column'>
          <Text fontSize="sm" fontWeight='medium'>Login</Text>
          <Input type='text'/>
        </Flex>
        <Flex direction='column'>
          <Text fontSize="sm" fontWeight='medium'>Senha</Text>
          <Input type='text'/>
        </Flex>
        <Accordion defaultIndex={[0]} w='100%' allowToggle my='1rem'>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex flex='1' textAlign='left'>
                Emissores
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Flex direction='column' gap='2'>
                {emissor !== undefined ? emissor.map((data: any) => (
                  <Checkbox key={data.id}>{data.razao}</Checkbox>
                )): ''}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Checkbox my='1rem'>Permissão de Administrador</Checkbox>
        <Flex w="100%" justify='center' >
          <Button w="100%" variant='outline' colorScheme="green" type="submit" size='sm'><Icon as={FiCheck} mr={1} />Salvar</Button>
        </Flex>
      </Flex>
    </form>
  );
}
