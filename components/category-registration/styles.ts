import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    padding: 5,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  btnAdicionarSub: {
    backgroundColor: '#8b5cf6',
    width: 45,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagSub: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#DDD',
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
  itemCategoria: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 2,
  },
  categoriaTexto: {
    fontSize: 16,
    color: '#333',
  }
});