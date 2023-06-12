import { Button, Flex, Icon, Input, Td, Tr } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { FiFilePlus } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { read, utils } from 'xlsx';
import { DataTable } from '../../../components/Table/DataTable';
import { ITabelaNCM, TabelaNCMService } from '../../../services/api/tabelancm/TabelaNCMService';
import { userInfos } from '../../../utils/header';
import { useEmissorContext } from '../../../Contexts/EmissorProvider';

export function TabTabelaNCM() {
  const [ncmData, setNcmData] = useState<ITabelaNCM[]>([]);

  const { idEmissorSelecionado } = useEmissorContext();

  const userInfo = userInfos();
  const HEADERS = userInfo.header;

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json<any>(worksheet);

        setNcmData(jsonData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleImportTable = () => {
    if (ncmData) {
      for (const data of ncmData) {
        const ncm = {
          'id_emissor': idEmissorSelecionado,
          'codigo': data.codigo,
          'tipo': data.tipo,
          'municipal': data.municipal,
          'estadual': data.estadual,
          'nacionalfederal': data.nacionalfederal,
          'importadosfederal': data.importadosfederal,
        };

        TabelaNCMService.create(ncm, HEADERS);
      }
    }
  };

  const headers: { key: string; label: string }[] = [
    { key: 'codigo', label: 'NCM' },
    { key: 'tipo', label: 'Tabela' },
    { key: 'municipal', label: 'Aliq. Municipal' },
    { key: 'estadual', label: 'Aliq. Estadual' },
    { key: 'nacionalfederal', label: 'Aliq. Federal' },
    { key: 'importadosfederal', label: 'Aliq. Importação' },
  ];

  return (
    <Flex w="100%" justify="center" align="center" direction="column">
      <Flex w="100%" justify="space-between" align="center">
        <Input
          w="70%" 
          type="file"
          variant="solid"
          onChange={handleFileUpload} 
          mr={3}
        />
        <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="green" w="20%" onClick={handleImportTable}>
          <Icon as={FiFilePlus} mr={1} />
            Importar
        </Button>
      </Flex>
      <DataTable width='100%' headers={headers} trailing={false} mt="5">
        {ncmData.map((data) => (
          <Tr key={uuidv4()}>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.codigo}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.tipo}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.municipal}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.estadual}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.nacionalfederal}</Td>
            <Td fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}>{data.importadosfederal}</Td>
          </Tr>
        ))}
      </DataTable>
    </Flex>
  );
}
