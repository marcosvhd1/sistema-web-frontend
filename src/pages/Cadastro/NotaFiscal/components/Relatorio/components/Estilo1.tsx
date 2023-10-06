import { Image, Page, Text, View } from '@react-pdf/renderer';
import icon from '../../../../../../assets/logo-icon.png';
import formatMoney from '../../../../../../utils/formatarValor';

const formatDate = (date: string) => {
  const aux = date.split('-');
  return `${aux[2]}/${aux[1]}/${aux[0]}`;
};

interface Estilo1Props {
  data: any,
  styles: any;
}

export function Estilo1({ data, styles }: Estilo1Props) {
  return (
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
              data.map((nota: any, index: number) => (
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
              {' R$ ' + formatMoney(data.reduce((soma: any, nota: any) => soma + nota.total_produtos, 0))}
            </Text>
          </Text>
          <Text style={styles.totaisText}>
                VALOR TOTAL NFE: 
            <Text style={styles.totaisTextMoney}>
              {' R$ ' + formatMoney(data.reduce((soma: any, nota: any) => soma + nota.total_nota, 0))}
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
  );
}