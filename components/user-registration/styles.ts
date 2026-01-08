import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  cardForm: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
    // Sombra leve para destacar o formulário
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  btnSalvar: {
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnSalvarText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  usuarioTexto: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  rowAcoes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  }
});