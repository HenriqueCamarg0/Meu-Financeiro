import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, Modal, TouchableOpacity } from 'react-native';
import { Cartao } from '../../../services/cartoesService';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../../utils/designSystem';

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
              <Text style={[styles.statusText, { color: item.ativo ? colors.success : colors.error }]}>
                {item.ativo ? 'ATIVO' : 'INATIVO'}
              </Text>
              <Switch
                value={item.ativo}
                onValueChange={(val) => confirmarMudancaStatus(item.cartaoId, item.nomeCartao, val)}
                trackColor={{ false: colors.gray300, true: colors.secondary }}
                thumbColor={item.ativo ? colors.white : colors.gray100}
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
                color={cartaoSelecionado?.novoStatus ? colors.success : colors.error} 
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
    backgroundColor: colors.surface, 
    padding: spacing.md, 
    borderRadius: 8, 
    marginBottom: spacing.sm, 
    borderWidth: 1, 
    borderColor: colors.gray200,
    alignItems: 'center'
  },
  infoCol: { flex: 1 },
  actionCol: { alignItems: 'center', minWidth: 60 },
  cardName: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.text },
  cardDetails: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: 2 },
  statusText: { fontSize: 9, fontWeight: typography.weights.bold, marginBottom: 2 },
  empty: { textAlign: 'center', color: colors.textLight, marginVertical: spacing.xl },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing['2xl'],
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg
  },
  modalTitle: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginTop: spacing.sm,
    textAlign: 'center'
  },
  modalMessage: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
    lineHeight: 22
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: spacing.md
  },
  modalButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalButtonCancel: {
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderColor: colors.gray300
  },
  modalButtonConfirm: {
    backgroundColor: colors.secondary
  },
  modalButtonTextCancel: {
    color: colors.textSecondary,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.lg
  },
  modalButtonTextConfirm: {
    color: colors.white,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.lg
  }
});