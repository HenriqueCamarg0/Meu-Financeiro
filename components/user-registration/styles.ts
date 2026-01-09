import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../utils/designSystem';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
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
    padding: spacing.md,
    fontSize: typography.sizes.base,
    marginBottom: spacing.lg,
    color: colors.text,
  },
  cardForm: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
    marginBottom: spacing.xl,
    // Sombra leve para destacar o formulário
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  itemUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  usuarioTexto: {
    fontSize: typography.sizes.base,
    color: colors.text,
    fontWeight: typography.weights.semibold,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  rowAcoes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  }
});