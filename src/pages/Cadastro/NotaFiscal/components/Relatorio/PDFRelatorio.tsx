import { Document, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import { Estilo1 } from './components/Estilo1';
import { Estilo2 } from './components/Estilo2';

interface PDFRelatorioProps {
  data: any,
  estilo: string,
}

export function PDFRelatorio({ data, estilo }: PDFRelatorioProps) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#F8F8F8',
      paddingTop: 20,
      paddingBottom: 30,
      paddingHorizontal: 20,
    },
    section: {
      flexGrow: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    headerData: {
      flexDirection: 'column',
    },
    headerImage: {
      height: '43px',
      width: '40px',
    },
    headerTitle: {
      fontSize: 10,
      textAlign: 'center',
      marginLeft: '7px',
    },
    headerSubTitle: {
      fontSize: 8,
      color: '#404040',
      textAlign: 'center',
      marginLeft: '7px',
    },
    title: {
      fontSize: 8,
      textAlign: 'center',
      textDecoration: 'underline',
      marginBottom: 15,
    },
    table: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    tableHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 20,
      borderBottom: 1,
      borderBottomColor: '#202020'
    },
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 20,
    },
    tableCell: {
      flex: 2,
      fontSize: 6,
      textAlign: 'center',
    },
    tableCellReduct: {
      flex: 1,
      fontSize: 6,
      textAlign: 'center',
    },
    tableCellDest: {
      flex: 3,
      fontSize: 6,
      textAlign: 'center',
    },
    totais: {
      marginTop: '15px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    totaisText: {
      fontSize: 6,
      fontWeight: 'extralight',
      textAlign: 'center',
    },
    totaisTextMoney: {
      fontSize: 7,
      fontWeight: 'extrabold',
      textAlign: 'center',
    },
    footer: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      bottom: -15,
      left: 0,
      right: 0,
      textAlign: 'center',
    },
    footerText: {
      fontSize: 8,
      color: 'grey',
      textAlign: 'center',
    },
  });

  return (
    <PDFViewer height='100%' width='100%'>
      <Document title='Relatório Gerencial' creator='Cubo Sistemas' author='Cubo Sistemas' producer='Cubo Sistemas'>
        {
          estilo === '1' ? 
            <Estilo1 data={data} styles={styles} /> : 
            <Estilo2 data={data} styles={styles} /> 
        }
      </Document>
    </PDFViewer>
  );
}