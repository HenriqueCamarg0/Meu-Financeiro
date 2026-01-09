// Design System - RECONECTADO AO APP_THEME
import { StyleSheet } from 'react-native';
import { APP_THEME } from './appTheme';

// 🎨 Paleta de Cores - AGORA CONECTADA AO APP_THEME
export const colors = {
  // Cores Principais (AGORA VEM DO APP_THEME)
  primary: APP_THEME.PRIMARY_COLOR,
  primaryLight: APP_THEME.PRIMARY_COLOR + '80',
  primaryDark: APP_THEME.PRIMARY_COLOR,
  
  // Cores Secundárias
  secondary: APP_THEME.SECONDARY_COLOR,
  secondaryLight: APP_THEME.SECONDARY_COLOR + '80',
  secondaryDark: APP_THEME.SECONDARY_COLOR,
  
  // Cores de Status
  success: APP_THEME.SUCCESS_COLOR,
  successLight: APP_THEME.SUCCESS_COLOR + '80',
  error: APP_THEME.ERROR_COLOR,
  errorLight: APP_THEME.ERROR_COLOR + '80',
  warning: APP_THEME.WARNING_COLOR,
  info: '#3b82f6',
  
  // Cores da Aplicação
  background: APP_THEME.BACKGROUND_COLOR,
  surface: APP_THEME.SURFACE_COLOR,
  text: APP_THEME.TEXT_PRIMARY,
  textSecondary: APP_THEME.TEXT_SECONDARY,
  textLight: APP_THEME.TEXT_LIGHT,
  
  // Cores Neutras
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  black: '#000000',
  
  // Cores de Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
};

// 📝 Tipografia
export const typography = {
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
  },
  
  weights: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  
  styles: StyleSheet.create({
    h1: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.gray900,
      lineHeight: 40,
    },
    h2: {
      fontSize: 28,
      fontWeight: '600',
      color: colors.gray900,
      lineHeight: 36,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.gray800,
      lineHeight: 32,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.gray800,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.gray700,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      color: colors.gray600,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      color: colors.gray500,
      lineHeight: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.gray700,
      lineHeight: 20,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
  }),
};

// 📏 Espaçamentos
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

// 🔲 Componentes
export const components = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: typography.sizes.base,
    color: colors.gray800,
    minHeight: 48,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
});

// 🎯 Utilitários
export const utils = {
  shadow: {
    small: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
  },
  
  rounded: {
    sm: { borderRadius: 4 },
    md: { borderRadius: 8 },
    lg: { borderRadius: 12 },
    xl: { borderRadius: 16 },
    full: { borderRadius: 9999 },
  },
  
  flex: {
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    between: {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
};

export default {
  colors,
  typography,
  spacing,
  components,
  utils,
};