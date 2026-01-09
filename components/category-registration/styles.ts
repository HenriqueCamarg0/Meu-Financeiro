import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../utils/designSystem';

export const styles = StyleSheet.create({
  label: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: typography.weights.medium,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    padding: 5,
    fontSize: typography.sizes.base,
    marginBottom: spacing.lg,
    color: colors.text,
  },
  btnAdicionarSub: {
    backgroundColor: colors.primary,
    width: 45,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagSub: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: 8,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  btnSalvar: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  btnSalvarText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
  itemCategoria: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: 2,
  },
  categoriaTexto: {
    fontSize: typography.sizes.base,
    color: colors.text,
  }
});