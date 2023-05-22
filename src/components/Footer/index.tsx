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
      px={3}
      align="center"
      justify="space-between"
    >
      <Text fontWeight="light">{`Registrado à ${razao.toUpperCase()} [CNPJ: ${cnpjcpf}]`}</Text>
      <Text fontWeight="light">Versão: 1.0.0</Text>
    </HStack>
  );
}
