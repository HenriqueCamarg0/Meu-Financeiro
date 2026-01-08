import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  mesSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mesText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginRight: 8,
  },
  saldoArea: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  labelSaldo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  valorPrincipalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valorSaldo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  resumoRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 12,
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
    marginRight: 8,
  },
  labelResumo: {
    fontSize: 12,
    color: '#666',
  },
  valorResumo: {
    fontSize: 14,
    fontWeight: '600',
  },
});