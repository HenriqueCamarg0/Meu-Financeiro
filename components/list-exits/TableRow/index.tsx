import React from "react";
import { View, Text } from "react-native";
import { colors, typography } from "../../../utils/designSystem";
import { 
  formatarMoeda, 
  formatarDataBR, 
  formatarParcela, 
  abreviarTexto 
} from "../../../utils/formatters";

interface TableRowProps {
  data: any;
}

export default function TableRow({ data }: TableRowProps) {
  // A API retorna 'parcelas' (atual) e 'totalParcelas'
  const isUltimaParcela = data.parcela === data.totalParcelas;

  return (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.cellVencimento]}>
        {formatarDataBR(data.dataVencimento)}
      </Text>
      
      <Text style={[styles.cell, styles.cellDescricao]}>
        {abreviarTexto(data.descricao, 15)}
      </Text>
      
      <Text style={[styles.cell, styles.cellPagamento]}>
        {data.tipoPagamento}
      </Text>
      
      <Text style={[styles.cell, styles.cellCategoria]}>
        {data.categoria?.nome || "Geral"}
      </Text>

      <Text style={[styles.cell, styles.cellUsuario]}>
        {data.usuario?.nome || "S/N"}
      </Text>

      <View style={[styles.cell, styles.cellParcelaContainer]}>
        <View style={[
          styles.badgeParcela, 
          { backgroundColor: isUltimaParcela ? colors.success : colors.info }
        ]}>
          <Text style={styles.textBadge}>
            {formatarParcela(data.parcela, data.totalParcelas)}
          </Text>
        </View>
      </View>

      <Text style={[styles.cell, styles.cellValor, { fontWeight: 'bold' }]}>
        {formatarMoeda(data.valor)}
      </Text>
    </View>
  );
}

const styles = {
  row: { 
    flexDirection: 'row' as const, 
    backgroundColor: colors.surface, 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: colors.gray100,
  },
  cell: { 
    fontSize: typography.sizes.xs, 
    color: colors.text, 
    textAlign: 'center' as const, 
    paddingHorizontal: 5,
  },
  cellVencimento: { flex: 1 },
  cellDescricao: { flex: 2 },
  cellPagamento: { flex: 1 },
  cellCategoria: { flex: 1 },
  cellUsuario: { flex: 1 },
  cellParcelaContainer: { flex: 1 },
  cellValor: { flex: 1 },
  badgeParcela: { 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    borderRadius: 10,
  },
  textBadge: { 
    color: colors.white, 
    fontSize: typography.sizes.xs, 
    fontWeight: typography.weights.bold,
  },
};