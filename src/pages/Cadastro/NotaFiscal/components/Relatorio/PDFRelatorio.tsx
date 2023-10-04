import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { INotaFiscal } from '../../../../../services/api/notafiscal/NotaFiscalService';
import icon from '../../../../../assets/logo-icon.png';
import formatMoney from '../../../../../utils/formatarValor';

const formatDate = (date: string) => {
  const aux = date.split('-');
  return `${aux[2]}/${aux[1]}/${aux[0]}`;
};

interface PDFRelatorioProps {
  data: INotaFiscal[],
}

export function PDFRelatorio({ data }: PDFRelatorioProps) {
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
        <Page size="A4" style={styles.page} wrap>
          <View style={styles.section}>
            <View style={styles.header} fixed>
              <Image style={styles.headerImage} src={icon}/>
              <View style={styles.headerData}>
                <Text style={styles.headerTitle}>Cubo Sistemas</Text>
                <Text style={styles.headerSubTitle}>Av. José Pedro Coelho, Tubarão - SC</Text>
                <Text style={styles.headerSubTitle}>(48) 3632-3810</Text>
                <Text style={styles.headerSubTitle}>atendimento@cubosis.com.br</Text>
              </View>
            </View>
            <Text style={styles.title} fixed>Relatório Gerencial</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader} fixed>
                <View style={styles.tableCellReduct}>
                  <Text>NÚMERO</Text>
                </View>
                <View style={styles.tableCellReduct}>
                  <Text>SÉRIE</Text>
                </View>
                <View style={styles.tableCellReduct}>
                  <Text>MODELO</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>STATUS</Text>
                </View>
                <View style={styles.tableCellReduct}>
                  <Text>EMISSÃO</Text>
                </View>
                <View style={styles.tableCellDest}>
                  <Text>DESTINATÁRIO</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>PRODUTOS</Text>
                </View>
                <View style={styles.tableCellReduct}>
                  <Text>FRETE</Text>
                </View>
                <View style={styles.tableCellReduct}>
                  <Text>IPI</Text>
                </View>
                <View style={styles.tableCellReduct}>
                  <Text>ICMS</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>TOTAL NFE</Text>
                </View>
              </View>
              {
                data !== undefined ?
                  data.map((nota, index) => (
                    <View 
                      key={nota.id} 
                      style={
                        index % 2 !== 0 
                          ? styles.tableRow : 
                          {
                            flexDirection: 'row',
                            alignItems: 'center',
                            minHeight: 20,
                            backgroundColor: '#DCDCFF',
                          }
                      }
                    >
                      <View style={styles.tableCellReduct}>
                        <Text>{nota.cod}</Text>
                      </View>
                      <View style={styles.tableCellReduct}>
                        <Text>{nota.serie}</Text>
                      </View>
                      <View style={styles.tableCellReduct}>
                        <Text>{nota.modelo}</Text>
                      </View>
                      <View style={styles.tableCell}>
                        <Text>{nota.status}</Text>
                      </View>
                      <View style={styles.tableCellReduct}>
                        <Text>{formatDate(nota.data_emissao.toString())}</Text>
                      </View>
                      <View style={styles.tableCellDest}>
                        <Text>{nota.nome_destinatario}</Text>
                      </View>
                      <View style={styles.tableCell}>
                        <Text>{'R$ ' + formatMoney(nota.total_produtos)}</Text>
                      </View>
                      <View style={styles.tableCellReduct}>
                        <Text>{'R$ ' + formatMoney(nota.total_frete)}</Text>
                      </View>
                      <View style={styles.tableCellReduct}>
                        <Text>{'R$ ' + formatMoney(nota.total_ipi)}</Text>
                      </View>
                      <View style={styles.tableCellReduct}>
                        <Text>{'R$ ' + formatMoney(nota.total_icms)}</Text>
                      </View>
                      <View style={styles.tableCell}>
                        <Text>{'R$ ' + formatMoney(nota.total_nota)}</Text>
                      </View>
                    </View>
                  ))
                  : null
              }
            </View>
            <View style={styles.totais}>
              <Text style={styles.totaisText}>
                VALOR TOTAL PRODUTOS: 
                <Text style={styles.totaisTextMoney}>
                  {' R$ ' + formatMoney(data.reduce((soma, nota) => soma + nota.total_produtos, 0))}
                </Text>
              </Text>
              <Text style={styles.totaisText}>
                VALOR TOTAL NFE: 
                <Text style={styles.totaisTextMoney}>
                  {' R$ ' + formatMoney(data.reduce((soma, nota) => soma + nota.total_nota, 0))}
                </Text>
              </Text>
            </View>
            <View style={styles.footer} fixed>
              <Text style={styles.footerText}>Gerado em {formatDate(new Date().toISOString().split('T')[0])}</Text>
              <Text style={styles.footerText} render={({ pageNumber, totalPages }) => (
                `Página: ${pageNumber}/${totalPages}`
              )} fixed />
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}