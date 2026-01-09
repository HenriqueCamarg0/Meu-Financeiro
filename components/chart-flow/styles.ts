import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../utils/designSystem';

export const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, borderRadius: 28, padding: spacing.xl, marginHorizontal: spacing.lg, marginVertical: spacing.sm, elevation: 3 },
  title: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.text, marginBottom: spacing.sm },
  chartWrapper: { alignItems: 'center', justifyContent: 'center', height: 220, position: 'relative' },
  totalOverlay: {
    position: 'absolute',
    width: 154, // Aumentado para afinar o gráfico
    height: 154,
    borderRadius: 77,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    top: '50%',
    left: '50%',
    marginTop: -77,
    marginLeft: -77,
  },
  totalLabel: { fontSize: typography.sizes.xl, fontWeight: typography.weights.extrabold, color: colors.text, textAlign: 'center' },
  categoryItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.gray100 },
  categoryIconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: spacing.lg },
  categoryName: { flex: 1, fontSize: typography.sizes.lg, fontWeight: typography.weights.medium, color: colors.text },
  categoryValue: { fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.text, marginRight: 5 },
  modalContainer: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.surface, borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: spacing.xl, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl, borderBottomWidth: 1, borderBottomColor: colors.gray200, paddingBottom: spacing.sm },
});