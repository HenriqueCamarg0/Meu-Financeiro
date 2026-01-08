import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

export const tokens = {
  spacing: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  colors: {
    primary: '#e67e22',
    background: '#f0f2f5',
    card: '#ffffff',
    text: '#333333',
    muted: '#666666',
    success: '#2ecc71',
    danger: '#e74c3c',
    border: '#dee2e6',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: tokens.spacing.sm / 2,
  },
  stepIndicator: {
    textAlign: 'center',
    color: tokens.colors.muted,
    marginBottom: tokens.spacing.lg,
    fontSize: 14,
    fontWeight: '500',
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
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonVoltar: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    marginRight: tokens.spacing.md,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonTextVoltar: {
    color: tokens.colors.muted,
    fontWeight: '700',
    fontSize: 16,
  },
});