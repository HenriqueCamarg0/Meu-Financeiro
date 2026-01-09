import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, spacing } from '../../utils/designSystem';

export const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: colors.surface,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    elevation: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tabItem: { alignItems: 'center', flex: 1 },
  tabText: { fontSize: 11, color: colors.textSecondary, marginTop: 4 },
  tabTextAtivo: { color: colors.primary, fontWeight: '700' },

  fabContainer: { position: 'absolute', alignSelf: 'center', top: -32, zIndex: 10 },
  fabCircle: {
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    borderWidth: 4,
    borderColor: colors.surface,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 120,
    zIndex: 999,
  },
  menuAreaCircular: { width: 60, height: 60, alignItems: 'center', justifyContent: 'center' },
  itemPosicaoAbsoluta: { position: 'absolute', alignItems: 'center', width: 100 },
  circuloOpcao: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  labelOpcao: { color: colors.white, marginTop: spacing.sm, fontSize: 12, fontWeight: 'bold' },
  btnFecharCircular: { backgroundColor: colors.primary, width: 65, height: 65, borderRadius: 33, justifyContent: 'center', alignItems: 'center' },
});