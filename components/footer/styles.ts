import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // --- Barra de Navegação Inferior (Fixed) ---
  navBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    position: 'relative'
  },
  tabItem: { alignItems: 'center', flex: 1 },
  tabText: { fontSize: 10, color: '#888', marginTop: 4 },
  tabTextAtivo: { color: '#8b5cf6' },

  // --- Botão Central da Home (O que abre o menu) ---
  fabContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: -30,
    zIndex: 10
  },
  fabCircle: {
    backgroundColor: '#8b5cf6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  // --- OVERLAY DO MENU (Fundo escuro) ---
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)', // Escurecido para foco total
    justifyContent: 'flex-end', // Alinha os itens para baixo
    alignItems: 'center',
    paddingBottom: 120, // Distância do fundo da tela para o botão de fechar
  },

  // --- ÁREA DO MENU CIRCULAR ---
  menuAreaCircular: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  // --- CADA OPÇÃO (Saída, Entrada, etc) ---
  itemPosicaoAbsoluta: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100, // Largura maior para o texto não quebrar
  },
  opcaoContainer: { 
    alignItems: 'center',
    justifyContent: 'center',
  },
  circuloOpcao: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  labelOpcao: { 
    color: '#FFF', 
    marginTop: 8, 
    fontSize: 12, 
    fontWeight: 'bold',
    textAlign: 'center',
    // Sombra no texto para leitura clara
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4
  },

  // --- BOTÃO DE FECHAR (X Central) ---
  btnFecharCircular: {
    backgroundColor: '#8b5cf6',
    width: 65,
    height: 65,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    zIndex: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)' // Borda sutil de destaque
  },

  // --- ESTILOS DOS MODAIS (Cadastro) ---
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { 
    flex: 1, 
    padding: 15, 
    paddingBottom: 80 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    backgroundColor: '#FFF', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    height: '90%', 
    padding: 20,
    elevation: 20
  },
  closeBtn: { alignSelf: 'flex-end', padding: 10 },
  closeTxt: { fontSize: 22, color: '#999', fontWeight: 'bold' },

  // --- LISTAS E COMPONENTES INTERNOS ---
  itemUsuario: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  usuarioTexto: { fontSize: 16, fontWeight: '600', color: '#333' },
  rowAcoes: { flexDirection: 'row', gap: 15, alignItems: 'center' },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4
  },
  label: { 
    fontSize: 14, 
    color: '#666', 
    fontWeight: 'bold', 
    marginBottom: 10,
    marginTop: 15 
  }
});