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

  const handleImportTable = async () => {
    const tamanhoMax = 1000;

    if (ncmData) {
      for (let i = 0; i < ncmData.length; i += tamanhoMax) {
        const parte = ncmData.slice(i, i + tamanhoMax);
        await TabelaNCMService.create(parte, idEmissorSelecionado, HEADERS);
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
          style={{padding: '10px 5px'}}
        />
        <Button fontSize={{ base: '.9rem', md: '.9rem', lg: '1rem' }} variant="solid" colorScheme="green" w="20%" onClick={handleImportTable}>
          <Icon as={FiFilePlus} mr={1} />
            Importar
        </Button>
      </Flex>
    </Flex>
  );
}
