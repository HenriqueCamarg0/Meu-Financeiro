import { Dimensions, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../utils/designSystem';

const { height } = Dimensions.get('window');

export const tokens = {
  spacing: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
  },
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    muted: colors.textSecondary,
    success: colors.success,
    danger: colors.error,
    border: colors.gray200,
  },
  radius: 10,
  elevation: 4,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  scrollContent: {
    minHeight: height,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: tokens.spacing.xl,
    paddingBottom: tokens.spacing.xl / 2,
  },
  cardCentral: {
    backgroundColor: tokens.colors.card,
    width: '100%',
    borderRadius: tokens.radius,
    padding: tokens.spacing.xl,
    elevation: tokens.elevation,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: tokens.spacing.sm / 2,
  },
  stepIndicator: {
    textAlign: 'center',
    color: tokens.colors.muted,
    marginBottom: tokens.spacing.lg,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  formContent: {
    minHeight: 200,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10, // modern RN may support, kept for spacing but child margins added as fallback
    marginTop: tokens.spacing.xl,
  },

  buttonPrincipal: {
    backgroundColor: tokens.colors.primary,
    padding: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonVoltar: {
    padding: spacing.lg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    marginRight: tokens.spacing.md,
  },
  buttonText: {
    color: colors.white,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.base,
  },
  buttonTextVoltar: {
    color: tokens.colors.muted,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.base,
  },
});