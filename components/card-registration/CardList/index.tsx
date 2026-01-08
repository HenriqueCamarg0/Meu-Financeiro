import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, Modal, TouchableOpacity } from 'react-native';
import { Cartao } from '../../../services/cartoesService';
import { Ionicons } from '@expo/vector-icons';

interface CardListProps {
  cartoes: Cartao[];
  onToggleStatus: (id: string, status: boolean) => void;
}

export default function CardList({ cartoes, onToggleStatus }: CardListProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cartaoSelecionado, setCartaoSelecionado] = useState<{ id: string; nome: string; novoStatus: boolean } | null>(null);
  
  const confirmarMudancaStatus = (id: string, nome: string, novoStatus: boolean) => {
    setCartaoSelecionado({ id, nome, novoStatus });
    setModalVisible(true);
  };

  const handleConfirmar = () => {
    if (cartaoSelecionado) {
      onToggleStatus(cartaoSelecionado.id, cartaoSelecionado.novoStatus);
      setModalVisible(false);
      setCartaoSelecionado(null);
    }
  };

  const handleCancelar = () => {
    setModalVisible(false);
    setCartaoSelecionado(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartoes}
        keyExtractor={(item) => item.cartaoId}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.cardItem}>
            <View style={styles.infoCol}>
              <Text style={styles.cardName}>{item.nomeCartao}</Text>
              <Text style={styles.cardDetails}>
                **** {item.digitosCartao} {item.diaVencimento ? `• Dia ${item.diaVencimento}` : ''}
              </Text>
            </View>
            <View style={styles.actionCol}>
              <Text style={[styles.statusText, { color: item.ativo ? '#2E7D32' : '#C62828' }]}>
                {item.ativo ? 'ATIVO' : 'INATIVO'}
              </Text>
              <Switch
                value={item.ativo}
                onValueChange={(val) => confirmarMudancaStatus(item.cartaoId, item.nomeCartao, val)}
                trackColor={{ false: "#ccc", true: "#e67e22" }}
                thumbColor={item.ativo ? "#FFF" : "#f4f3f4"}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum cartão encontrado.</Text>
        }
      />

      {/* Modal de Confirmação Customizado */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelar}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons 
                name={cartaoSelecionado?.novoStatus ? "checkmark-circle" : "close-circle"} 
                size={50} 
                color={cartaoSelecionado?.novoStatus ? "#2E7D32" : "#C62828"} 
              />
              <Text style={styles.modalTitle}>Confirmar Alteração</Text>
            </View>

            <Text style={styles.modalMessage}>
              {cartaoSelecionado?.novoStatus 
                ? `Deseja realmente ATIVAR o cartão ${cartaoSelecionado?.nome}?` 
                : `Deseja realmente DESATIVAR o cartão ${cartaoSelecionado?.nome}?`}
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonCancel]} 
                onPress={handleCancelar}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonConfirm]} 
                onPress={handleConfirmar}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonTextConfirm}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 5 },
  cardItem: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 8, 
    borderWidth: 1, 
    borderColor: '#eee',
    alignItems: 'center'
  },
  infoCol: { flex: 1 },
  actionCol: { alignItems: 'center', minWidth: 60 },
  cardName: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  cardDetails: { fontSize: 12, color: '#777', marginTop: 2 },
  statusText: { fontSize: 9, fontWeight: 'bold', marginBottom: 2 },
  empty: { textAlign: 'center', color: '#999', marginVertical: 20 },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 15
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center'
  },
  modalMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalButtonCancel: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  modalButtonConfirm: {
    backgroundColor: '#e67e22'
  },
  modalButtonTextCancel: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 15
  },
  modalButtonTextConfirm: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
});