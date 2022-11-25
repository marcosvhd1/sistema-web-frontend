import { useEffect, useState } from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { getDecrypted } from '../../utils/crypto';

export function Footer() {
  const [razao, setRazao] = useState<any>('');
  const [cnpjcpf, setCnpjcpf] = useState<any>('');


  useEffect(() => {
    const dadosEmi = getDecrypted(localStorage.getItem('emissor'));
    setCnpjcpf(dadosEmi ? dadosEmi.cnpjcpf : '');
    setRazao(dadosEmi ? dadosEmi.razao : '');
  }, []);


  return (
    <HStack
      h="100%"
      px="2"
      align="center"
      gap="4"
    >
      <Text fontWeight="light">Versão: 5.7.1.0</Text>
      <Text fontWeight="light">ID: MINI-7C62-DEA6</Text>
      <Text fontWeight="light">{`Registrado à ${razao.toUpperCase()} [${cnpjcpf}]`}</Text>
    </HStack>
  );
}
