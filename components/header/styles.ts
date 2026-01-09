import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../utils/designSystem';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  mesSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  mesText: {
    fontSize: typography.sizes.base,
    color: colors.text,
    fontWeight: typography.weights.semibold,
    marginRight: spacing.sm,
  },
  saldoArea: {
    width: '100%',
    marginBottom: spacing.lg,
    alignItems: 'flex-start',
  },
  labelSaldo: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  valorPrincipalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valorSaldo: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  resumoRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  resumoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  labelResumo: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  valorResumo: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
});