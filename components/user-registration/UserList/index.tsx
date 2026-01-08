import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles';
import { userService, Usuario } from '../../../services/userService';

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
              { backgroundColor: user.ativo ? '#dcfce7' : '#fee2e2' }
            ]}>
              <Text style={{ 
                color: user.ativo ? '#166534' : '#991b1b', 
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
                color={user.defaultValue ? "#eab308" : "#9ca3af"} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleToggleStatus(user)}>
              <Ionicons 
                name={user.ativo ? "toggle" : "toggle-outline"} 
                size={28} 
                color="#8b5cf6" 
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              Alert.alert("Excluir", "Deseja remover este usuário?", [
                { text: "Não" },
                { text: "Sim", onPress: () => userService.excluir(user.userId).then(atualizar) }
              ]);
            }}>
              <Ionicons name="trash-outline" size={22} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {(!usuarios || usuarios.length === 0) && (
        <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
          Nenhum usuário encontrado.
        </Text>
      )}
    </ScrollView>
  );
}