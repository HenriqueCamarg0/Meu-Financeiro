import { StyleSheet } from "react-native";
import { colors, spacing, typography } from '../../utils/designSystem';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.sm },
  headerSeletor: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: colors.surface, 
    padding: spacing.lg, 
    borderRadius: 10,
    marginBottom: spacing.sm,
    elevation: 2 
  },
  mesTexto: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, marginHorizontal: spacing.xl, color: colors.text },
  btnSeta: { backgroundColor: colors.primary, padding: spacing.sm, borderRadius: 5 },
  textSeta: { color: colors.white, fontWeight: typography.weights.bold },
  footerTotal: { 
    flexDirection: "row", 
    justifyContent: "flex-end", 
    padding: spacing.lg, 
    backgroundColor: colors.gray100 
  },
  totalLabel: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginRight: spacing.sm },
  totalValor: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.success },

  // Adicione estas definições ao seu styles.ts
  headerRow: { 
    flexDirection: "row", 
    backgroundColor: colors.primary, 
    paddingVertical: spacing.sm, 
    borderTopLeftRadius: 5, 
    borderTopRightRadius: 5 
  },
  headerText: { color: colors.white, fontWeight: typography.weights.bold, fontSize: 11, textAlign: "center", paddingHorizontal: 5 },
  row: { 
    flexDirection: "row", 
    backgroundColor: colors.surface, 
    paddingVertical: spacing.md, 
    borderBottomWidth: 1, 
    borderBottomColor: colors.gray200 
  },
  cell: { fontSize: 11, color: colors.text, textAlign: "center", paddingHorizontal: 5 },
  
  // Larguras das colunas (devem ser iguais no Header e na Row)
  cellVencimento: { width: 90 },
  cellDescricao: { width: 120, textAlign: 'left' },
  cellPagamento: { width: 130 },
  cellCategoria: { width: 100 },
  cellUsuario: { width: 80 },
  cellParcelaContainer: { width: 70, alignItems: 'center', justifyContent: 'center' },
  cellValor: { width: 90, textAlign: 'right', paddingRight: 10 },

  badgeParcela: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  textBadge: { color: colors.white, fontSize: 10, fontWeight: typography.weights.bold },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { color: colors.textLight, fontSize: typography.sizes.base }
});