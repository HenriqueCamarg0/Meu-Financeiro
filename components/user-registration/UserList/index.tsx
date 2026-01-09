import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { userService, Usuario } from '../../../services/userService';
import { colors, typography, spacing } from '../../../utils/designSystem';

interface UserListProps {
  usuarios: Usuario[];
  atualizar: () => void;
}

export default function UserList({ usuarios, atualizar }: UserListProps) {
  
  const handleToggleStatus = async (user: Usuario) => {
    try {
      await userService.atualizar(user.userId, { ...user, ativo: !user.ativo });
      atualizar();
    } catch (err) {
      Alert.alert("Erro", "Não foi possível alterar o status.");
    }
  };

  const handleSetDefault = async (user: Usuario) => {
    try {
      await userService.atualizar(user.userId, { ...user, defaultValue: true });
      atualizar();
    } catch (err) {
      Alert.alert("Erro", "Falha ao definir usuário como padrão.");
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <Text style={styles.label}>Seus Usuários</Text>
      
      {usuarios && usuarios.map((user, index) => (

        <View key={user.userId || `user-${index}`} style={styles.itemUsuario}>
          <View style={{ flex: 1 }}>
            <Text style={styles.usuarioTexto}>{user.nome} {user.sobrenome}</Text>
            
            <View style={[
              styles.badge, 
              { backgroundColor: user.ativo ? colors.success + '20' : colors.error + '20' }
            ]}>
              <Text style={{ 
                color: user.ativo ? colors.success : colors.error, 
                fontSize: 10, 
                fontWeight: 'bold' 
              }}>
                {user.ativo ? 'ATIVO' : 'INATIVO'}
              </Text>
            </View>
          </View>

          <View style={styles.rowAcoes}>
            <TouchableOpacity onPress={() => handleSetDefault(user)}>
              <Ionicons 
                name={user.defaultValue ? "star" : "star-outline"} 
                size={22} 
                color={user.defaultValue ? colors.warning : colors.gray400} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleToggleStatus(user)}>
              <Ionicons 
                name={user.ativo ? "toggle" : "toggle-outline"} 
                size={28} 
                color={colors.primary} 
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              Alert.alert("Excluir", "Deseja remover este usuário?", [
                { text: "Não" },
                { text: "Sim", onPress: () => userService.excluir(user.userId).then(atualizar) }
              ]);
            }}>
              <Ionicons name="trash-outline" size={22} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {(!usuarios || usuarios.length === 0) && (
        <Text style={styles.emptyText}>
          Nenhum usuário encontrado.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = {
  itemUsuario: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  usuarioTexto: {
    ...typography.styles.body,
    color: colors.text,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    marginLeft: spacing.sm,
  },
  rowAcoes: {
    flexDirection: 'row' as const,
    gap: spacing.md,
    marginLeft: 'auto' as const,
  },
  emptyText: {
    textAlign: 'center' as const,
    color: colors.textSecondary,
    marginTop: spacing.xl,
    ...typography.styles.body,
  },
};